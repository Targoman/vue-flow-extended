<template>
	<!-- <ElRow justify="space-between" align="middle"> -->
	<!-- <el-col :span="10" class="mx10"> -->
	<ElDivider class="mt20 mb10 w100" :content-position="'right'">color</ElDivider>
	<ElRow justify="space-evenly" align="middle">
		<div>
			<ElText class="mx3">{{ $lt("color") }} :</ElText>
			<ElColorPicker
				size="large"
				@change="onStyleChange(node ? 'backgroundColor' : 'stroke', $event)"
				v-model="color"
				show-alpha
				:predefine="predefineColors"
			/>
		</div>
		<div v-if="node">
			<ElText class="mx3">{{ $lt("textColor") }} :</ElText>
			<ElColorPicker
				size="large"
				@change="onStyleChange('color', $event)"
				v-model="textColor"
				show-alpha
				:predefine="predefineColors"
			/>
		</div>
		<div v-if="node">
			<ElText class="mx3">{{ $lt("borderColor") }} :</ElText>
			<ElColorPicker
				size="large"
				@change="onStyleChange('borderColor', $event)"
				v-model="borderColor"
				show-alpha
				:predefine="predefineColors"
			/>
		</div>
	</ElRow>
	<!-- </el-col> -->
	<!-- <el-col :span="10"> -->
	<ElDivider class="mt10 mb20 w100" :content-position="'right'"
		>content</ElDivider
	>
	<ElRow align="middle">
		<ElText class="mx3">{{ $lt("label") }} :</ElText>
		<ElInput
			v-if="node"
			v-model="(node.label as string)"
			label="dddd"
			:placeholder="$lt('label')"
			style="width: 50%"
		/>
		<ElInput
			v-else-if="edge"
			v-model="(edge.label as string)"
			:placeholder="$lt('label')"
			style="width: 50%"
		/>
	</ElRow>
	<ElDivider class="mt20 mb10 w100" :content-position="'right'">state</ElDivider>

	<switch-button
		name="edge.animated"
		v-if="edge"
		v-model="edge.animated"
		label="animated: "
	/>
	<ElRow v-if="node">
		<switch-button
			name="sourcePosition"
			class="mx10"
			label="sourcePosition: "
			:disabled="!target"
			v-model="source"
			@input-change="onEdgeChange"
		></switch-button>
		<select-input
			name="sourcePositionSelect"
			@update:model-value="updateNodeInternals"
			:disabled="!source"
			:t="$lt"
			:options="options"
			v-model="node.sourcePosition"
		></select-input>
	</ElRow>
	<ElRow v-if="node">
		<switch-button
			name="targetPosition"
			class="mx10"
			label="targetPosition: "
			:disabled="!source"
			v-model="target"
			@input-change="onEdgeChange"
		></switch-button>
		<select-input
			name="targetPositionSelect"
			@update:model-value="updateNodeInternals"
			:disabled="!target"
			:t="$lt"
			:options="options"
			v-model="node.targetPosition"
		></select-input>
	</ElRow>
</template>

<script setup lang="ts" name="workflowTool">
import { PropType, ref } from "vue";
import {
	/* GraphEdge, GraphNode,*/ Position,
	VueFlowStore,
} from "@vue-flow/core";
import { ElRow, ElText, ElDivider, ElInput, ElColorPicker } from "element-plus";

import SwitchButton from "./switch.vue";
import SelectInput from "./select.vue";

const options = ref([
	Position.Top,
	Position.Bottom,
	Position.Left,
	Position.Right,
]);
const props = defineProps({
	node: Object as PropType<any>,
	edge: Object as PropType<any>,
	flowFunctions: Object as PropType<VueFlowStore>,
	t: { type: Function, required: true },
});
const $lt = props.t;
const updateNodeInternals = () => {
	setTimeout(() => {
		props.flowFunctions?.updateNodeInternals();
	}, 10);
};
const onStyleChange = (type: any, value: any) => {
	if (props.node)
		props.node["style"] = { ...props.node["style"], [type]: value };
	if (props.edge)
		props.edge["style"] = { ...props.edge["style"], [type]: value };
};
const source = ref(props.node?.type !== "output");
const target = ref(props.node?.type !== "input");
const onEdgeChange = () => {
	if (props.node) {
		if (source.value && target.value) props.node["type"] = "";
		else if (source.value && !target.value) props.node["type"] = "input";
		else if (!source.value && target.value) props.node["type"] = "output";
	}
	// props.flowFunctions?.updateConnection()
};

const color = ref(
	(props.node?.style?.backgroundColor || props.edge?.style?.stroke) ?? ""
);
const textColor = ref(props.node?.style?.color ?? "");
const borderColor = ref(props.node?.style?.borderColor ?? "");
const predefineColors = ref([
	"#ff4500",
	"#ff8c00",
	"#ffd700",
	"#90ee90",
	"#00ced1",
	"#1e90ff",
	"#c71585",
	"rgba(255, 69, 0, 0.68)",
	"rgb(255, 120, 0)",
	"hsv(51, 100, 98)",
	"hsva(120, 40, 94, 0.5)",
	"hsl(181, 100%, 37%)",
	"hsla(209, 100%, 56%, 0.73)",
	"#c7158577",
]);
</script>

<style lang="scss">
.el-color-dropdown__main-wrapper,
.el-color-predefine__colors,
.el-color-dropdown__btns {
	direction: ltr !important;
}
</style>
