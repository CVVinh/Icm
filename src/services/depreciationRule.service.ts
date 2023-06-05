import _CONFIG from "@/configs/_var";
import DepreciationRulesResponse from "@/models/response/depreciation-rule.model";
import axios from "axios";

class DepreciationRulesService {
    /**
     *
     * @param dataParam
     */
    async getAll(dataParam?: object ): Promise<DepreciationRulesResponse> {
      const response = await axios.get(`${_CONFIG.API_URL}/func/depreciation-rule-list`, { params: dataParam });
      return response.data as DepreciationRulesResponse;
    }
}

export default new DepreciationRulesService();
