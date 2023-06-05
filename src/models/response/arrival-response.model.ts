import ArrivalInfo from "../ArrivalInfo";

export default interface ArrivalResponse {
  message: string;
  arrivalList: ArrivalInfo[];
  itemTotal: number;
  stasus: number;
}
