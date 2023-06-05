import ProcurementDetail from "@/models/procurement-detail.model";
import Procurement from "@/models/procurement.model";
import ProcurementResponse from "@/models/response/procurement-response.model";
import { AxiosResponse } from "axios";
import apiClient from "./api.service";

class ProcurementService {
  async getProcurementInfo(
    procurementId: number
  ): Promise<ProcurementResponse> {
    const response = await apiClient.get("/func/get-procurement-info", {
      params: { procurementId },
    });
    return response.data;
  }

  async getProcurementList(
    dataParam?: object
  ): Promise<ProcurementResponse> {
    const response = await apiClient.get("/func/get-procurement-list", { params: dataParam });
    return response.data;
  }

  async addOrUpdate(
    procurementManagement: Procurement,
    procurementDetailList: ProcurementDetail[] | undefined
  ) {
    const response: AxiosResponse<ProcurementResponse> =
      await apiClient.request({
        url: procurementManagement.procurementId
          ? "/func/update-procurement-info"
          : "/func/add-procurement",
        method: procurementManagement.procurementId ? "PUT" : "POST",
        data: {
          procurementManagement,
          procurementDetailList,
        },
      });
    return response.data;
  }
}

export default new ProcurementService();
