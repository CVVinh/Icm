import DateTimeAction from "./DateTimeAction"

export default interface MakerMaster {
  makerId?: number,
  makerName?: string,
  pilotNumber?: string,
  address?: string,
  area?: string,
  zipCode?: string,
  prefCode?: number,
  city?: string,
  street?: string,
  building?: string,
  pic?: string,
  department?: string,
  directNumber?: string,
  directEmailAddress?: string,
  deletedRecordDisplayMode?: number,
  dateTime?: DateTimeAction,
  createdAt?: string,
  modifiedAt?: string,
  deletedAt?: string,
  isDeleted?: number
}
