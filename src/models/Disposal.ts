export default interface Disposal {
  disposalId: number;
  disposalStatus: number;
  outsourcingCompanyId: number;
  assetId: number;
  createdAt: string;
  createdBy: number;
  modifiedAt: string;
  modifiedBy: number;
  deletedAt: string
  deletedBy: number;
  isDeleted: number;
  note: string;
  version: number;
}
