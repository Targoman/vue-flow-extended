<template>
	<div
		class="vue-flow__node-input mt10"
		style="cursor: grab"
		:draggable="true"
		@dragstart="onDragStart()"
	>
		Test 5
	</div>
</template>

<script setup lang="tsx">
import { ElButton } from "element-plus";
import { useFlowStore } from "../store";
import openModal from "../dialog";

function onDragStart() {
	useFlowStore().setNode({
		label: "Test 5 node",
		style: {
			backgroundColor: "rgba(139, 92, 246, 0.5)",
			height: "150px",
			width: "270px",
		},
		config: {
			contextMenu: {
				options: [
					{
						label: "Log Mo1",
						function: () =>
							openModal({
								title: "Edit",
								content: <ElButton onClick={() => alert("Test 5")}>Log</ElButton>,
							}),
					},
				],
				disabledValues: ["resize"],
			},
		},
	});
}
</script>
