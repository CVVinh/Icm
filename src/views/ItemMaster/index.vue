<template>
  <div class="elevation-5">
    <SearchComponent
      @onSearch="searchItem(true)"
      @onClear="clearSearchItem"
      v-model:deleted-record-display-mode="itemMasterSearch.deletedRecordDisplayMode"
      v-model:tab-expanded="tabExpanded"
    >
      <template v-slot:searchForm>
        <v-form class="pb-3">
          <v-row class="form-search">
            <v-col cols="2">
              <div class="form-input">
                <vc-input
                  v-model="itemMasterSearch.itemId"
                  id="input-id"
                  variant="underlined"
                  label="品目ID"
                  density="compact"
                  hide-details />
              </div>
            </v-col>
            <v-col cols="3">
              <div class="form-input">
                <vc-input
                  v-model="itemMasterSearch.itemName"
                  id="input-name"
                  variant="underlined"
                  label="品目名称(前方一致)"
                  density="compact"
                  hide-details />
              </div>
            </v-col>
            <v-col cols="2">
              <div class="form-input">
                <vc-input
                  v-model="itemMasterSearch.janCode"
                  id="input-name"
                  variant="underlined"
                  label="JANコード"
                  density="compact"
                  hide-details />
              </div>
            </v-col>
            <v-col cols="2">
              <div class="form-input">
                <vc-input
                  v-model="itemMasterSearch.makerId"
                  id="input-name"
                  variant="underlined"
                  label="メーカー"
                  density="compact"
                  hide-details />
              </div>
            </v-col>
            <v-col cols="2">
              <div class="form-input">
                <vc-input
                  v-model="itemMasterSearch.makerModel"
                  id="input-name"
                  variant="underlined"
                  label="メーカー型番"
                  density="compact"
                  hide-details />
              </div>
            </v-col>
          </v-row>
          <v-row class="form-search">
            <v-col cols="2">
              <div class="form-selection">
                <vc-select
                  v-model="itemMasterSearch.assetType"
                  label="タイプ"
                  variant="underlined"
                  density="comfortable"
                  :items="listAssetType"
                  item-title="fieldDisplayLabel"
                  item-value="fieldValue"
                  class="table-submit-elements"
                  style="min-width: 160px; max-width: 220px"
                />
              </div>
            </v-col>
            <v-col cols="2">
              <div class="form-selection">
                <vc-select
                  v-model="itemMasterSearch.exStatus"
                  variant="underlined"
                  density="comfortable"
                  :items="exStatusList"
                  label="期間有効品目"
                  item-title="text"
                  item-value="value"
                  class="table-submit-elements"
                  style="min-width: 160px; max-width: 220px"
                >
                </vc-select>
              </div>
            </v-col>
            <v-col cols="2">
              <div class="form-input">
                <vc-input-date
                  label="有効期間(From)"
                  v-model="itemMasterSearch.expirationDateFrom"
                ></vc-input-date>
              </div>
            </v-col>
            <v-col cols="2">
              <div class="form-input">
                <vc-input-date
                  label="有効期間(To)"
                  v-model="itemMasterSearch.expirationDateTo"
                ></vc-input-date>
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
        v-model:page-size="itemMasterSearch.pageSize"
        v-model:pageNum="itemMasterSearch.pageNum"
        @page="itemList"
        @click-detail="handleAddEditItem"
        @refresh-data="searchItem"
        :customBodyTable="true"
      >
        <template v-slot:buttonTable>
          <v-btn class="ml-3" @click="handleAddEditItem()">新規</v-btn>
        </template>
        <template v-slot:customTableBody>
          <tr v-for="item in table.datas">
            <td v-for="(field, index) in table.columns.fields" :class="['border-table', { 'text-center': (typeof field === 'number')}]"
              :style="{ textDecoration: table.columns.clickableColumn[index] ? 'underline' : '', cursor: table.columns.clickableColumn[index] ? 'pointer' : '', color: table.columns.clickableColumn[index] ? 'blue' : '' }"
              @click="table.columns.clickableColumn[index] && handleAddEditItem(item[field])">
              <span> {{ displayLabel(item, field) }} </span>
            </td>
          </tr>
        </template>
      </TableComponent>
    </div>

    <ItemModal
      ref="itemMasterRef"
      modalId="itemMaster"
      modalName="マスター管理　＞ 品目マスタ詳細"
      :dateTimeForm="dateTimeFormat"
      @on-save="doSave"
      @on-delete="handleOnDeleteItem"
      @on-close="handleOnClose"
    >
      <template v-slot:contentModal>
        <ItemMasterModal
          ref="itemMasterModalRef"
          v-model="itemMaster"
          :itemDeletedFlag="itemMaster?.isDeleted === 1"
          :listAssetType="listAssetType"
          :OS="OS"
          :mstMakers="mstMakers"
        />
      </template>
    </ItemModal>
