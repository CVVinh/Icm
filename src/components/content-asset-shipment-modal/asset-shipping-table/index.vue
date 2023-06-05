<template>
  <CustomTableSimple
    :columnAttrs="state.tableAttrs"
    :data="state.dataTable"
  >
    <template #cell(assetType)="{ value }">
      {{ displayTextSelectField(value) }}
    </template>
    <template #cell(action-btn)="{ item }">
      <span class="btn-add" @click="onAddAssetItem(item.assetId)">選択</span>
    </template>
  </CustomTableSimple>
</template>
<script setup lang="ts">
import { onMounted, PropType, reactive, ref } from "vue";
import CustomTableSimple from "@/components/content-asset-shipment-modal/custom-table-simple/index.vue";
import ColumnAttributes from "@/models/column-attributes.model";
import AssetService from "@/services/asset.service";
import AssetManagement from "@/models/AssetManagement";
import DisplayGenCode from "@/utils/displayGenCode";
import AppConstants from "@/constants/constants";

const props = defineProps({
  modelValue: {
    type: Object as PropType<AssetManagement>,
    default: null,
    required: true
  },
  editAssetItem: {
    type: Boolean,
    default: false
  }
});

const emit = defineEmits(["onAddAsset"]);

const state = reactive({
  total: 0,
  tableAttrs: {
    labels: ["資産ID", "資産名称", "資産タイプ", ""],
    fields: ["assetId", "assetNameKana", "assetType", "action-btn"],
    clickableColumn: [false],
    columnsWidth: [100]
  } as ColumnAttributes,
  tableHeight: 370,
  dataTable: [] as AssetManagement[],
});

onMounted(async () => {
  await fetchDataAssetStock();
  await buildDataByGenCode();
});

const listAssetType = ref<any[]>([])

const fetchDataAssetStock = async () => {
  const responseAssetStock = await AssetService.getAll({ assetStatus: 0, deletedRecordDisplayMode: 0 });
  state.dataTable = props.editAssetItem ? responseAssetStock.assetList.filter(asset => asset.isSet === 0) : responseAssetStock.assetList;
};

const buildDataByGenCode = async () => {
  let genCodeList = await DisplayGenCode.getGenCode();
  listAssetType.value = DisplayGenCode.getListGenCodeLabel(AppConstants.TABLE_ASSET, AppConstants.ASSET_TYPE, genCodeList);
}

const displayTextSelectField = (value: number) => {
  const labelByGenCode = DisplayGenCode.displayTileByArrayObject(value, listAssetType.value);
  return labelByGenCode;
};

const onAddAssetItem = async (assetId: number) => {
  const responseAsset = await AssetService.get({ assetId });
  emit("onAddAsset", responseAsset);
};
</script>
