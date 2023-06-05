<template>
  <v-container></v-container>
  <v-container class="pt-0">
    <CommonTabs :tabDetails="tabDetails" />
    <div class="elevation-5">
    <SearchComponent
      @onSearch="searchArrival"
      @onClear="clearSearchArrival"
      v-model:deleted-record-display-mode="arrivalMasterSearch.deletedRecordDisplayMode"
      v-model:tab-expanded="tabExpanded"
    >
      <template v-slot:searchForm>
        <v-form>
          <v-row class="form-search">
            <v-col cols="2">
              <div class="form-input">
                <vc-input-date
                  label="入荷予定日(From)"
                  v-model="arrivalMasterSearch.estimatedArrivalDateFrom"
                ></vc-input-date>
              </div>
            </v-col>
            <v-col cols="2">
              <div class="d-flex align-center">
                <v-select
                  v-model="arrivalMasterSearch.arrivalType"
                  label="入荷区分"
                  variant="underlined"
                  density="comfortable"
                  :items="arrivalClassification"
                  class="table-submit-elements"
                  item-title="text"
                  item-value="value"
                >
                </v-select>
              </div>
            </v-col>
            <v-col cols="2">
              <div class="form-input">
                <vc-input-date
                  label="発注日(From)"
                  v-model="arrivalMasterSearch.orderOnFrom"
                ></vc-input-date>
              </div>
            </v-col>
            <v-col cols="2">
              <div class="form-input">
                <vc-select
                  label="発注ID"
                  v-model="arrivalMasterSearch.procurementId"
                  :items="procurementList"
                />
              </div>
            </v-col>
          </v-row>
          <v-row class="form-search">
            <v-col cols="2">
              <div class="form-input">
                <vc-input-date
                  label="入荷予定日(To)"
                  v-model="arrivalMasterSearch.estimatedArrivalDateTo"
                ></vc-input-date>
              </div>
            </v-col>
            <v-col cols="2">
              <div class="d-flex align-center">
                <v-select
                  v-model="arrivalMasterSearch.isAsset"
                  label="資産登録"
                  variant="underlined"
                  density="comfortable"
                  :items="assetRegistration"
                  class="table-submit-elements"
                  item-title="text"
                  item-value="value"
                >
                </v-select>
              </div>
            </v-col>
            <v-col cols="2">
              <div class="form-input">
                <vc-input-date
                  label="発注日(To)"
                  v-model="arrivalMasterSearch.orderOnTo"
                ></vc-input-date>
              </div>
            </v-col>
            <v-col cols="2">
              <div class="form-input">
                <v-text-field
                  label="入荷資産ID"
                  v-model="arrivalMasterSearch.arrivalId"
                  density="compact"
                  variant="underlined"
                />
              </div>
            </v-col>
            <v-col cols="2">
              <div class="form-input">
                <v-text-field
                  label="発注者"
                  v-model="arrivalMasterSearch.quotationRequester"
                  density="compact"
                  variant="underlined"
                />
              </div>
            </v-col>
          </v-row>
        </v-form>
      </template>
      <template v-slot:expansion-area>
        <v-form class="pb-3">
          <v-row class="form-search">
            <v-col cols="2">
              <div class="d-flex align-center">
                <v-select
                  v-model="arrivalMasterSearch.baseId"
                  label="入荷拠点"
                  variant="underlined"
                  density="comfortable"
                  :items="mstBases"
                  class="table-submit-elements"
                  style="min-width: 160px; max-width: 220px"
                  item-title="baseName"
                  item-value="baseId"
                >
                </v-select>
              </div>
            </v-col>
            <v-col cols="2">
              <div class="d-flex align-center">
                <v-select
                  label="検品結果"
                  v-model="arrivalMasterSearch.inspectionStatus"
                  variant="underlined"
                  density="comfortable"
                  :items="inspectionResult"
                  class="table-submit-elements"
                  style="min-width: 160px; max-width: 220px"
                  item-title="text"
                  item-value="value"
                >
                </v-select>
              </div>
            </v-col>
            <v-col cols="2">
              <div class="d-flex align-center">
                <v-select
                  label="不合格処理"
                  v-model="arrivalMasterSearch.failureAction"
                  :items="rejectionProcessing"
                  variant="underlined"
                  density="comfortable"
                  class="table-submit-elements"
                  style="min-width: 160px; max-width: 220px"
                  item-title="text"
                  item-value="value"
                >
                </v-select>
              </div>
            </v-col>
          </v-row>
          <v-row class="form-search">
            <v-col cols="2">
              <div class="form-input">
                <v-text-field
                  label="品目ID"
                  v-model="arrivalMasterSearch.itemId"
                  density="compact"
                  hide-details
                  variant="underlined"
                />
              </div>
            </v-col>
          </v-row>
        </v-form>
      </template>
    </SearchComponent>
    </div>
    <div class="elevation-5 mt-4">
      <TableComponent
        :data="table.datas"
        :column-attrs="table.columns"
        :total="table.total"
        v-model:page-size="arrivalMasterSearch.pageSize"
        v-model:pageNum="arrivalMasterSearch.pageNum"
        :tableHeight="table.tableHeight"
        @page="arrivalList"
        @refresh-data="searchArrival"
        :customBodyTable="true"
      >
        <template v-slot:buttonTable>
          <v-col cols="3" class="button-table">
            <div class="d-flex align-center">
                <v-select
                  placeholder="すべて"
                  :items="bulkCheck"
                  variant="underlined"
                  density="comfortable"
                  class="table-submit-elements"
                  item-title="text"
                  item-value="value"
                >
                </v-select>
              </div>
          </v-col>
          <v-btn class="ml-3">登録</v-btn>
          <v-btn class="ml-3" @click="handleAddEditArrival()">新規</v-btn>
        </template>
        <template v-slot:customTableBody>
          <tr v-for="item in table.datas">
            <td
              v-for="(field, index) in table.columns.fields"
              :class="[
                'border-table',
                { 'text-center': typeof field === 'number' },
              ]"
              :style="{
                textDecoration: table.columns.clickableColumn[index]
                  ? 'underline'
                  : '',
                cursor: table.columns.clickableColumn[index] ? 'pointer' : '',
                color: table.columns.clickableColumn[index] ? 'blue' : '',
              }"
              @click="
                table.columns.clickableColumn[index] &&
                  handleAddEditArrival(item[field])
              "
            >
              <span> {{ displayLabel(item, field) }} </span>
            </td>
          </tr>
        </template>
      </TableComponent>
    </div>
  </v-container>
  <ArrivalModal
    ref="arrivalRef"
    modalId="Arrival"
    modalName="入荷管理 > 入荷詳細"
    :dateTimeForm="dateTimeFormat"
    @on-save="doSave"
    @on-delete="handleOnDeleteItem"
    @on-close="handleOnClose"
  >
    <template v-slot:contentModal>
      <ArrivalMasterModal
        ref="arrivalModalRef"
        v-model="arrivalMaster"
        :inspectionResult="inspectionResult"
        :rejectionProcessing="rejectionProcessing"
        :OS="OS"
        :listAssetType="listAssetType"
        :isAsset="isAsset"
        :mstBases="mstBases"
      />
    </template>
  </ArrivalModal>
