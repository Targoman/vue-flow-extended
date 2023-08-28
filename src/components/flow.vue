<template>
	<span :class="isFullScreen ? 'fullscreen' : ''">
		<Toolbar :tool-list="toolList" :t="(s: string)=> s" />
		<div class="flow_container" @drop="onDrop">
			<VueFlow
				@contextmenu.prevent=""
				fit-view-on-init
				style="position: relative"
				v-model="model"
				@dragover="onDragOver"
				@node-context-menu="onContextmenu"
				@edge-context-menu="onContextmenu"
				@edge-update="onEdgeUpdate"
				@drop="onNodeDrag"
			>
				<template #node-resizable="resizableNodeProps">
					<ResizableNode @resize-submit="onResizeSubmit" :="resizableNodeProps" />
				</template>
				<Background
					v-if="background"
					:variant="(backgroundVariant as BackgroundVariant)"
				/>
				<MiniMap
					class="minimap"
					v-if="miniMap"
					:class="isFullScreen ? 'fullscreen-fit' : ''"
					pannable
				/>
				<Controls v-if="controls" :class="isFullScreen ? 'fullscreen-fit' : ''" />
				<Contextmenu
					@resize="onNodeResize"
					@delete="onElementDelete"
					@hidden="onElementHidden"
					@edit="onElementEdit"
					@duplicate="onElementDuplicate"
					@addChild="onElementChild"
					:position="position"
					ref="contextmenuNodeRef"
					:t="t"
				/>
			</VueFlow>
			<Sidebar
				:flowFunctions="flowFunctions"
				:nodes="nodes"
				:hidden-nodes="model.filter((node: any) => node.hidden)"
				:t="t"
			/>
		</div>
	</span>
</template>

<script setup lang="tsx">
import {
	EdgeMouseEvent,
	GraphEdge,
	GraphNode,
	NodeMouseEvent,
	VueFlow,
	useVueFlow,
	Element,
	Connection,
} from "@vue-flow/core";
import { ref, defineAsyncComponent, Ref, PropType, reactive } from "vue";
import { ElButton } from "element-plus";
import "@vue-flow/core/dist/style.css";
import "@vue-flow/core/dist/theme-default.css";
import "@vue-flow/minimap/dist/style.css";
import "@vue-flow/controls/dist/style.css";
import { Background, BackgroundVariant } from "@vue-flow/background";
import { Controls } from "@vue-flow/controls";
import { MiniMap } from "@vue-flow/minimap";
import Toolbar from "./toolbar.vue";
import ElemntEdit from "./elemntEdit.vue";
import ResizableNode from "./resizableNode.vue";
import { useClipboard, useDebouncedRefHistory } from "@vueuse/core";
import Sidebar from "./sidebar.vue";
import openModal from "./dialog";
import Upload from "./upload.vue";
import MessageBox from "./MessageBox";
import { useFlowStore } from "./store";
import examples from "./examples";

const Contextmenu = defineAsyncComponent(() => import("./contextMenu.vue"));

const props = defineProps({
	background: Boolean,
	backgroundVariant: String as PropType<"lines" | "dots">,
	miniMap: Boolean,
	controls: Boolean,
	saveRestore: Boolean,
	nodes: Array,
	model: { type: Array, required: true },
	t: { type: Function, default: (s: string) => s },
});
const $lt = props.t;
function objectMap(obj: any, callback: any) {
	let result: any = [];
	Object.keys(obj).forEach(async function (key, index) {
		result[index] = await callback.call(obj, obj[key], key, obj);
	});
	return result;
}

const model = ref(props.model) as Ref<Element[]>;

const emit = defineEmits(["copy", "storageSave", "restore"]);
const contextmenuNodeRef = ref();
const isFullScreen = ref(false);
const unSubmittedNodes: { id: string; type: string }[] = reactive([]);
const onNodeResize = (id: string) => {
	const node = findNode(id) as GraphNode;
	unSubmittedNodes.push({ id: node.id, type: node.type });
	node.type = "resizable";
	node.draggable = false;
	node.class = `${node.class} resizableNode`;
};
const onResizeSubmit = (id: string) => {
	const node = findNode(id) as GraphNode;
	const initialType = unSubmittedNodes.find((obj) => (obj.id = id))
		?.type as string;
	node.type = initialType;
};
const onElementDuplicate = (id: string) => {
	const node = findNode(id) as GraphNode;
	const position = { x: node.position.x + 30, y: node.position.y + 30 };
	addNodes([{ ...node, id: crypto.randomUUID(), position }]);
};

const onElementChild = (id: string) => {
	const node = findNode(id) as GraphNode;
	const style = { width: "100px", height: "50px" };
	addNodes([
		{
			...node,
			id: crypto.randomUUID(),
			parentNode: id,
			style,
			label: "child Test3",
			extent: "parent",
		},
	]);
	console.log(node);
};

