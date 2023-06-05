import apiClient from './api.service'
import ItemSet from '@/models/ItemSet'
import CONST from '@/services/_constant'
import axios from "axios";
import _CONFIG from "@/configs/_var";

import ItemSetResponse from "@/models/response/item-set-response.model";

const itemSetService = {

  async getList(params: Promise<ItemSetResponse>) {
    return await apiClient
      .get(CONST.API.ITEMSET.LIST, { params })
      .then((response) => {
        return response.data as ItemSetResponse
      })
  },
  async detail(id: string): Promise<ItemSetResponse> {
    return await apiClient
      .get(CONST.API.ITEMSET.DETAIL(id))
      .then((response) => {
        return response.data as ItemSetResponse
      })
  },
  async create(itemsetData: ItemSet) {
    return await apiClient
      .post(CONST.API.ITEMSET.CREATE, itemsetData)
      .then((response) => {
        return response.data
      }).catch((error) => {
        return error.response.data
      })
  },
  async update(data: any) {
    return await apiClient
      .put(CONST.API.ITEMSET.UPDATE, data)
      .then((response) => {
        return response.data
      })
  },

  async saveOrUpdate(
    itemsetData: ItemSet
  ) {
    const response = await apiClient({
      url: itemsetData.itemIdSet
        ? CONST.API.ITEMSET.UPDATE
        : CONST.API.ITEMSET.CREATE,
      method: itemsetData.itemIdSet ? "PUT" : "POST",
      data: itemsetData,
    });

    return response.data;
  },

  async delete(data: any) {
    return await apiClient
      .delete(CONST.API.ITEMSET.DELETE,{
        data
      },)
      .then((response) => {
        return response
      })
  },

  async exportCSV(dataParam?: any ) {

    Object.keys(dataParam).forEach((key) => {
      if (dataParam[key] !== 0 && !dataParam[key]) {
        delete dataParam[key]
      }
    })
    const param =
    '?' +
    Object.keys(dataParam)
    .map(key => `${key}=${encodeURIComponent(dataParam[key])}`)
    .join('&')
    window.location.href = `${_CONFIG.API_URL}/func/export-item-set-list-csv${param}`
  }


}

export default itemSetService
