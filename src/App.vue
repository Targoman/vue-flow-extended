<template>
  <flow
    :predefineNodes="PredefineNodes"
    background
    controls
    mini-map
    :model="model"
    :toolsConfig="toolsConfig"
  ></flow>
</template>
<script setup lang="tsx">
import type { Component } from "vue";
import flow from "./components/vue-flow-extended.vue";
import test5 from "./components/nodes/test5.vue";
import { IntTool, typeFlowTools } from ".";

enum enumPredefineNodes {
  Test1 = "Test1",
  Test2 = "Test2",
  Test3 = "Test3",
}
const PredefineNodes: (enumPredefineNodes | Component)[] = [
  enumPredefineNodes.Test3,
  enumPredefineNodes.Test2,
  enumPredefineNodes.Test1 /* with nested nodes*/,
  test5,
];

const model = [
  { id: "1", type: "input", label: "Node 1", position: { x: 250, y: 5 } },
  { id: "2", label: "Node 2", position: { x: 100, y: 100 } },
  { id: "3", label: "Node 3", position: { x: 400, y: 100 } },
  { id: "4", label: "Node 4", position: { x: 400, y: 200 } },
  { id: "e1-2", source: "1", target: "2", animated: true },
  { id: "e1-3", source: "1", target: "3" },
];

const toolsConfig: { disabledTools: typeFlowTools; addTools: IntTool[] } = {
  disabledTools: ["help"],
  addTools: [
    {
      icon: "ele-Help",
      name: "help2",
      function: () => alert("help2"),
    },
  ],
};
</script>

<style lang="scss">
@for $i from 0 through 50 {
  // **----margins----**:
  .m#{$i} {
    margin: #{$i}px !important;
  }
  // margin top:
  .mt#{$i} {
    margin-top: #{$i}px !important;
  }
  // margin bottom:
  .mb#{$i} {
    margin-bottom: #{$i}px !important;
  }
  // margin y:
  .my#{$i} {
    margin-bottom: #{$i}px !important;
    margin-top: #{$i}px !important;
  }
  // margin right:
  .mr#{$i} {
    margin-right: #{$i}px !important;
  }
  // margin left:
  .ml#{$i} {
    margin-left: #{$i}px !important;
  }
  // margin x:
  .mx#{$i} {
    margin-right: #{$i}px !important;
    margin-left: #{$i}px !important;
  }
  // margin start:
  .ms#{$i} {
    margin-inline-start: #{$i}px !important;
  }
  // margin end:
  .me#{$i} {
    margin-inline-end: #{$i}px !important;
  }
  // **----paddings----**:
  .p#{$i} {
    padding: #{$i}px !important;
  }
  // padding top:
  .pt#{$i} {
    padding-top: #{$i}px !important;
  }
  // padding bottom:
  .pb#{$i} {
    padding-bottom: #{$i}px !important;
  }
  // padding y:
  .py#{$i} {
    padding-bottom: #{$i}px !important;
    padding-top: #{$i}px !important;
  }
  // padding right:
  .pr#{$i} {
    padding-right: #{$i}px !important;
  }
  // padding left:
  .pl#{$i} {
    padding-left: #{$i}px !important;
  }
  // padding x:
  .px#{$i} {
    padding-right: #{$i}px !important;
    padding-left: #{$i}px !important;
  }
  // padding start:
  .ps#{$i} {
    padding-inline-start: #{$i}px !important;
  }
  // padding end:
  .pe#{$i} {
    padding-inline-end: #{$i}px !important;
  }
}
</style>
