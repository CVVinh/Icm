import _CONFIG from "@/configs/_var";
import OrderManagementResponse from "@/models/response/order-management-response.model";
import axios from "axios";

class OrderManagementService {
  /**
   * API呼び出し調達リストを取得する
   * @param dataParam ユーザーが検索または取得したいパラメーター
   */
  async getAll(dataParam?: object ): Promise<OrderManagementResponse> {
    const response = await axios.get(`${_CONFIG.API_URL}/func/get-procurement-list`, { params: dataParam });
    return response.data as OrderManagementResponse;
  }

  /**
   * API呼び出し調達リストを取得する
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
    window.location.href = `${_CONFIG.API_URL}/func/export-procurement-list-csv${param}`
  }
}
export default new OrderManagementService();
