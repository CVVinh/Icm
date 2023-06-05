<template>
  <div class="d-flex flex-wrap">
    <v-text-field
      v-model="modelValue.intergratedAssetId"
      type="number"
      class="v-col-md-2 v-col-sm-3 pl-0"
      label="統合資産ID"
      variant="outlined"
      hide-details
      @click=""
      append-icon="mdi-user"
    />
    <v-text-field
      v-model="modelValue.preocurementId"
      type="number"
      class="v-col-md-2 v-col-sm-3"
      label="調達ID"
      variant="outlined"
      hide-details
      @click=""
      append-icon="mdi-user"
    />
    <v-text-field
      v-model="modelValue.companyId"
      class="v-col-md-2 v-col-sm-3"
      label="利用会社/組織"
      variant="outlined"
      hide-details
      @click=""
      append-icon="mdi-user"
    />
    <v-text-field
      v-model="modelValue.userId"
      class="v-col-md-2 v-col-sm-3"
      label="利用者"
      variant="outlined"
      hide-details
      @click=""
      append-icon="mdi-user"
    />

    <v-spacer class="v-col-md-4" />

    <v-text-field
      v-model="modelValue.itemId"
      type="number"
      class="v-col-md-2 v-col-sm-3 pl-0"
      label="品目ID"
      variant="outlined"
      hide-details
      @click=""
      append-icon="mdi-user"
    />
    <v-text-field
      v-model="modelValue.serialNumber"
      class="v-col-md-2 v-col-sm-3"
      label="シリアルナンバー"
      variant="outlined"
      hide-details
      @click=""
      append-icon="mdi-user"
    />
    <v-text-field
      v-model="modelValue.janCode"
      class="v-col-md-2 v-col-sm-3"
      label="JANコード"
      variant="outlined"
      hide-details
      @click:input=""
      append-icon="mdi-qrcode"
      @click:append=""
    />
    <v-text-field
      v-model="modelValue.manufacturerName"
      class="v-col-md-2 v-col-sm-3"
      label="メーカー名称"
      variant="outlined"
      hide-details
      @click:input=""
      append-icon="mdi-qrcode"
      @click:append=""
    />
    <v-select
      v-model="modelValue.os"
      class="v-col-md-2 v-col-sm-3"
      label="OS"
      variant="outlined"
      hide-details
      :items="AppConstants.OS"
      @click=""
      append-icon="mdi-user"
      clearable
      item-value="value"
      item-title="text"
    />
  </div>
</template>
<script lang="ts" setup>
import { onMounted, PropType } from "vue";
import AppConstants from "@/constants/constants";

defineProps({
  modelValue: {
    type: Object as PropType<ExpandedDepreciationSearch>,
    required: true,
  },
});

onMounted(() => {});
</script>
<style lang=""></style>
