<template>
	<div class="sidebarLogo">
		<Icon
			class="sidebarLogo-icon"
			:name="getSidebarState() ? 'ele-ArrowLeftBold' : 'ele-ArrowRightBold'"
			@click="onSidebarChange"
		/>
	</div>
	<el-aside class="flowSidebar" v-show="getSidebarState()">
		<el-collapse>
			<Accordion :title="$lt('Nodes')">
				<el-row justify="space-around">
					<createNode
						:flowFunctions="flowFunctions"
						:nodes="predefineNodes"
					></createNode>
				</el-row>
			</Accordion>
			<Accordion :title="$lt('hiddenNodes')">
				<el-row justify="space-between" align="middle" v-for="node in hiddenNodes"
					><div :style="node.style" class="vue-flow__node-input">
						{{ node.label }}
					</div>
					<el-button type="primary" @click="node.hidden = false">{{
						$lt("bring it back")
					}}</el-button>
				</el-row>
			</Accordion>
		</el-collapse>
	</el-aside>
</template>
<script setup lang="ts">
import Accordion from "./accordion.vue";
import Icon from "./icon.vue";
import createNode from "./createNode.vue";
import { setSidebar, getSidebarState } from "./store";
const props = defineProps({
	hiddenNodes: Object,
	predefineNodes: Object,
	flowFunctions: Object,
	t: { type: Function, required: true },
	title: String,
});

const $lt = props.t;
const onSidebarChange = () => setSidebar(!getSidebarState());
</script>

<style lang="scss">
.sidebarLogo {
	position: relative;
	height: 0px;
	flex: 1;
	.sidebarLogo-icon {
		background: linear-gradient(45deg, #b2e68d, #bce689);
		border: none;
		text-align: center;
		text-decoration: none;
		display: inline-block;
		font-size: 16px;
		border-radius: 3px;
		position: absolute;
		left: -25px;
		cursor: pointer;
		width: 25px;
		height: 25px;
		opacity: 0.8;
		& > svg {
			translate: 0 5px;
			transform: scale(-1, 1);
		}
		&:hover {
			opacity: 1;
		}
	}
}
html[dir="rtl"] {
	.sidebarLogo > .sidebarLogo-icon {
		left: 0;
		& > svg {
			translate: 0 5px;
			transform: scale(1);
		}
	}
}
</style>
