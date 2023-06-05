<template>
  <v-tabs color="black" align-tabs="start" v-model="state.tab" :height="35" v-on:update:model-value="$emit('tabChange')">
    <v-tab v-for="tabDetail in tabDetails" selected-class="">{{ tabDetail.tabName }}</v-tab>
  </v-tabs>
  <v-container class="">
    <v-window v-model="state.tab">
      <v-window-item v-for="(item, index) in tabDetails" :value="index">
        <v-row :no-gutters="true" justify="space-between">
          <v-col :cols="10">
            <slot :name="item.slot"></slot>
          </v-col>
          <v-col :cols="2">
            <div>論理削除</div>
            <div>
              <v-select class="pt-0 form-selection w-75" :model-value="deletedRecordDisplayMode" variant="solo"
                hide-details :items="searchItems" v-on:update:model-value="onChangeSelect($event)" />
            </div>
            <div class="pt-3">
              <v-btn class="w-50" variant="flat" @click="$emit('search')" color="primary">
                検索
              </v-btn>
            </div>
            <div class="pt-3">
              <v-btn class="w-50" variant="flat" @click="$emit('clear')" color="primary">
                クリア
              </v-btn>
            </div>
          </v-col>
        </v-row>
        <hr class="mt-2 mb-2">
        <div style="display: flex; justify-content: space-between;">
          <span>詳細検索条件</span>
          <div style="display: flex;">
            <span class="mr-3">開閉</span>
            <v-btn color="#2DC8FF" variant="outlined" density="compact" class="pa-0"
              @click="$emit('update:tabExpanded', !tabExpanded)">
              <v-icon :icon="tabExpanded ? 'mdi-minus' : 'mdi-plus'" />
            </v-btn>
          </div>
        </div>
        <div :class="{ 'expansion-area': true, expanded: tabExpanded }">
          <slot :name="`expansion-${item.slot}-area`"></slot>
        </div>
      </v-window-item>
    </v-window>
  </v-container>
</template>

<script setup lang="ts">
import TabDetail from '@/models/tab-detail.model'
import { PropType, reactive } from 'vue';

defineProps({
  tabDetails: {
    type: Object as PropType<Array<TabDetail>>,
    required: true
  },
  deletedRecordDisplayMode: {
    type: Number,
    required: true
  },
  tabExpanded: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['tabChange', 'search', 'clear', 'update:deletedRecordDisplayMode', 'update:tabExpanded'])

const state = reactive({
  tab: undefined,
  expanded: false,
})

const searchItems = [{ title: '含めない', value: 0 }, { title: '含む', value: 1 }]

const onChangeSelect = (value: number) => emit('update:deletedRecordDisplayMode', value)
</script>

<style lang="scss" scoped>




.expansion-area {
  height: 0px;
  transition: transform 0.5s ease-in-out;
}

.expanded {
  min-height: 100px;
  height: fit-content;
}
</style>