const onElementDelete = (id: string) =>
	MessageBox({
		closeOnClickModal: true,
		closeOnPressEscape: true,
		showConfirmButton: true,
		type: "error",
		title: $lt("deleteFlow"),
		message: $lt("deleteFlowText"),
		onSubmit: () => (removeNodes(id), removeEdges(id)),
	});

const onNodeDrag = (id: string) => console.log({ id });

const onElementHidden = (id: string) =>
	MessageBox({
		closeOnClickModal: true,
		closeOnPressEscape: true,
		showConfirmButton: true,
		type: "error",
		title: $lt("deleteFlow"),
		message: $lt("deleteFlowText"),
		onSubmit: () => {
			((findNode(id) as GraphNode) || (findEdge(id) as GraphEdge)).hidden = true;
		},
	});

const onElementEdit = (id: string) =>
	openModal({
		title: "Edit",
		content: (
			<ElemntEdit
				flowFunctions={flowFunctions}
				node={findNode(id)}
				edge={findEdge(id)}
				t={$lt}
			/>
		),
	});
const objectDownload = (obj: any[]) => {
	const blob = new Blob([JSON.stringify(obj)], {
		type: "application/json",
	});
	const url = URL.createObjectURL(blob);
	const link = document.createElement("a");
	link.href = url;
	link.download = "DamavandFlow.json";
	link.click();
	URL.revokeObjectURL(url);
};
const onJSONImport = async (file: any) => {
	const response = await fetch(file.url);
	const data = await response.text();
	if (data) flowFunctions.$reset();
	setTimeout(() => {
		model.value = JSON.parse(data);
	}, 10);
	// for closing the modal:
	const overlays = document.querySelectorAll(".el-overlay");
	overlays.forEach((overlay) => overlay.remove());
};
const toolList = ref([
	{
		icon: "ele-Help",
		name: "help",
		function: () =>
			openModal({
				title: "Help",
				content: (
					<ul>
						{objectMap(examples, (value: any[], key: string) => {
							return (
								<li key={key}>
									<ElButton
										onClick={() => {
											flowFunctions.$reset();
											setTimeout(() => {
												model.value = value;
											}, 10);
										}}
									>
										{key}
									</ElButton>
								</li>
							);
						})}
					</ul>
				),
			}),
	},
	{
		icon: "ele-Delete",
		name: "delete",
		function: () =>
			MessageBox({
				closeOnClickModal: true,
				closeOnPressEscape: true,
				showConfirmButton: true,
				type: "error",
				title: $lt("deleteFlow"),
				message: $lt("deleteFlowText"),
				onSubmit: () => (model.value = []),
			}),
	},
	{
		icon: "ele-Refresh",
		name: "restore",
		function: () =>
			MessageBox({
				closeOnClickModal: true,
				closeOnPressEscape: true,
				showConfirmButton: true,
				// type: 'error',
				title: $lt("restoreFlow"),
				message: $lt("restoreFlowText"),
				onSubmit: () => {
					try {
						model.value = (JSON.parse(
							window.localStorage.getItem("vueFlow") as string
						) || model.value) as any;
						emit("restore", model.value);
					} catch {
						console.error;
					}
				},
			}),
	},
	{
		icon: "fa-regular fa-floppy-disk",
		name: "save",
		function: () =>
			MessageBox({
				closeOnClickModal: true,
				closeOnPressEscape: true,
				showConfirmButton: true,
				// type: 'error',
				title: $lt("saveFlow"),
				message: $lt("saveFlowText"),
				onSubmit: () => {
					window.localStorage.setItem("vueFlow", JSON.stringify(model.value));
					emit("storageSave", model.value);
				},
			}),
	},
	{
		icon: "ele-CopyDocument",
		name: "copy",
		function: () => {
			useClipboard().copy(JSON.stringify(model.value));
			emit("copy", model.value);
		},
	},
	{
		icon: "ele-Upload",
		name: "upload",
		function: () =>
			openModal({
				title: "Upload",
				content: (
					<Upload
						accept="application/json"
						onFileChange={onJSONImport}
						t={props.t}
					/>
				),
			}),
	},
	{
		icon: "ele-Download",
		name: "download",
		function: () => objectDownload(model.value),
	},
	{ icon: "ele-RefreshRight", name: "redo", function: () => redo() },
	{
		icon: "ele-RefreshLeft",
		name: "undo",
		function: () => {
			pause();
			undo();
			// resume()
			// model.value.pop()
		},
	},
	{
		icon: "ele-FullScreen",
		name: "fullscreen",
		function: () => {
			isFullScreen.value = !isFullScreen.value;
			const selected: any = toolList.value.find(
				(obj) => obj.name === "fullscreen" || obj.name === "minimize"
			);
			selected.icon =
				selected.icon === "ele-FullScreen" ? "ele-Rank" : "ele-FullScreen";
			selected.name = selected.name === "fullscreen" ? "minimize" : "fullscreen";
		},
	},
]);

