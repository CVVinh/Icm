<template>
  <v-card-actions>
    <v-container class="ma-3">
      <v-expansion-panel-header>詳細検索</v-expansion-panel-header>
      <v-row dense>
        <v-col cols="12" lg="1" v-if="flagSearch">
          <div class="text-caption pa-0">
            &darr; 特定時
          </div>
          <v-text-field class="pa-1" v-model="search.integratedAssetId" label="品目ID" clearable>
          </v-text-field>
        </v-col>
        <v-col cols="12" lg="2" v-if="flagSearch">
          <div class="text-caption pa-3"> </div>
          <v-text-field v-model="search.integratedAssetId" label="PC統合資産ID" clearable>
          </v-text-field>
        </v-col>
        <v-col cols="12" lg="1">
          <div class="text-caption pa-3"> </div>
          <v-text-field v-model="search.integratedAssetId" label="Ver" clearable>
          </v-text-field>
        </v-col>
        <v-col cols="12" lg="2">
          <div class="text-caption pa-3"> </div>
          <v-text-field v-model="search.integratedAssetId" label="JANコード" clearable>
          </v-text-field>
        </v-col>
        <v-col cols="12" lg="1">
          <div class="text-caption pa-4"> </div>
          <v-btn color="#97E4FF"> QR </v-btn>
        </v-col>
        <v-col cols="12" lg="2">
          <div class="text-caption pa-3"> </div>
          <v-combobox v-model="search.assetLeaseType" :items="search.assetLeaseTypeList" label="メーカー" clearable />
        </v-col>
        <v-col cols="12" lg="2">
          <div class="text-caption pa-3"> </div>
          <v-text-field v-model="search.integratedAssetId" label="メーカー型番" clearable>
          </v-text-field>
        </v-col>
        <v-col cols="12" lg="1" align-self="center">
          <div class="text-caption pa-3"> </div>
          <v-combobox v-model="search.assetLeaseType" :items="search.assetLeaseTypeList" label="メーカー" clearable />
          <v-btn class="ma-3" color="#97E4FF"> 検索 </v-btn>
        </v-col>
        <v-spacer />
      </v-row>
      <v-row dense>
        <v-col cols="12" lg="2">
          <div class="text-caption"> </div>
          <v-combobox v-model="search.assetLeaseType" :items="search.assetLeaseTypeList" label="タイプ" clearable />
        </v-col>
        <v-col cols="12" lg="1">
          <div class="text-caption"> </div>
          <v-combobox v-model="search.assetLeaseType" :items="search.assetLeaseTypeList" label="期間有効品目" clearable />
        </v-col>
        <v-col cols="12" lg="2">
          <vc-input-date label="有効期間(From)"></vc-input-date>
        </v-col>
        <v-col cols="12" lg="2" class="pb-0">
          <vc-input-date label="有効期間(To)"></vc-input-date>
        </v-col>

        <v-spacer />
        <v-col cols="6" lg="1" align-self="center">
          <v-btn class="ma-3" color="blue lighten-3"> クリア </v-btn>
        </v-col>
      </v-row>

      <v-expansion-panels class="mt-5">
        <v-expansion-panel>
          <v-expansion-panel-title expand-icon="mdi-plus" collapse-icon="mdi-minus">
            詳細検索
          </v-expansion-panel-title>
          <v-expansion-panel-text>
            <v-row class="mx-3" dense>
              <v-col cols="12" lg="2">
                <v-text-field v-model="search.integratedAssetId" label="メインPC品目ID" clearable>
                </v-text-field>
              </v-col>
              <v-col cols="12" lg="2">
                <v-combobox v-model="search.assetLeaseType" :items="search.assetLeaseTypeList" label="メーカー" clearable />

              </v-col>
              <v-col cols="12" lg="1">
                <v-text-field v-model="search.integratedAssetId" label="JANコード" clearable>
                </v-text-field>
              </v-col>
              <v-col cols="12" lg="1">
                <v-btn class="ma-3" color="blue lighten-3"> QR </v-btn>
              </v-col>
              <v-col cols="12" lg="1">
                <v-combobox v-model="search.assetLeaseType" :items="search.assetLeaseTypeList" label="メーカー" clearable />

              </v-col>
              <v-col cols="12" lg="2">
                <v-text-field v-model="search.integratedAssetId" label="メーカー型番" clearable>
                </v-text-field>
              </v-col>
              <v-col cols="12" lg="1">
                <v-combobox v-model="search.assetLeaseType" :items="search.assetLeaseTypeList" label="OS" clearable />

              </v-col>
            </v-row>


          </v-expansion-panel-text>
        </v-expansion-panel>
      </v-expansion-panels>
    </v-container>
  </v-card-actions>
</template>

<script setup lang="ts">
import { ref } from "vue";

const listMachine = ref<any[]>([
  { value: '1', name: '1号機・2号機' },
  { value: '2', name: 'ピロー' },
])
const search = {
  integratedAssetId: "",
  assetDateFrom: "",
  assetDateTo: "",
  showAssetDatePickerFrom: false,
  showAssetDatePickerTo: false,
  assetDatePickerFrom: "",
  assetDatePickerTo: "",
  assetLeaseTypeList: [
    {
      text: "a",
      value: "4",
    },
    {
      text: "b",
      value: "5",
    },
  ],
  assetLeaseType: null,
  internalMemoId: "",
  assetStatusList: [
    {
      text: "c",
      value: "7",
    },
    {
      text: "d",
      value: "8",
    },
  ],
  assetStatus: null,
  userCompany: "",
  quotationOrderId: "",
  pageText: "22件中 1～10",
};


defineProps<{
  flagSearch?: Boolean
}>()
</script>

<style lang="scss" scoped>
.v-container {
  border: 2px solid;
}
.expanded {
  min-height: 100px;
  height: fit-content;
}
</style>