</template>

<script setup lang="ts">
import TableComponent from "@/components/custom-table/index.vue"
import ItemMasterModal from "@/components/modal/ItemMasterModal.vue"
import { ref, onMounted, reactive, Ref } from "vue"
import itemListService from '@/services/ItemMaster'
import ItemMaster from "@/models/ItemMaster"
import SearchComponent from "@/components/tabs/search-button/index.vue"
import moment from 'moment';
import MakerService from "@/services/maker.service";
import ItemModal from "@/components/modal/index.vue"
import { useStore } from "@/store/index";
import ColumnAttributes from "@/models/column-attributes.model";
import GenCodeService from '@/services/genCode.service'
import GenCode from '@/models/GenCode';
import AppConstants from "@/constants/constants";
import CustomValueTable from "@/utils/customValueTable";

const store = useStore()
const tabExpanded = ref(false);
const itemMasterRef = ref <InstanceType<typeof ItemModal> | null>(null)
const itemMasterModalRef = ref<InstanceType<typeof ItemMasterModal>| null>(null);
let itemMasterSearch: ItemMaster = reactive({
  itemId: null,
  exStatus: null,
  itemName: null,
  janCode: null,
  makerId: null,
  makerModel: null,
  deletedRecordDisplayMode: 0,
  assetType: null,
  expirationDateFrom: null,
  expirationDateTo: null,
  pageNum: 1,
  pageSize: 10,
} as unknown as ItemMaster)
let listAssetType: Ref<GenCode[]> =ref([])

const OS = ref<any[]>([
  { value: 0, text: 'IOS' },
  { value: 1, text: 'Android' },
])

const exStatusList = ref<any[]>([
  { value: 0, text: 'すべて' },
  { value: 1, text: '有効のみ' },
])

let mstMakers = ref<any[]>([])
let itemMaster: Ref<ItemMaster> = ref({})

let table = reactive({
  total: 1,
  columns: {
    labels: ['品目ID', '品目名称', 'タイプ', 'JANコード', 'メーカー', 'メーカー型番', '有効期間(From)', '有効期間(To)'],
    fields: ['itemId', 'itemName', 'assetType', 'janCode', 'maker.makerName', 'makerModel', 'expirationDateFrom', 'expirationDateTo'],
    columnsWidth: [180, 180, 180, 180, 180, 180, 180, 180, 180],
    clickableColumn: [true],
  } as ColumnAttributes,
  datas: reactive([] as ItemMaster[]),
  tableHeight: 400
})

let dateTimeFormat = reactive({
  createdTime: '',
  updatedTime: '',
  deletedTime: ''
});

onMounted(async () => {
  await itemList()
  const makerTemp = await MakerService.getAll();
  await getGenCode()
  mstMakers.value = [...makerTemp?.data?.mstMakerMaster]
})

const getGenCode = async () => {
  listAssetType.value = await (await GenCodeService.getAll({tableName: AppConstants.MASTER_ITEM})).mstGenCode;
}

/**
 * モーダル追加編集項目を表示
 * @param itemId アイテムメーカーID
 */
const handleAddEditItem = async (itemId: any = null) => {
  await getData(itemId || -1);
  itemMasterRef.value?.openModal(itemId, itemMaster?.value?.isDeleted);
};

/**
 * 条件別データ情報取得
 * @param dataSearch データ取得条件
 */
const getData = async (itemId: number) => {
  try {
    if (itemId === -1) {
      return
    }
    const response = await itemListService.get({itemId});
    itemMaster.value = response.itemInfo;
    dateTimeFormat.createdTime = itemMaster.value.createdAt || '';
    dateTimeFormat.updatedTime = itemMaster.value.modifiedAt || '';
    dateTimeFormat.deletedTime = itemMaster.value.deletedAt || '';
  } catch(error) {
    console.log(error);
  }
}


