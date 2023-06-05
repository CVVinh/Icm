import MakerMaster from '@/models/MakerMaster';
export default interface ItemMaster {
  serialNo?: string;
  itemId?: number;
  itemName?: string;
  itemVersion?: string;
  assetType?: number;
  janCode?: number;
  makerId?: number;
  makerModel?: string;
  expirationDateFrom?: string;
  expirationDateTo?: string;
  orderUnit?: number;
  orderUnitMax?: number;
  itemTitle?: string;
  itemDescription?: string;
  deletedRecordDisplayMode?: number;
  osId?: number;
  price?: number;
  tax?: number;
  itemSetName?: string;
  itemIdSet?: number;
  itemSetType?: number;
  makerName?: string;
  taxIncPrice?: number;
  exStatus?: number;
  createdAt?: string;
  modifiedAt?: string;
  deletedAt?: string;
  pageNum?: number;
  pageSize?: number;
  isDeleted?: number;
  quantity?: number;
  maker?: MakerMaster
  itemSetMakerModel?: string;
  serialNumber?: string;
}
