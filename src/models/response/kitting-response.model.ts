import AssetManagement from '@/models/AssetManagement';
import AccountInfo from '../AccountInfo';
import GroupInfo from '../GroupInfo';
import KittingInformation from "../kitting-information.model";

export default interface KittingResponse {
  msg: string;
  kittingList: KittingInformation[];
  kittingTotal: number;
  kittingMasterInfo?: KittingInformation;
  assetInfo: AssetManagement;
  kittingUserInfo: AccountInfo;
  accountInfo: AccountInfo;
  kittingInfo: KittingInformation;
  groupInfo: GroupInfo;
}
