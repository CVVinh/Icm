<template>
  <div class="elevation-5">
    <v-container class="pt-0 pl-0">
      <SearchComponent @onSearch="onClickSearch" @onClear="onClickClear"
        v-model:deleted-record-display-mode="searchState.deletedRecordDisplayMode" v-model:tabExpanded="ActiveSearch">
        <template v-slot:searchForm>
          <v-row>
            <v-col :cols="2">
              <div class="form-input">
                <v-text-field v-model="searchState.itemIdSet" variant="underlined" label="PCセット品目ID" density="compact"
                  hide-details />
              </div>
            </v-col>
            <v-col :cols="2">
              <div class="form-input">
                <v-text-field v-model="searchState.itemSetName" variant="underlined" label="PCセット名称(前方一致)"
                  density="compact" hide-details />
              </div>
            </v-col>
            <v-col :cols="2">
              <div class="d-flex align-center">
                <v-select v-model="searchState.itemSetType" label="PCセット資産タイプ" variant="underlined" density="comfortable"
                  :items="SetType" class="table-submit-elements" style="min-width: 160px; max-width: 220px"
                  item-title="fieldDisplayLabel" item-value="fieldValue">
                </v-select>
              </div>
            </v-col>
          </v-row>
          <v-row>
            <v-col :cols="2">
              <div class="d-flex align-center">
                <v-select v-model="searchState.expirationStatus" label="期間有効品目" variant="underlined" density="comfortable"
                  :items="['すべて', '有効のみ']" class="table-submit-elements" style="min-width: 160px; max-width: 220px">
                </v-select>
              </div>
            </v-col>
            <v-col :cols="2">
              <div class="form-input">
                <vc-input-date v-model="searchState.ItemSetExpirationDateFrom" label="有効期間(From)"></vc-input-date>
              </div>
            </v-col>
            <v-col :cols="2">
              <div class="form-input">
                <vc-input-date v-model="searchState.itemSetExpirationDateTo" label="有効期間(To)"></vc-input-date>
              </div>
            </v-col>
          </v-row>
          <br />
        </template>
        <template v-slot:expansion-area>
          <v-row>
            <v-col :cols="2">
              <div class="form-input">
                <v-text-field label="メインPC品目ID" class="form-selection" v-model="searchState.mainItemId" density="compact"
                  hide-details variant="underlined" />
              </div>
            </v-col>
            <v-col :cols="2">
              <div class="d-flex align-center">
                <v-select v-model="searchState.mainAssetType" label="メインPCタイプ" variant="underlined" density="comfortable"
                  :items="['デスクトップ', 'ノート', 'タブレット']" class="table-submit-elements"
                  style="min-width: 160px; max-width: 220px">
                </v-select>
              </div>
            </v-col>
            <v-col :cols="2" class="ml-3">
              <div class="form-input">
                <v-text-field label="JANコード" class="pt-0 form-selection" v-model="searchState.mainItemJanCode"
                  density="compact" hide-details variant="underlined" />
              </div>
            </v-col>
            <v-col :cols="2">
              <div class="d-flex align-center">
                <v-select v-model="searchState.mainItemMakerId" label="メーカー" density="compact" hide-details
                  :items="mstMakers" class="table-submit-elements" style="min-width: 160px; max-width: 220px"
                  variant="underlined" item-title="makerName" item-value="makerId">
                </v-select>
              </div>
            </v-col>
            <v-col :cols="2" class="mr-3">
              <div class="form-input">
                <v-text-field label="メーカー型番" class="pt-0 form-selection" density="compact" hide-details
                  variant="underlined" v-model="searchState.mainItemMakerModel" />
              </div>
            </v-col>
            <v-col :cols="1">
              <div class="d-flex align-center">
                <v-select v-model="searchState.mainItemOsId" label="OS" variant="underlined" density="comfortable"
                  :items="['IOS', 'android']" class="table-submit-elements" style="min-width: 160px; max-width: 220px">
                </v-select>
              </div>
            </v-col>
          </v-row>
        </template>
      </SearchComponent>
    </v-container>
  </div>
  <div class="elevation-5 mt-4">
    <CommonTable :column-attrs="tableState.tableAttrs" :data="tableState.data" :total="tableState.total" @page="onPage"
      v-model:pageSize="searchState.pageSize" v-model:pageNum="searchState.pageNum" @refresh-data="onRefreshData"
      :customBodyTable="true">
      <template v-slot:buttonTable>
        <v-btn class="ml-3" @click="onClickAddNewItem()">新規</v-btn>
      </template>
      <template v-slot:rightToolbar>
        <div class="d-flex justify-end">
          <v-btn class="ml-3" @click="exportCSV">CSV出力</v-btn>
        </div>
      </template>
      <template v-slot:customTableBody>
        <tr v-for="item in tableState.data">
          <td v-for="(field, index) in tableState.tableAttrs.fields"
            :class="['border-table', { 'text-center': (typeof field === 'number') }]"
            :style="{ textDecoration: tableState.tableAttrs.clickableColumn[index] ? 'underline' : '', cursor: tableState.tableAttrs.clickableColumn[index] ? 'pointer' : '', color: tableState.tableAttrs.clickableColumn[index] ? 'blue' : '' }"
            @click="tableState.tableAttrs.clickableColumn[index] && onDetailClick(item[field])">
            <span> {{ displayLabel(item, field) }} </span>
          </td>
        </tr>
      </template>
    </CommonTable>
  </div>
  <ItemSetForm ref="activeDialogForm" @getItemSetList="getItemSetList" />
</template>



