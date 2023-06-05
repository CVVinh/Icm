import kittingList from "../kittingList";

export default interface KittingResponse {
  msg: string;
  mstkitting: kittingList[];
  total: number;
}
