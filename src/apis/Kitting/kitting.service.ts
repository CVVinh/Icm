import KittingInformation from "@/models/kitting-information.model";
import BaseAPI from "../baseAPI";
import axios from "@/services/api.service";
import KittingResponse from "@/models/response/kitting-response.model";

class KittingService extends BaseAPI {
  private GET_LIST_API_URL = this.BASE_URL.concat("/master/get-kitting-list");

  private GET_kitting_API_URL = this.BASE_URL.concat("/master/get-kitting-info");

  private SAVE_ITEM_API_URL = this.BASE_URL.concat("/master/add-kitting");

  private UPDATE_ITEM_API_URL = this.BASE_URL.concat("/master/update-kitting-info");

  private DELETE_ITEM_API_URL = this.BASE_URL.concat("/master/delete-kitting");

  async getKittingList(queryParams?: any): Promise<KittingResponse> {
    const response = await axios.get(this.GET_LIST_API_URL, {
      params: queryParams,
    });
    return response.data as KittingResponse;
  }

  async getKittingById(id: number): Promise<KittingResponse> {
    const response = await axios.get(this.GET_kitting_API_URL, {
      params: {
        kittingMasterId: id,
      },
    });
    return response.data as KittingResponse;
  }

  async saveOrUpdateKittingData(kittingData: KittingInformation) {
    const response = await axios({
      url: kittingData.kittingMasterId
        ? this.UPDATE_ITEM_API_URL
        : this.SAVE_ITEM_API_URL,
      method: kittingData.kittingMasterId ? "PUT" : "POST",
      data: kittingData,
    });
    return response.data;
  }

  async deleteById(id: number) {
    const response = await axios.delete(this.DELETE_ITEM_API_URL, {
      params: {
        kittingMasterId: id,
      },
    });
    return response.data;
  }
}

export default new KittingService();
