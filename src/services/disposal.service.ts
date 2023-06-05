import apiClient from './api.service'
import CONST from '@/services/_constant'
import _CONFIG from "@/configs/_var";

import DisposalResponse from "@/models/response/disposal-response.model";

const disposalService = {

  async detail(id: string): Promise<DisposalResponse> {
    return await apiClient
      .get(CONST.API.DISPOSAL.DETAIL(id))
      .then((response) => {
        return response.data as DisposalResponse
      }).catch((error) => {
        return error.response as DisposalResponse
      })
  },
  async update(dataParams: object): Promise<DisposalResponse> {
    return await apiClient
      .put(CONST.API.DISPOSAL.UPDATE, dataParams)
      .then((response) => {
        return response.data as DisposalResponse
      }).catch((error) => {
        return error.response as DisposalResponse
      })
  },
}

export default disposalService
