<template>
  <div class="elevation-5">
  <SearchComponent
    @onSearch="searchItem"
    @onClear="clearSearchItem"
    v-model:deleted-record-display-mode="shippingSearch.deletedRecordDisplayMode"
    v-model:tab-expanded="tabExpanded"
  >
    <template v-slot:searchForm>
      <v-form class="pb-3">
        <v-row class="form-search">
          <v-col cols="2">
            <vc-select
              label="出荷受付ステータス"
              v-model="shippingSearch.shippingStatus"
              :items="shippingStatusList"
              no-data-text="データなし"
            />
          </v-col>
          <v-col cols="2">
            <vc-select
              label="出荷依頼元"
              v-model="shippingSearch.shippingReceptionStatus"
              :items="shippingReceptionStatusList"
              no-data-text="データなし"
            />
          </v-col>
          <v-col cols="2">
            <vc-select
              v-model="shippingSearch.shippingLate"
              :items="shippingLateList"
              label="出荷遅延"
              no-data-text="データなし"
              item-title="text"
              item-value="value"
            />
          </v-col>
          <v-col cols="2">
            <vc-input-date label="出荷日(From)" v-model="shippingSearch.completedOnFrom"></vc-input-date>
          </v-col>
          <v-col cols="2">
            <vc-input-date label="出荷日(To)" v-model="shippingSearch.completedOnTo"></vc-input-date>
          </v-col>
        </v-row>
        <v-row class="form-search">
          <v-col cols="3">
            <vc-select
              v-model="shippingSearch.groupId"
              :items="[]"
              label="利用会社/組織"
            />
          </v-col>
          <v-col cols="2">
            <vc-select
              v-model="shippingSearch.accountId"
              :items="[]"
              label="利用者"
              no-data-text="利用者"
            />
          </v-col>
          <v-col cols="2">
            <vc-select label="元資産ID" v-model="shippingSearch.assetId"></vc-select>
          </v-col>
          <v-col cols="2">
            <vc-input label="発注ID" v-model="shippingSearch.orderId" />
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
      v-model:pageSize="shippingSearch.pageSize"
      v-model:pageNum="shippingSearch.pageNum"
      @page="shippingList"
      @on-add-item="handleAddEditItem"
      @click-detail="handleAddEditItem"
      @refresh-data="searchItem"
    >
      <template #cell(shippingStatus)="{ value }">
        {{ DisplayGenCode.displayTileByArrayObject(value, shippingStatusList) }}
      </template>
      <template #cell(shippingReceptionType)="{ value }">
        {{ DisplayGenCode.displayTileByArrayObject(value, shippingReceptionStatusList) }}
      </template>
      <template #cell(shippingLate)="{ value }">
        {{ DisplayGenCode.displayTileByArrayObject(value, shippingLateList) }}
      </template>
    </TableComponent>
  </div>
  <ShippingModal
    ref="shippingMasterRef"
    modalId="shipment"
    modalName="資産運用管理 > 出荷受付詳細"
    :dateTimeForm="dateTimeFormat"
    @on-save="doSave"
    @on-delete="handleOnDeleteItem"
    @on-close="handleOnClose"
  >
    <template v-slot:contentModal>
      <ShippingMasterModal
        ref="shippingMasterModalRef"
        v-model="shipmentData"
        :OS="OS"
        :genCodeList="genCodeList"
      />
    </template>
  </ShippingModal>
</template>

<script setup lang="ts">
import TableComponent from "@/components/custom-table/index.vue"
import ShippingMasterModal from "@/components/modal/ShipmentModal.vue"
import ColumnAttributes from "@/models/column-attributes.model"
import { ref, onMounted, reactive, Ref } from "vue"
import SearchComponent from "@/components/tabs/search-button/index.vue"
import ShippingModal from "@/components/modal/index.vue"
import ShippingService from '@/services/shipping.service'
import DisplayGenCode from "@/utils/DisplayGenCode"
import Shipping from "@/models/Shipping";
import AppConstants from "@/constants/constants";
import ShippingResponse from "@/models/response/shipping-response.model";
import Procurement from "@/models/procurement.model";
import AssetManagement from "@/models/AssetManagement";
import AccountInfo from "@/models/AccountInfo";
import useAlert from "@/utils/alert"
import { update } from "lodash";

const { alertMessage } = useAlert();
const tabExpanded = ref(false);
const shippingMasterRef = ref <InstanceType<typeof ShippingModal> | null>(null);
const shippingMasterModalRef = ref<InstanceType<typeof ShippingMasterModal>| null>(null);
let shippingSearch = reactive({
  deletedRecordDisplayMode: 0,
  pageNum: 1,
  pageSize: 10,
  shippingStatus: null,
  shippingReceptionStatus: null,
  completedOnFrom: null,
  completedOnTo: null,
  groupId: null,
  accountId: null,
  assetId: null,
  orderId: null,
  shippingLate: null,
});

let shippingStatusList = ref<any[]>([])

let shippingReceptionStatusList = ref<any[]>([])

let genCodeList = ref<any[]>([])

let shippingLateList = ref<any[]>([
  { value: 0, title: '全て' },
  { value: 1, title: '出荷遅延' }
])

const OS = ref<any[]>([
  { value: '1', text: 'IOS' },
  { value: '2', text: 'Android' },
])

let shipmentData: Ref<ShippingResponse> = ref({
  shippingInfo: {} as Shipping,
  procurementInfo: {} as Procurement,
  assetInfo: {} as AssetManagement,
  accountInfo: null as unknown as AccountInfo
})

