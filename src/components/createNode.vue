<template>
	<ElCol
		style="display: flex; justify-content: center; margin-bottom: 5px"
		:md="12"
		v-for="n in nodes"
	>
		<component
			:flowFunctions="flowFunctions"
			:is="typeof n === 'string' ? getNode(n) : n"
		/>
	</ElCol>
</template>

<script setup lang="ts">
import { ElCol } from "element-plus";

import { defineAsyncComponent } from "vue";

defineProps({
	nodes: Object,
	flowFunctions: Object,
});
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
