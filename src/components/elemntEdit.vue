<template>
	<!-- <el-row justify="space-between" align="middle"> -->
	<!-- <el-col :span="10" class="mx10"> -->
	<el-divider class="mt20 mb10 w100" :content-position="'right'">رنگ</el-divider>
	<el-row justify="space-evenly" align="middle">
		<div>
			<el-text class="mx3">{{ $lt("color") }} :</el-text>
			<el-color-picker
				size="large"
				@change="onStyleChange(node ? 'backgroundColor' : 'stroke', $event)"
				v-model="color"
				show-alpha
				:predefine="predefineColors"
			/>
		</div>
		<div v-if="node">
			<el-text class="mx3">{{ $lt("textColor") }} :</el-text>
			<el-color-picker
				size="large"
				@change="onStyleChange('color', $event)"
				v-model="textColor"
				show-alpha
				:predefine="predefineColors"
			/>
		</div>
		<div v-if="node">
			<el-text class="mx3">{{ $lt("borderColor") }} :</el-text>
			<el-color-picker
				size="large"
				@change="onStyleChange('borderColor', $event)"
				v-model="borderColor"
				show-alpha
				:predefine="predefineColors"
			/>
		</div>
	</el-row>
	<!-- </el-col> -->
	<!-- <el-col :span="10"> -->
	<el-divider class="mt10 mb20 w100" :content-position="'right'"
		>محتوا</el-divider
	>
	<el-row align="middle">
		<el-text class="mx3">{{ $lt("label") }} :</el-text>
		<el-input
			v-if="node"
			v-model="node.label"
			label="dddd"
			:placeholder="$lt('label')"
			style="width: 50%"
		/>
		<el-input
			v-else-if="edge"
			v-model="edge.label"
			:placeholder="$lt('label')"
			style="width: 50%"
		/>
	</el-row>
	<el-divider class="mt20 mb10 w100" :content-position="'right'"
		>وضعیت</el-divider
	>

	<switch-button v-if="edge" v-model="edge.animated" label="animated: " />
	<el-row v-if="node">
		<switch-button
			class="mx10"
			label="sourcePosition: "
			:disabled="!target"
			v-model="source"
			@input-change="onEdgeChange"
		></switch-button>
		<select-input
			@update:model-value="loog"
			:disabled="!source"
			:t="$lt"
			:options="options"
			v-model="node.sourcePosition"
		></select-input>
	</el-row>
	<el-row v-if="node">
		<switch-button
			class="mx10"
			label="targetPosition: "
			:disabled="!source"
			v-model="target"
			@input-change="onEdgeChange"
		></switch-button>
		<select-input
			@update:model-value="loog"
			:disabled="!target"
			:t="$lt"
			:options="options"
			v-model="node.targetPosition"
		></select-input>
	</el-row>
	<!-- <select-input :t="$lt" label="targetPosition" v-if="node" :options="options" v-model="node.targetPosition"></select-input> -->
</template>

<script setup lang="ts" name="workflowTool">
import { PropType, ref } from "vue";
import { GraphEdge, GraphNode, Position, VueFlowStore } from "@vue-flow/core";
// import SwitchButton from "../form/inputs/switchButton.vue";
// import SelectInput from "../form/inputs/selectInputs/selectInput.vue";

const options = ref([
	Position.Top,
	Position.Bottom,
	Position.Left,
	Position.Right,
]);
const props = defineProps({
	node: Object as PropType<GraphNode>,
	edge: Object as PropType<GraphEdge>,
	flowFunctions: Object as PropType<VueFlowStore>,
	t: { type: Function, required: true },
});
const $lt = props.t;
const loog = (a) => {
	setTimeout(() => {
		// props.flowFunctions?.applyNodeChanges(props.flowFunctions.nodes)
		// props.flowFunctions?.updateConnection()
		props.flowFunctions?.updateNodeInternals();
	}, 10);
};
// const emit = defineEmits(["edit"]);

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
