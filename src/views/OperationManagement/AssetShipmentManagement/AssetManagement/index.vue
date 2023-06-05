<template>
  <div class="elevation-5">
  <SearchComponent
    @onSearch="fetchData"
    @onClear="onClear"
    v-model:deleted-record-display-mode="dataSearch.deletedRecordDisplayMode"
    v-model:tab-expanded="tabExpanded"
  >
    <template v-slot:searchForm>
      <v-container class="pt-0 pl-0">
        <h4>検索条件</h4>
      </v-container>
      <v-container class="px-0 pb-0">
        <v-form class="pb-3">
          <v-row>
            <v-col cols="2">
              <vc-select label="資産ステータス" name="資産ステータス" v-model="dataSearch.assetStatus" :items="statusAssetList" />
            </v-col>
            <v-col cols="2">
              <vc-select label="出荷遅延" name="出荷遅延" v-model="dataSearch.shippingDelay" :items="shipList" />
            </v-col>
            <v-col cols="3">
              <vc-select label="リース・レンタル期限" name="リース・レンタル期限" v-model="dataSearch.leasePeriod" :items="leaseList" />
            </v-col>
            <v-col cols="2">
              <vc-input label="利用会社/組織" name="利用会社/組織" v-model="dataSearch.userCompany" />
            </v-col>
            <v-col cols="2">
              <vc-input density="compact" variant="underlined" label="利用者" name="利用者" v-model="dataSearch.accountId" />
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="2">
              <vc-input label="品目ID" name="品目ID" type="number" v-model="dataSearch.itemId" />
            </v-col>
            <v-col cols="2">
              <vc-input density="compact" variant="underlined" label="発注ID" name="発注ID" type="number" v-model="dataSearch.orderId" />
            </v-col>
            <v-col cols="2">
              <vc-input density="compact" variant="underlined" label="資産ID" name="資産ID" type="number" v-model="dataSearch.assetId" />
            </v-col>
          </v-row>
        </v-form>
      </v-container>
    </template>
    <template v-slot:expansion-area>
      <v-container class="px-0">
        <v-form>
          <v-row>
            <v-col :cols="3">
              <vc-input-date label="資産開始日" v-model="dataSearch.assetFrom" />
            </v-col>
            <v-col :cols="3">
              <vc-input-date label="資産終了日" v-model="dataSearch.assetTo" />
            </v-col>
            <v-col :cols="3">
              <vc-select label="資産区分" v-model="dataSearch.assetType" :items="typeAssetList" />
            </v-col>
          </v-row>
        </v-form>
      </v-container>
    </template>
  </SearchComponent>
  </div>
  <div class="elevation-5 mt-4">
    <CommonTable
      :column-attrs="state.tableAttrs"
      :data="state.dataTable"
      :total="state.total"
      :tableHeight="state.tableHeight"
      :btnAddItem="false"
      v-model:page-size="dataSearch.pageSize"
      v-model:pageNum="dataSearch.pageNum"
      @click-detail="handleAddEditItem"
      @refresh-data="fetchData"
      @page="fetchData"
    >
      <template v-slot:rightToolbar>
        <div class="d-flex justify-end">
          <v-btn class="ml-3" @click="exportCSV">CSV出力</v-btn>
        </div>
      </template>
      <template #cell(assetStatus)="{ value }">
        <span>{{ displayTextSelectField(value, 't_asset') }}</span>
      </template>
      <template #cell(assetType)="{ value }">
        <span>{{ displayTextSelectField(value, 't_asset') }}</span>
      </template>
      <template #cell(kittingStatus)="{ value }">
        <span>{{ displayTextSelectField(value, 't_kitting') }}</span>
      </template>
      <template #cell(shippingStatus)="{ value }">
        <span>{{ displayTextSelectField(value, 't_shipping') }}</span>
      </template>
      <template #cell(pickUpStatus)="{ value }">
        <span>{{ displayTextSelectField(value, 't_pick_up') }}</span>
      </template>
      <template #cell(repairingStatus)="{ value }">
        <span>{{ displayTextSelectField(value, 't_repairing') }}</span>
      </template>
      <template #cell(disposalStatus)="{ value }">
        <span>{{ displayTextSelectField(value, 't_disposal') }}</span>
      </template>
      <template #cell(usingStatus)="{ value }">
        <span>{{ displayTextSelectField(value, 't_use') }}</span>
      </template>
    </CommonTable>
  </div>
  <CommonModal
    ref="commonModalRef"
    modalId="assetMaster"
    modalName="資産運用管理 > 資産詳細"
    :dateTimeForm="dateTimeFormat"
    :show-delete-btn="false"
    :show-add-update-btn="false"
    @on-close="handleOnClose"
  >
    <template v-slot:contentModal>
      <AssetManagementModal
        v-model="assetData"
        :genCodeList="genCodeList"
        :typeAssetList="typeAssetList"
        :statusAssetList="statusAssetList"
        :makerMaster="makerMaster"
      />
    </template>
  </CommonModal>
  <KittingDetailModal ref="kittingModalRef" :genCodeList="genCodeList" :mstAccount="mstAccount" />
  <ShippingDetailModal ref="shippingModalRef" :genCodeList="genCodeList" :mstAccount="mstAccount" />
  <PickupDetailModal ref="pickupModalRef" :genCodeList="genCodeList" :mstAccount="mstAccount" />
  <RepairingDetailModal ref="repairingModalRef" :genCodeList="genCodeList" :mstAccount="mstAccount" />
  <DisposalDetailModal ref="disposalModalRef" :genCodeList="genCodeList" :mstAccount="mstAccount" />
