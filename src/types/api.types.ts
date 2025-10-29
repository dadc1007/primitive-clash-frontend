// Lo que RECIBE el backend en response.data
export interface ErrorResponse {
  message: string;
  code?: string;
  details?: unknown;
}

// Lo que usamos en el frontend después de procesar
export class ApiError extends Error {
  status: number;
  code?: string;
  details?: unknown;

  constructor(
    status: number,
    message: string,
    code?: string,
    details?: unknown
  ) {
    super(message);
    this.name = "ApiError";

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, ApiError);
    }

    this.status = status;
    this.code = code;
    this.details = details;
  }
}
