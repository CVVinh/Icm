import OutsourcingCompanyInformation from '@/models/response/outsourcing-company-response.model';
import AccountInfo from '../AccountInfo';
import AssetManagement from '../AssetManagement';
import GroupInfo from '../GroupInfo';
import PickUp from "../PickUp";
import Procurement from '../procurement.model';

export default interface PickUpResponse {
  msg: string;
  pickUpInfo: PickUp;
  outsourcingCompanyInfo: OutsourcingCompanyInformation;
  groupInfo: GroupInfo;
  accountInfo: AccountInfo;
  procurementInfo: Procurement;
  assetInfo: AssetManagement;
  total: number;
}
