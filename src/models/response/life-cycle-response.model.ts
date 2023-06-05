import AssetManagement from "../AssetManagement";

export interface LifeCycleResponse {
  arrivalList: AssetManagement[];
  arrivalTotal: number;
  msg: string;
  status: number;
}
