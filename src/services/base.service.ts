import axios from 'axios'
import _CONFIG from '@/configs/_var'
import BaseResponse from '@/models/response/base-response.model';
import BaseMaster from '@/models/Base';

class BaseService {
  /**
   * すべてのアイテムを入手
   * @param dataParam データを取得する条件です
   */
  async getAll(dataParam?: object ): Promise<BaseResponse> {
    const response = await axios.get(`${_CONFIG.API_URL}/func/get-base-list`, { params: dataParam });
    return response.data as BaseResponse;
  }
}

export default new BaseService();