const itemList = async (itemSearch: any = null) => {
  if (itemSearch) {
    const response = await itemListService.getAll(itemSearch);
    table.datas = response.mstItem
    table.total = response.itemTotal
  } else {
    const response = await itemListService.getAll(itemMasterSearch);
    table.datas = response.mstItem
    table.total = response.itemTotal
  }
}

const searchItem = (isSearch = false) => {
  let dataSeach = {
    itemId: itemMasterSearch.itemId,
    itemName: itemMasterSearch.itemName,
    janCode: itemMasterSearch.janCode,
    makerId: itemMasterSearch.makerId,
    makerModel: itemMasterSearch.makerModel,
    deletedRecordDisplayMode: itemMasterSearch.deletedRecordDisplayMode,
    assetType: itemMasterSearch.assetType,
    pageNum: isSearch ? 1 : itemMasterSearch.pageNum,
    pageSize: itemMasterSearch.pageSize,
    exStatus: itemMasterSearch.exStatus,
    expirationDateFrom: itemMasterSearch.expirationDateFrom ? moment(itemMasterSearch.expirationDateFrom).format('YYYY-MM-DD') : null,
    expirationDateTo: itemMasterSearch.expirationDateTo ? moment(itemMasterSearch.expirationDateTo).format('YYYY-MM-DD') : null
  }
  itemList(dataSeach)
}

const clearSearchItem = () => {
  itemMasterSearch.itemId = null
  itemMasterSearch.itemName = null
  itemMasterSearch.janCode = null
  itemMasterSearch.makerId = null
  itemMasterSearch.makerModel = null
  itemMasterSearch.deletedRecordDisplayMode = 0
  itemMasterSearch.assetType = null
  itemMasterSearch.expirationDateFrom = null
  itemMasterSearch.expirationDateTo = null
  itemMasterSearch.price = null
  itemMasterSearch.tax = null
  itemMasterSearch.exStatus = null
}

/**
 * メッセージ設定メッセージの変更
 * @param message メッセージ文字列です
 */
const setMessage = async (message: string = '') => {
  store.dispatch('setMessage', message);
}

/**
 * ステータスによる警告メッセージの種類の変更
 * @param status 応答のステータスです
 */
const setStatusRes = async (status?: number) => {
  store.dispatch('setStatusResponse', status);
}

/**
 * 追加のイベント メーカー アイテム
 * @param data メーカーのデータ
 */
const addItem = async (data: object) => {
  let response
  try {
    response = await itemListService.add(data);
    setMessage(response?.msg);
    setStatusRes(response?.status);
  } catch(error) {
    console.log(error);
  }
}

/**
 * イベントメーカーアイテムアップデート
 * @param data メーカーのデータ
 */
const updateItem = async (data: object) => {
  let response
  try {
    response = await itemListService.update(data);
    setMessage(response?.msg);
    setStatusRes(response?.status);
  } catch(error) {
    console.log(error);
  }
}

/**
 * イベントセーブメーカーアイテム
 * @param data メーカーのデータ
 * @param isAddItem モーダルを追加
 */
const doSave = async (isAddItem: Ref) => {
  const validForm = await itemMasterModalRef.value?.validateForm();
  if (!validForm.valid) {
    return
  }
  if (isAddItem.value) {
    await addItem(itemMaster.value);
  } else {
    await updateItem(itemMaster.value);
  }
  searchItem();
  itemMasterRef.value?.handleOnClose();
}

/**
 * イベント削除メーカーアイテム
 * @param itemId アイテムメーカーID
 */
const handleOnDeleteItem = async (itemId: number) => {
  try {
    const response = await itemListService.delete({itemId});
    setMessage(response?.msg);
    setStatusRes(response?.status);
    searchItem();
  } catch(error) {
    console.log(error);
  }
}

const handleOnClose = () => {
  itemMaster.value = reactive({}) as ItemMaster;
}

/**
 * 調達テーブルにテキスト値を表示
 * @param item は調達テーブルのアイテムです
 * @param field 調達テーブル内のアイテムのプロパティです
 * @return {string} 調達表記録値
 */
const displayLabel = (item: any, field: string): string => {
  switch (field) {
    case "assetType":
      const assetTypeText =
        listAssetType.value.find(status => item.assetType === status.fieldValue)?.fieldDisplayLabel || "";
      return assetTypeText;
    default:
      break;
  }
  return CustomValueTable.setValueTable(item, field);
}

</script>

<style lang="scss" scoped>
.form-search {
  display: flex;
  align-items: center;
}

.container-table {
  padding: 16px 0px 0px 0px
}
</style>
