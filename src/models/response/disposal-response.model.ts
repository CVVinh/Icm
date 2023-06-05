import OutsourcingCompanyInformation from "../outsourcing-information.model";
import AssetManagement from '@/models/AssetManagement';
import Disposal from "../Disposal";
import Procurement from '../procurement.model';

export default interface DisposalResponse {
  msg: string;
  disposalInfo: Disposal;
  assetInfo: AssetManagement;
  procurementInfo: Procurement;
  outsourceCompanyInfo: OutsourcingCompanyInformation;
  isSet: number;
  isMain: number;
  total: number;
}
