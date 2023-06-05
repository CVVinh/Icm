<template>
  <div class="elevation-5">
    <SearchComponent
      @onSearch="onSearch"
      @onClear="onClear"
      v-model:deleted-record-display-mode="state.deletedRecordDisplayMode"
      v-model:tab-expanded="state.tabExpanded"
      :is-modal="true"
    >
      <template #searchForm>
        <CommonSearchForm
          v-model="mainSearchState"
          :is-hardware-flag="hardwareFlag"
        />
      </template>

      <template #customExpansionArea>
        <CommonExpansionSearchForm
          v-model:company-user="companyUserSearch"
          v-model:itemSearchData="itemSearch"
          v-model:procurementSearchData="procurementSearch"
          @open-expanded-search="handleReceiveOpenedSearchArea"
        />
      </template>
    </SearchComponent>
  </div>

  <br />

  <div class="elevation-5">
    <CustomTable
      :column-attrs="tableState.columnAttrs"
      :data="tableState.data"
      :btn-add-item="false"
      :total="tableState.total"
      v-model:page-size="tableState.pageSize"
      v-model:page-num="tableState.pageNum"
      @click-detail="onClickDetail"
      @page="getList"
      @refresh-data="getList"
    />
  </div>

  <CommonModal
    ref="commonModalRef"
    modal-id="customModalId"
    :modal-name="modalState.name"
    :date-time-form="infoState.actionDatetime"
    :show-add-update-btn="modalState.showAddEditBtnFlag"
    :show-delete-btn="modalState.showDeleteBtnFlag"
  >
    <template #contentModal>
      <!-- Procurement content -->
      <ProcurementContent
        v-if="modalState.key === AppConstants.PROCUREMENT_MODAL_KEY"
        :procurement-id="modalState.itemId"
        @action-datetime="handleReceiveActionDatetime"
      />
      <!-- Item content -->
      <ItemMasterContentModal
        v-if="modalState.key === AppConstants.ITEM_ID_KEY"
        v-model="infoState.item"
        :item-deleted-flag="true"
      />
    </template>
  </CommonModal>

  <LicenseDetailModal ref="licenseUsageDetailRef" />
</template>
<script setup lang="ts">
import {
  reactive,
  ref,
  onMounted,
  computed,
  useAttrs,
  watch,
  onBeforeUpdate,
  getCurrentInstance,
} from "vue";
import SearchComponent from "@/components/tabs/search-button/index.vue";
import CommonSearchForm from "@/components/lifecycle-management/common-search-form.vue";
import CustomTable from "@/components/custom-table/index.vue";
import ColumnAttributes from "@/models/column-attributes.model";
import CommonModal from "@/components/modal/index.vue";
import ProcurementContent from "@/components/order-management/detail-modal/content.vue";
import CommonExpansionSearchForm from "@/components/lifecycle-management/common-expansion-search-form.vue";
import AppConstants from "@/constants/constants";
import LicenseDetailModal from "@/components/lifecycle-management/license-detail-modal.vue";
import useLifeCycleMixin from "@/mixins/life-cycle-management/useLifeCycleMixin";
import ItemMasterContentModal from "@/components/modal/ItemMasterModal.vue";
import lifeCycleManagementService from "@/services/life-cycle-management.service";
import Procurement from "@/models/procurement.model";
import ItemMaster from "@/models/ItemMaster";

const SOFTWARE_COLUMNATTRS: ColumnAttributes = {
  labels: [
    "資産STS",
    "統合資産ID",
    "資産名称",
    "品目ID",
    "資産区分",
    "調達ID",
    "入荷日",
    "廃棄日",
    "利用者",
    "数量",
    "利用数量",
  ],
  fields: [
    "assetStatus",
    AppConstants.INTEGRATED_ASSET_MODAL_KEY,
    "itemName",
    AppConstants.ITEM_ID_KEY,
    "assetType",
    AppConstants.PROCUREMENT_MODAL_KEY,
    "arrivalOn",
    "",
    AppConstants.ACCOUNT_NAME,
    "",
    "",
  ],
  clickableColumn: [
    false,
    false,
    false,
    true,
    false,
    true,
    false,
    false,
    false,
  ],
  columnsWidth: [],
};
const HARDWARE_COLUMNATTRS: ColumnAttributes = {
  labels: [
    "資産STS",
    "統合資産ID",
    "資産名称",
    "品目ID",
    "資産区分",
    "調達ID",
    "入荷日",
    "廃棄日",
    "利用者",
  ],
  fields: [
    "assetStatus",
    AppConstants.INTEGRATED_ASSET_MODAL_KEY,
    "itemName",
    AppConstants.ITEM_ID_KEY,
    "assetType",
    AppConstants.PROCUREMENT_MODAL_KEY,
    "arrivalOn",
    "modifiedAt",
    AppConstants.ACCOUNT_NAME,
  ],
  clickableColumn: [
    false,
    false,
    false,
    true,
    false,
    true,
    false,
    true,
    false,
    false,
    false,
  ],
  columnsWidth: [],
};

