<template>
  <hr class="mt-3" />
  <div class="d-flex justify-lg-space-between py-3">
    <span v-if="checkShowContent(0)"><strong>会社組織/利用者検索</strong></span>
    <span v-else>会社組織/利用者検索</span>
    <v-btn
      density="compact"
      variant="plain"
      icon="mdi-plus"
      @click="onClickShowArea(0)"
    />
  </div>
  <div
    class="pb-3"
    :class="{ 'd-flex': checkShowContent(0) }"
    v-show="checkShowContent(0)"
  >
    <v-text-field
      label="利用会社/組織"
      density="compact"
      variant="outlined"
      class="v-col-2 pl-0"
      hide-details
      clearable
    />
    <v-text-field
      label="拠点"
      density="compact"
      variant="outlined"
      class="v-col-2"
      hide-details
      clearable
    />
    <v-text-field
      label="利用者"
      density="compact"
      variant="outlined"
      class="v-col-2"
      hide-details
      append-inner-icon="mdi-account"
      clearable
    />
  </div>

  <hr />
  <div class="d-flex justify-lg-space-between py-3">
    <span v-if="checkShowContent(1)"><strong>品目検索</strong></span>
    <span v-else>品目検索</span>
    <v-btn
      density="compact"
      variant="plain"
      icon="mdi-plus"
      @click="onClickShowArea(1)"
    />
  </div>
  <div class="pb-3" v-show="checkShowContent(1)">
    <div class="d-flex">
      <v-text-field
        label="品目ID"
        density="compact"
        variant="outlined"
        class="v-col-2 pl-0"
        hide-details
        v-model="itemSearchData.itemId"
        type="number"
        clearable
      />
    </div>
    <div class="d-flex">
      <v-text-field
        label="シリアルナンバー"
        density="compact"
        variant="outlined"
        class="v-col-2 pl-0"
        hide-details
        append-icon="mdi-qrcode-scan"
        @click:append="onQrClick(0)"
        @click="onQrClick(0)"
        v-model="itemSearchData.serialNumber"
        clearable
      />
      <v-text-field
        label="JANコード"
        density="compact"
        variant="outlined"
        class="v-col-2"
        hide-details
        append-icon="mdi-qrcode-scan"
        v-model="itemSearchData.janCode"
        clearable
      />
      <v-select
        label="OS"
        :items="AppConstants.OS"
        density="compact"
        variant="outlined"
        class="v-col-2"
        hide-details
        item-value="value"
        item-title="text"
        clearable
        v-model="itemSearchData.osId"
      />
    </div>
  </div>

  <hr />
  <div class="d-flex justify-lg-space-between py-3">
    <span v-if="checkShowContent(2)"><strong>調達検索</strong></span>
    <span v-else>調達検索</span>
    <v-btn
      density="compact"
      variant="plain"
      icon="mdi-plus"
      @click="onClickShowArea(2)"
    />
  </div>
  <div class="" v-show="checkShowContent(2)">
    <div class="d-flex">
      <v-text-field
        label="調達ID"
        density="compact"
        variant="outlined"
        class="v-col-2 pl-0"
        hide-details
        v-model="procurementSearchData.procurementId"
        clearable
      />
      <v-text-field
        label="調達名称（前方一致）"
        density="compact"
        variant="outlined"
        class="v-col-4"
        hide-details
        v-model="procurementSearchData.procurementName"
        clearable
      />
      <v-text-field
        label="発注者"
        density="compact"
        variant="outlined"
        class="v-col-2"
        hide-details
        v-model="procurementSearchData.quotationRequester"
        clearable
      />
    </div>
    <div class="d-flex">
      <DatePicker
        class="v-col-2 pl-0"
        :model-config="AppConstants.CALENDAR_CONFIG"
        :popover="{ visibility: 'hidden' }"
        :masks="AppConstants.CALENDAR_MASKS"
        titlePosition="right"
        v-model="procurementSearchData.orderOnFrom"
      >
        <template v-slot="{ inputValue, inputEvents, togglePopover }">
          <v-text-field
            :model-value="inputValue"
            v-on="inputEvents"
            label="発注日(From)"
            readonly
            append-inner-icon="mdi-calendar-blank"
            hide-details
            variant="outlined"
            density="compact"
            @click:append-inner="togglePopover"
            @click="togglePopover"
            clearable
          />
        </template>
      </DatePicker>

      <DatePicker
        class="v-col-2"
        :model-config="AppConstants.CALENDAR_CONFIG"
        :popover="{ visibility: 'hidden' }"
        :masks="AppConstants.CALENDAR_MASKS"
        titlePosition="right"
        v-model="procurementSearchData.orderOnTo"
      >
        <template v-slot="{ inputValue, inputEvents, togglePopover }">
          <v-text-field
            :model-value="inputValue"
            v-on="inputEvents"
            label="発注日(To)"
            readonly
            append-inner-icon="mdi-calendar-blank"
            hide-details
            variant="outlined"
            density="compact"
            @click:append-inner="togglePopover"
            @click="togglePopover"
            clearable
          />
        </template>
      </DatePicker>
    </div>
  </div>
</template>
<script setup lang="ts">
import { reactive, PropType } from "vue";
import AppConstants from "@/constants/constants";
import { DatePicker } from "v-calendar";
import ItemMaster from "@/models/ItemMaster";
import Procurement from "@/models/procurement.model";

defineProps({
  companyUser: {
    type: Object as PropType<any>,
    required: true,
  },
  itemSearchData: {
    type: Object as PropType<ItemMaster>,
    required: true,
  },
  procurementSearchData: {
    type: Object as PropType<Procurement>,
    required: true,
  },
});
const emit = defineEmits([
  "update:companyUser",
  "update:itemSearchData",
  "update:procurementSearchData",
  "openExpandedSearch",
]);

const state = reactive({
  openFormId: -1,
});

const onClickShowArea = (formId: number) => {
  state.openFormId = state.openFormId === formId ? -1 : formId;
  emit("openExpandedSearch", state.openFormId);
};

const checkShowContent = (number: number) => {
  return state.openFormId === number;
};

const onQrClick = (id: 0) => {
  console.log(id);
};
</script>
<style lang="scss" scoped></style>
