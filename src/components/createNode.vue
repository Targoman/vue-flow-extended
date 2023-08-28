<template>
	<el-col
		style="display: flex; justify-content: center; margin-bottom: 5px"
		:md="12"
		v-for="n in nodes"
	>
		<component
			:flowFunctions="flowFunctions"
			:is="typeof n === 'string' ? getNode(n) : n"
		/>
	</el-col>
</template>

<script setup lang="ts">
import { defineAsyncComponent } from "vue";
// import IntfLooseObject from "./interfaces/looseObject";
// import { useFlowStore } from "./store";

defineProps({
	nodes: Object,
	flowFunctions: Object,
});
// function onDragStart(_event: any, nodeType: string, label: string) {
// 	useFlowStore().setNode({ type: nodeType, label: label });
// }
const predefineNodes: any = import.meta.glob("./nodes/**.vue");
const getNode = (n: string) =>
	defineAsyncComponent(predefineNodes[`./nodes/${n}.vue`]);
</script>
<style lang="scss">
.circle {
	width: 60px;
	height: 60px;
	border-radius: 50%;
}
.Rectangle {
	width: 100px;
	height: 50px;
}
</style>
