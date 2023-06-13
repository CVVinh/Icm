import Base from "../Base";
import BaseUserInfo from "../BaseUserInfo";

export default interface BaseResponse {
  msg: string;
  mstBase: Base[];
  total: number;
}

export default interface BaseUserResponse {
  msg: string;
  mstBaseUser: BaseUserInfo[];
  total: number;
}