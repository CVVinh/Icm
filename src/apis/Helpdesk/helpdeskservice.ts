import HelpdeskInformation from "@/models/helpdesk-information.model";
import BaseAPI from "../baseAPI";
import axios from "axios";
import HelpdeskResponse from "@/models/response/helpdesk-response.model";

class helpdeskservice extends BaseAPI {
  GET_LIST_API_URL = this.BASE_URL.concat("/master/kitting/list");

  GET_kitting_API_URL = this.BASE_URL.concat("/func/get-kitting-info");

  SAVE_ITEM_API_URL = this.BASE_URL.concat("/master/kitting/register");

  UPDATE_ITEM_API_URL = this.BASE_URL.concat("/master/kitting/update");

  DELETE_ITEM_API_URL = this.BASE_URL.concat("/func/delete-kitting");

  async gethelpdeskDataList(
    queryParams: any
  ): Promise<HelpdeskResponse> {
    const response = await axios.get(this.GET_LIST_API_URL, {
      params: queryParams,
    });
    return response.data as HelpdeskResponse;
  }

  async gethelpdeskById(
    id: number
  ): Promise<HelpdeskInformation> {
    const response = await axios.get(this.GET_kitting_API_URL, {
      params: {
        organization_name: id,
      },
    });
    return response.data as HelpdeskInformation;
  }

  async saveOrUpdatehelpdeskData(
    helpdeskData: HelpdeskInformation
  ) {
    const response = await axios({
      url: helpdeskData.application_id
        ? this.UPDATE_ITEM_API_URL
        : this.SAVE_ITEM_API_URL,
      method: helpdeskData.application_id ? "PUT" : "POST",
      data: helpdeskData,
    });
    return response.data;
  }

  async deleteById(id: number) {
    const response = await axios.delete(this.DELETE_ITEM_API_URL, {
      params: {
        application_id: id,
      },
    });
    return response.data;
  }
}

export const Helpdeskservice = new helpdeskservice();
