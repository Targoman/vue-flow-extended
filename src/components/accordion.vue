<template>
	<el-collapse-item :title="title"> <slot /> </el-collapse-item>
</template>

<script lang="ts" setup>
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
