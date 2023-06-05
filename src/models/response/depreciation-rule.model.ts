import DepreciationRule from "../DepreciationRule";

export default interface DepreciationRulesResponse {
  depreList: DepreciationRule[];
  total: number;
  msg: string;
  status: number;
}
