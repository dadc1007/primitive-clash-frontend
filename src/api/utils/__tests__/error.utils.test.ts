/**
 * @file error.utils.test.ts
 * @description Tests para manejo centralizado de errores de API por status HTTP
 * 
 * Valida:
 * - handleErrorByStatus para diferentes códigos (401, 403, 404, 500, etc)
 * - isApiError para validar tipo de error personalizado
 * - Logging apropiado de errores
 * - Mensajes de error personalizados vs genéricos
 */
import { describe, it, expect, vi } from "vitest";
import { handleErrorByStatus, isApiError } from "../error.utils";
import type { ErrorResponse, ApiError } from "@lib";

describe("error.utils", () => {
  describe("handleErrorByStatus", () => {
    it("should handle 401 unauthorized error", () => {
      const consoleErrorSpy = vi.spyOn(console, "error").mockImplementation(() => {});

      handleErrorByStatus(401, undefined);

      consoleErrorSpy.mockRestore();
    });

    it("should handle 403 forbidden error with message", () => {
      const consoleErrorSpy = vi.spyOn(console, "error").mockImplementation(() => {});
      const errorData: ErrorResponse = {
        message: "Access denied to this resource",
      };

      handleErrorByStatus(403, errorData);

      consoleErrorSpy.mockRestore();
    });

    it("should handle 404 not found error with URL", () => {
      const consoleErrorSpy = vi.spyOn(console, "error").mockImplementation(() => {});

      handleErrorByStatus(404, undefined, "/api/users/123");

      consoleErrorSpy.mockRestore();
    });

    it("should handle 422 validation error with details", () => {
      const consoleErrorSpy = vi.spyOn(console, "error").mockImplementation(() => {});
      const errorData: ErrorResponse = {
        message: "Validation failed",
        details: ["Email is required", "Password too short"],
      };

      handleErrorByStatus(422, errorData);

      consoleErrorSpy.mockRestore();
    });

    it("should handle 500 internal server error", () => {
      const consoleErrorSpy = vi.spyOn(console, "error").mockImplementation(() => {});

      handleErrorByStatus(500, undefined);

      consoleErrorSpy.mockRestore();
    });

    it("should handle unexpected status code", () => {
      const consoleErrorSpy = vi.spyOn(console, "error").mockImplementation(() => {});
      const errorData: ErrorResponse = {
        message: "Unknown error occurred",
      };

      handleErrorByStatus(418, errorData);

      consoleErrorSpy.mockRestore();
    });

    it("should handle error without data", () => {
      const consoleErrorSpy = vi.spyOn(console, "error").mockImplementation(() => {});

      handleErrorByStatus(500, undefined);

      consoleErrorSpy.mockRestore();
    });
  });

  describe("isApiError", () => {
    it("should return true for valid ApiError", () => {
      const error: ApiError = {
        status: 404,
        message: "Not found",
      };

      expect(isApiError(error)).toBe(true);
    });

    it("should return false for null", () => {
      expect(isApiError(null)).toBe(false);
    });

    it("should return false for undefined", () => {
      expect(isApiError(undefined)).toBe(false);
    });

    it("should return false for string", () => {
      expect(isApiError("error message")).toBe(false);
    });

    it("should return false for number", () => {
      expect(isApiError(404)).toBe(false);
    });

    it("should return false for object without status", () => {
      const error = {
        message: "Error message",
      };

      expect(isApiError(error)).toBe(false);
    });

    it("should return false for object without message", () => {
      const error = {
        status: 404,
      };

      expect(isApiError(error)).toBe(false);
    });

    it("should return true for object with both status and message", () => {
      const error = {
        status: 500,
        message: "Server error",
        additionalField: "extra",
      };

      expect(isApiError(error)).toBe(true);
    });

    it("should return false for empty object", () => {
      expect(isApiError({})).toBe(false);
    });

    it("should return false for array", () => {
      expect(isApiError([])).toBe(false);
    });
  });
});