</template>

<script setup lang="ts">
import TableComponent from "@/components/custom-table/index.vue"
import ArrivalModal from "@/components/modal/index.vue"
import { ref, onMounted, reactive, Ref, computed } from "vue"
import CommonTabs from "@/components/tabs/custom-tabs/index.vue"
import Arrival from "@/models/Arrival"
import SearchComponent from "@/components/tabs/search-button/index.vue"
import moment from 'moment';
import BaseService from "@/services/base.service";
import ArrivalMasterModal from "@/components/modal/ArrivalModal.vue";
import { useStore } from "@/store/index";
import TabCommon from "@/models/tab-common";
import ItemMaster from "@/models/ItemMaster";
import ArrivalInfo from "@/models/ArrivalInfo";
import OrderManagement from "@/models/OrderManagement";
import Procurement from "@/models/procurement.model";
import ColumnAttributes from "@/models/column-attributes.model";
import arrivalService from "@/services/arrival.service";
import AppConstants from "@/constants/constants";
import DisplayGenCode from "@/utils/displayGenCode"
import ProcurementService from "@/services/procurement.service"
import CustomValueTable from "@/utils/customValueTable";
import AccountInfo from "@/models/AccountInfo";
import GroupInfo from "@/models/GroupInfo";

const tabDetails = [
  { tabName: "Arrival Management", tabTitle: "入荷" },
] as TabCommon[];

const tabExpanded = ref(false);

