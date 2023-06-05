import AppConstants from "@/constants/constants";
import { reactive, ref, onMounted } from "vue";
import itemListService from "@/services/ItemMaster";
import assetService from "@/services/asset.service";
import genCodeService from "@/services/genCode.service";
import GenCode from "@/models/GenCode";

export default function (runOnMountedFlag: boolean) {
  const assetStatusList = ref<GenCode[]>([]);

  const infoState = reactive({
    item: undefined as any,
    actionDatetime: {
      createdTime: undefined as string | undefined,
      updatedTime: undefined as string | undefined,
      deletedTime: undefined as string | undefined,
    },
    // modal state
    modalState: {
      name: "",
      key: undefined as string | undefined,
      itemId: 0,
      showAddEditBtnFlag: false,
      showDeleteBtnFlag: false,
    },
  });

  onMounted(async () => {
    if (runOnMountedFlag) {
      await getAssetStatusList();
    }
  });

  const getAssetStatusList = async () => {
    const response = await genCodeService.getAll({
      tableName: AppConstants.TABLE_ASSET,
      fieldName: "assetStatus",
    });
    assetStatusList.value = response.mstGenCode;
  };

  // const getAssetInfo = async (id: number) => {
  //   const response = await assetService.get({ assetId: id });
  //   infoState.item = response;
  //   updateActionDatetime(response);
  // };

  const getItemInfo = async (id: number) => {
    const response = await itemListService.get({ itemId: id });
    infoState.item = response.itemInfo;
    updateActionDatetime(response.itemInfo);
  };

  const updateActionDatetime = (obj: any) => {
    const { createdAt, modifiedAt, deletedAt } = obj;
    infoState.actionDatetime = {
      createdTime: createdAt,
      updatedTime: modifiedAt,
      deletedTime: deletedAt,
    };
  };

  return {
    infoState,
    assetStatusList,
    getItemInfo,
  };
}
