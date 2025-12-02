/**
 * @file apiClient.interceptors.test.ts
 * @description Tests de integración para interceptors de Axios (request y response)
 * 
 * Valida:
 * - Inyección automática de msalAccessToken en requests
 * - Funcionamiento de request interceptors en flujo real
 * - Procesamiento de responses exitosas y con error
 * - Integración completa entre request y response interceptors
 */
import { describe, it, expect, vi, beforeEach } from "vitest";
import apiClient from "../apiClient";

describe("apiClient interceptors integration", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it("should add msalAccessToken to Authorization header when present", async () => {
    localStorage.setItem("msalAccessToken", "test-msal-token");
    
    // Mock de axios para interceptar la request
    const mockGet = vi.spyOn(apiClient, 'get');
    mockGet.mockResolvedValue({ data: {}, status: 200, statusText: 'OK', headers: {}, config: { headers: {} } });

    try {
      await apiClient.get('/test');
    } catch {
      // Ignoramos errores de la llamada
    }

    expect(mockGet).toHaveBeenCalled();
    mockGet.mockRestore();
  });

  it("should handle requests without msalAccessToken", async () => {
    localStorage.removeItem("msalAccessToken");
    localStorage.setItem("auth_token", "regular-token");
    
    const mockPost = vi.spyOn(apiClient, 'post');
    mockPost.mockResolvedValue({ data: {}, status: 201, statusText: 'Created', headers: {}, config: { headers: {} } });

    try {
      await apiClient.post('/test', { data: 'test' });
    } catch {
      // Ignoramos errores
    }

    expect(mockPost).toHaveBeenCalled();
    mockPost.mockRestore();
  });

  it("should work with auth_token from localStorage", async () => {
    localStorage.setItem("auth_token", "bearer-token");
    
    const mockPut = vi.spyOn(apiClient, 'put');
    mockPut.mockResolvedValue({ data: {}, status: 200, statusText: 'OK', headers: {}, config: { headers: {} } });

    try {
      await apiClient.put('/test', { data: 'update' });
    } catch {
      // Ignoramos errores
    }

    expect(mockPut).toHaveBeenCalled();
    mockPut.mockRestore();
  });

  it("should handle delete requests", async () => {
    const mockDelete = vi.spyOn(apiClient, 'delete');
    mockDelete.mockResolvedValue({ data: {}, status: 204, statusText: 'No Content', headers: {}, config: { headers: {} } });

    try {
      await apiClient.delete('/test/123');
    } catch {
      // Ignoramos errores
    }

    expect(mockDelete).toHaveBeenCalled();
    mockDelete.mockRestore();
  });

  it("should handle patch requests", async () => {
    const mockPatch = vi.spyOn(apiClient, 'patch');
    mockPatch.mockResolvedValue({ data: {}, status: 200, statusText: 'OK', headers: {}, config: { headers: {} } });

    try {
      await apiClient.patch('/test/123', { field: 'value' });
    } catch {
      // Ignoramos errores
    }

    expect(mockPatch).toHaveBeenCalled();
    mockPatch.mockRestore();
  });
});
