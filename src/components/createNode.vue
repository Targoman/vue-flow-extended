<template>
	<el-col
		style="display: flex; justify-content: center"
		:md="12"
		v-for="n in nodes"
	>
		<component
			:flowFunctions="flowFunctions"
			v-if="typeof n === 'string'"
			:is="getNode(n)"
		/>
		<div
			v-else
			:key="n"
			:class="`vue-flow__node-input mt10 ${n.type}`"
			style="cursor: grab"
			:draggable="true"
			@dragstart="onDragStart($event, n.type, n.text)"
		>
			{{ n.text }}
		</div>
	</el-col>
</template>

<script setup lang="ts">
import { defineAsyncComponent } from "vue";
import IntfLooseObject from "./interfaces/looseObject";
import { useFlowStore } from "./store";

defineProps({
	nodes: Object,
	flowFunctions: Object,
});
function onDragStart(event: any, nodeType: string, label: string) {
	useFlowStore().setNode({ type: nodeType, label: label });
}
const getNode = (n: string) =>
	defineAsyncComponent(predefineNodes[`./nodes/${n}.vue`]);
const predefineNodes: IntfLooseObject = import.meta.glob("./nodes/**.vue");
</script>
<style lang="scss">
.circle {
	width: 60px;
	height: 60px;
	border-radius: 50%;
}
.square {
	width: 60px;
	height: 60px;
}
.oval {
	width: 100px;
	height: 50px;
	border-radius: 50%;
}
.Rectangle {
	width: 100px;
	height: 50px;
}
</style>