let arrivalMasterSearch: any = reactive({
  estimatedArrivalDateFrom: null,
  estimatedArrivalDateTo: null,
  orderOnFrom: null,
  orderOnTo: null,
  quotationRequester: null,
  arrivalId: null,
  arrivalType: null,
  isAsset: null,
  procurementId: null,
  baseId: null,
  itemId: null,
  inspectionStatus: null,
  failureAction: null,
  deletedRecordDisplayMode: 0,
  pageNum: 1,
  pageSize: 10,
})
const store = useStore();
const getStatusRes = computed(() => store.getters.getStatusResponse);
let mstBases = ref<any[]>([])
const arrivalRef = ref <InstanceType<typeof ArrivalModal> | null>(null)
const arrivalModalRef = ref<InstanceType<typeof ArrivalMasterModal>| null>(null);
let arrivalMaster: Ref<Arrival> = ref(
  {
    itemInfo: {} as ItemMaster,
    arrivalInfo: {} as ArrivalInfo,
    oderInfo: {} as OrderManagement,
    procurementInfo: {} as Procurement,
    accountInfo: {} as AccountInfo,
    groupInfo: {} as GroupInfo
  } as Arrival
);

let table = reactive({
  total: 1,
  columns: {
    labels: ['入荷資産ID', '入荷区分', '資産登録', '入荷予定日', '入荷日', '資産区分', '品目ID', '品目名称', '検品結果', '検品日', '不合格処理'],
    fields: ['arrivalId', 'arrivalType', 'isAsset', 'estimatedArrivalOn', 'arrivalOn', 'item.assetType', 'item.itemId', 'item.itemName', 'inspectionStatus', 'inspectionDate', 'failureAction'],
    clickableColumn: [true],
    columnsWidth: [
      50, 180, 180, 180, 180, 180, 180, 180, 180, 180, 180, 180, 180,
    ],
  } as ColumnAttributes,
  datas: reactive([]) as any,
  tableHeight: 400,
});

let dateTimeFormat = reactive({
  createdTime: "",
  updatedTime: "",
  deletedTime: "",
});

const arrivalClassification = ref<any[]>([
  { value: 0, text: "発注" },
  { value: 1, text: "持ち込み" },
]);

const assetRegistration = ref<any[]>([
  { value: 0, text: '未' },
  { value: 1, text: '済' }
])

const inspectionResult = ref<any[]>([
  { value: 0, text: '検品未' },
  { value: 1, text: '合格' },
  { value: 2, text: '不合格' },
])

const rejectionProcessing = ref<any[]>([
  { value: 0, text: '未' },
  { value: 1, text: '返品(再入荷待ち)' },
  { value: 2, text: '返品(再入荷済)' },
  { value: 3, text: '返品(再入荷なし)' },
])

let listAssetType = ref<any[]>([
  { value: 0, text: 'デスクトップセット' },
  { value: 1, text: 'ノートセット' },
  { value: 2, text: 'デスクトップ' },
  { value: 3, text: 'ノート' },
  { value: 4, text: 'タブレット' },
  { value: 5, text: '機器' },
  { value: 6, text: 'ソフトウェア(ライセンスなし)' },
  { value: 7, text: 'ソフトウェア(ライセンスあり)' },
  { value: 8, text: 'クラウドライセンス'
}])

const bulkCheck = ref<any[]>([
  { value: 0, text: "検品" },
  { value: 1, text: "資産" },
]);

const isAsset = ref<any[]>([
  { value: 0, text: "未" },
  { value: 1, text: "済" },
]);

const arrivalType = ref<any[]>([
  { value: 0, text: "発注" },
  { value: 1, text: "持ち込み" },
]);

const OS = ref<any[]>([
  { value: 0, text: "IOS" },
  { value: 1, text: "Android" },
]);

const procurementList = ref<any[]>([])
onMounted(async () => {
  await arrivalList();
  const baseTemp = await BaseService.getAll();
  mstBases.value = [...baseTemp.mstBase];
  await fetchLabelByGenCode();
  fetchDataProcurement();
})

/**
 * 遺伝子コードでラベルを取得
 */
const fetchLabelByGenCode = async () => {
  const arrivalTable = AppConstants.TABLE_ARRIVAL;
  const mstItem = AppConstants.MASTER_ITEM;
  const genCodeList = await DisplayGenCode.getGenCode();
  rejectionProcessing.value = DisplayGenCode.getListGenCodeLabel(arrivalTable, 'failureAction', genCodeList)
  listAssetType.value = DisplayGenCode.getListGenCodeLabel(mstItem, 'assetType', genCodeList)
  inspectionResult.value = DisplayGenCode.getListGenCodeLabel(arrivalTable, 'inspectionStatus', genCodeList)
  arrivalType.value = DisplayGenCode.getListGenCodeLabel(arrivalTable, 'arrivalType', genCodeList)
}

/**
 * リスト調達を取得
 */
