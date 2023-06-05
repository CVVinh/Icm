<template>
  <v-container>
    {{ $attrs.name }}
  </v-container>
  <v-container class="pt-0">
    <CommonTabs :tabDetails="tabDetails" />
    <div class="elevation-5">
    <SearchComponent
        customClass="order-form"
        @onSearch="onClickSearch"
        @onClear="onClickClear"
        v-model:deleted-record-display-mode="dataSearch.deletedRecordDisplayMode"
        v-model:tab-expanded="tabExpanded"
      >
        <template v-slot:searchForm>
          <v-form class="pb-3">
            <v-container class="header-search">
              <h3>検索条件</h3>
            </v-container>
            <v-row>
              <v-col cols="2">
                <v-select
                  label="発注ステータス"
                  v-model="dataSearch.procurementStatus"
                  :items="procurementStatusList"
                  no-data-text="データなし"
                  variant="underlined"
                  density="comfortable"
                  item-title="fieldDisplayLabel"
                  item-value="fieldValue"
                />
              </v-col>
              <v-col cols="2">
                <v-text-field
                  label="発注ID"
                  type="number"
                  v-model="dataSearch.procurementId"
                  variant="underlined"
                  density="compact"
                />
              </v-col>
              <v-col cols="2">
                <vc-input
                  label="発注名称"
                  name="発注名称"
                  v-model:value="dataSearch.procurementName"
                />
              </v-col>
              <v-col cols="2">
                <v-text-field
                  label="発注者"
                  v-model="dataSearch.quotationRequester"
                  variant="underlined"
                  density="compact"
                />
              </v-col>
              <v-col cols="2">
                <v-select
                  label="差戻"
                  v-model="dataSearch.isBackFlag"
                  :items="listStatusBack"
                  no-data-text="データなし"
                  variant="underlined"
                  density="comfortable"
                />
              </v-col>
            </v-row>
          </v-form>
        </template>
      </SearchComponent>
    </div>

    <div class="elevation-5 mt-4">
        <CommonTable
          :column-attrs="state.tableAttrs"
          :data="state.dataTable"
          :total="state.total"
          v-model:page-size="dataSearch.pageSize"
          v-model:pageNum="dataSearch.pageNum"
          @refresh-data="fetchData"
          @page="onClickSearch"
          @click-detail="handleAddEditItem"
          @on-add-item="handleAddEditItem()"
        >
          <template v-slot:rightToolbar>
            <div class="d-flex justify-end">
              <v-btn class="ml-3" @click="exportCSV">CSV出力</v-btn>
            </div>
          </template>
          <template #cell(procurementStatus)="{ value, field }">
            <span>{{ displayLabel(value, field) }}</span>
          </template>
          <template #cell(isBack)="{ value, field }">
            <span>{{ displayLabel(value, field) }}</span>
          </template>
          <template #cell(status)="{ item, columnLabel }">
            <v-icon
              v-if="displayIconProcurementStatus(item, columnLabel)"
              size="x-small"
              center
              icon="mdi-circle"
            />
          </template>
          <template #cell(totalAmount)="{ value }">
            <span>{{ convertPriceToJpPrice(value) }}</span>
        </template>
      </CommonTable>
    </div>
  </v-container>

  <CommonModal
    ref="commonModalRef"
    modalId="makerMaster"
    modalName="メーカーマスタ"
    :dateTimeForm="actionDatetimeRef"
    :show-add-update-btn="false"
    :show-delete-btn="false"
    @onClose="handleOnClose"
  >
    <template v-slot:contentModal>
      <ProcurementContent
        ref="procurementContentRef"
        :procurement-id="procurementIdRef"
        v-on:action-datetime="onReceiveActionDatetime"
      />
    </template>
  </CommonModal>
</template>

<script setup lang="ts">
import vcInput from '@/components/commons/vc-input.vue';
import CommonTabs from "@/components/tabs/custom-tabs/index.vue";
import SearchComponent from "@/components/tabs/search-button/index.vue";
import CommonTable from "@/components/custom-table/index.vue";
import { onMounted, reactive, Ref, ref } from "vue";
import TabCommon from "@/models/tab-common";
import ColumnAttributes from "@/models/column-attributes.model";
import OrderManagementService from "@/services/orderManagement.service";
import CommonModal from "@/components/modal/index.vue";
import ProcurementContent from "@/components/order-management/detail-modal/content.vue";
import GenCodeService from "@/services/genCode.service";
import GenCode from "@/models/GenCode";
import AppConstants from "@/constants/constants";
import DateTimeAction from "@/models/DateTimeAction";
import useMixin from '@/components/order-management/detail-modal/mixin/useMixin';

const { convertPriceToJpPrice } = useMixin()

const tabDetails = [
  { tabName: "OrderManagement", tabTitle: "発注" },
] as TabCommon[];