</template>
<script setup lang="ts">
import vcInput from '@/components/commons/vc-input.vue';
import vcSelect from '@/components/commons/vc-select.vue';
import vcInputDate from '@/components/commons/vc-input-date.vue';
import SearchComponent from "@/components/tabs/search-button/index.vue";
import ColumnAttributes from '@/models/column-attributes.model';
import CommonTable from "@/components/custom-table/index.vue";
import CommonModal from '@/components/modal/index.vue';
import AssetManagementModal from '@/components/modal/AssetManagementModal.vue';
import { onMounted, reactive, Ref, ref } from 'vue';
import AppConstants from '@/constants/constants';
import AssetManagement from '@/models/AssetManagement';
import AssetService from '@/services/asset.service';
import GenCode from '@/models/GenCode';
import GenCodeService from '@/services/genCode.service';
import MakerMaster from '@/models/MakerMaster';
import MakerService from '@/services/maker.service';
import KittingDetailModal from '@/components/modal/KittingDetailModal.vue';
import ShippingDetailModal from '@/components/modal/ShippingDetailModal.vue';
import PickupDetailModal from '@/components/modal/PickupDetailModal.vue';
import RepairingDetailModal from '@/components/modal/RepairingDetailModal.vue';
import DisposalDetailModal from '@/components/modal/DisposalDetailModal.vue';
import AccountService from '@/services/account.service';

const tabExpanded = ref(false);
const dataSearch = reactive({
  assetStatus: null,
  shippingDelay: null,
  leasePeriod: null,
  userCompany: null,
  accountId: null,
  itemId: null,
  orderId: null,
  assetId: null,
  procurementId: null,
  assetFrom: null,
  assetTo: null,
  assetType: null,
  pageSize: 10,
  pageNum: 1,
  deletedRecordDisplayMode: 0
});
const shipList = ['全て', '出荷遅延'];
const leaseList = ['全て', '期限切れ'];
const statusAssetList: Ref<any[]> = ref([]);
const typeAssetList: Ref<any[]> = ref([]);
const state = reactive({
  total: 10,
  tableAttrs: {
    labels: ["資産ステータス", "資産ID", "資産名称", "資産区分", "利用者", "PCセットID", "キッティング", "出荷", "集荷", "修理", "廃棄", "Using Status"],
    fields: ["assetStatus", "assetId", "assetNameKana", "assetType", "user", "pcSetId", "kittingStatus", "shippingStatus", "pickUpStatus", "repairingStatus", "disposalStatus", "usingStatus"],
    clickableColumn: [false, true, false, false, false, false, true, true, true, true, true, false],
    columnsWidth: [120, 100]
  } as ColumnAttributes,
  tableHeight: 370,
  dataTable: [
  ] as AssetManagement[],
});
let dateTimeFormat = reactive({
  createdTime: '',
  updatedTime: '',
  deletedTime: ''
});
const commonModalRef = ref<InstanceType<typeof CommonModal> | null>(null);
const kittingModalRef = ref<InstanceType<typeof KittingDetailModal> | null>(null);
const shippingModalRef = ref<InstanceType<typeof ShippingDetailModal> | null>(null);
const pickupModalRef = ref<InstanceType<typeof PickupDetailModal> | null>(null);
const repairingModalRef = ref<InstanceType<typeof RepairingDetailModal> | null>(null);
const disposalModalRef = ref<InstanceType<typeof DisposalDetailModal> | null>(null);

const genCodeList: Ref<any> = ref([]);
const mstAccount: Ref<any> = ref([]);
let assetData: Ref<AssetManagement> = ref({});
let makerMaster: Ref<MakerMaster> = ref({});

onMounted(async () => {
  await fetchData();
  await buildDataGenCode();
  await buildDataAccount();
});

const fetchData = async () => {
  const response = await AssetService.getAll(dataSearch);
  state.dataTable = response.assetList || [];
  state.total = response.totalRecords;
};

const buildDataAccount = async () => {
  mstAccount.value = (await AccountService.getList()).mstAccount;
};

/**
 * gen code を使用したデータの構築
 */
const buildDataGenCode = async () => {
  statusAssetList.value = [];
  typeAssetList.value = [];
  genCodeList.value = [];
  genCodeList.value = await displayListGenCode();
  statusAssetList.value = await getListGenCodeAsset(AppConstants.TABLE_ASSET, 'assetStatus');
  typeAssetList.value = await getListGenCodeAsset(AppConstants.TABLE_ASSET, 'assetType');
};

