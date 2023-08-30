<template>
	<ElCollapseItem :title="title"> <slot /> </ElCollapseItem>
</template>

<script lang="ts" setup>
import { ElCollapseItem } from "element-plus";

defineProps({
	title: String,
});
</script>

<style lang="scss">
.el-collapse-item__header {
	margin-inline-start: 10px;
	// width: 14px !important;
}
html[dir="rtl"] {
	.el-collapse-item__arrow {
		margin: 0 auto 0 8px;
		scale: -1 1;
	}
}
</style>
