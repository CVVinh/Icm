import apiClient from './api.service'
import CONST from '@/services/_constant'
import axios from "axios";
import _CONFIG from "@/configs/_var";

import PickUpResponse from "@/models/response/pickup-response.model";

const pickupService = {

  async detail(id: string): Promise<PickUpResponse> {
    return await apiClient
      .get(CONST.API.PICKUP.DETAIL(id))
      .then((response) => {
        return response.data as PickUpResponse
      }).catch((error) => {
        return error.data as PickUpResponse
      })
  },
  async update(dataParams: object): Promise<PickUpResponse> {
    return await apiClient
      .put(CONST.API.PICKUP.UPDATE, dataParams)
      .then((response) => {
        return response.data as PickUpResponse
      }).catch((error) => {
        return error.response as PickUpResponse
      })
  },
}

export default pickupService
