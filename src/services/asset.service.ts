import _CONFIG from "@/configs/_var";
import AssetManagement from "@/models/AssetManagement";
import AssetManagementResponse from "@/models/response/asset-management-response.models";
import axios from "axios";

class AssetManagementService {
  /**
   * API呼び出し資産管理一覧取得
   * @param dataParam ユーザーが検索または取得したいパラメーター
   */
  async getAll(dataParam?: object ): Promise<AssetManagementResponse> {
    const response = await axios.get(`${_CONFIG.API_URL}/func/get-asset-list`, { params: dataParam });
    return response.data as AssetManagementResponse;
  }

  /**
   * API呼び出し資産管理一覧取得
   * @param dataParam ユーザーが検索または取得したいパラメーター
   */
  async get(dataParam?: object ): Promise<AssetManagement> {
    const response = await axios.get(`${_CONFIG.API_URL}/func/get-asset-info`, { params: dataParam });
    return response.data as AssetManagement;
  }

  /**
  * API呼び出し資産管理一覧取得
  * @param dataParam ユーザーが検索または取得したいパラメーター
  */
  async add(dataParam: object): Promise<AssetManagementResponse> {
    const response = await axios.post(`${_CONFIG.API_URL}/func/add-asset`, dataParam)
      .then(response => response.data)
      .catch(error => error.response.data);
    return response as AssetManagementResponse;
  }

  /**
   * API呼び出し資産管理一覧取得
   * @param dataParam ユーザーが検索または取得したいパラメーター
   */
  async exportCSV(dataParam?: any ) {
    // パラメータ値なしで属性を削除
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
    window.location.href = `${_CONFIG.API_URL}/func/export-asset-list-csv${param}`
  }
}
export default new AssetManagementService();
