<template>
  <v-container :class="customClass">
    <div class="d-flex flex-wrap">
      <v-col :cols="12" class="pa-0">
        <slot name="searchForm"></slot>
      </v-col>
      <v-col :cols="12" class="d-flex align-center pa-0">
        <v-btn class="mr-4" color="secondary" @click="$emit('onSearch')">
          検索
        </v-btn>
        <v-btn class="mr-4" variant="tonal" elevation="1" @click="$emit('onClear')">
          クリア
        </v-btn>
        <v-checkbox label="論理削除含" v-model="isDeletedRecordDisplayMode" hide-details></v-checkbox>
      </v-col>
    </div>
    <template v-if="!isModal">
      <hr class="mt-2 mb-2">
      <div style="display: flex; justify-content: space-between;">
        <span>詳細検索条件</span>
        <v-btn variant="plain" density="compact" class="pa-0" @click="$emit('update:tabExpanded', !tabExpanded)" icon>
          <v-icon>{{ tabExpanded? 'mdi-minus': 'mdi-plus' }}</v-icon>
        </v-btn>
      </div>
      <div :class="[{ 'expansion-area': true }, tabExpanded ? 'expanded' : 'd-none']">
        <slot name="expansion-area"></slot>
      </div>
    </template>

    <slot name="customExpansionArea"></slot>
  </v-container>
</template>
<script lang="ts" setup>
import { ref, watch } from 'vue';

const emit = defineEmits(['onSearch', 'onClear', 'update:deletedRecordDisplayMode', 'update:tabExpanded'])
const props = defineProps({
  deletedRecordDisplayMode: {
    type: Number
  },
  tabExpanded: {
    type: Boolean,
    default: false
  },
  isModal: {
    type: Boolean,
    default: false
  },
  customClass: {
    type: String,
    default: ''
  }
})
const isDeletedRecordDisplayMode = ref(false)

watch(isDeletedRecordDisplayMode, (newValue) => {
  // ユーザーが削除済みレコード表示モードを選択した場合
  onChangeSelect(newValue);
}
)

watch(() => props.deletedRecordDisplayMode, (newValue) => {
  // ユーザーが削除済みレコード モードを選択したときに isDeletedRecordDisplayMode 変数を変更する
  isDeletedRecordDisplayMode.value = !!newValue;
}
)
/**
 * 削除されたレコードの表示モード変数を更新し、親コンポーネントに発行する
 * @param value ユーザーが選択した値
 */
const onChangeSelect = (value: Boolean) => {
  const isDeletedMode = value ? 1 : 0
  emit('update:deletedRecordDisplayMode', isDeletedMode)
}
</script>
<style lang="scss" scoped>
.form-selection {
  width: 100%;
}

.expansion-area {
  height: 0px;
  transition: transform 0.5s ease-in-out;
}

.expanded {
  min-height: 100px;
  height: fit-content;
}
</style>
