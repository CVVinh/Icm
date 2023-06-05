<template>
  <div class="elevation-5">
    <SearchComponent
      v-model:deletedRecordDisplayMode="state.deletedRecordDisplayMode"
      v-model:tabExpanded="state.tabExpanded"
      @onSearch="onSearch"
      @onClear="onClear"
    >
      <template #searchForm>
        <MainSearchForm ref="componentRef" v-model="state.searchState" />
      </template>
      <template #expansion-area>
        <ExpansionSearchComponent v-model="state.extendedSearchState" />
      </template>
    </SearchComponent>
  </div>
  <br />
  <div class="elevation-5">
    <CustomTable
      :column-attrs="state.tableState.columnAttrs"
      :data="state.tableState.data"
      :btn-add-item="false"
      :total="state.tableState.total"
      v-model:page-size="state.tableState.pageSize"
      v-model:page-num="state.tableState.pageNum"
      @click-detail="onClickDetail"
      :customBodyTable="true"
    >
      <template #rightToolbar>
        <v-btn appendIcon="mdi-export">CSV出力</v-btn>
      </template>
      <template #customTableBody>

      </template>
    </CustomTable>
  </div>
</template>
<script lang="ts" setup>
import { reactive, ref, onMounted } from "vue";
import SearchComponent from "@/components/tabs/search-button/index.vue";
import ExpansionSearchComponent from "@/components/depreciation-management/expansion-search-form.vue";
import MainSearchForm from "@/components/depreciation-management/main-search-form.vue";
import CustomTable from "@/components/custom-table/index.vue";
import ColumnAttributes from "@/models/column-attributes.model";
import AppConstants from "@/constants/constants";

const state = reactive({
  searchState: {} as DepreciationSearch,
  extendedSearchState: {} as ExpandedDepreciationSearch,
  deletedRecordDisplayMode: 0,
  tabExpanded: false,
  // table state
  tableState: {
    columnAttrs: {
      labels: [
        "資産STS",
        "統合資産ID",
        "資産名",
        "資産区分",
        "償却ルール",
        "資産開始日",
        "資産終了日",
        "償却表示基準年",
        "調達金額",
        "年別償却金額",
      ],
      fields: [
        "assetSts",
        AppConstants.INTEGRATED_ASSET_MODAL_KEY,
        AppConstants.PARENT_ASSET_ID,
        "assetName",
        AppConstants.ITEM_ID_KEY,
        "type",
        "assetClass",
        AppConstants.PROCUREMENT_MODAL_KEY,
        "arrivalDate",
        "disposalDate",
        AppConstants.ACCOUNT_NAME,
      ],
      clickableColumn: [],
      columnsWidth: [],
    } as ColumnAttributes,
    data: [{}] as any[],
    total: 0,
    pageSize: 10,
    pageNum: 1,
  },
});

const componentRef = ref(undefined);

onMounted(() => {
  fetchData();
});

const fetchData = () => {};

const onSearch = () => {
  console.log(state.searchState);
};

const onClickDetail = () => {};

const onClear = () => {};
</script>
<style lang="scss" scoped></style>
