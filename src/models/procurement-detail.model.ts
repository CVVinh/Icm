import ItemMaster from "./ItemMaster";

export default interface ProcurementDetail {
  item?: ItemMaster;
  quantity?: number;
  amount?: number;
  hasUserFile?: string;
  hasOrderFile?: string;
  estimatedArrivalDate?: string;
  estimatedShippingDate?: string;
  kittingMasterId?: number;
  depreciationRuleId?: number;
  orderId?: number;
}
