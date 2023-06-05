import HelpdeskInformation from "../helpdesk-information.model";

export default interface HelpdeskResponse {
  msg: string;
  msthelpdesk: HelpdeskInformation[];
  total: number;
}
