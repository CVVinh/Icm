<template>
  <vc-input
    v-if="readonly"
    :label="label"
    :value="value"
    :readonly="readonly"
    :variant="variant"
    :density="density"
    append-inner-icon="mdi-calendar"
  />
  <DatePicker
    v-else
    :model-value="value"
    v-on:update:model-value="onChangeDate($event)"
    :model-config="AppConstants.CALENDAR_CONFIG"
    :popover="{ visibility: 'hidden', positionFixed: false }"
    :masks="AppConstants.CALENDAR_MASKS"
    :titlePosition="titlePosition"
  >
    <template v-slot="{ inputValue, togglePopover }">
      <v-text-field
        :label="label"
        :model-value="inputValue"
        append-inner-icon="mdi-calendar"
        clearable
        :variant="variant"
        :density="density"
        :rules="rules"
        :disabled="disabled"
        @click="togglePopover"
        @click:append-inner="togglePopover"
      />
    </template>
  </DatePicker>
</template>

<script setup lang="ts">
import { computed, PropType } from 'vue';
import vcInput from '../commons/vc-input.vue';
import { DatePicker } from 'v-calendar';
import 'v-calendar/dist/style.css';
import AppConstants from '../../constants/constants';

const props = defineProps(
  {
    rules: Array<String>,
    value: [String, Number],
    disabled: Boolean,
    minDate: String,
    label: String,
    name: String,
    maxValidateDate: Number,
    minValidateDate: Number,
    titlePosition: {
      type: String as PropType<'center' | 'left' | 'right'>,
      default: 'center',
    },
    readonly: {
      type: Boolean,
      default: false,
    },
    variant: {
      type: String as PropType<'outlined' | 'plain' | 'underlined' | 'filled' | 'solo' | undefined>,
      default: 'underlined',
    },
    density: {
      type: String as PropType<'default' | 'comfortable' | 'compact'>,
      default: 'compact'
    }
  });

const emit = defineEmits([
  "update:modelValue",
  "selected",
  "changeDate",
  "clickDate",
]);

/**
 * ユーザー入力の最小値と最大値を検証する
 * @param value ユーザー変数です
 */
const validateMaxMinDate = (value: number) => {
  if (!value) {
    return true;
  }
  if (props.maxValidateDate) {
    return (
      value <= props.maxValidateDate ||
      `値${props.name || ""}は${
        props.maxValidateDate
      }未満でなければなりません。`
    );
  } else if (props.minValidateDate) {
    return (
      value >= props.minValidateDate ||
      `値${props.name || ""}は${
        props.minValidateDate
      }より大きくなければなりません。`
    );
  }
};

const onChangeDate = (value: any) => {
  if (value) {
    emit('update:modelValue', value);
  }
};

const rules = computed(() => {
  const rules: any = [];
  if (props.rules?.includes("required")) {
    const rule = (value: string) =>
      !!value || `${props.name || "このフィールド"}義務。`;
    rules.push(rule);
  }
  if (props.maxValidateDate || props.minValidateDate) {
    const rule = (value: any) => validateMaxMinDate(value);
    rules.push(rule);
  }
  return rules;
});
</script>
