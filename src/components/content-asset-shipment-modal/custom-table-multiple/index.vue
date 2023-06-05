<template>
  <v-container>
    <div class="d-flex align-center" v-if="showSelectAssetBtn">
      <span>資産</span>
      <v-btn small color="primary" class="btn-action ml-5" dark @click="showAddAssetModal()">
        在庫資産選択
      </v-btn>
    </div>
    <!-- Start Asset table -->
    <span>資産</span>
    <div style="width: 100%" class="table-data-asset">
      <CustomTableSimpleModal
        :columnAttrs="state.dataTableMain.length > 0 ? state.tableEditAsset : state.tableAssetSet"
        :data="state.dataTableAsset"
        :arrangeLayoutTable="state.dataTableMain.length > 0"
        :customTableAsset="true"
      >
        <template #cell(assetStatus)="{ value, field }">
          <span>{{ displayTextSelectField(value, field) }}</span>
        </template>
        <template #cell(assetType)="{ value, field }">
          <span>{{ displayTextSelectField(value, field) }}</span>
        </template>
      </CustomTableSimpleModal>
    </div>
    <!-- End Asset table -->
    <!-- Start Item Main table -->
    <span>親PC資産</span>
    <div style="width: 100%" class="table-data-asset">
      <CustomTableSimpleModal
        :columnAttrs="state.tableAssetSet"
        :data="state.dataTableMain"
        :show-head="false"
        :customTableAsset="true"
      >
        <template #cell(assetStatus)="{ value, field }">
          <span>{{ displayTextSelectField(value, field) }}</span>
        </template>
        <template #cell(assetType)="{ value, field }">
          <span>{{ displayTextSelectField(value, field) }}</span>
        </template>
      </CustomTableSimpleModal>
    </div>
    <!-- End Item Main table -->
    <!-- Start Item Child table -->
    <span>子資産</span>
    <div style="width: 100%" class="table-data-asset table-data-asset-child">
      <CustomTableSimpleModal
        :columnAttrs="state.tableAssetSet"
        :data="state.dataTableItem"
        :show-head="false"
        :actionBtn="showEditAssetItemBtn"
        :customTableAsset="true"
      >
        <template #cell(assetStatus)="{ value, field }">
          <span>{{ displayTextSelectField(value, field) }}</span>
        </template>
        <template #cell(assetType)="{ value, field }">
          <span>{{ displayTextSelectField(value, field) }}</span>
        </template>
        <template #deleteBtn="{ item }">
          <span class="btn-delete" @click="onDeleteAssetItem(item)">削除</span>
        </template>
        <template #addBtn>
          <span class="btn-add" @click="showAddAssetModal(true)">+追加</span>
        </template>
      </CustomTableSimpleModal>
    </div>
  </v-container>
  <CommonModal
    ref="assetManagementModalRef"
    modalId="orderShippingModal"
    modalName="注文"
    :show-add-update-btn="false"
    :show-header-modal="false"
    :show-delete-btn="false"
  >
    <template v-slot:contentModal>
      <AssetShippingTable @onAddAsset="onAddAsset" :editAssetItem="editAssetItem"></AssetShippingTable>
    </template>
  </CommonModal>
</template>
<script lang="ts" setup>
import AppConstants from '@/constants/constants';
import AssetManagement from '@/models/AssetManagement';
import ColumnAttributes from '@/models/column-attributes.model';
import DisplayGenCode from '@/utils/displayGenCode';
import CustomTableSimpleModal from '@/components/content-asset-shipment-modal/custom-table-simple/index.vue';
import AssetShippingTable from "@/components/content-asset-shipment-modal/asset-shipping-table/index.vue";
import CommonModal from '@/components/modal/index.vue';
import { onMounted, PropType, reactive, ref } from 'vue';

const props = defineProps({
  assetInfo: {
    type: Object as PropType<AssetManagement>,
    required: true,
  },
  genCodeList: {
    type: Array,
    default: []
  },
  showSelectAssetBtn: {
    type: Boolean,
    default: true
  },
  showEditAssetItemBtn: {
    type: Boolean,
    default: true
  }
});

