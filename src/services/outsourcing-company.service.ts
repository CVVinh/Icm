import OutsourcingCompanyInformation from "@/models/outsourcing-information.model";
import BaseAPI from "../apis/baseAPI";
import axios from "@/services/api.service";
import OutsourcingCompanyResponse from "@/models/response/outsourcing-company-response.model";

class OutsourcingCompanyService extends BaseAPI {
  GET_LIST_API_URL = this.BASE_URL.concat("/func/get-outsourcing-company-list");

  GET_OUTSOURCING_COMPANY_API_URL = this.BASE_URL.concat(
    "/func/get-outsourcing-company-info"
  );

  SAVE_ITEM_API_URL = this.BASE_URL.concat("/func/add-outsourcing-company");

  UPDATE_ITEM_API_URL = this.BASE_URL.concat(
    "/func/update-outsourcing-company-info"
  );

  DELETE_ITEM_API_URL = this.BASE_URL.concat(
    "/func/delete-outsourcing-company"
  );

  async getOutsourcingCompanyList(
    queryParams?: any
  ): Promise<OutsourcingCompanyResponse> {
    const response = await axios.get(this.GET_LIST_API_URL, {
      params: queryParams,
    });
    return response.data as OutsourcingCompanyResponse;
  }

  async getOutsourcingCompanyById(
    id: number
  ): Promise<OutsourcingCompanyInformation> {
    const response = await axios.get(this.GET_OUTSOURCING_COMPANY_API_URL, {
      params: {
        outsourcingCompanyId: id,
      },
    });
    return response.data as OutsourcingCompanyInformation;
  }

  async saveOrUpdateOutsourcingCompanyData(
    outsourcingData: OutsourcingCompanyInformation
  ) {
    const response = await axios({
      url: outsourcingData.outsourcingCompanyId
        ? this.UPDATE_ITEM_API_URL
        : this.SAVE_ITEM_API_URL,
      method: outsourcingData.outsourcingCompanyId ? "PUT" : "POST",
      data: outsourcingData,
    }).catch(error => { return error.response; });
    return response.data;
  }

  async deleteById(id: number) {
    const response = await axios.delete(this.DELETE_ITEM_API_URL, {
      params: {
        outsourcingCompanyId: id,
      },
    }).catch(error => { return error.response; });
    return response.data;
  }
}

export const outsourcingCompanyService = new OutsourcingCompanyService();
