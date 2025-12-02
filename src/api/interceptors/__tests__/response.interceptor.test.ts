/**
 * @file response.interceptor.test.ts
 * @description Tests para interceptor de responses Axios con manejo de errores HTTP
 * 
 * Valida:
 * - Procesamiento exitoso de responses 2xx
 * - Creación de ApiError personalizado para errores 4xx/5xx
 * - Manejo especial de 401 (unauthorized) con cleanup
 * - Extracción de mensajes de error de response body
 * - Logging de errores y responses
 */
import { describe, it, expect, vi, beforeEach } from "vitest";
import {
  responseInterceptor,
  responseErrorInterceptor,
} from "../response.interceptor";
import type { AxiosError, AxiosResponse, InternalAxiosRequestConfig } from "axios";
import type { ErrorResponse } from "@lib";
import { ApiError } from "@lib";

// Mock de las utilidades
vi.mock("@api/utils", () => ({
  handleErrorByStatus: vi.fn(),
  handleUnauthorized: vi.fn(),
}));

vi.mock("@utils", () => ({
  log: vi.fn(),
  logError: vi.fn(),
}));

describe("response.interceptor", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe("responseInterceptor", () => {
    it("should return response unchanged", () => {
      const mockResponse: AxiosResponse = {
        data: { message: "Success" },
        status: 200,
        statusText: "OK",
        headers: {},
        config: { url: "/api/test", headers: {} } as InternalAxiosRequestConfig,
      };

      const result = responseInterceptor(mockResponse);

      expect(result).toEqual(mockResponse);
    });

    it("should handle different status codes", () => {
      const mockResponse: AxiosResponse = {
        data: { message: "Created" },
        status: 201,
        statusText: "Created",
        headers: {},
        config: { url: "/api/users", headers: {} } as InternalAxiosRequestConfig,
      };

      const result = responseInterceptor(mockResponse);

      expect(result.status).toBe(201);
    });
  });

  describe("responseErrorInterceptor", () => {
    it("should handle 401 error and call handleUnauthorized", async () => {
      const { handleUnauthorized } = await import("@api/utils");

      const mockError: AxiosError<ErrorResponse> = {
        config: { url: "/api/protected", headers: {} } as InternalAxiosRequestConfig,
        isAxiosError: true,
        toJSON: () => ({}),
        name: "AxiosError",
        message: "Unauthorized",
        response: {
          status: 401,
          statusText: "Unauthorized",
          data: { message: "Token expired" },
          headers: {},
          config: { url: "/api/protected", headers: {} } as InternalAxiosRequestConfig,
        },
      };

      await expect(responseErrorInterceptor(mockError)).rejects.toThrow(
        ApiError
      );
      expect(handleUnauthorized).toHaveBeenCalled();
    });

    it("should throw ApiError with response data", async () => {
      const mockError: AxiosError<ErrorResponse> = {
        config: { url: "/api/test", headers: {} } as InternalAxiosRequestConfig,
        isAxiosError: true,
        toJSON: () => ({}),
        name: "AxiosError",
        message: "Bad Request",
        response: {
          status: 400,
          statusText: "Bad Request",
          data: { message: "Invalid input" },
          headers: {},
          config: { url: "/api/test", headers: {} } as InternalAxiosRequestConfig,
        },
      };

      try {
        await responseErrorInterceptor(mockError);
      } catch (error) {
        expect(error).toBeInstanceOf(ApiError);
        expect((error as ApiError).status).toBe(400);
        expect((error as ApiError).message).toBe("Invalid input");
      }
    });

    it("should handle network errors without response", async () => {
      const mockError: AxiosError<ErrorResponse> = {
        config: { url: "/api/test", headers: {} } as InternalAxiosRequestConfig,
        isAxiosError: true,
        toJSON: () => ({}),
        name: "AxiosError",
        message: "Network Error",
        request: {},
      };

      try {
        await responseErrorInterceptor(mockError);
      } catch (error) {
        expect(error).toBeInstanceOf(ApiError);
        expect((error as ApiError).status).toBe(999);
        expect((error as ApiError).message).toBe(
          "No se pudo conectar con el servidor"
        );
        expect((error as ApiError).code).toBe("NETWORK_ERROR");
      }
    });

    it("should handle unknown errors", async () => {
      const mockError: AxiosError<ErrorResponse> = {
        config: undefined,
        isAxiosError: true,
        toJSON: () => ({}),
        name: "AxiosError",
        message: "Something went wrong",
      };

      try {
        await responseErrorInterceptor(mockError);
      } catch (error) {
        expect(error).toBeInstanceOf(ApiError);
        expect((error as ApiError).status).toBe(1000);
        expect((error as ApiError).message).toBe("Something went wrong");
        expect((error as ApiError).code).toBe("UNKNOWN_ERROR");
      }
    });

    it("should handle error with code and details", async () => {
      const mockError: AxiosError<ErrorResponse> = {
        config: { url: "/api/test", headers: {} } as InternalAxiosRequestConfig,
        isAxiosError: true,
        toJSON: () => ({}),
        name: "AxiosError",
        message: "Validation Error",
        response: {
          status: 422,
          statusText: "Unprocessable Entity",
          data: {
            message: "Validation failed",
            code: "VALIDATION_ERROR",
            details: { field: "email", issue: "invalid format" } as Record<string, unknown>,
          } as ErrorResponse,
          headers: {},
          config: { url: "/api/test", headers: {} } as InternalAxiosRequestConfig,
        },
      };

      try {
        await responseErrorInterceptor(mockError);
      } catch (error) {
        expect(error).toBeInstanceOf(ApiError);
        expect((error as ApiError).status).toBe(422);
        expect((error as ApiError).code).toBe("VALIDATION_ERROR");
        expect((error as ApiError).details).toEqual({
          field: "email",
          issue: "invalid format",
        });
      }
    });

    it("should use error property from response data when message is not available", async () => {
      const mockError: AxiosError<ErrorResponse> = {
        config: { url: "/api/test", headers: {} } as InternalAxiosRequestConfig,
        isAxiosError: true,
        toJSON: () => ({}),
        name: "AxiosError",
        message: "Error",
        response: {
          status: 500,
          statusText: "Internal Server Error",
          data: {
            error: "Database connection failed",
          } as ErrorResponse,
          headers: {},
          config: { url: "/api/test", headers: {} } as InternalAxiosRequestConfig,
        },
      };

      try {
        await responseErrorInterceptor(mockError);
      } catch (error) {
        expect(error).toBeInstanceOf(ApiError);
        expect((error as ApiError).message).toBe(
          "Database connection failed"
        );
      }
    });
  });
});
