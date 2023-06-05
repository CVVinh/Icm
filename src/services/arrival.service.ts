import axios from 'axios'
import _CONFIG from '@/configs/_var'
import ArrivalResponse from '@/models/response/arrival-response.model';
import Arrival from '@/models/Arrival';

class ArrivalService {

  /**
   * すべてのアイテムを入手
   * @param dataParam データを取得する条件です
   */
  async getAll(dataParam?: object ): Promise<ArrivalResponse> {
    const response = await axios.get(`${_CONFIG.API_URL}/func/get-arrival-list`, { params: dataParam });
    return response.data as ArrivalResponse;
  }

  /**
   * データ情報を取得する
   * @param dataParam データを取得する条件です
   */
  async get(dataParam: object): Promise<Arrival> {
    const response = await axios.get(`${_CONFIG.API_URL}/func/get-arrival-info`, { params: dataParam });
    return response.data as Arrival;
  }

  /**
   * データを追加
   * @param dataParam データを取得する条件です
   */
  async add(dataParam: object): Promise<ArrivalResponse> {
    const response = await axios.post(`${_CONFIG.API_URL}/func/add-arrival`, dataParam)
                      .then(response => response.data)
                      .catch(error => error.response.data);
    return response as ArrivalResponse
  }

  /**
   * データ更新
   * @param dataParam データを取得する条件です
   */
  async update(dataParam: object): Promise<ArrivalResponse> {
    const response = await axios.put(`${_CONFIG.API_URL}/func/update-arrival-info`, dataParam)
                      .then(response => response.data)
                      .catch(error => error.response.data);
    return response as ArrivalResponse
  }

  /**
   * データを削除する
   * @param dataParam データを取得する条件です
   */
  async delete(dataParam: object): Promise<any> {
    const response = await axios.delete(`${_CONFIG.API_URL}/func/delete-arrival-info`, { params: dataParam })
                      .then(response => response.data)
                      .catch(error => error.response.data);
    return response as ArrivalResponse
  }
}

export default new ArrivalService();
