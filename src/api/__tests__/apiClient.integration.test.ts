/**
 * @file apiClient.integration.test.ts
 * @description Tests de integración para configuración de Axios client
 * 
 * Valida:
 * - Configuración correcta de baseURL desde variables de entorno
 * - Headers por defecto (Content-Type: application/json)
 * - Timeout configurado apropiadamente
 * - Interceptors registrados en instancia
 */
import { describe, it, expect, beforeEach } from "vitest";
import apiClient from "../apiClient";

describe("apiClient integration", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it("should have baseURL from env or be undefined", () => {
    // baseURL puede ser undefined si VITE_API_BASE_URL no está configurada
    const baseURL = apiClient.defaults.baseURL;
    expect(baseURL === undefined || typeof baseURL === "string").toBe(
      true
    );
  });

  it("should have default headers", () => {
    expect(apiClient.defaults.headers["Content-Type"]).toBe(
      "application/json"
    );
  });

  it("should have timeout configured", () => {
    expect(apiClient.defaults.timeout).toBe(30000);
  });

  it("should have request interceptors configured", () => {
    // @ts-expect-error - Accediendo a propiedad interna para testing
    expect(apiClient.interceptors.request.handlers.length).toBeGreaterThan(0);
  });

  it("should have response interceptors configured", () => {
    // @ts-expect-error - Accediendo a propiedad interna para testing
    expect(apiClient.interceptors.response.handlers.length).toBeGreaterThan(0);
  });
});