const fetchDataProcurement = async () => {
  const response = await (await ProcurementService.getProcurementList()).procurementList;
  response.map((procurement: any) => {
    const objProcurement = {
      value: procurement.procurementId,
      title: procurement.procurementName
    }
    procurementList.value.push(objProcurement)
  })
}

/**
 * モーダル追加編集項目を表示
 * @param arrivalId アイテムメーカーID
 */
const handleAddEditArrival = async (arrivalId: any = null) => {
  setMessage();
  await getData(arrivalId || -1);
  arrivalRef.value?.openModal(
    arrivalId,
    arrivalMaster.value?.arrivalInfo?.isDeleted,
    arrivalMaster.value?.arrivalInfo?.isAsset == 0 ? true : false
  );
};

/**
 * 条件別データ情報取得
 * @param arrivalId データ取得条件
 */
const getData = async (arrivalId: number) => {
  try {
    if (arrivalId === -1) {
      return;
    }
    const response = await arrivalService.get({ arrivalId });
    arrivalMaster.value = response;
    dateTimeFormat.createdTime =
      arrivalMaster.value.arrivalInfo?.createdAt || "";
    dateTimeFormat.updatedTime =
      arrivalMaster.value.arrivalInfo?.modifiedAt || "";
    dateTimeFormat.deletedTime =
      arrivalMaster.value.arrivalInfo?.deletedAt || "";
  } catch (error) {
    console.log(error);
  }
};

/**
 * 条件別データ情報取得
 * @param arrivalSearch データ取得条件
 */
const arrivalList = async (arrivalSearch: any = null) => {
  if (arrivalSearch) {
    const response = await arrivalService.getAll(arrivalSearch);
    table.datas = response.arrivalList;
    table.total = response.itemTotal;
  } else {
    const response = await arrivalService.getAll(arrivalMasterSearch);
    table.datas = response.arrivalList;
    table.total = response.itemTotal;
  }
};

const searchArrival = () => {
  let dataSeach = {
    estimatedArrivalDateFrom: arrivalMasterSearch.estimatedArrivalDateFrom
      ? moment(arrivalMasterSearch.estimatedArrivalDateFrom).format(
          "YYYY-MM-DD"
        )
      : null,
    estimatedArrivalDateTo: arrivalMasterSearch.estimatedArrivalDateTo
      ? moment(arrivalMasterSearch.estimatedArrivalDateTo).format("YYYY-MM-DD")
      : null,
    orderOnFrom: arrivalMasterSearch.orderOnFrom
      ? moment(arrivalMasterSearch.orderOnFrom).format("YYYY-MM-DD")
      : null,
    orderOnTo: arrivalMasterSearch.orderOnTo
      ? moment(arrivalMasterSearch.orderOnTo).format("YYYY-MM-DD")
      : null,
    quotationRequester: arrivalMasterSearch.quotationRequester,
    arrivalId: arrivalMasterSearch.arrivalId,
    arrivalType: arrivalMasterSearch.arrivalType,
    isAsset: arrivalMasterSearch.isAsset,
    procurementId: arrivalMasterSearch.procurementId,
    baseId: arrivalMasterSearch.baseId,
    itemId: arrivalMasterSearch.itemId,
    inspectionStatus: arrivalMasterSearch.inspectionStatus,
    failureAction: arrivalMasterSearch.failureAction,
    pageNum: arrivalMasterSearch.pageNum,
    pageSize: arrivalMasterSearch.pageSize,
    deletedRecordDisplayMode: arrivalMasterSearch.deletedRecordDisplayMode,
  };
  arrivalList(dataSeach);
};

const clearSearchArrival = () => {
  arrivalMasterSearch.estimatedArrivalDateFrom = null;
  arrivalMasterSearch.estimatedArrivalDateTo = null;
  arrivalMasterSearch.orderOnFrom = null;
  arrivalMasterSearch.orderOnTo = null;
  arrivalMasterSearch.quotationRequester = null;
  arrivalMasterSearch.arrivalId = null;
  arrivalMasterSearch.arrivalType = null;
  arrivalMasterSearch.isAsset = null;
  arrivalMasterSearch.orderId = null;
  arrivalMasterSearch.baseId = null;
  arrivalMasterSearch.itemId = null;
  arrivalMasterSearch.inspectionStatus = null;
  arrivalMasterSearch.failureAction = null;
  arrivalMasterSearch.deletedRecordDisplayMode = 0;
};
/**
 * メッセージ設定メッセージの変更
 * @param message メッセージ文字列です
 */
