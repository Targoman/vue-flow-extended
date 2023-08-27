<template>
	<div
		class="vue-flow__node-input circle mt10"
		style="cursor: grab"
		:draggable="true"
		@dragstart="onDragStart($event)"
	>
		Test 2
	</div>
</template>

<script setup lang="tsx">
import { useFlowStore } from "../store";
import openModal from "../dialog";

function onDragStart(event: any) {
	useFlowStore().setNode({
		type: "Test 2",
		label: "Test 2",
		class: "circle",
		style: { backgroundColor: "rgba(009, 92, 246, 0.5)" },
		config: {
			contextMenu: {
				options: [
					{
						label: "show Test 2",
						function: () => openModal({ title: "Edit", content: <div>Test 2</div> }),
					},
				],
				// disabledValues: ['resize'],
			},
		},
	});
}
</script>
