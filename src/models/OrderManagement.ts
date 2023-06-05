export default interface OrderManagement {
  procurementId?: number,
  procurementStatus?: string,
  isBack?: boolean,
  procurementName?: string,
  totalAmount?: number,
  quotationRequester?: string,
  createdAt?: string,
  createdBy?: number,
  modifiedAt?: number,
  deletedAt?: string,
  deletedBy?: number,
  orderOn?: string
}
