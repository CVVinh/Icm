import ProcurementDetail from "../procurement-detail.model";
import Procurement from "../procurement.model";

export default interface ProcurementResponse {
  procurementList: ProcurementDetail[];
  procurementManagement: Procurement;
  msg?: string;
}
