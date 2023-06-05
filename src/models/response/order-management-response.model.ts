import OrderManagement from "../OrderManagement";

export default interface OrderManagementResponse {
  msg: string,
  procurementList: OrderManagement[],
  totalRecords: number
}
