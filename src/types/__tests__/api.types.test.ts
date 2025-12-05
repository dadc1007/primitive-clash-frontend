/**
 * @file api.types.test.ts
 * @description Tests for custom ApiError class that encapsulates API errors
 * 
 * Validates:
 * - Error creation with status, message, code and details
 * - Correct native Error class inheritance
 * - Stack trace capture for debugging
 */
import { describe, it, expect } from "vitest";
import { ApiError } from "../api.types";

describe("api.types", () => {
  describe("ApiError", () => {
    it("should create error with status and message", () => {
      const error = new ApiError(404, "Not found");

      expect(error.status).toBe(404);
      expect(error.message).toBe("Not found");
      expect(error.name).toBe("ApiError");
    });

    it("should create error with code", () => {
      const error = new ApiError(400, "Bad request", "INVALID_INPUT");

      expect(error.code).toBe("INVALID_INPUT");
    });

    it("should create error with details", () => {
      const details = { field: "email", reason: "invalid format" };
      const error = new ApiError(422, "Validation failed", "VALIDATION", details);

      expect(error.details).toEqual(details);
    });

    it("should extend Error class", () => {
      const error = new ApiError(500, "Server error");

      expect(error instanceof Error).toBe(true);
      expect(error instanceof ApiError).toBe(true);
    });

    it("should capture stack trace", () => {
      const error = new ApiError(500, "Server error");

      expect(error.stack).toBeDefined();
    });

    it("should have error message accessible", () => {
      const error = new ApiError(403, "Forbidden");

      expect(error.message).toBe("Forbidden");
      expect(error.toString()).toContain("Forbidden");
    });

    it("should handle error without code and details", () => {
      const error = new ApiError(200, "Success");

      expect(error.code).toBeUndefined();
      expect(error.details).toBeUndefined();
    });
  });
});