let dataSearch = ref({
  procurementStatus: undefined,
  procurementId: undefined,
  procurementName: undefined,
  quotationRequester: undefined,
  isBackFlag: null,
  isBack: null,
  deletedRecordDisplayMode: 0,
  pageNum: 1,
  pageSize: 10,
});
const listStatusBack = [
  { title: "有", value: 1 },
  { title: "無", value: 0 },
];
const procurementStatusList: Ref<GenCode[]> = ref([]);
const tabExpanded = ref(false);
const actionDatetimeRef: Ref<DateTimeAction> = ref({});
const state = reactive({
  total: 10,
  tableAttrs: {
    labels: ["発注ステータス", "差戻", "発注ID", "発注名称", "発注金額(税込)", "発注者", "依頼", "回答", "承認依頼", "承認", "発注"],
    fields: ["procurementStatus", "isBack", "procurementId", "procurementName",
      "totalAmount", "quotationRequester",
      "status", "status", "status", "status", "status"],
    clickableColumn: [false, false, true],
    columnsWidth: [120],
  } as ColumnAttributes,
  tableHeight: 370,
  dataTable: [] as any,
});

const procurementContentRef = ref<InstanceType<
  typeof ProcurementContent
> | null>(null);
const commonModalRef = ref<InstanceType<typeof CommonModal> | null>(null);
const procurementIdRef = ref<number | undefined>(undefined);

onMounted(() => {
  fetchData();
});

/**
 * Apiを呼び出して調達リストを取得し、調達テーブルのデータを作成
 */
const fetchData = async () => {
  const dataSearchAll = {
    deletedRecordDisplayMode: 0,
    pageNum: 1,
    pageSize: dataSearch.value.pageSize,
  };
  dataSearchAll.pageNum = dataSearch.value.pageNum;
  const response = await OrderManagementService.getAll(dataSearchAll);
  state.dataTable = response.procurementList;
  state.total = response.totalRecords;
  procurementStatusList.value = await (await GenCodeService.getAll({ tableName: AppConstants.TABLE_PROCUREMENT })).mstGenCode;
};

/**
 * 調達テーブルにテキスト値を表示
 * @param itemValue は調達表項目の値です
 * @param field 調達テーブル内のアイテムのプロパティです
 * @return {string} 調達表記録値
 */
const displayLabel = (itemValue: any, field: string): string => {
  if (field === "procurementStatus") {
    const procurementStatusText = procurementStatusList.value
      ? procurementStatusList.value.find(
          (status) => parseInt(itemValue) === status.fieldValue
        )?.fieldDisplayLabel || ""
      : "";
    return procurementStatusText;
  } else if (field === "isBack") {
    const isBackText = itemValue ? "有" : "無";
    return isBackText;
  } else {
    return "";
  }
};

/**
 * 現状に応じた調達状況を丸アイコンで表示
 * @param item 調達表の記録です
 * @param columnLabel 表の列ラベル
 * @return {boolean} true は表示アイコンです、false はアイコンを表示しません
 */
const displayIconProcurementStatus = (
  item: any,
  columnLabel: string
): boolean => {
  let statusList: string[] = [];
  procurementStatusList.value.forEach((status) => {
    if (
      status &&
      status.fieldValue &&
      status.fieldDisplayLabel &&
      parseInt(item.procurementStatus) >= status.fieldValue
    ) {
      statusList.push(status.fieldDisplayLabel);
    }
  });
  const procurementStatus = statusList.includes(columnLabel);
  return procurementStatus;
};

/**
 * 条件による調達データの検索
 */
const onClickSearch = async () => {
  const response = await OrderManagementService.getAll(dataSearch.value);
  state.dataTable = response.procurementList;
};

/**
 * クリア条件検索
 */
const onClickClear = () => {
  dataSearch.value.procurementStatus = undefined;
  dataSearch.value.procurementId = undefined;
  dataSearch.value.procurementName = undefined;
  dataSearch.value.quotationRequester = undefined;
  dataSearch.value.quotationRequester = undefined;
  dataSearch.value.isBackFlag = null;
  dataSearch.value.deletedRecordDisplayMode = 0;
};

/**
 * モーダル追加編集項目を表示
 */
const handleAddEditItem = (id: number | undefined = undefined) => {
  // show add/edit modal
  commonModalRef.value?.openModal(id || 0);
  procurementIdRef.value = id;
};

const handleOnClose = () => {
  actionDatetimeRef.value = {};
  onClickSearch();
};

/**
 * エクスポート ファイル csv
 */
const exportCSV = () => {
  try {
    const dataSearchAll = {
      deletedRecordDisplayMode: dataSearch.value.deletedRecordDisplayMode || 0,
      pageNum: dataSearch.value.pageNum || 1,
      procurementId: dataSearch.value.procurementId || null,
      procurementStatus: dataSearch.value.procurementStatus || null,
      isBack: dataSearch.value.isBack || null,
      procurementName: dataSearch.value.procurementName || null,
      quotationRequester: dataSearch.value.quotationRequester || null,
    };
    OrderManagementService.exportCSV(dataSearchAll);
  } catch (error) {
    console.log(error);
  }
};

const onReceiveActionDatetime = (datetime: DateTimeAction) => {
  actionDatetimeRef.value = datetime;
};
</script>
<style lang="scss" scoped>
.order-form {
  .v-form {
    .header-search {
      padding: 0px 0px 16px 0px;
    }
  }
}

.border-table {
  border: thin solid black;
}
</style>
