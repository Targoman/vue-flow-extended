<template>
	<flow
		:predefineNodes="PredefineNodes"
		background
		controls
		mini-map
		:model="model"
		:toolsConfig="toolsConfig"
	></flow>
</template>
<script setup lang="tsx">
import type { Component } from "vue";
import flow from "./components/vue-flow-extended.vue";
import test5 from "./components/nodes/test5.vue";
import { IntTool, typeFlowTools } from ".";

const PredefineNodes: Component[] = [test5];

const model = [
	{ id: "1", type: "input", label: "Node 1", position: { x: 250, y: 5 } },
	{ id: "2", label: "Node 2", position: { x: 100, y: 100 } },
	{ id: "3", label: "Node 3", position: { x: 400, y: 100 } },
	{ id: "4", label: "Node 4", position: { x: 400, y: 200 } },
	{ id: "e1-2", source: "1", target: "2", animated: true },
	{ id: "e1-3", source: "1", target: "3" },
];

const toolsConfig: { disabledTools: typeFlowTools; addTools: IntTool[] } = {
	disabledTools: ["help"],
	addTools: [
		{
			icon: "ele-Help",
			name: "help2",
			function: () => alert("help2"),
		},
	],
};
</script>

<style lang="scss"></style>
