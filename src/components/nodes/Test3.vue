<template>
	<div
		class="vue-flow__node-input mt10"
		style="cursor: grab"
		:draggable="true"
		@dragstart="onDragStart()"
	>
		Test 3
	</div>
</template>

<script setup lang="tsx">
import { ElButton } from "element-plus";
import { setTempData } from "../store";
import openModal from "../dialog";

function onDragStart() {
	setTempData({
		label: "Test 3 node",
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
								content: <ElButton onClick={() => console.log("Test 3")}>Log</ElButton>,
							}),
					},
				],
				disabledValues: ["resize"],
			},
		},
	});
}
</script>
