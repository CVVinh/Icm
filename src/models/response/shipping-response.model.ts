import OutsourcingCompanyInformation from "../outsourcing-information.model";
import AccountInfo from "../AccountInfo";
import AssetManagement from "../AssetManagement";
import Procurement from "../procurement.model";
import Shipping from "../Shipping";
import GroupInfo from "../GroupInfo";

export default interface ShippingResponse {
  shippingList?: Shipping[];
  shippingInfo: Shipping;
  totalRecords?: number;
  msg?: string;
  message?: string;
  status?: number;
  assetInfo: AssetManagement;
  procurementInfo: Procurement;
  accountInfo: AccountInfo;
  total?: number;
  isMain?: number;
  isSet?: number;
  outsourcingCompanyInfo?: OutsourcingCompanyInformation
  groupInfo?: GroupInfo;
}
