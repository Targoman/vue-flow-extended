<template>
	<el-dialog v-model="DialogVisible" :title="title" :width="width" center>
		<el-scrollbar :style="`text-align: justify; height: ${autoHeight ? '' : '300px'}`" class="p15">
			<slot />
		</el-scrollbar>
	</el-dialog>
</template>

<script setup lang="ts">
import { PropType, ref } from 'vue'

defineProps({
	type: { type: String as PropType<'info' | 'success' | 'warning' | 'danger' | undefined>, default: 'primary' },
	title: String,
	class: String,
	width: String,
	autoHeight: Boolean,
})

const DialogVisible = ref(false)
setTimeout(() => {
	DialogVisible.value = true
}, 10)
</script>
