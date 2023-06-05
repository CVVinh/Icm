import Procurement from '@/models/procurement.model';
import OutsourcingCompanyInformation from '@/models/response/outsourcing-company-response.model';
import AccountInfo from "../AccountInfo";
import AssetManagement from "../AssetManagement";
import GroupInfo from "../GroupInfo";
import Repairing from "../Repairing";

export default interface RepairingResponse {
  msg: string;
  repairingInfo: Repairing;
  assetInfo: AssetManagement;
  accountInfo: AccountInfo;
  groupInfo: GroupInfo;
  outsourceCompanyInfo: OutsourcingCompanyInformation
  procurementInfo: Procurement
  total: number;
  isMain: number;
  isSet: number;
}
