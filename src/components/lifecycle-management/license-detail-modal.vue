<template>
  <CommonModal
    ref="licenseUsageDetailRef"
    modal-name="ライフサイクル統合資産管理 > ライセンス利用詳細"
    :date-time-form="{}"
    :show-add-update-btn="false"
    :show-delete-btn="false"
    :custom-header-modal-flag="true"
  >
    <template #customHeaderContent>
      <h5 class="pt-6">ソフトウェア・クラウドライセンス</h5>
      <CustomTable
        :column-attrs="licenseDetailModalState.firstTable.columnAttrs"
        :data="licenseDetailModalState.firstTable.data"
        :total="licenseDetailModalState.firstTable.total"
        :show-pagination-flag="false"
        :showleft-toolbar="false"
        :border-table-flag="false"
        v-model:page-size="licenseDetailModalState.firstTable.pageSize"
        v-model:page-num="licenseDetailModalState.firstTable.pageNum"
      />
    </template>
    <template #contentModal>
      <div class="d-flex">
        <CustomTable
          :column-attrs="licenseDetailModalState.secondTable.columnAttrs"
          :data="licenseDetailModalState.secondTable.data"
          :total="licenseDetailModalState.secondTable.total"
          :show-pagination-flag="false"
          :showleft-toolbar="false"
          :border-table-flag="false"
          v-model:page-size="licenseDetailModalState.secondTable.pageSize"
          v-model:page-num="licenseDetailModalState.secondTable.pageNum"
        >
          <template #leftToolbar>
            <span>利用者 -> 利用数量 -> 20 /100</span>
          </template>
          <template #rightToolbar>
            <v-btn density="comfortable" variant="outlined">CSV出力</v-btn>
          </template>
        </CustomTable>
      </div>
    </template>
  </CommonModal>
</template>
<script setup lang="ts">
import AppConstants from "@/constants/constants";
import ColumnAttributes from "@/models/column-attributes.model";
import { reactive, ref } from "vue";
import CommonModal from "@/components/modal/index.vue";
import CustomTable from "@/components/custom-table/index.vue";

const licenseDetailModalState = reactive({
  firstTable: {
    columnAttrs: {
      labels: [
        "資産STS",
        "統合資産ID",
        "親資産ID",
        "資産名称",
        "品目ID",
        "タイプ",
        "資産区分",
        "調達ID",
        "入荷日",
        "廃棄日",
      ],
      fields: [
        "assetSts",
        AppConstants.INTEGRATED_ASSET_MODAL_KEY,
        AppConstants.PARENT_ASSET_ID,
        "assetName",
        AppConstants.ITEM_ID_KEY,
        "type",
        "assetClass",
        AppConstants.PROCUREMENT_MODAL_KEY,
        "arrivalDate",
        "disposalDate",
      ],
      clickableColumn: [],
      columnsWidth: [],
    } as ColumnAttributes,
    data: [] as any[],
    total: 0,
    pageSize: 10,
    pageNum: 1,
  },
  secondTable: {
    columnAttrs: {
      labels: ["会社組織", "利用者ID", "利用者", "利用開始日"],
      fields: [],
      clickableColumn: [],
      columnsWidth: [300, 150, 300, 150],
    } as ColumnAttributes,
    data: [] as any[],
    total: 0,
    pageSize: 10,
    pageNum: 1,
  },
});

const licenseUsageDetailRef = ref<InstanceType<typeof CommonModal> | null>(
  null
);

const opentDetailModal = () => {
  licenseUsageDetailRef.value?.openModal(-1);
};

defineExpose({ opentDetailModal });
</script>
<style lang=""></style>
