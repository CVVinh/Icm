<template>
  <v-card>
    <v-tabs
      color="#97E4FF"
      align-tabs="start"
      v-model="state.tab"
      v-on:update:model-value="$emit('tabChange')"
    >
      <v-tab v-for="tabDetail in tabDetails" selected-class="">{{
        tabDetail.tabName
      }}</v-tab>
    </v-tabs>
    <v-window v-model="state.tab">
      <div class="pa-4">
        <v-window-item v-for="(item, index) in tabDetails" :value="index">
          <v-row>
            <v-col>
              <slot :name="`${item.slot}`"></slot>
            </v-col>
          </v-row>
          <div>
            <div class="d-flex align-center ma-n3 pa-3">
              <v-btn @click="$emit('search')" color="secondary" class="mr-4"
                >検索</v-btn
              >
              <v-btn
                @click="$emit('clear')"
                variant="tonal"
                class="mr-4"
                elevation="1"
                >クリア</v-btn
              >
              <v-checkbox label="論理削除含" value="0" hide-details></v-checkbox>
            </div>
            <v-divider class="mt-4 mb-4" />
            <v-expansion-panels>
              <v-expansion-panel elevation="2">
                <v-expansion-panel-title active-color="primary">
                  詳細検索条件
                  <template v-slot:actions="{ expanded }">
                    <v-icon :icon="expanded ? 'mdi-minus' : 'mdi-plus'"></v-icon>
                  </template>
                </v-expansion-panel-title>
                <v-expansion-panel-text class="pt-2 pb-1">
                  <!-- <slot name="expansion-area"></slot> -->
                  <v-form>
                    <v-row>
                      <v-col cols="2">
                        <v-text-field
                          label="項目1"
                          variant="underlined"
                          hide-details
                          density="compact"
                        />
                      </v-col>
                      <v-col cols="2">
                        <v-text-field
                          label="項目2"
                          placeholder="前方一致"
                          variant="underlined"
                          hide-details
                          density="compact"
                        />
                      </v-col>
                      <v-col cols="2">
                        <v-text-field
                          label="項目3"
                          variant="underlined"
                          hide-details
                          density="compact"
                        />
                      </v-col>
                    </v-row>
                  </v-form>
                  <div class="d-flex align-center ma-n3 pa-3">
                    <v-btn @click="$emit('search')" color="#97E4FF" class="mr-4"
                      >検索</v-btn
                    >
                    <v-btn
                      @click="$emit('clear')"
                      variant="tonal"
                      class="mr-4"
                      elevation="1"
                      >クリア</v-btn
                    >
                  </div>
              </v-expansion-panel-text>
            </v-expansion-panel>
            </v-expansion-panels>
          </div>
        </v-window-item>
      </div>
    </v-window>
  </v-card>
</template>

<script setup lang="ts">
import TabDetail from "@/models/tab-detail.model";
import { PropType, reactive } from "vue";

defineProps({
  tabDetails: {
    type: Object as PropType<Array<TabDetail>>,
    required: true,
  },
  deletedRecordDisplayMode: {
    type: Number,
    required: true,
  },
});

const emit = defineEmits([
  "tabChange",
  "search",
  "clear",
  "update:deletedRecordDisplayMode",
]);

const state = reactive({
  tab: undefined,
  expanded: false,
});

const searchItems = [
  { title: "含めない", value: 0 },
  { title: "含む", value: 1 },
];

const onChangeSelect = (value: number) =>
  emit("update:deletedRecordDisplayMode", value);
</script>

<style lang="scss" scoped></style>
