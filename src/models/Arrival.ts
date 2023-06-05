import AccountInfo from "./AccountInfo";
import ArrivalInfo from "./ArrivalInfo";
import GroupInfo from "./GroupInfo";
import ItemMaster from "./ItemMaster"
import OrderManagement from "./OrderManagement";
import Procurement from "./procurement.model";

export default interface Arrival {
  itemInfo: ItemMaster,
  arrivalInfo: ArrivalInfo,
  oderInfo: OrderManagement,
  procurementInfo: Procurement,
  accountInfo: AccountInfo,
  groupInfo: GroupInfo
}
