import axios from "axios";
import _CONFIG from "@/configs/_var";
import PrefectureResponse from "@/models/response/prefecture-response.model";
import Prefecture from "@/models/Prefecture";

class PrefectureService {
  /**
   * データ取得都道府県
   */
  async getAll(): Promise<Prefecture[]> {
    const response = await axios.get(
      `${_CONFIG.API_URL}/func/get-prefecture-list`
    );
    return (response.data as PrefectureResponse).mstPrefecture;
  }
}
export default new PrefectureService();
