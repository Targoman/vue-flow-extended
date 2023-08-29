let tempData: any = null;
export const getTempData = () => tempData;
export const setTempData = (data: any) => (tempData = data);

let isSidebarFlowOpen = true;
export function getSidebarState() {
	return isSidebarFlowOpen;
}
export function setSidebar(state: boolean) {
	isSidebarFlowOpen = state;
}