const state = reactive({
  total: 10,
  tableEditAsset: {
    labels: ["資産ステータス", "資産ID", "資産名称", "資産タイプ", "資産開始日", "資産終了日", "発注ID", "ライセンス", ""],
    fields: ["assetStatus", "assetId", "assetNameKana", "assetType", "assetFrom", "assetTo", "orderId", "license"],
    clickableColumn: [false],
    columnsWidth: [100, 100, 300, 300, 100, 100, 100, 100, 115]
  } as ColumnAttributes,
  tableAssetSet: {
    labels: ["資産ステータス", "資産ID", "資産名称", "資産タイプ", "資産開始日", "資産終了日", "発注ID", "ライセンス"],
    fields: ["assetStatus", "assetId", "assetNameKana", "assetType", "assetFrom", "assetTo", "orderId", "license"],
    clickableColumn: [false],
    columnsWidth: [100, 100, 300, 300, 100, 100, 100, 100]
  } as ColumnAttributes,
  dataTableAsset: [] as Array<any>,
  dataTableMain: [] as Array<any>,
  dataTableItem: [] as Array<any>
});

onMounted(async () => {
  buildDataAsset(props.assetInfo, props.assetInfo.listAssets);
});

const emit = defineEmits(["onAddAsset"])

const assetManagementModalRef = ref<InstanceType<typeof CommonModal> | null>(null);
const editAssetItem = ref<boolean>(false);

const displayTextSelectField = (value: number, field: string) => {
  const labelByGenCode = DisplayGenCode.displayLabelByGenCode(value, AppConstants.TABLE_ASSET, field, props.genCodeList);
  return labelByGenCode;
};

const buildDataAsset = (assetItem: any, tableAsset: AssetManagement[] = []) => {
  state.dataTableMain = [];
  state.dataTableAsset = [];
  state.dataTableItem = [];
  if (assetItem.isMain || assetItem.isSet) {
    state.dataTableMain = tableAsset?.filter(asset => asset.isMain === 1) || [];
    state.dataTableItem = tableAsset?.filter(asset => asset.isMain === 0) || [];
  } else if (Object.keys(assetItem).length > 0)  {
    state.dataTableAsset.push(assetItem);
  }
};

const onAddAsset = (assetItem: any) => {
  if (editAssetItem.value) {
    editDataTableAsset(assetItem, state.dataTableItem);
  } else {
    buildDataAsset(assetItem, assetItem.listAssets);
  }
  assetManagementModalRef.value?.handleOnClose();
  emit("onAddAsset", assetItem);
};

const editDataTableAsset = (assetItem: any, tableAsset: Array<any>) => {
  const isDuplicateAsset = tableAsset.some(asset => asset.assetId === assetItem.assetId);
  if (!isDuplicateAsset) {
    tableAsset.push(assetItem);
  }
};

const onDeleteAssetItem = (assetDelete: any) => {
  state.dataTableItem = state.dataTableItem.filter(asset => asset.assetId !== assetDelete.assetId)
}

const showAddAssetModal = (editAsset = false) => {
  editAssetItem.value = editAsset;
  assetManagementModalRef.value?.openModal(0);
};

defineExpose({
  onAddAsset
});

</script>
<style lang="scss" scoped>
.table-data-asset {
  width: 100%;
  display: flex;
  justify-content: center;
  border-bottom: none;
  border-collapse: unset;

  &-child {
    :deep(.v-table__wrapper) {
      overflow-y: auto;
    }
  }
  .lcm-table {
    width: 64%;
  }

  thead {
    tr {
      &:last-child {
        th {
          border-bottom: none;
        }
      }

      th {
        box-shadow: none;
      }

      .text-left {
        padding-left: 5px;
      }
    }
  }

  tr {
    &:first-of-type {

      .border-table,
      .cell-button-child-asset {
        border-top: 1px solid black;
      }
    }

    &:last-of-type {

      .border-table,
      .cell-button-child-asset {
        border-bottom: 1px solid black;
      }
    }

    .border-table {
      border: 0.5px solid black;

      &:first-child {
        border-left: 1px solid black;
      }

      &:last-of-type {
        border-right: 1px solid black;
      }
    }
  }
}
</style>
