import { handleErrorByStatus, handleUnauthorized } from "@api/utils";
import { ApiError, type ErrorResponse } from "@lib";
import { log, logError } from "@utils";
import type { AxiosError, AxiosResponse } from "axios";

export const responseInterceptor = (response: AxiosResponse) => {
  log("← Response:", response.status, response.config.url);

  return response;
};

export const responseErrorInterceptor = async (
  error: AxiosError<ErrorResponse>
) => {
  if (error.response) {
    const { status, data } = error.response;

    if (status === 401) {
      handleUnauthorized();
    }

    handleErrorByStatus(status, data, error.config?.url);

    const errorData = data as unknown as Record<string, unknown>;
    const specificErrorMessage =
      data?.message || errorData?.error || "Error en la petición";

    throw new ApiError(
      status,
      specificErrorMessage as string,
      errorData?.code as string | undefined,
      errorData?.details
    );
  } else if (error.request) {
    logError("Error de red:", error.message);

    throw new ApiError(
      999,
      "No se pudo conectar con el servidor",
      "NETWORK_ERROR"
    );
  } else {
    logError("Error:", error.message);

    throw new ApiError(1000, error.message, "UNKNOWN_ERROR");
  }
};
