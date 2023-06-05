import axios, { AxiosInstance } from "axios";
import _CONFIG from "@/configs/_var";

class HttpClient {
  private axiosInstance: AxiosInstance | undefined;

  public getInstace(): AxiosInstance {
    if (!this.axiosInstance) {
      return this.initInstance();
    }
    return this.axiosInstance;
  }

  private initInstance() {
    this.axiosInstance = axios.create({
      baseURL: _CONFIG.API_URL,
    });

    this.axiosInstance.interceptors.request.use((config) => {
      if (config.params) {
        this.clearEmptyStringData(config.params);
      }
      return config;
    });

    this.axiosInstance.interceptors.response.use((response) => {
      return response;
    });

    return this.axiosInstance;
  }

  private clearEmptyStringData(obj: any) {
    Object.entries(obj).map((entry) => {
      if (typeof entry[1] === "string" && !entry[1]) {
        delete obj[entry[0]];
      }
    });
  }
}

const customAxiosInstance = new HttpClient();

export default customAxiosInstance.getInstace();
