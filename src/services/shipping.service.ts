import axios from 'axios'
import _CONFIG from '@/configs/_var'
import ShippingResponse from '@/models/response/shipping-response.model';
import Shipping from '@/models/Shipping';

import apiClient from './api.service'
import CONST from '@/services/_constant'


class ShippingService {

  /**
   * すべてのアイテムを入手
   * @param dataParam データを取得する条件です
   */
  async getAll(dataParam?: object ): Promise<ShippingResponse> {
    const response = await axios.get(`${_CONFIG.API_URL}/func/get-shipping-list`, { params: dataParam });
    return response.data as ShippingResponse;
  }

  /**
   * データ情報を取得する
   * @param dataParam データを取得する条件です
   */
  async get(dataParam: object): Promise<ShippingResponse> {
    const response = await axios.get(`${_CONFIG.API_URL}/func/get-shipping-info`, { params: dataParam });
    return response.data as ShippingResponse;
  }

  /**
   * データを追加
   * @param dataParam データを取得する条件です
   */
  async add(dataParam: object): Promise<ShippingResponse> {
    const response = await axios.post(`${_CONFIG.API_URL}/func/add-shipping`, dataParam)
      .then(response => {return response.data as ShippingResponse})
      .catch(error => {return error.response.data as ShippingResponse});
    return response as ShippingResponse
  }

  /**
   * データ更新
   * @param dataParam データを取得する条件です
   */
  async update(dataParam: object): Promise<ShippingResponse> {
    const response = await axios.put(`${_CONFIG.API_URL}/func/update-shipping`, dataParam)
      .then(response => {return response.data as ShippingResponse})
      .catch(error => {return error.response.data as ShippingResponse});
    return response as ShippingResponse
  }

  /**
   * データを削除する
   * @param dataParam データを取得する条件です
   */
  async delete(dataParam: object): Promise<any> {
    const response = await axios.delete(`${_CONFIG.API_URL}/func/delete-shipping`, { params: dataParam });
    return response.data as ShippingResponse
  }

  async detail(id: string): Promise<ShippingResponse> {
    return await apiClient
      .get(CONST.API.SHIPPING.DETAIL(id))
      .then((response) => {
        return response.data as ShippingResponse
      })
  }
}

export default new ShippingService();
