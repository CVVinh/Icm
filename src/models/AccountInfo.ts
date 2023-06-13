export default interface AccountInfo {
  accountId?: number;
  accountName? :string;
  groupId?: number;
  groupName?: string;
  
  extAccountId?: number;
  emailAddress? :string;
  accountStatus?: number;
  isSystemManager?: boolean;
  createdAt?: string,
  modifiedAt?: string,
  deletedAt?: string,
  isDeleted?: boolean,
}
