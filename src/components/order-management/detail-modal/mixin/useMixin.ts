import AppConstants from "@/constants/constants";
import ItemMaster from "@/models/ItemMaster";
import ProcurementDetail from "@/models/procurement-detail.model";
import ConvertUtils from "@/utils/convertUtils";
import DisplayGenCode from "@/utils/displayGenCode";
import { inject, Ref } from "vue";

export default function () {
  const assetTypeList = inject('assetTypeList') as Ref<any>;
  const getScrollHeightOfTable = (
    dataLenth: number | undefined,
    defaultHeight: number | undefined
  ) => {
    return dataLenth ? (defaultHeight ? defaultHeight : 250) : undefined;
  };

  const getTotalAmount = (list: ProcurementDetail[]) => {
    if (!list) {
      return undefined;
    }
    const total = list
      .map((x) => {
        const itemPrice = x.item?.taxIncPrice || 0;
        return (x.quantity || 0) * itemPrice;
      })
      .reduce((prevValue, currentValue) => prevValue + currentValue, 0);
    return ConvertUtils.convertNumberToJpCurrency(total);
  };

  /**
   * Display item id or item set id
   * @param idItem is the item id
   * @param idItemSet is the item set id
   */
  const displayItemIdOrItemSetId = (idItem: number | undefined, idItemSet: number | undefined) => {
    let idLabel = '';
    if (!idItem && !idItemSet) {
      return idLabel;
    }
    idLabel = idItem ? `${idItem}` : `Set_${idItemSet}`;
    return idLabel;
  }

  /**
   * Display asset class label by gen code
   * @param itemMaster is object of item master
   */
  const displayAssetClassLabelByGenCode = (itemMaster: ItemMaster = {}) => {
    const mstItem = AppConstants.MASTER_ITEM;
    const assetType = AppConstants.ASSET_TYPE;
    let labelByGenCode = ''
    if (itemMaster.assetType === 0 || itemMaster.assetType) {
      labelByGenCode = DisplayGenCode.displayLabelByGenCode(itemMaster.assetType, mstItem, assetType, assetTypeList.value);
    } else if (itemMaster.itemSetType === 0 || itemMaster.itemSetType) {
      labelByGenCode = DisplayGenCode.displayLabelByGenCode(itemMaster.itemSetType, mstItem, assetType, assetTypeList.value);
    }
    return labelByGenCode;
  };

  return {
    getScrollHeightOfTable,
    getTotalAmount,
    convertPriceToJpPrice: ConvertUtils.convertNumberToJpCurrency,
    displayAssetClassLabelByGenCode,
    displayItemIdOrItemSetId
  };
}
