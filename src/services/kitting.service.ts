import apiClient from "./api.service";
import CONST from "@/services/_constant";
import _CONFIG from "@/configs/_var";

import KittingResponse from "@/models/response/kitting-response.model";

const kittingService = {
  async detail(id: string): Promise<KittingResponse> {
    return await apiClient
      .get(CONST.API.KITTING.DETAIL(id))
      .then((response) => {
        return response.data as KittingResponse;
      });
  },
  async update(dataParam?: object): Promise<KittingResponse> {
    return await apiClient
      .put(CONST.API.KITTING.UPDATE, dataParam)
      .then((response) => {
        return response.data as KittingResponse;
      })
      .catch((error) => {
        return error.response as KittingResponse;
      });
  },
};

export default kittingService;
