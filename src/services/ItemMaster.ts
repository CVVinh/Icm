import axios from 'axios';
import _CONFIG from '@/configs/_var';
import ItemMasterResponse from '@/models/response/item-master-response.model';
import ItemMaster from '@/models/ItemMaster';

class ItemListService {

  /**
   * すべてのアイテムを入手
   * @param dataParam データを取得する条件です
   */
  async getAll(dataParam?: object): Promise<ItemMasterResponse> {
    const response = await axios.get(`${_CONFIG.API_URL}/func/get-item-list`, { params: dataParam });
    return response.data as ItemMasterResponse;
  }

  /**
   * データ情報を取得する
   * @param dataParam データを取得する条件です
   */
  async get(dataParam: object): Promise<ItemMasterResponse> {
    const response = await axios.get(`${_CONFIG.API_URL}/func/get-item-info`, { params: dataParam });
    return response.data as ItemMasterResponse;
  }

  /**
   * データを追加
   * @param dataParam データを取得する条件です
   */
  async add(dataParam: object): Promise<ItemMasterResponse> {
    let response = {} as ItemMasterResponse;
    return await axios.post(`${_CONFIG.API_URL}/func/add-item`, dataParam)
      .then(res => {
        response = res.data;
        return response;
      })
      .catch(error => {
        response = error.response.data;
        return response;
      });
  }

  /**
   * データ更新
   * @param dataParam データを取得する条件です
   */
  async update(dataParam: object): Promise<ItemMasterResponse> {
    let response = {} as ItemMasterResponse;
    return await axios.put(`${_CONFIG.API_URL}/func/update-item-info`, dataParam, { params: { itemId: dataParam.itemId } })
    .then(res => {
      response = res.data;
      return response;
    })
    .catch(error => {
      response = error.response.data;
      return response;
    });
  }

  /**
   * データを削除する
   * @param dataParam データを取得する条件です
   */
  async delete(dataParam: object): Promise<any> {
    const response = await axios.delete(`${_CONFIG.API_URL}/func/delete-item`, { params: dataParam })
    .then(res => {
      return res;
    }).catch(error => {
      return error.response;
    });
    return response.data as ItemMasterResponse;
  }
}

export default new ItemListService();