const position = ref({ x: "", y: "" });
const onContextmenu = (data: NodeMouseEvent | EdgeMouseEvent) => {
	// @ts-expect-error
	position.value = { x: data.event.layerX, y: data.event.layerY };
	let element;
	// let type
	if ("node" in data) element = { ...data.node, elementType: "node" };
	else if ("edge" in data) element = { ...data.edge, elementType: "edge" };
	contextmenuNodeRef.value.openContextmenu(element);
};

const { undo, redo, pause, resume } = useDebouncedRefHistory(model, {
	deep: true,
	debounce: 500,
});
// const history = ref([])
// watch(history, (newModel) => console.log(newModel))

const {
	findEdge,
	updateEdge,
	findNode,
	onConnect,
	addEdges,
	addNodes,
	project,
	vueFlowRef,
	removeEdges,
	removeNodes,
} = useVueFlow({});
const flowFunctions = useVueFlow({});
function onEdgeUpdate(data: { edge: GraphEdge; connection: Connection }) {
	return updateEdge(data.edge, data.connection);
}

function onDragOver(event: any) {
	resume();
	event.preventDefault();

	if (event.dataTransfer) {
		event.dataTransfer.dropEffect = "move";
	}
}

onConnect((params) => addEdges(params));

function onDrop(event: any) {
	const node = useFlowStore().getNode().value;
	// const type = node.type;
	const { left, top }: any = vueFlowRef.value?.getBoundingClientRect();
	const position = project({
		x: event.clientX - (left + 30),
		y: event.clientY - (top + 30),
	});
	// console.log({ node })
	if (Array.isArray(node)) {
		node.forEach((n) =>
			addNodes([
				{
					// id: crypto.randomUUID(),
					position,
					...n,
				},
			])
		);
	} else
		addNodes([
			{
				id: crypto.randomUUID(),
				position,
				...node,
			},
		]);
}

// //@todo setTimeout
// setTimeout(() => {
// 	const myClassElement: HTMLElement | null =
// 		document.querySelector(".vue-flow__panel");
// 	if (myClassElement !== null) {
// 		const closeButton = document.createElement("button");
// 		closeButton.classList.add("close-btn");
// 		closeButton.innerText = "Close";
// 		myClassElement.appendChild(closeButton);
// 		const closeBtn = document.querySelector(".close-btn");
// 		if (closeBtn !== null) {
// 			const myFunction = () => {
// 				myClassElement.style.display = "none";
// 				console.log(1);
// 			};
// 			closeBtn.addEventListener("click", myFunction);
// 		}
// 	}
// }, 100);
</script>
<style lang="scss">
html[dir="rtl"] {
	.vue-flow__edge-text {
		font-size: 10px;
		translate: 34px 0px;
	}
}
.vue-flow {
	height: unset;
}
.minimap {
	opacity: 0.6;
	transition: all 0.5s;
	// translate: 0 50px;
	// height: 20px;
	&:hover {
		opacity: 1;
		// height: 120px;
	}
}
.close-btn {
	display: flex;
	position: absolute;
	top: 2px;
}
.fullscreen {
	background-color: #fff;
	position: fixed;
	z-index: 9;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
}
.fullscreen-fit {
	translate: 0px -43px;
}

.resizableNode {
	resize: both;
	overflow: hidden;
}
.vue-flow__container {
	direction: ltr !important;
}

.flow_container {
	flex-direction: column;
	display: flex;
	height: 95%;
}
.flow_container aside {
	// color: #fff;
	font-weight: 700;
	border-right: 1px solid var(--el-border-color-light, #ebeef5);
	border-left: 1px solid var(--el-border-color-light, #ebeef5);
	padding: 15px 10px;
	font-size: 12px;
	background: var(--el-color-white);
}
.flow_container aside .nodes > * {
	margin-bottom: 10px;
	cursor: grab;
	font-weight: 500;
	-webkit-box-shadow: 5px 5px 10px 2px rgba(0, 0, 0, 0.25);
	box-shadow: 5px 5px 10px 2px #00000040;
}
.flow_container aside .description {
	margin-bottom: 10px;
}
.flow_container .vue-flow-wrapper {
	flex-grow: 1;
	height: 100%;
}

@media screen and (min-width: 640px) {
	.flow_container {
		flex-direction: row;
	}
	.flow_container aside {
		min-width: 25%;
	}
}
@media screen and (max-width: 639px) {
	.flow_container aside .nodes {
		display: flex;
		flex-direction: row;
		gap: 5px;
	}
}
</style>
