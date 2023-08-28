<template>
	<div
		class="vue-flow__node-input mt10"
		style="cursor: grab"
		:draggable="true"
		@dragstart="onDragStart()"
	>
		Test1
	</div>
</template>

<script setup lang="tsx">
import { PropType } from "vue";
import { useFlowStore } from "../store";
import { GraphNode, VueFlowStore } from "@vue-flow/core";
import openModal from "../dialog";
import { ElButton } from "element-plus";

const props = defineProps({
	flowFunctions: Object as PropType<VueFlowStore>,
});

const generateNodes = () => {
	const id = crypto.randomUUID();
	const parentNode = {
		id: `${id}`,
		label: "Test1 parent node",
		style: {
			backgroundColor: "rgba(139, 92, 246, 0.5)",
			height: "150px",
			width: "270px",
		},
		config: {
			contextMenu: {
				options: [
					{
						label: "Test1 Custom Edit",
						function: () => {
							const hideChildNode = (cID: string) => {
								const node = props.flowFunctions?.findNode(cID) as GraphNode;
								node.hidden = true;
							};
							openModal({
								title: "Edit",
								content: (
									<>
										<div>label: nested parent node</div>
										<ElButton onClick={() => hideChildNode(`${id}1`)}>
											Hide Child Node 1{" "}
										</ElButton>
										<ElButton onClick={() => hideChildNode(`${id}2`)}>
											Hide Child Node 2{" "}
										</ElButton>
									</>
								),
							});
						},
					},
				],
				disabledValues: ["edit", "resize"],
			},
		},
	};

	const childNode1 = {
		id: `${id}1`,
		label: "Test1 nested child node1",
		// position: { x: 20, y: 40 },
		parentNode: `${id}`,
		extent: "parent",
		config: {
			contextMenu: {
				options: [
					{
						label: "change parent color",
						function: () => {
							const child1Fun = () => {
								const node = props.flowFunctions?.findNode(`${id}`) as GraphNode;
								node.style = { ...node.style, backgroundColor: "blue" };
							};
							openModal({
								title: "Edit",
								content: <ElButton onClick={child1Fun}>Change</ElButton>,
							});
						},
					},
				],
				disabledValues: ["delete"],
			},
		},
	};
	const childNode2 = {
		id: `${id}2`,
		label: "nested child node2",
		position: { x: -100, y: 100 },
		parentNode: `${id}`,
		extent: "parent",
		config: {
			contextMenu: {
				options: [
					{
						label: "Alert 2",
						function: () => {
							openModal({
								title: "Edit",
								content: <ElButton onClick={() => alert("Im Child 2")}>Log</ElButton>,
							});
						},
					},
				],
				disabledValues: ["delete"],
			},
		},
	};
	console.log([parentNode, childNode1, childNode2]);

	return [parentNode, childNode1, childNode2];
};

const onDragStart = () => useFlowStore().setNode(generateNodes());
</script>
