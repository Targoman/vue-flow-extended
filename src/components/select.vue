<template>
	<ElFormItem :required="required" :label="label" :prop="name">
		<ElSelect
			:multiple="multiple"
			:collapse-tags="multiple"
			:collapse-tags-tooltip="multiple"
			v-model="value"
			:placeholder="placeholder"
			:allow-create="allowCreate"
			:filterable="filterable"
			:disabled="disabled"
			:clearable="clearable"
		>
			<ElOption
				v-for="option in options"
				:key="option.value || option"
				:label="t(option.label || option)"
				:value="option.value || option"
			/>
		</ElSelect>
	</ElFormItem>
</template>

<script lang="ts" setup>
import { PropType, computed } from "vue";
import { ElSelect, ElFormItem, ElOption } from "element-plus";
const props = defineProps({
	name: {
		type: String,
		required: true,
	},
	modelValue: [String, Number, Array, Object],
	placeholder: String,
	inputType: {
		type: String,
		default: "text",
	},
	options: Object,
	disabled: Boolean,
	label: String,
	clearable: Boolean,
	size: {
		type: String as PropType<"" | "default" | "small" | "large" | undefined>,
		default: "default",
	},
	mode: {
		type: String as PropType<
			"" | "time" | "datetime" | "date" | "button" | "border" | "default"
		>,
		default: "default",
	},
	checkboxType: {
		type: String as PropType<"" | "button" | "border" | "checked" | "default">,
		default: "default",
	},
	required: Boolean,
	autocomplete: {
		type: String,
		default: "off",
	},
	readonly: {
		type: Boolean,
		default: false,
	},
	showPassword: Boolean,
	customValidation: Object,
	twoState: Boolean,
	inputMode: {
		type: String as PropType<"twoState" | "default">,
		default: "default",
	},
	t: { type: Function, default: () => "text" },
	allowCreate: Boolean,
	filterable: Boolean,
	multiple: Boolean,
});
const value = computed({
	get() {
		return props.modelValue;
	},
	set(value) {
		emit("update:modelValue", value);
	},
});
const emit = defineEmits(["inputChange", "update:modelValue"]);
</script>

<style>
.el-select {
	width: 100%;
}
</style>
