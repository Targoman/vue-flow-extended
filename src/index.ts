import flow from "./components/vue-flow-extended.vue"
import test5 from "./components/nodes/test5.vue"
import test1 from "./components/nodes/Test1.vue"
export default flow
export const testComponents1 = test5
export const testComponents2 = test1
export type typeFlowTools = Array<
| "download"
| "delete"
| "fullscreen"
| "help"
| "restore"
| "save"
| "upload"
| "copy"
| "undo"
| "redo"
>

export interface IntTool {
    icon: string;
    name: string;
    function: Function;
}