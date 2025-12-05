/**
 * @file request.interceptor.test.ts
 * @description Tests for Axios request interceptor with token injection
 * 
 * Validates:
 * - Automatic Authorization header injection with JWT token
 * - Tokenless configuration for public endpoints
 * - Request interceptor error handling
 * - Existing headers preservation
 */
import { describe, it, expect, beforeEach, vi } from "vitest";
import {
  requestInterceptor,
  requestErrorInterceptor,
} from "../request.interceptor";
import type { AxiosError, InternalAxiosRequestConfig } from "axios";

describe("request.interceptor", () => {
  beforeEach(() => {
    localStorage.clear();
    vi.clearAllMocks();
  });

  describe("requestInterceptor", () => {
    it("should add Authorization header when token exists", () => {
      localStorage.setItem("auth_token", "test-token-123");

      const config: InternalAxiosRequestConfig = {
        headers: {
          "Content-Type": "application/json",
        },
        method: "GET",
        url: "/api/test",
      } as InternalAxiosRequestConfig;

      const result = requestInterceptor(config);

      expect(result.headers.Authorization).toBe("Bearer test-token-123");
    });

    it("should not add Authorization header when no token exists", () => {
      localStorage.removeItem("auth_token");

      const config: InternalAxiosRequestConfig = {
        headers: {
          "Content-Type": "application/json",
        },
        method: "GET",
        url: "/api/test",
      } as InternalAxiosRequestConfig;

      const result = requestInterceptor(config);

      expect(result.headers.Authorization).toBeUndefined();
    });

    it("should handle config without headers", () => {
      localStorage.setItem("auth_token", "test-token-123");

      const config = {
        method: "GET",
        url: "/api/test",
      } as InternalAxiosRequestConfig;

      const result = requestInterceptor(config);

      expect(result).toBeDefined();
    });

    it("should return config with method and url", () => {
      const config: InternalAxiosRequestConfig = {
        headers: {},
        method: "POST",
        url: "/api/users",
      } as InternalAxiosRequestConfig;

      const result = requestInterceptor(config);

      expect(result.method).toBe("POST");
      expect(result.url).toBe("/api/users");
    });
  });

  describe("requestErrorInterceptor", () => {
    it("should reject with the error", async () => {
      const mockError: AxiosError = {
        config: { headers: {} } as InternalAxiosRequestConfig,
        isAxiosError: true,
        toJSON: () => ({}),
        name: "AxiosError",
        message: "Request failed",
      };

      await expect(requestErrorInterceptor(mockError)).rejects.toEqual(
        mockError
      );
    });

    it("should handle network errors", async () => {
      const networkError: AxiosError = {
        config: { headers: {} } as InternalAxiosRequestConfig,
        isAxiosError: true,
        toJSON: () => ({}),
        name: "AxiosError",
        message: "Network Error",
      };

      await expect(requestErrorInterceptor(networkError)).rejects.toEqual(
        networkError
      );
    });
  });
});
