<template>
  <i v-if="isShowIconElement" class="el-icon" :style="setIconSvgStyle">
    <component :is="getIconName" />
  </i>
  <font-awesome-icon v-else :icon="getIconName" />
</template>

<script lang="ts" setup>
import { computed } from "vue";

const props = defineProps({
  name: {
    type: String,
    required: true,
  },
  size: {
    type: Number,

  },
  color: {
    type: String,
  },
});

const getIconName = computed(() => {
  if (!props.name) return "";
  else
    return props?.name?.startsWith("ele-")
      ? props?.name.replace("ele-", "")
      : props?.name || "";
});
const setIconSvgStyle = computed(() => {
  return `font-size: ${props.size}px;color: ${props.color};`;
});
const isShowIconElement = computed(() => {
  return props?.name?.startsWith("ele-");
});
</script>
