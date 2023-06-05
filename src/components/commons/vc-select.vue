<template>
  <v-select
    class="select-custom"
    :model-value="value"
    v-on:update:model-value="updateValue($event)"
    :disabled="disabled"
    :readonly="readonly"
    :items="items"
    :name="name"
    :label="label"
    :item-title="itemTitle"
    :item-value="itemValue"
    :placeholder="placeholder"
    :no-data-text="noDataText"
    :menu-props="menuProps"
    :return-object="returnObject"
    :variant="variant"
    :density="density"
    :rules="rules"
    clearable
    :hide-details="hideDetails"
  >
    <template v-slot:selection="{ item }">
        <slot name="selection" :item="item">{{ item.title }}</slot>
    </template>
  </v-select>
</template>

<script setup lang="ts">
import { computed, PropType } from 'vue';

const props = defineProps({
  name: {
    type: String,
  },
  label: {
    type: String
  },
  value: {
    type: [String, Number, Boolean, null] as PropType<any>,
    default: null
  },
  items: {
    type: Array,
    required: true
  },
  placeholder: {
    type: String
  },
  noDataText: {
    type: String,
    default: 'データなし'
  },
  disabled: {
    type: Boolean,
    default: false
  },
  readonly: {
    type: Boolean,
    default: false
  },
  returnObject: {
    type: Boolean,
    default: false
  },
  itemTitle: {
    type: String,
    default: 'title'
  },
  itemValue: {
    type: String,
    default: 'value'
  },
  menuProps: {
    type: Object
  },
  rules: {
    type: Array<String>
  },
  variant: {
    type: String as PropType<'outlined' | 'plain' | 'underlined' | 'filled' | 'solo' | undefined>,
    default: 'underlined',
  },
  density: {
    type: String as PropType<'default' | 'comfortable' | 'compact'>,
    default: 'compact'
  },
  hideDetails: {
    type: Boolean,
    default: false
  }
});
const emit = defineEmits(['update:value', 'onChange'])
const updateValue = (value: any) => {
  emit('update:value', value);
  emit('onChange', value);
}

const rules = computed(() => {
  const rules: any = [];
    if(props.rules?.includes('required')) {
      const rule = (value: any) => {
          return !!value || value == 0 || `${props.name || 'このフィールド'}義務。`
      }
      rules.push(rule);
    }
    return rules
})
</script>
<style scoped lang="scss">
.select-custom {
  :deep(.v-input__control) {
    .v-field {
      height: 41px !important;
    }
  }
}
</style>
