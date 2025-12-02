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
        userId: "user-123",
        email: "test@example.com",
        username: "testuser",
        gold: 1000,
        gems: 50,
        level: 1,
        trophies: 0,
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
        userId: "user-456",
        email: "another@example.com",
        username: "anotheruser",
        gold: 2000,
        gems: 100,
        level: 5,
        trophies: 1500,
      };

      vi.mocked(apiClient.post).mockResolvedValue({
        data: mockResponse,
        status: 201,
        statusText: "Created",
        headers: {},
        config: {} as any,
      });

      const result = await upsertUser();

      expect(result.userId).toBe("user-456");
      expect(result.username).toBe("anotheruser");
    });

    it("should throw error when request fails", async () => {
      const mockError = new Error("Network error");
      vi.mocked(apiClient.post).mockRejectedValue(mockError);

      await expect(upsertUser()).rejects.toThrow("Network error");
    });
  });
});
