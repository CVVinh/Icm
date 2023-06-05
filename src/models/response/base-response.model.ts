import Base from "../Base";

export default interface BaseResponse {
  msg: string;
  mstBase: Base[];
  total: number;
}
