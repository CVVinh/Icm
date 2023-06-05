<template>
  <div class="d-flex flex-wrap">
    <v-select
      v-model="modelValue.assetStatus"
      class="v-col-3 pl-0"
      :items="[]"
      label="資産ステータス"
      variant="underlined"
      hide-details
      clearable
    />
    <v-select
      v-model="modelValue.type"
      class="v-col-3"
      :items="TYPES"
      label="タイプ"
      variant="underlined"
      hide-details
      clearable
    />
    <v-select
      v-model="modelValue.assetClass"
      class="v-col-3"
      :items="ASSET_CLASS"
      label="資産区分"
      variant="underlined"
      hide-details
      clearable
    />
    <v-select
      v-model="modelValue.depreciationRule"
      class="v-col-3 pr-0"
      :items="[]"
      label="償却ルール"
      variant="underlined"
      hide-details
      clearable
    />
    <v-select
      v-model.number="modelValue.depreciationBaseYear"
      class="v-col-3 pl-0"
      :items="years"
      label="償却ルール"
      variant="underlined"
      hide-details
      clearable
    />

    <DatePicker
      class="v-col-3"
      v-model="modelValue.assetPeriodFrom"
      :model-config="AppConstants.CALENDAR_CONFIG"
      :popover="{ visibility: 'hidden', positionFixed: false }"
      :masks="AppConstants.CALENDAR_MASKS"
      titlePosition="right"
    >
      <template v-slot="{ inputValue, inputEvents, togglePopover }">
        <v-text-field
          label="対象資産期間(From)"
          :model-value="inputValue"
          v-on="inputEvents"
          append-inner-icon="mdi-calendar"
          variant="underlined"
          hide-details
          clearable
          readonly
          @click="togglePopover"
          @click:append-inner="togglePopover"
        />
      </template>
    </DatePicker>

    <DatePicker
      v-model="modelValue.assetPeriodTo"
      class="v-col-3"
      :model-config="AppConstants.CALENDAR_CONFIG"
      :popover="{ visibility: 'hidden', positionFixed: false }"
      :masks="AppConstants.CALENDAR_MASKS"
      titlePosition="right"
    >
      <template v-slot="{ inputValue, inputEvents, togglePopover }">
        <v-text-field
          label="対象資産期間(To)"
          :model-value="inputValue"
          v-on="inputEvents"
          append-inner-icon="mdi-calendar"
          variant="underlined"
          hide-details
          clearable
          readonly
          @click="togglePopover"
          @click:append-inner="togglePopover"
        />
      </template>
    </DatePicker>
  </div>
</template>
<script setup lang="ts">
import { PropType, computed, onMounted } from "vue";
import { DatePicker } from "v-calendar";
import AppConstants from "@/constants/constants";
import moment from "moment";

const TYPES = [
  "すべて",
  "デスクトップセット",
  "ノートセット",
  "デスクトップ",
  "ノート",
  "タブレット",
  "機器",
  "ソフトウェア(ライセンスあり)",
  "ソフトウェア(ライセンスなし)",
];

const ASSET_CLASS = [
  "償却資産(PCセット)",
  "償却資産(PC,機器)",
  "償却資産(ソフトウェア)",
  "リース",
  "レンタル",
];

defineProps({
  modelValue: {
    type: Object as PropType<DepreciationSearch>,
    required: true,
  },
});

const years = computed(() => {
  const currentYear = moment().get("year");
  const years = Array(10)
    .fill(undefined)
    .map((_, index) => currentYear - index);
  return years;
});

onMounted(() => {});
</script>
<style lang="scss" scoped></style>
