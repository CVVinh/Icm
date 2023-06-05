<template>
  <v-container class="pt-0">
    <SearchComponent @onSearch="onClickSearch" v-model:deleted-record-display-mode="searchState.deletedRecordDisplayMode"
      @onClear="onClickClear" v-model:isModal="isModal">
      <template v-slot:searchForm>
        <div>検索条件</div>
        <v-form class="pt-3">
          <v-row no-gutters>
            <v-col :cols="2">
              <div class="form-item">
                <v-text-field label="品目ID" class="" v-model="searchState.itemId" variant="underlined" hide-details />
              </div>
            </v-col>
            <v-col :cols="2" class="ml-3">
              <div class="form-item">
                <v-text-field label="品目名称" class="" v-model="searchState.itemName" variant="underlined" hide-details />
              </div>
            </v-col>
          </v-row>
          <v-row no-gutters>
            <v-col :cols="1">
              <div class="form-item">
                <v-text-field label="JANコード" class="" variant="underlined" hide-details v-model="searchState.janCode" />
              </div>
            </v-col>
            <v-col :cols="1" class="ml-3">
              <div class="form-item">
                <v-select label="メーカー名称" class="pt-0 form-selection" :items="mstMakers" item-title="makerName"
                  item-value="makerId" v-model="searchState.makerId" variant="underlined">
                </v-select>
              </div>
            </v-col>
            <v-col :cols="1" class="ml-3">
              <div class="form-item">
                <v-text-field label="メーカー型番" class="" variant="underlined" hide-details
                  v-model="searchState.makerModel" />
              </div>
            </v-col>

            <v-col :cols="1" class="ml-3">
              <div class="form-item">
                <v-select label="OS" class="pt-0 form-selection" variant="underlined" hide-details :items="OS"
                  v-model="searchState.osId" item-title="text" item-value="value" placeholder="" />
              </div>
            </v-col>
          </v-row>
        </v-form>
        <br />
      </template>
    </SearchComponent>
  </v-container>
  <v-container class="pt-0">
    <CommonTable v-on:click-detail="onAddItem" :column-attrs="tableState.tableAttrs" :data="tableState.data"
      :total="tableState.total" @page="onPage" v-model:pageSize="searchState.pageSize"
      v-model:pageNum="searchState.pageNum" @refresh-data="onRefreshData" :table-height="350" :customBodyTable="true">
      <template v-slot:customTableBody>
        <tr v-for="item in tableState.data">
          <td v-for="(field, index) in tableState.tableAttrs.fields" :class="[
            'border-table',
            { 'text-center': typeof field === 'number' },
          ]" :style="{
  textDecoration: tableState.tableAttrs.clickableColumn[index]
    ? 'underline'
    : '',
  cursor: tableState.tableAttrs.clickableColumn[index]
    ? 'pointer'
    : '',
  color: tableState.tableAttrs.clickableColumn[index] ? 'blue' : '',
}" @click="tableState.tableAttrs.clickableColumn[index]">
            <v-text-field v-if="field === 'quantity'" type="number" variant="underlined" v-model.number="item.quantity"
              hide-details />
            <span v-else-if="field !== 'button'">{{ item[field] }}</span>
            <span class="btn-add" v-else @click="onAddItem(item)">選択</span>
          </td>
        </tr>
      </template>
    </CommonTable>
  </v-container>
</template>

<script setup lang="ts">
import { reactive, onMounted, ref } from "vue";
import TabDetailModel from "@/models/tab-detail.model";
import CommonTable from "@/components/custom-table/index.vue";
import ColumnAttributes from "@/models/column-attributes.model";
import ItemSetForm from "@/components/form-component/item-set-form.component.vue";
import ItemMaster from "@/models/ItemMaster";
import AppConstants from "@/constants/constants";
import itemListService from "@/services/ItemMaster";
import SearchComponent from "@/components/tabs/search-button/index.vue";
import MakerService from "@/services/maker.service";

const dialogListItemProcurement = ref(false);
const displayProcurement = ref("content1");
const isModal = ref(true);
const dataItem = ref<any>([]);
let mstMakers = ref<any[]>([]);

const OS = ref<any[]>([
  { value: 0, text: 'IOS' },
  { value: 1, text: 'Android' },
])
const tableState = reactive({
  tableAttrs: {
    labels: ["品目ID", "型番", "品目名称", "金額(税込)", "数量", ""],
    fields: ["itemId", "makerModel", "itemName", "price", "quantity", "button"],
    clickableColumn: [true],
    columnsWidth: [250, 250, 250, 250, 250, 100],
  } as ColumnAttributes,
  data: [] as ItemMaster[],
  total: 0,
});

const handleClickTab = (tab: string) => {
  displayProcurement.value = tab;
};
let searchState = reactive({
  itemId: undefined,
  itemName: undefined,
  janCode: undefined,
  assetType: 1,
  makerId: undefined,
  makerModel: undefined,
  osId: undefined,
  deletedRecordDisplayMode: 0,
  pageNum: 1,
  pageSize: 10,
});

let itemset = ref({
  itemId: undefined,
  itemName: undefined,
  assetType: undefined,
  makerId: undefined,
  makerModel: undefined,
  expirationDateFrom: undefined,
  expirationDateTo: undefined,
} as ItemMaster);

onMounted(async () => {
  // call api to get data
  await getItemSetList();
  const makerTemp = await MakerService.getAll();
  mstMakers.value = [...makerTemp?.data?.mstMakerMaster]
});

const getItemSetList = async () => {
  try {
    const response = await itemListService.getAll(searchState).then((data) => {
      tableState.data = data.mstItem;
      tableState.total = data.itemTotal;
    });
  } finally {
    // TODO on/off loading flag
  }
};

const onClickSearch = async () => {
  searchState.pageNum = 1;
  getItemSetList();
};

const onClickClear = () => {
  searchState.itemId = null;
  searchState.itemName = null;
  searchState.makerId = null;
  searchState.makerModel = null;
  searchState.osId = null;
  searchState.janCode = null;
  searchState.deletedRecordDisplayMode = 0;
  getItemSetList();
};

const onRefreshData = () => getItemSetList();

const onClickAddNewItem = () => {
  itemset.value = {
    expirationStatus: AppConstants.DEFAULT_ALL,
  } as ItemMaster;
};

const onPage = () => getItemSetList();

const emit = defineEmits(["onAddItem"]);
const onAddItem = async (item: any) => {
  await itemListService.get({ itemId: item.itemId }).then((data) => {
    dataItem.data = data.itemInfo;
    let negativeNumber = item.quantity || 1;
    let positiveNumber = Math.abs(negativeNumber);
    let objectItem = {
      item: data.itemInfo,
      quantity: positiveNumber,
    };
    emit("onAddItem", objectItem);
  });
};
</script>

<style lang="scss" scoped>
.border-table {
  border: thin solid black;
}

.btn-add {
  text-decoration: underline;
  color: blue;
  cursor: pointer;
}
</style>
