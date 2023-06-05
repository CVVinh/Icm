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
]);

const state = reactive({
  tab: undefined,
  expanded: false,
});



const onChangeSelect = (value: number) =>
  emit("update:deletedRecordDisplayMode", value);
</script>

<style lang="scss" scoped></style>
