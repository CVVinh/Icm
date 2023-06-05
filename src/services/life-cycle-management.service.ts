import { AxiosResponse } from "axios";
import { LifeCycleResponse } from "@/models/response/life-cycle-response.model";
import axios from "@/services/api.service";

class LifeCycleManagermentService {
  async getList(queryParams: any | undefined): Promise<LifeCycleResponse> {
    const response: AxiosResponse<LifeCycleResponse> = await axios.get(
      "/func/get-lcm-list",
      {
        params: queryParams,
      }
    );
    return response.data;
  }
}

export default new LifeCycleManagermentService();