/**
 * gen code アセットを取得する
 * @param tableName テーブル名
 * @param fieldName フィールド名
 */
const getListGenCodeAsset = async (tableName: string, fieldName: string) => {
  let statusList: GenCode[] = [];
  statusList = await genCodeList.value.filter((genCode: GenCode) => genCode.tableName === tableName && genCode.fieldName === fieldName);
  return statusList.map((assetStatus) => {
    const statusAsset = {
      value: assetStatus.fieldValue,
      title: assetStatus.fieldDisplayLabel
    };
    return statusAsset;
  });
};

/**
 * データベースで gen code を取得する
 * @param tableName テーブル名
 * @param fieldName フィールド名
 */
const displayListGenCode = async (tableName: string = '', fieldName: string = '') => {
  let dataParam = {};
  if (tableName && fieldName) {
    dataParam = { tableName, fieldName };
  }
  const genCodeList = await GenCodeService.getAll(dataParam);
  return genCodeList?.mstGenCode || [];
};

/**
 * gen code でラベルを取得
 * @param tableName テーブル名
 * @param value アイテム値
 */
const getGenCodeLabel = (tableName: string, value: number) => {
  const genCodeLabel = genCodeList.value.find((status: GenCode) => status.tableName === tableName && value === status.fieldValue)?.fieldDisplayLabel;
  return genCodeLabel || '';
};

/**
 * gen code フィールドの値をテキストに変更します
 * @param value アイテム値
 * @param tableName テーブル名
 */
const displayTextSelectField = (value: number, tableName: string) => {
  const labelStatus = getGenCodeLabel(tableName, value);
  return labelStatus || '';
};

/**
 * モーダル表示とモーダル設定値
 * @param id アイテムのID
 * @param field テーブルのフィールド名
 */
const handleAddEditItem = async (id: number = 0, item: any) => {
  if (item.field !== 'assetId') {
    handleOpenDetailModal(item.field, item.assetId);
    return;
  }
  assetData.value = await getAssetItem(id);
  dateTimeFormat.createdTime = assetData.value.createdAt || '';
  dateTimeFormat.updatedTime = assetData.value.modifiedAt || '';
  dateTimeFormat.deletedTime = assetData.value.deletedAt || '';
  await getMakerMaster(id || 0);
  commonModalRef.value?.openModal(id);

};
/**
 * アセット アイテム フィールドと資産IDで詳細モーダルを開く
 * @param field 資産項目のフィールド名
 * @param assetId 資産アイテムの資産ID
 */
const handleOpenDetailModal = (field: string, assetId: number) => {
  switch (field) {
    case 'kittingStatus':
      kittingModalRef.value?.handleOpenModal(assetId);
      break;
    case 'shippingStatus':
      shippingModalRef.value?.handleOpenModal(assetId);
      break;
    case 'pickUpStatus':
      pickupModalRef.value?.handleOpenModal(assetId);
      break;
    case 'repairingStatus':
      repairingModalRef.value?.handleOpenModal(assetId);
      break;
    case 'disposalStatus':
      disposalModalRef.value?.handleOpenModal(assetId);
      break;
  }
};

/**
 * メーカーマスターフォームデータベースを取得
 * @param makerId メーカーID
 */
const getMakerMaster = async (makerId: number) => {
  if (!makerId) {
    makerMaster.value = {};
    return;
  }
  makerMaster.value = await MakerService.get({ makerId });
};

const getAssetItem = async (assetId: number) => {
  const dataParam = { assetId };
  const response = await AssetService.get(dataParam);
  return response;
};

/**
 * クリア条件検索
 */
const onClear = () => {
  dataSearch.assetStatus = null;
  dataSearch.shippingDelay = null;
  dataSearch.leasePeriod = null;
  dataSearch.deletedRecordDisplayMode = 0;
  dataSearch.userCompany = null;
  dataSearch.accountId = null;
  dataSearch.itemId = null;
  dataSearch.orderId = null;
  dataSearch.assetId = null;
  dataSearch.procurementId = null;
  dataSearch.assetFrom = null;
  dataSearch.assetTo = null;
  dataSearch.assetType = null;
};

/**
 * エクスポート ファイル csv
 */
const exportCSV = () => {
  try {
    const dataSearchAll = {
      deletedRecordDisplayMode: dataSearch.deletedRecordDisplayMode || 0,
      pageNum: dataSearch.pageNum || 1,
      procurementId: dataSearch.procurementId || null,
      itemId: dataSearch.itemId || null,
      accountId: dataSearch.accountId || null,
      assetId: dataSearch.assetId || null,
      assetStatus: dataSearch.assetStatus || null,
      assetFrom: dataSearch.assetFrom || null,
      assetTo: dataSearch.assetTo || null,
      assetType: dataSearch.assetType || null,
    };
    AssetService.exportCSV(dataSearchAll);
  } catch (error) {
    console.log(error);
  }
};

const handleOnClose = () => {
  assetData.value = {} as AssetManagement;
};

</script>
<style lang="scss" scoped>
.container-table {
  padding: 16px 0px 0px 0px;
}
</style>
