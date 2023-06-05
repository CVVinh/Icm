<template>
  <v-container class="pt-0">
    <SearchComponent @onSearch="onClickSearch" v-model:deleted-record-display-mode="searchState.deletedRecordDisplayMode"
      @on-clear="onClickClear" v-model:isModal="isModal">
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
                <v-text-field label="JANコード" class="" v-model="searchState.janCode" variant="underlined" hide-details />
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
                <v-text-field label="メーカー型番" class="" v-model="searchState.makerModel" variant="underlined"
                  hide-details />
              </div>
            </v-col>

            <v-col :cols="1" class="ml-3">
              <div class="form-item">
                <v-select label="OS" class="pt-0 form-selection" v-model="searchState.osId" variant="underlined"
                  hide-details :items="OS" item-title="text" item-value="value" placeholder="" />
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
      <v-col v-for="item in itemData" :key="item" cols="12" sm="4">
        <v-card class="mx-auto px-5" variant="outlined">
          <v-card-item>
            <div>
              <div class="text-overline mb-1">品目ID {{ item.itemId }}</div>
              <div cols class="text-h6 mb-1">品目名称 {{ item.itemName }}</div>
              <div class="text-caption">型番 {{ item.janCode }}</div>
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
              hide-details :rules="[(v: any) => Validate.required(v, 'Time')]" />
            <v-btn @click="onAddItem(item)" variant="outlined"> 選択 </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
    <v-row :no-gutters="true" justify="end">
      <v-col cols="1" align-self="center">
        <v-select class="form-selection" density="compact" variant="underlined" hide-details
          v-model="searchState.pageSize" v-on:update:model-value="getItemList()" :items="[10, 20, 50]" />
      </v-col>
      <v-pagination v-model="searchState.pageNum" :length="paginationLength" :total-visible="7" size="x-small"
        v-on:update:model-value="getItemList()" rounded="circle" />
    </v-row>
  </v-container>
</template>


<script setup lang="ts">
import { reactive, onMounted, ref, computed } from "vue";

import SearchComponent from "@/components/tabs/search-button/index.vue";
import itemListService from "@/services/ItemMaster";
import MakerService from "@/services/maker.service";
import ConvertUtils from "@/utils/convertUtils";
import Validate from "@/utils/validate";

const isModal = ref(true);
const itemData = ref<any>({})
const totalItem = ref(0)
let mstMakers = ref<any[]>([])

const OS = ref<any[]>([
  { value: 0, text: 'IOS' },
  { value: 1, text: 'Android' },
])
const paginationLength = computed(() => {
  let pages = Math.floor(totalItem.value / searchState.pageSize)
  if ((totalItem.value % searchState.pageSize) != 0) {
    pages++
  }
  return pages
})

let searchState = reactive({
  itemId: undefined,
  itemName: undefined,
  janCode: undefined,
  osId: undefined,
  makerId: undefined,
  makerModel: undefined,
  deletedRecordDisplayMode: 0,
  pageNum: 1,
  pageSize: 10,
  assetType: 0
});

onMounted(async () => {
  // call api to get data
  await getItemList();
  const makerTemp = await MakerService.getAll();
  mstMakers.value = [...makerTemp?.data?.mstMakerMaster]

});

const getItemList = async () => {
  await itemListService
    .getAll(searchState)
    .then((data: any) => {
      itemData.value = data.mstItem;
      totalItem.value = data.itemTotal

    })
    .finally(() => {

    })
}

const onClickSearch = async () => {
  searchState.pageNum = 1;
  await getItemList();

};

const onClickClear = () => {
  searchState.itemId = null;
  searchState.itemName = null;
  searchState.janCode = null;
  searchState.osId = null;
  searchState.makerId = null;
  searchState.makerModel = null;
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

