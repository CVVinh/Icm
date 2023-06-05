import ItemMaster from "../ItemMaster";

export default interface ItemMasterResponse {
  msg: string;
  message: string;
  status: number;
  mstItem: ItemMaster[];
  itemInfo: ItemMaster,
  itemTotal: number;
}
