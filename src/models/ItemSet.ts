export default interface ItemList {
  itemId?: number;
  itemType?: string;
  itemName?: string;
  itemMaker?: string;
  itemMakerModel?: string;
  ItemSetexpirationDateFrom?: string;
  itemexpirationDateTo?: string;
}

export default interface ItemSet {
  itemIdSet?: number;
  itemSetType?: string;
  itemSetName?: string;
  itemSetJanCode?: string;
  itemSetMakerModel?: string;
  itemSetMakerId?: number;
  itemSetOs?: string;
  ItemSetexpirationDateFrom?: string;
  itemSetExpirationDateTo?: string;
  expirationStatus?: String;
  isDeleted?: number;

  mainItemInfo?: {
    mainItemId?: number;
    mainAssetType?: string;
    mainItemName?: string;
  };

  itemList?: Array<ItemList>;
}
