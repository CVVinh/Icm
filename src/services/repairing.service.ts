import apiClient from './api.service';
import CONST from '@/services/_constant';
import _CONFIG from "@/configs/_var";

import RepairingResponse from "@/models/response/repairing-response.model";

const repairingService = {

  async detail(id: string): Promise<RepairingResponse> {
    return await apiClient
      .get(CONST.API.REPAIRING.DETAIL(id))
      .then((response) => {
        return response.data as RepairingResponse;
      });
  },

  async update(dataParams: object): Promise<RepairingResponse> {
    return await apiClient
      .put(CONST.API.REPAIRING.UPDATE, dataParams)
      .then((response) => {
        return response.data as RepairingResponse;
      }).catch((error) => {
        return error.response as RepairingResponse;
      });
  },
};

export default repairingService;
