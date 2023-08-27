<template>
	<ElFormItem :required="required" :label="label" :prop="name">
		<ElSwitch v-model="value" :size="size" :disabled="disabled"></ElSwitch>
	</ElFormItem>
</template>

<script lang="ts" setup>
import { watch } from "vue";
import { ElSwitch, ElFormItem } from "element-plus";

defineProps({
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
});

const emit = defineEmits(["inputChange"]);
const value = defineModel();

watch(value, () => {
	emit("inputChange", value.value);
});
</script>
