<template>
	<flow :nodes="Nodes" background controls mini-map :model="model"></flow>
</template>

<script setup lang="tsx">
import flow from "./components/flow.vue";

enum enumNodes {
	Test3 = "Test3",
	Test2 = "Test2",
	Test1 = "Test1",
}
const Nodes: (enumNodes | { type: string; text: string })[] = [
	enumNodes.Test3,
	enumNodes.Test2,
	enumNodes.Test1 /* with nested nodes*/,
	{ type: "Rectangle", text: "Test 3" },
	// { type: 'Rectangle', text: 'sepideh' },
	// { type: 'circle', text: 'mohsen' },
	// { type: 'circle', text: 'sepideh' },
	// { type: 'oval', text: 'vahid' },
	// { type: 'square', text: 'square' },
	// { type: 'square', text: 'square' },
	// { type: 'square', text: 'square' },
];
const model = [
	{ id: "1", type: "input", label: "Node 1", position: { x: 250, y: 5 } },
	{ id: "2", label: "Node 2", position: { x: 100, y: 100 } },
	{ id: "3", label: "Node 3", position: { x: 400, y: 100 } },
	{ id: "4", label: "Node 4", position: { x: 400, y: 200 } },
	{ id: "e1-2", source: "1", target: "2", animated: true },
	{ id: "e1-3", source: "1", target: "3" },
];
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
