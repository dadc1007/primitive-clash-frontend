import axios, { type AxiosInstance } from "axios";
import {
  requestErrorInterceptor,
  requestInterceptor,
} from "./interceptors/request.interceptor";
import {
  responseErrorInterceptor,
  responseInterceptor,
} from "./interceptors/response.interceptor";

const API_BASE_URL: string = import.meta.env.VITE_API_BASE_URL;

const apiClient: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 15000,
});

apiClient.interceptors.request.use(requestInterceptor, requestErrorInterceptor);

apiClient.interceptors.response.use(
  responseInterceptor,
  responseErrorInterceptor
);

export default apiClient;