const setMessage = async (message: string = "") => {
  store.dispatch("setMessage", message);
};

/**
 * ステータスによる警告メッセージの種類の変更
 * @param status 応答のステータスです
 */
const setStatusRes = async (status?: number) => {
  store.dispatch("setStatusResponse", status);
};

/**
 * 追加のイベント メーカー アイテム
 * @param data メーカーのデータ
 */
const addArrival = async (data: ArrivalInfo) => {
  let response;
  try {
    data.inspectionAccountId = 1
    response = await arrivalService.add(data);
    setMessage(response?.message);
    setStatusRes(response?.stasus);
  } catch(error) {
    console.log(error);
  }
};

/**
 * イベントメーカーアイテムアップデート
 * @param data メーカーのデータ
 */
const updateArrival = async (data: ArrivalInfo) => {
  let response;
  try {
    data.inspectionAccountId = 1
    response = await arrivalService.update(data);
    setMessage(response?.message);
    setStatusRes(response?.stasus);
  } catch(error) {
    console.log(error);
  }
};

/**
 * イベントセーブメーカーアイテム
 * @param data メーカーのデータ
 * @param isAddItem モーダルを追加
 */
const doSave = async (isAddItem: Ref) => {
  let response;
  const validForm = await arrivalModalRef.value?.validateForm();
  if (!validForm.valid) {
    return;
  } else {
    arrivalMaster.value.arrivalInfo.itemId = arrivalMaster.value.itemInfo.itemId
    arrivalMaster.value.arrivalInfo.failureAction = arrivalMaster.value.arrivalInfo.failureAction || 0
    arrivalMaster.value.arrivalInfo.accountId = 1 // set accountId default to 1, because author tokens doesn't exist
  }
  if (isAddItem.value) {
    arrivalMaster.value.arrivalInfo.arrivalType = 1
    await addArrival(arrivalMaster.value.arrivalInfo);
  } else {
    await updateArrival(arrivalMaster.value.arrivalInfo);
  }
  reloadData();
  arrivalRef.value?.handleOnClose();
}

/**
 * イベント削除メーカーアイテム
 * @param arrivalId アイテムメーカーID
 */
const handleOnDeleteItem = async (arrivalId: number) => {
  try {
    const response = await arrivalService.delete({ arrivalId });
    setMessage(response?.message);
    setStatusRes(response?.stasus);
    reloadData();
  } catch(error) {
    console.log(error);
  }
}

const reloadData = () => {
  if (getStatusRes.value === 200) {
      arrivalList();
    }
}

const handleOnClose = () => {
  arrivalMaster.value = {
    itemInfo: {} as ItemMaster,
    arrivalInfo: {} as ArrivalInfo,
    oderInfo: {} as OrderManagement,
    procurementInfo: {} as Procurement,
    accountInfo: {} as AccountInfo,
    groupInfo: {} as GroupInfo,
  } as Arrival;
};

/**
 * 調達テーブルにテキスト値を表示
 * @param item は調達テーブルのアイテムです
 * @param field 調達テーブル内のアイテムのプロパティです
 * @return {string} 調達表記録値
 */
const displayLabel = (item: any, field: string): string => {
  switch (field) {
    case "inspectionStatus":
      const inspectionResultText =
        inspectionResult.value.find(status => item.inspectionStatus === status.value)?.text || "";
      return inspectionResultText;
    case "isAsset":
      const isAssetText =
        isAsset.value.find((status) => item.isAsset === status.value)?.text ||
        "";
      return isAssetText;
    case "arrivalType":
      const arrivalTypeText =
        arrivalType.value.find(status => item.arrivalType === status.value)?.text || "";
      return arrivalTypeText;
    case "failureAction":
      const rejectionProcessingText =
      // If inspection is failure, hide rejection process
        rejectionProcessing.value.find(status => item.failureAction === status.value && item.inspectionStatus === 2)?.title || "";
      return rejectionProcessingText;
    case "item.assetType":
      const assetType =
        listAssetType.value.find(status => item.item.assetType === status.value)?.title || "";
      return assetType;
    default:
      break;
  }
  return CustomValueTable.setValueTable(item, field);
};

</script>

<style lang="scss" scoped>
.form-search {
  display: flex;
  align-items: center;
}
.top-form {
  border: 1px solid black;
}
.bottom-form {
  border: 1px solid black;
}
.container-table {
  padding: 16px 0px 0px 0px;
}
// .border-table {
//   border: thin solid black;
// }
.button-table {
  margin-top: 25px;
  margin-left: 20px;
}
</style>
