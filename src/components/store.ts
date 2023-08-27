import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useFlowStore = defineStore('flowStore', () => {
	const node = ref()
	const isSidebarFlowOpen = ref(true)
	function getSidebarState() {
		return isSidebarFlowOpen.value
	}
	function setSidebar(state: boolean) {
		isSidebarFlowOpen.value = state
	}
	function getNode() {
		setTimeout(() => {
			node.value = null
		}, 10)
		return node
	}
	function setNode(value: object) {
		node.value = value
	}

	return { getNode, setNode, getSidebarState, setSidebar }
})
