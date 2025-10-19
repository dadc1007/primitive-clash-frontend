import { log, logError } from "@utils";
import type { AxiosError, InternalAxiosRequestConfig } from "axios";

export const requestInterceptor = (config: InternalAxiosRequestConfig) => {
  const token = localStorage.getItem("auth_token");

  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  log("→ Request:", config.method?.toUpperCase(), config.url);

  return config;
};

export const requestErrorInterceptor = (error: AxiosError) => {
  logError("Error en request:", error);
  return Promise.reject(error);
};
