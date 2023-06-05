import ItemSet from "../ItemSet";

export default interface ItemSetResponse {
  msg: string;
  mstItemSet: ItemSet[];
  total: number;
}
