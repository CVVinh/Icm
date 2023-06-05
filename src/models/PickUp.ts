export default interface PickUp {
  pickUpId: number;
  pickUpStatus: number;
  assetId: number;
  pickUpType: number;
  pickUpArrangementOn: string;
  pickUpScheduledDate: string;
  completedOn: string;
  outsourcingCompanyId: number;
  accountId: number;
  createdAt: string;
  createdBy: string;
  modifiedAt: string;
  modifiedBy: string;
  deletedAt: string;
  deletedBy: string;
  isDeleted: number;
  note: string;
  version: number;
}