let table = reactive({
  total: 1,
  columns: {
    labels: ['出荷受付ステータス', '出荷遅延', '出荷受付ID', '出荷依頼元', '利用開始日', '出荷日', '元資産ID', '出荷資産ID', '利用会社/組織', '利用者'],
    fields: ['shippingStatus', 'shippingLate', 'shippingId', 'shippingReceptionType', '', 'estimatedShippingDate', 'asset.assetId', 'arrivalId', '', 'accountId'],
    columnsWidth: [120, 120, 120, 120, 120, 120, 120, 120, 120, 120],
    clickableColumn: [false, false, true],
  } as ColumnAttributes,
  datas: reactive([] as Shipping[]),
  tableHeight: 400
})

let dateTimeFormat = reactive({
  createdTime: '',
  updatedTime: '',
  deletedTime: ''
});

onMounted(async () => {
  await shippingList();
  await buildShippingDataByGenCode();
})

const buildShippingDataByGenCode = async () => {
  genCodeList.value = await DisplayGenCode.getGenCode();
  shippingStatusList.value = DisplayGenCode.getListGenCodeLabel(AppConstants.TABLE_SHIPPING, AppConstants.SHIPPING_STATUS, genCodeList.value);
  shippingReceptionStatusList.value = DisplayGenCode.getListGenCodeLabel(AppConstants.TABLE_SHIPPING, AppConstants.SHIPPING_RECEPTION_STATUS, genCodeList.value);
}

/**
 * モーダル追加編集項目を表示
 * @param shippingId 配送ID
 */
const handleAddEditItem = async (shippingId: number, shipping: any) => {
  const assetId = shipping ? shipping.assetId : 0;
  await getData(assetId);
  shippingMasterRef.value?.openModal(assetId, shipmentData?.value?.shippingInfo.isDeleted);
};

/**
 * 条件別データ情報取得
 * @param dataSearch データ取得条件
 */
const getData = async (assetId: number) => {
  try {
    if (assetId === 0) {
      return
    }
    const response = await ShippingService.get({ assetId });
    shipmentData.value = response;
    dateTimeFormat.createdTime = shipmentData.value.shippingInfo.createdAt || '';
    dateTimeFormat.updatedTime = shipmentData.value.shippingInfo.modifiedAt || '';
    dateTimeFormat.deletedTime = shipmentData.value.shippingInfo.deletedAt || '';
  } catch(error) {
    console.log(error);
  }
}


const shippingList = async (shippingSearch: Object = {}) => {
    const response = await ShippingService.getAll(shippingSearch);
    table.datas = response.shippingList || [];
    table.total = response.totalRecords || 0;
}

const searchItem = () => {
  let dataSearch = {
    deletedRecordDisplayMode: shippingSearch.deletedRecordDisplayMode,
    pageNum: shippingSearch.pageNum,
    pageSize: shippingSearch.pageSize,
    shippingStatus: shippingSearch.shippingStatus,
    shippingReceptionStatus: shippingSearch.shippingReceptionStatus,
    shippingLate: shippingSearch.shippingLate,
    completedOnFrom: shippingSearch.completedOnFrom,
    completedOnTo: shippingSearch.completedOnTo,
    groupId: shippingSearch.groupId,
    accountId: shippingSearch.accountId,
    assetId: shippingSearch.assetId,
    orderId: shippingSearch.orderId
  }
  shippingList(dataSearch)
}

const clearSearchItem = () => {
  shippingSearch.deletedRecordDisplayMode = 0
  shippingSearch.pageNum = 1
  shippingSearch.pageSize = 10
  shippingSearch.shippingStatus = null
  shippingSearch.shippingReceptionStatus = null
  shippingSearch.shippingLate = null
  shippingSearch.completedOnFrom = null
  shippingSearch.completedOnTo = null
  shippingSearch.groupId = null
  shippingSearch.accountId = null
  shippingSearch.assetId = null
  shippingSearch.orderId = null
}

/**
 * イベントセーブメーカーアイテム
 * @param data メーカーのデータ
 * @param isAddItem モーダルを追加
 */
const doSave = async (isAddItem: Ref) => {
  const validForm = await shippingMasterModalRef.value?.validateForm();
  if (!validForm.valid) {
    return
  }
  addShipping(isAddItem.value);
  shippingMasterRef.value?.handleOnClose();
}

const addShipping = async (isAddAsset: boolean) => {
  const estimatedShippingDate = shipmentData.value.shippingInfo.estimatedShippingDate;
  const assetId = shipmentData.value.assetInfo.assetId;
  const accountId = shipmentData.value.accountInfo.accountId;
  const usingFrom = shipmentData.value.assetInfo.usingFrom;
  const usingTo = shipmentData.value.assetInfo.usingTo;
  const note = shipmentData.value.shippingInfo.note;
  const shippingObj = {
    estimatedShippingDate,
    accountId,
    assetId,
    usingFrom,
    usingTo,
    note
  }
  const response = isAddAsset ? await ShippingService.add(shippingObj) : await ShippingService.update(shippingObj);
  if (response.message) {
    alertMessage(response.message, response.status);
  }
}

/**
 * イベント削除メーカーアイテム
 * @param itemId アイテムメーカーID
 */
const handleOnDeleteItem = async (itemId: number) => {
  try {
    // await itemListService.delete({itemId});
  } catch(error) {
    console.log(error);
  }
}

const handleOnClose = () => {
  shipmentData.value = {
    shippingInfo: {} as Shipping,
    procurementInfo: {} as Procurement,
    assetInfo: {} as AssetManagement,
    accountInfo: null as unknown as AccountInfo
  } as ShippingResponse

}

</script>

<style lang="scss" scoped>
.form-search {
  display: flex;
  align-items: center;
}
.top-form {
  border: 1px solid black
}
.bottom-form {
  border: 1px solid black
}
.container-table {
  padding: 16px 0px 0px 0px
}
.button-table {
  margin-top: 25px;
  margin-left: 20px;
}
</style>
