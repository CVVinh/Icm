import OutsourcingCompanyInformation from "../outsourcing-information.model";

export default interface OutsourcingCompanyResponse {
  msg: string;
  mstOutsourcingCompanyMaster: OutsourcingCompanyInformation[];
  total: number;
}