<script setup lang="ts">
import { reactive, onMounted, ref, Ref } from "vue";
import TabDetailModel from "@/models/tab-detail.model";
import CommonTable from "@/components/custom-table/index.vue";
import ColumnAttributes from "@/models/column-attributes.model";
import ItemSetForm from "@/components/form-component/item-set-form.component.vue";
import ItemSet from "@/models/ItemSet";
import AppConstants from "@/constants/constants";
import itemSetService from "@/services/itemset.service";
import SearchComponent from "@/components/tabs/search-button/index.vue";
import MakerService from "@/services/maker.service";
import GenCodeService from '@/services/genCode.service'
import GenCode from '@/models/GenCode';
import useAlert from "@/utils/alert"
import CustomValueTable from "@/utils/customValueTable";

const { removeAlertMessage } = useAlert()

const ActiveSearch = ref(false);
const activeDialogForm = ref<any>(null);
let mstMakers = ref<any[]>([])
const SetType: Ref<GenCode[]> = ref([])

const MainSetType = ref<any[]>([
  { value: 0, text: '資産区分' },
  { value: 1, text: '償却資産(PCセット)' },
  { value: 2, text: '償却資産(ソフトウェア)' },
  { value: 3, text: '消耗品' },
  { value: 4, text: 'リース' },
  { value: 5, text: 'レンタル' },
])
const tabDetails = [
  { tabName: "PCセットマスター", slot: "content2" },
] as TabDetailModel[];

const tableState = reactive({
  tableAttrs: {
    labels: [
      "品目ID",
      "資産タイプ",
      "名称",
      "品目ID",
      "資産タイプ",
      "名称",
      "有効期間(From)",
      "有効期間(To)",
    ],
    fields: [
      "itemIdSet",
      "SetType",
      "itemSetName",
      "mainItemInfo.mainItemId",
      "MainSetType",
      "mainItemInfo.mainItemName",
      "itemSetExpirationDateFrom",
      "itemSetExpirationDateTo",
    ],
    clickableColumn: [true],
    columnsWidth: [100, 250, 250, 250],
  } as ColumnAttributes,
  data: [] as ItemSet[],
  total: 0,
});

let searchState = reactive({
  itemIdSet: undefined,
  itemSetName: undefined,
  itemSetType: undefined,
  ItemSetExpirationDateFrom: undefined,
  itemSetExpirationDateTo: undefined,
  mainItemId: undefined,
  mainAssetType: undefined,
  mainItemJanCode: undefined,
  mainItemMakerId: undefined,
  mainItemMakerModel: undefined,
  mainItemOsId: undefined,
  expirationStatus: AppConstants.DEFAULT_ALL,
  deletedRecordDisplayMode: 0,
  pageNum: 1,
  pageSize: 10,
});

onMounted(async () => {
  // call api to get data
  const makerTemp = await MakerService.getAll();
  mstMakers.value = [...makerTemp?.data?.mstMakerMaster];
  SetType.value = await (await GenCodeService.getAll({ tableName: AppConstants.MASTER_ITEM })).mstGenCode;

  getItemSetList();

});

const getItemSetList = async () => {
  try {
    const response = await itemSetService.getList(searchState);
    tableState.data = response.mstItemSet;
    tableState.total = response.totalRecords;
  } finally {
    // TODO on/off loading flag
  }
};

const onClickSearch = async () => {
  searchState.pageNum = 1;
  getItemSetList();
};

const onClickClear = () => {
  searchState.itemIdSet = undefined;
  searchState.itemSetName = undefined;
  searchState.itemSetType = undefined;
  searchState.ItemSetExpirationDateFrom = undefined;
  searchState.itemSetExpirationDateTo = undefined;
  searchState.mainItemId = undefined;
  searchState.mainAssetType = undefined;
  searchState.mainItemJanCode = undefined;
  searchState.mainItemMakerId = undefined;
  searchState.mainItemMakerModel = undefined;
  searchState.mainItemOsId = undefined;
  (searchState.expirationStatus = AppConstants.DEFAULT_ALL),
    (searchState.deletedRecordDisplayMode = 0);
};

const onRefreshData = () => getItemSetList();

const onClickAddNewItem = () => {
  removeAlertMessage()
  activeDialogForm.value.openDialogFormAdd();
};

const onDetailClick = async (itemIdSet: any) => {
  removeAlertMessage()
  activeDialogForm.value.openDialogFormUpdate(itemIdSet);
};

const exportCSV = () => {
  try {
    const dataSearchAll = {
      itemIdSet: searchState.itemIdSet || null,
      itemSetName: searchState.itemSetName || null,
      itemSetType: searchState.itemSetType || null,
      ItemSetExpirationDateFrom: searchState.ItemSetExpirationDateFrom || null,
      itemSetExpirationDateTo: searchState.itemSetExpirationDateTo || null,
      deletedRecordDisplayMode: searchState.deletedRecordDisplayMode || 0,
      pageNum: searchState.pageNum || 1,
    };
    itemSetService.exportCSV(dataSearchAll);
  } catch (error) {
    console.log(error);
  }
}
/**
 * 調達テーブルにテキスト値を表示
 * @param item は調達テーブルのアイテムです
 * @param field 調達テーブル内のアイテムのプロパティです
 * @return {string} 調達表記録値
 */
const displayLabel = (item: any, field: string): string => {

  switch (field) {
    case "SetType":
      const SetTypeText =
        SetType.value.find(status => item.itemSetType === status.fieldValue)?.fieldDisplayLabel || "";
      return SetTypeText;
    case "MainSetType":
      const MainSetTypeText =
        SetType.value.find(status => item.mainItemInfo.mainAssetType === status.fieldValue)?.fieldDisplayLabel || "";

      return MainSetTypeText;
    default:
      break;
  }
  return CustomValueTable.setValueTable(item, field);
}

const onPage = () => getItemSetList();
</script>

<style lang="scss" scoped>
.form-search {
  display: flex;
  align-items: center;
}
</style>
