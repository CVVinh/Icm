export default interface Procurement {
  procurementId?: number;
  procurementName?: string;
  quotationRequestNote?: string;
  quotationDatetime?: string;
  quotationAccountId?: number;
  quotationRequester?: number;
  quotationNote?: string;
  approvalRequestNote?: string;
  approvalExpirationDate?: string;
  approvalAccountId?: number;
  approvalNote?: number;
  isBack?: boolean;
  isDeleted?: boolean;
  procurementStatus?: number;
  createdAt?: string;
  modifiedAt?: string;
  deletedAt?: string;
  orderOnFrom?: string;
  orderOnTo?: number;
}
