import AssetManagement from "../AssetManagement";

export default interface AssetManagementResponse {
  msg: string,
  assetList: AssetManagement[],
  totalRecords: number
}
