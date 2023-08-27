<template>
	<transition name="el-zoom-in-center">
		<div
			aria-hidden="true"
			class="el-dropdown__popper el-popper is-light is-pure custom-contextmenu"
			role="tooltip"
			data-popper-placement="bottom"
			:style="`position: absolute; top: ${position.y + 5}px;left: ${
				position.x - 15
			}px;`"
			:key="Math.random()"
			v-show="state.isShow"
		>
			<ul class="el-dropdown-menu">
				<!-- <el-cascader-panel :options="options" /> -->
				<el-text class="m5" style="display: block; text-align: center">
					{{ selectedElementLabel }}</el-text
				>
				<el-divider class="my5" />
				<li
					class="el-dropdown-menu__item"
					v-for="option in selectedElementConfig.options"
					@click="option.function()"
				>
					{{ option.label }}
				</li>
				<li
					v-for="(v, k) in state.dropdownList"
					v-show="v.hidden !== selectedElementType"
					class="el-dropdown-menu__item"
					:class="
						selectedElementConfig.disabledValues &&
						selectedElementConfig.disabledValues.includes(v.txt)
							? 'disabled'
							: ''
					"
					:key="k"
					@click="
						emit(
							v.txt as
								| 'edit'
								| 'delete'
								| 'hidden'
								| 'resize'
								| 'duplicate'
								| 'addChild',
							selectedElementID
						)
					"
				>
					<Icon :name="v.icon" />
					<span class="ms5">{{ $lt(v.txt) }}</span>
				</li>
			</ul>
			<div class="el-popper__arrow" style="left: 10px"></div>
		</div>
	</transition>
</template>

<script setup lang="ts" name="pagesWorkflowContextmenu">
import { reactive, onMounted, onUnmounted, ref } from "vue";
import Icon from "./icon.vue";

const props = defineProps({
	position: {
		type: Object,
		default: () => {
			return { x: "", y: "" };
		},
	},
	t: { type: Function, required: true },
});
const $lt = props.t;
const emit = defineEmits([
	"resize",
	"edit",
	"delete",
	"hidden",
	"duplicate",
	"addChild",
]);

const state = reactive({
	isShow: false,
	dropdownList: [
		{ txt: "edit", icon: "ele-Edit" },
		{ txt: "resize", icon: "ele-Rank", hidden: "edge" },
		{ txt: "duplicate", icon: "ele-CopyDocument", hidden: "edge" },
		{ txt: "addChild", icon: "ele-CirclePlus", hidden: "edge" },
		{ txt: "hidden", icon: "ele-Hide" },
		{ txt: "delete", icon: "ele-Delete" },
	],
});

const selectedElementID = ref();
const selectedElementType = ref();
const selectedElementLabel = ref();
const selectedElementConfig = ref({ disabledValues: [], options: [] });
const openContextmenu = (element: {
	id: string;
	elementType: string;
	label: string;
	config: { contextMenu: { disabledValues: []; options: [] } };
}) => {
	selectedElementConfig.value = { disabledValues: [], options: [] };
	selectedElementID.value = element.id;
	selectedElementType.value = element.elementType;

	selectedElementLabel.value = element.label;
	if (element.config && "contextMenu" in element.config)
		selectedElementConfig.value = element.config.contextMenu;

	console.log(selectedElementConfig.value);

	setTimeout(() => {
		state.isShow = true;
	}, 10);
};
const closeContextmenu = () => {
	state.isShow = false;
};
onMounted(() => {
	document.body.addEventListener("click", closeContextmenu);
	document.body.addEventListener("contextmenu", closeContextmenu);
});
onUnmounted(() => {
	document.body.removeEventListener("click", closeContextmenu);
	document.body.removeEventListener("contextmenu", closeContextmenu);
});

defineExpose({ openContextmenu });
</script>

<style scoped lang="scss">
.el-dropdown-menu:has(> .disabled) {
	cursor: not-allowed;
}

.disabled {
	opacity: 0.6;
	pointer-events: none;
}

.custom-contextmenu {
	transform-origin: center top;
	z-index: 2190;
	position: fixed;
	.el-dropdown-menu__item {
		font-size: 12px !important;
		white-space: nowrap;
		i {
			font-size: 12px !important;
		}
	}
}
</style>