const currentInstance = getCurrentInstance();

const attrs = useAttrs();
const { infoState, getItemInfo } = useLifeCycleMixin(true);
const { modalState } = infoState;

const mainSearchState = ref<LifecycleHardwareSearch>({});
const companyUserSearch = ref<{ userId?: number }>({});
const itemSearch = ref<ItemMaster>({});
const procurementSearch = ref<Procurement>({});
const tableState = reactive({
  columnAttrs: <ColumnAttributes>{
    labels: [],
    fields: [],
    columnsWidth: [],
    clickableColumn: [],
  },
  data: [] as any[],
  total: 0,
  pageSize: 10,
  pageNum: 1,
});
const state = reactive({
  deletedRecordDisplayMode: 0,
  tabExpanded: false,
  openedArea: -1,
});

const commonModalRef = ref<InstanceType<typeof CommonModal> | null>(null);
const licenseUsageDetailRef = ref<InstanceType<
  typeof LicenseDetailModal
> | null>(null);

const hardwareFlag = ref(false);

watch(
  () => hardwareFlag.value,
  async (_, _current) => {
    await getList();
  }
);

onBeforeUpdate(() => {
  checkTableType();
  const { softwareFlag } = attrs;
  hardwareFlag.value = <boolean>!softwareFlag;
});

onMounted(async () => {
  checkTableType();
  // await getList();
});

const checkTableType = () => {
  const { softwareFlag } = attrs;
  tableState.columnAttrs = softwareFlag
    ? SOFTWARE_COLUMNATTRS
    : HARDWARE_COLUMNATTRS;
};

const getList = async () => {
  const response = await lifeCycleManagementService.getList(
    getCurrentRequestParams()
  );
  tableState.data = response.arrivalList;
  tableState.total = response.arrivalTotal;
};

const onSearch = async () => {
  tableState.pageNum = 1;
  await getList();
};

const onClear = () => {
  mainSearchState.value = {};
  companyUserSearch.value = {};
  itemSearch.value = {};
  procurementSearch.value = {};
  state.deletedRecordDisplayMode = 0;
};

const onClickDetail = async (
  detailValue: number,
  objectData: { field: string }
) => {
  switch (objectData.field) {
    case AppConstants.ITEM_ID_KEY: {
      infoState.modalState.name = "マスター管理 ＞ 品目マスタ詳細";
      await getItemInfo(detailValue);
      break;
    }
    default: {
      infoState.modalState.name = "発注詳細";
      break;
    }
  }
  infoState.modalState.key = objectData.field;
  infoState.modalState.itemId = detailValue;
  commonModalRef.value?.openModal(detailValue);
};

const handleReceiveActionDatetime = (dt: any) => {
  infoState.actionDatetime = dt;
};

const handleReceiveOpenedSearchArea = (id: number) => {
  state.openedArea = id;
};

const getCurrentRequestParams = () => {
  const requestParams: any = Object.assign(mainSearchState.value, {
    pageSize: tableState.pageSize,
    pageNum: tableState.pageNum,
    assetType: hardwareFlag.value ? 0 : 1,
  });

  if (state.openedArea === 0) {
    Object.assign(requestParams, companyUserSearch.value);
  }
  if (state.openedArea === 1) {
    Object.assign(requestParams, itemSearch.value);
  }
  if (state.openedArea === 2) {
    Object.assign(requestParams, procurementSearch.value);
  }

  return requestParams;
};
</script>
<style lang=""></style>
