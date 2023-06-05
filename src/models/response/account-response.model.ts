import AccountInfo from "../AccountInfo";

export default interface AccountResponse {
  msg: string;
  mstAccount: AccountInfo[];
  total: number;
}
