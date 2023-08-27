import dialog from './dialog.vue'
import { VNode, createApp, defineComponent, h } from 'vue'

const modal = (info: { title: string; content: string | VNode | Element; width?: string; autoHeight?: boolean }) => {
	const dialogComponent = defineComponent({
		data() {
			return {
				showDelay: Boolean as unknown as boolean,
			}
		},
		beforeMount() {
			
			console.log("opened");
			this.showDelay = false

			setTimeout(() => {
				this.showDelay = true
			}, 10)
		},
		render() {
			return this.showDelay ? h(dialog, { title: info.title, width: info.width, autoHeight: info.autoHeight }, () => info.content) : null
		},
	})

	const instance = createApp(dialogComponent).mount(document.createElement('div'))
	document.body.appendChild(instance.$el)
}
export default modal
