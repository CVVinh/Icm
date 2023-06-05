<template>
  <v-text-field
    :label="label"
    :disabled="disabled"
    :type="type"
    :name="name"
    :model-value="value"
    v-on:update:model-value="updateValue($event)"
    :variant="variant"
    :rules="rules"
    :density="density"
    :clearable="clearable"
    :readonly="readonly"
  />
</template>

<script setup lang="ts">
import { computed, PropType } from "vue";

const props = defineProps({
  name: {
    type: String,
    default: "",
  },
  label: {
    type: String,
    default: "",
  },
  value: {
    type: [String, Number],
  },
  maxValue: {
    type: Number,
  },
  minValue: {
    type: Number,
  },
  maxLength: {
    type: Number,
  },
  minLength: {
    type: Number,
  },
  type: {
    type: String,
    default: "string",
  },
  rules: {
    type: Array<String>,
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  variant: {
    type: String as PropType<
      "outlined" | "plain" | "underlined" | "filled" | "solo" | undefined
    >,
    default: "underlined",
  },
  density: {
    type: String as PropType<"default" | "comfortable" | "compact">,
    default: "compact",
  },
  readonly: {
    type: Boolean,
    default: false,
  },
  clearable: {
    type: Boolean,
    default: false
  }
});

/**
 * ユーザー入力の値の最小長と最大長を検証する
 * @param value ユーザー変数です
 */
const validateMaxMinLength = (value: string) => {
  if (!props?.value) {
    return true;
  }
  if (props.maxLength) {
    return (
      value.length <= props.maxLength ||
      `フィールド${props.name}は${props.maxLength}文字を超えることはできません。`
    );
  } else if (props.minLength) {
    return (
      value.length >= props.minLength ||
      `フィールド${props.name}は${props.minLength}文字未満にすることはできません。`
    );
  }
};

/**
 * ユーザー入力の最小値と最大値を検証する
 * @param value ユーザー変数です
 */
const validateMaxMinValue = (value: number) => {
  if (!value) {
    return true;
  }
  if (props.maxValue) {
    return (
      value <= props.maxValue ||
      `値${props.name}は${props.maxValue}未満でなければなりません。`
    );
  } else if (props.minValue) {
    return (
      value >= props.minValue ||
      `値${props.name}は${props.minValue}より大きくなければなりません。`
    );
  }
};

/**
 * ルールは入力フィールドを検証します
 * @param value ユーザー変数です
 */
const rules = computed(() => {
  const rules: any = [];
  if (props.rules?.includes("required")) {
    const rule = (value: string) => {
      return !!value || `${props.name || "このフィールド"}義務。`;
    };
    rules.push(rule);
  }
  if (props.maxLength || props.minLength) {
    const rule = (value: string) => validateMaxMinLength(value);
    rules.push(rule);
  }
  if (props.type === "number") {
    const rule = (value: number) => validateMaxMinValue(value);
    rules.push(rule);
  }
  if (props.rules?.includes("email")) {
    const rule = (value: string) =>
      /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
      `無効な電子メール。`;
    rules.push(rule);
  }
  if (props.rules?.includes("phone")) {
    const rule = (value: string) =>
      /^(\\([0-9]{3}\\))?0[0-9]{2}[0-9]{4}[0-9]{4}$/.test(value) ||
      `${props.name}違法。`;
    rules.push(rule);
  }
  if (props.rules?.includes("pilotPhone")) {
    const rule = (value: string) =>
      /^[0-9]/.test(value) || `${props.name}違法。`;
    rules.push(rule);
  }
  if (props.rules?.includes("zipCode")) {
    const rule = (value: string) =>
      /^(\\([0-9]{3}\\))?[0-9]{3}-[0-9]{4}$/.test(value) ||
      `${props.name}違法。`;
    rules.push(rule);
  }
  return rules;
});
const emit = defineEmits(["update:value"]);
const updateValue = (value: any) => {
  emit("update:value", value);
};
</script>
