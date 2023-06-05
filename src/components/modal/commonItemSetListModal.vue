<template>
  <v-container class="pt-0">
    <SearchComponent @onSearch="onClickSearch" v-model:deleted-record-display-mode="searchState.deletedRecordDisplayMode"
      @on-clear="onClickClear" v-model:isModal="isModal" v-model:tab-expanded="tabExpanded">
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
                <v-text-field label="品目名称" class="" v-model="searchState.itemSetName" variant="underlined" hide-details />
              </div>
            </v-col>
          </v-row>
          <v-row no-gutters>
            <v-col :cols="1">
              <div class="form-item">
                <v-text-field label="JANコード" v-model="searchState.itemSetJanCode" class="" variant="underlined"
                  hide-details />
              </div>
            </v-col>
            <v-col :cols="1" class="ml-3">
              <div class="form-item">
                <v-select label="メーカー名称" class="pt-0 form-selection" :items="mstMakers" item-title="makerName"
                  item-value="makerId" v-model="searchState.itemSetMakerId" variant="underlined">
                </v-select>
              </div>
            </v-col>
            <v-col :cols="1" class="ml-3">
              <div class="form-item">
                <v-text-field label="メーカー型番" class="" v-model="searchState.itemSetMakerModel" variant="underlined"
                  hide-details />
              </div>
            </v-col>

            <v-col :cols="1" class="ml-3">
              <div class="form-item">
                <v-select label="OS" class="pt-0 form-selection" variant="underlined" hide-details :items="DEFAULT_OS"
                  v-model="searchState.itemSetOs" item-title="text" item-value="value" placeholder="" />
              </div>
            </v-col>
          </v-row>
        </v-form>
        <br />
      </template>
    </SearchComponent>
  </v-container>
  <v-container class="pt-0 w-90">
    <v-row>
      <v-col v-for="item in itemSetData" :key="item" cols="12" sm="4">
        <v-card class="mx-auto px-5" variant="outlined">
          <v-card-item>
            <div>
              <div class="text-overline mb-1">品目ID　 {{ item.itemIdSet }}</div>
              <div cols class="text-h6 mb-1">品目名称 {{ item.itemSetName }}</div>
              <div class="text-caption">型番 {{ item.itemSetJanCode }}</div>
            </div>
          </v-card-item>
          <v-img src="https://cdn.vuetifyjs.com/images/cards/sunshine.jpg" height="200px" cover></v-img>
          <v-card-item>
            <div>
              <div class="text-overline mb-1">品目詳細</div>
            </div>
          </v-card-item>
          <v-textarea disabled v-model="item.itemDescription"></v-textarea>
          <v-card-actions>
            <div class="text-overline mt-5">金額(税込)</div>
            <v-text-field disabled class="form-selection ml-5" variant="underlined"
              :value="ConvertUtils.convertNumberToJpCurrency(item.taxIncPrice)" hide-details />
            <div class="text-overline mt-5">数量</div>
            <v-text-field type="number" class="form-selection mr-3" variant="underlined" v-model.number="item.quantity"
              hide-details />
            <v-btn @click="onAddItem(item)" variant="outlined"> 選択 </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
    <v-row :no-gutters="true" justify="end">
      <v-col cols="1" align-self="center">
        <v-select class="form-selection" density="compact" variant="underlined" hide-details
          v-model="searchState.pageSize" v-on:update:model-value="getItemSetList()" :items="[10, 20, 50]" />
      </v-col>
      <v-pagination v-model="searchState.pageNum" :length="paginationLength" :total-visible="7" size="x-small"
        v-on:update:model-value="getItemSetList()" rounded="circle" />
    </v-row>
  </v-container>
</template>


<script setup lang="ts">
import { reactive, onMounted, ref, computed, Ref } from "vue";
import TabDetailModel from "@/models/tab-detail.model";
import ColumnAttributes from "@/models/column-attributes.model";
import ItemMaster from "@/models/ItemMaster";
import AppConstants from "@/constants/constants";
import SearchComponent from "@/components/tabs/search-button/index.vue";
import itemSetListService from "@/services/itemset.service";
import MakerService from "@/services/maker.service";
import TabCommon from "@/models/tab-common";
import ConvertUtils from "@/utils/convertUtils";

let mstMakers = ref<any[]>([])
const DEFAULT_OS = ref<any[]>([
  { value: 0, text: 'IOS' },
  { value: 1, text: 'Android' },
])
const dialogListItemProcurement = ref(false);
const displayProcurement = ref("content0");
const isModal = ref(true);
const itemSetData = ref<any>({})
const totalItemSet = ref(0)
const dataItem = ref<any>([])
const paginationLength = computed(() => {
  let pages = Math.floor(totalItemSet.value / searchState.pageSize)
  if ((totalItemSet.value % searchState.pageSize) != 0) {
    pages++
  }
  return pages
})

const handleClickTab = (tab: string) => {
  displayProcurement.value = tab;
};
let searchState = reactive({
  itemId: undefined,
  itemSetName: undefined,
  itemSetType: undefined,
  itemSetJanCode: undefined,
  itemSetMakerId: undefined,
  itemSetMakerModel: undefined,
  itemSetOs: undefined,
  deletedRecordDisplayMode: 0,
  pageNum: 1,
  pageSize: 10,
  assetType: 0

});

onMounted(async () => {
  // call api to get data
  await getItemSetList();
  const makerTemp = await MakerService.getAll();
  mstMakers.value = [...makerTemp?.data?.mstMakerMaster]
});

const getItemSetList = async () => {
  await itemSetListService
    .getList(searchState)
    .then((data: any) => {
      itemSetData.value = data.mstItemSet;
      totalItemSet.value = data.totalRecords
    })
    .finally(() => {

    })
}

const onClickSearch = async () => {
  searchState.pageNum = 1;
  await getItemSetList();

};

const onClickClear = () => {
  searchState.itemId = null
  searchState.itemName = null;
  searchState.itemSetType = null;
  searchState.itemSetJanCode = null;
  searchState.itemSetMakerId = null;
  searchState.itemSetMakerModel = null;
  searchState.itemSetOs = null;
  searchState.deletedRecordDisplayMode = 0;
};


const emit = defineEmits(['onAddItem']);
const onAddItem = async (item: any) => {

  let negativeNumber = item.quantity || 1;
  let positiveNumber = Math.abs(negativeNumber);

  let objectItem = {
    item: item,
    quantity: positiveNumber
  }
  emit('onAddItem', objectItem)

}

</script>

<style lang="scss" scoped></style>
