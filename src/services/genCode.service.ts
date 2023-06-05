import axios from 'axios'
import _CONFIG from '@/configs/_var'
import GenCodeResponse from '@/models/response/gen-code-response.model'

class GenCodeService {
    /**
   * すべてのアイテムを入手
   * @param dataParam データを取得する条件です
   */
    async getAll(dataParam?: object ): Promise<GenCodeResponse> {
      const response = await axios.get(`${_CONFIG.API_URL}/func/get-gen_code-list`, { params: dataParam });
      return response.data as GenCodeResponse;
    }
}
export default new GenCodeService();
