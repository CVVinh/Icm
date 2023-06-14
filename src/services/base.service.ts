import CONST from '@/services/_constant'
import BaseResponse from '@/models/response/base-response.model';
import BaseUserResponse from '@/models/response/base-response.model';
import apiClient from './api.service'

class BaseService {
  /**
   * すべてのアイテムを入手
   * @param dataParam データを取得する条件です
   */
  async getAll(dataParam?: object ): Promise<BaseResponse> {
    return await apiClient
      .get(CONST.API.BASE.GET_ALL_LIST_BASE, { params: dataParam})
      .then((response) => {
        return response.data as BaseResponse
      })
  }

  async getBaseUserInfo(id: number): Promise<BaseUserResponse> {
    return await apiClient
      .get(CONST.API.BASE.GET_ACCOUNT_USER_INFO(id))
      .then((response) => {
        return response.data as BaseUserResponse
      })
  }
}

export default new BaseService();
