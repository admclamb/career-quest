import axios, { AxiosRequestConfig, AxiosResponse } from "axios";

const axiosApi = axios.create({
  baseURL: import.meta.env.VITE_API_SERVER_URL ?? "",
  timeout: 30_000,
});

const callExternalApi = async <T>(options: {
  config: AxiosRequestConfig;
}): Promise<T> => {
  const response: AxiosResponse = await axiosApi(options.config);
  return response.data;
};

const api = {
  callExternalApi,
};

Object.freeze(api);
export default api;
