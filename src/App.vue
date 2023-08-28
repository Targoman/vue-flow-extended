<template>
	<flow
		:predefineNodes="PredefineNodes"
		background
		controls
		mini-map
		:model="model"
	></flow>
</template>
<script setup lang="tsx">
import flow from "./components/flow.vue";
import test5 from "./components/nodes/test5.vue";

enum enumPredefineNodes {
	Test3 = "Test3",
	Test2 = "Test2",
	Test1 = "Test1",
}
const PredefineNodes: (enumPredefineNodes | { type: string; text: string })[] =
	[
		enumPredefineNodes.Test3,
		enumPredefineNodes.Test2,
		enumPredefineNodes.Test1 /* with nested nodes*/,
		test5,
		// { type: "Rectangle", text: "Test 4" },
	];
const model = [
	{ id: "1", type: "input", label: "Node 1", position: { x: 250, y: 5 } },
	{ id: "2", label: "Node 2", position: { x: 100, y: 100 } },
	{ id: "3", label: "Node 3", position: { x: 400, y: 100 } },
	{ id: "4", label: "Node 4", position: { x: 400, y: 200 } },
	{ id: "e1-2", source: "1", target: "2", animated: true },
	{ id: "e1-3", source: "1", target: "3" },
];
</script>

<style scoped>
.logo {
	height: 6em;
	padding: 1.5em;
	will-change: filter;
	transition: filter 300ms;
}
.logo:hover {
	filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
	filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
