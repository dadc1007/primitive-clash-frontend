/**
 * @file auth.mutations.test.ts
 * @description Tests para mutations de autenticación (upsert de usuario)
 * 
 * Valida:
 * - Llamada a endpoint POST /auth/upsert-user con datos correctos
 * - Retorno de respuesta con datos de usuario creado/actualizado
 * - Manejo de errores en proceso de upsert
 */
import { describe, it, expect, vi, beforeEach } from "vitest";
import { upsertUser } from "../auth.mutations";
import apiClient from "@api/apiClient";
import type { AuthSuccessResponse } from "@lib";

vi.mock("@api/apiClient");

describe("auth.mutations", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe("upsertUser", () => {
    it("should call apiClient.post with correct endpoint", async () => {
      const mockResponse: AuthSuccessResponse = {
        id: "user-123",
        email: "test@example.com",
        username: "testuser",
        createdAt: "2024-01-01T00:00:00Z",
        updatedAt: "2024-01-01T00:00:00Z",
      };

      vi.mocked(apiClient.post).mockResolvedValue({
        data: mockResponse,
        status: 200,
        statusText: "OK",
        headers: {},
        config: {} as any,
      });

      const result = await upsertUser();

      expect(apiClient.post).toHaveBeenCalledWith("/auth/upsert");
      expect(result).toEqual(mockResponse);
    });

    it("should return user data from response", async () => {
      const mockResponse: AuthSuccessResponse = {
        id: "user-456",
        email: "another@example.com",
        username: "anotheruser",
        createdAt: "2024-01-02T00:00:00Z",
        updatedAt: "2024-01-02T00:00:00Z",
      };

      vi.mocked(apiClient.post).mockResolvedValue({
        data: mockResponse,
        status: 201,
        statusText: "Created",
        headers: {},
        config: {} as any,
      });

      const result = await upsertUser();

      expect(result.id).toBe("user-456");
      expect(result.username).toBe("anotheruser");
    });

    it("should throw error when request fails", async () => {
      const mockError = new Error("Network error");
      vi.mocked(apiClient.post).mockRejectedValue(mockError);

      await expect(upsertUser()).rejects.toThrow("Network error");
    });
  });
});
