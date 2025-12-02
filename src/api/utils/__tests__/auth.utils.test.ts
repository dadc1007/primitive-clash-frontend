/**
 * @file auth.utils.test.ts
 * @description Tests para utilidades de autenticación y manejo de tokens
 * 
 * Valida:
 * - Almacenamiento y recuperación de tokens en localStorage
 * - Eliminación de tokens al hacer logout
 * - Manejo de respuesta 401 (unauthorized) con redirección
 * - Limpieza de datos al detectar sesión expirada
 */
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import {
  handleUnauthorized,
  getAuthToken,
  setAuthToken,
  removeAuthToken,
} from "../auth.utils";

describe("auth.utils", () => {
  let localStorageMock: Storage;
  let originalLocation: Location;

  beforeEach(() => {
    localStorageMock = window.localStorage;
    
    // Mock window.location
    originalLocation = window.location;
    delete (window as any).location;
    window.location = {
      ...originalLocation,
      href: "",
      pathname: "/dashboard",
    } as Location;
  });

  afterEach(() => {
    vi.restoreAllMocks();
    window.location = originalLocation;
  });

  describe("handleUnauthorized", () => {
    it("should remove auth tokens from localStorage", () => {
      // Set tokens first
      localStorage.setItem("auth_token", "test-token");
      localStorage.setItem("user_data", "test-data");
      
      handleUnauthorized();

      expect(localStorage.getItem("auth_token")).toBeNull();
      expect(localStorage.getItem("user_data")).toBeNull();
    });

    it("should redirect to login when not on login page", () => {
      window.location.pathname = "/dashboard";

      handleUnauthorized();

      expect(window.location.href).toBe("/login");
    });

    it("should not redirect when already on login page", () => {
      window.location.pathname = "/login";
      const originalHref = window.location.href;

      handleUnauthorized();

      expect(window.location.href).toBe(originalHref);
    });

    it("should not redirect when on login-related page", () => {
      window.location.pathname = "/login/forgot-password";
      const originalHref = window.location.href;

      handleUnauthorized();

      expect(window.location.href).toBe(originalHref);
    });
  });

  describe("getAuthToken", () => {
    it("should return token from localStorage", () => {
      localStorage.setItem("auth_token", "mock-token-123");

      const token = getAuthToken();

      expect(token).toBe("mock-token-123");
      localStorage.removeItem("auth_token");
    });

    it("should return null when no token exists", () => {
      localStorage.removeItem("auth_token");
      
      const token = getAuthToken();

      expect(token).toBeNull();
    });
  });

  describe("setAuthToken", () => {
    it("should store token in localStorage", () => {
      setAuthToken("new-token-456");

      expect(localStorage.getItem("auth_token")).toBe("new-token-456");
      localStorage.removeItem("auth_token");
    });

    it("should handle empty string token", () => {
      setAuthToken("");

      expect(localStorage.getItem("auth_token")).toBe("");
      localStorage.removeItem("auth_token");
    });
  });

  describe("removeAuthToken", () => {
    it("should remove token from localStorage", () => {
      localStorage.setItem("auth_token", "test-token");
      
      removeAuthToken();

      expect(localStorage.getItem("auth_token")).toBeNull();
    });
  });
});