<template>
  <div class="workflow-tool">
    <div class="workflow-tool-right">
		<ElTooltip v-for="(v, k) in [...(toolsConfig?.addTools as any[]), ...(toolList as [] )]"
        :key="k"
        :content="$lt(v.name)"
        effect="customized"
      >
        <div v-show="!toolsConfig?.disabledTools.includes(v.name)" class="workflow-tool-icon" @click="v.function()">
          <Icon :name="v.icon" />
        </div>
      </ElTooltip>
    </div>
  </div>
</template>

<script setup lang="ts" name="workflowTool">
import { PropType } from "vue";
import Icon from "./icon.vue";
import { ElTooltip } from "element-plus";
import { IntTool, typeFlowTools } from "..";



const props = defineProps({
  toolList: Array as PropType<IntTool[]>,
  t: { type: Function, required: true },
  toolsConfig: Object as PropType<{
    disabledTools: typeFlowTools
    addTools: IntTool[];
  }>,
});
const $lt = props.t;
</script>

<style lang="scss">
.el-popper.is-customized {
  /* Set padding to ensure the height is 32px */
  padding: 6px 12px;
  background: linear-gradient(90deg, rgb(159, 229, 151), rgb(204, 229, 129));
}

.el-popper.is-customized .el-popper__arrow::before {
  background: linear-gradient(45deg, #b2e68d, #bce689);
  right: 0;
}
.workflow-tool {
  background: var(--el-color-white);
  height: 35px;
  display: flex;
  align-items: center;
  border-bottom: 1px solid var(--el-border-color-light, #ebeef5);
  color: var(--el-text-color-primary);
  .workflow-tool-right {
    flex: 1;
    display: flex;
    justify-content: flex-end;
  }
  &-icon {
    padding: 0 10px;
    cursor: pointer;
    color: var(--next-bg-topBarColor);
    height: 35px;
    line-height: 35px;
    display: flex;
    align-items: center;
    &:hover {
      background: rgba(0, 0, 0, 0.04);
      i {
        display: inline-block;
        animation: logoAnimation 0.3s ease-in-out;
      }
    }
  }
}
</style>
