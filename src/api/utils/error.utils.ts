import type { ApiError, ErrorResponse } from "@lib";
import { logError } from "@utils";

export const handleErrorByStatus = (
  status: number,
  data: ErrorResponse | undefined,
  url?: string
): void => {
  switch (status) {
    case 401:
      logError("No autorizado");
      break;
    case 403:
      logError("Acceso denegado:", data?.message);
      break;
    case 404:
      logError("Recurso no encontrado:", url);
      break;
    case 422:
      logError("Error de validación:", data?.details);
      break;
    case 500:
      logError("Error del servidor");
      break;
    default:
      logError("Error inesperado:", status, data?.message);
  }
};

export const isApiError = (error: unknown): error is ApiError => {
  return (
    typeof error === "object" &&
    error !== null &&
    "status" in error &&
    "message" in error
  );
};
