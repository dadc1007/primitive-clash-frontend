/**
 * @file user.queries.test.ts
 * @description Tests for user API queries
 * 
 * Validates:
 * - User match status retrieval
 * - Successful response handling
 * - API error handling
 */
import { describe, it, expect, vi, beforeEach } from "vitest";
import { getUserMatchStatus } from "../user.queries";
import apiClient from "@api/apiClient";
import type { UserMatchStatusResponse } from "@lib";

vi.mock("@api/apiClient");

describe("user.queries", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe("getUserMatchStatus", () => {
    const mockUserId = "user-123";

    it("should fetch user match status successfully when user is in a match", async () => {
      const mockResponse: UserMatchStatusResponse = {
        userId: mockUserId,
        isInMatch: true,
        matchId: "match-456",
      };

      vi.mocked(apiClient.get).mockResolvedValueOnce({
        data: mockResponse,
        status: 200,
        statusText: "OK",
        headers: {},
        config: { headers: {} } as unknown,
      });

      const result = await getUserMatchStatus(mockUserId);

      expect(result).toEqual(mockResponse);
      expect(apiClient.get).toHaveBeenCalledWith(`/users/${mockUserId}/match`);
      expect(result.isInMatch).toBe(true);
      expect(result.matchId).toBe("match-456");
    });

    it("should fetch user match status successfully when user is not in a match", async () => {
      const mockResponse: UserMatchStatusResponse = {
        userId: mockUserId,
        isInMatch: false,
      };

      vi.mocked(apiClient.get).mockResolvedValueOnce({
        data: mockResponse,
        status: 200,
        statusText: "OK",
        headers: {},
        config: { headers: {} } as unknown,
      });

      const result = await getUserMatchStatus(mockUserId);

      expect(result).toEqual(mockResponse);
      expect(result.isInMatch).toBe(false);
      expect(result.matchId).toBeUndefined();
    });

    it("should handle 404 error when user not found", async () => {
      vi.mocked(apiClient.get).mockRejectedValueOnce({
        response: {
          status: 404,
          data: { message: "User not found" },
        },
      });

      await expect(getUserMatchStatus(mockUserId)).rejects.toThrow();
    });

    it("should handle 401 unauthorized error", async () => {
      vi.mocked(apiClient.get).mockRejectedValueOnce({
        response: {
          status: 401,
          data: { message: "Unauthorized" },
        },
      });

      await expect(getUserMatchStatus(mockUserId)).rejects.toThrow();
    });

    it("should handle network error", async () => {
      vi.mocked(apiClient.get).mockRejectedValueOnce(
        new Error("Network error")
      );

      await expect(getUserMatchStatus(mockUserId)).rejects.toThrow(
        "Network error"
      );
    });

    it("should call correct API endpoint with userId", async () => {
      const differentUserId = "user-789";
      const mockResponse: UserMatchStatusResponse = {
        userId: differentUserId,
        isInMatch: false,
      };

      vi.mocked(apiClient.get).mockResolvedValueOnce({
        data: mockResponse,
        status: 200,
        statusText: "OK",
        headers: {},
        config: { headers: {} } as unknown,
      });

      await getUserMatchStatus(differentUserId);

      expect(apiClient.get).toHaveBeenCalledWith(`/users/${differentUserId}/match`);
    });
  });
});
