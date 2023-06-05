import axios from 'axios'
import _CONFIG from '@/configs/_var'
import MakerMasterResponse from '@/models/response/maker-master-response.model';
import MakerMaster from '@/models/MakerMaster';

class MarkerService {
  /**
   * すべてのアイテムを入手
   * @param dataParam データを取得する条件です
   */
  async getAll(dataParam?: object ): Promise<MakerMasterResponse> {
    const response = await axios.get(`${_CONFIG.API_URL}/func/get-maker-list`, { params: dataParam });
    return response as MakerMasterResponse;
  }

  /**
   * データ情報を取得する
   * @param dataParam データを取得する条件です
   */
  async get(dataParam: object): Promise<MakerMaster> {
    const response = await axios.get(`${_CONFIG.API_URL}/func/get-maker-info`, { params: dataParam });
    return response.data as MakerMaster;
  }

  /**
   * データを追加
   * @param dataParam データを取得する条件です
   */
  async add(dataParam: object): Promise<MakerMasterResponse> {
    const response = await axios.post(`${_CONFIG.API_URL}/func/add-maker`, dataParam)
      .then(response => response)
      .catch(error => error.response);
    return response as MakerMasterResponse;
  }

  /**
   * データ更新
   * @param dataParam データを取得する条件です
   */
  async update(dataParam: object): Promise<MakerMasterResponse> {
    const response = await axios.put(`${_CONFIG.API_URL}/func/update-maker-info`, dataParam)
      .then(response => response)
      .catch(error => error.response);
    return response as MakerMasterResponse;
  }

  /**
   * データを削除する
   * @param dataParam データを取得する条件です
   */
  async delete(dataParam: object): Promise<MakerMasterResponse> {
    const response = await axios.delete(`${_CONFIG.API_URL}/func/delete-maker`, { params: dataParam })
      .then(response => response)
      .catch(error => {
        return error.response
      });
    return response as MakerMasterResponse;
  }
}

export default new MarkerService();
