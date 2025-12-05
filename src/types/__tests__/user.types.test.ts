/**
 * @file user.types.test.ts
 * @description Tests for user TypeScript types
 * 
 * Validates:
 * - UserMatchStatusResponse type structure
 * - Correct data types
 * - Optional and required properties
 */
import { describe, it, expect } from "vitest";
import type { UserMatchStatusResponse } from "../user.types";

describe("UserMatchStatusResponse", () => {
  it("should create a valid UserMatchStatusResponse when user is in a match", () => {
    const response: UserMatchStatusResponse = {
      userId: "user-123",
      isInMatch: true,
      matchId: "match-456",
    };

    expect(response).toBeDefined();
    expect(response.userId).toBe("user-123");
    expect(response.isInMatch).toBe(true);
    expect(response.matchId).toBe("match-456");
  });

  it("should create a valid UserMatchStatusResponse when user is not in a match", () => {
    const response: UserMatchStatusResponse = {
      userId: "user-789",
      isInMatch: false,
    };

    expect(response).toBeDefined();
    expect(response.userId).toBe("user-789");
    expect(response.isInMatch).toBe(false);
    expect(response.matchId).toBeUndefined();
  });

  it("should have correct property types", () => {
    const response: UserMatchStatusResponse = {
      userId: "user-abc",
      isInMatch: true,
      matchId: "match-xyz",
    };

    expect(typeof response.userId).toBe("string");
    expect(typeof response.isInMatch).toBe("boolean");
    expect(typeof response.matchId).toBe("string");
  });

  it("should allow matchId to be undefined", () => {
    const response: UserMatchStatusResponse = {
      userId: "user-def",
      isInMatch: false,
      matchId: undefined,
    };

    expect(response.matchId).toBeUndefined();
  });

  it("should match expected structure for active match", () => {
    const response: UserMatchStatusResponse = {
      userId: "user-456",
      isInMatch: true,
      matchId: "match-789",
    };

    expect(response).toHaveProperty("userId");
    expect(response).toHaveProperty("isInMatch");
    expect(response).toHaveProperty("matchId");
    expect(Object.keys(response)).toHaveLength(3);
  });

  it("should match expected structure for inactive match", () => {
    const response: UserMatchStatusResponse = {
      userId: "user-999",
      isInMatch: false,
    };

    expect(response).toHaveProperty("userId");
    expect(response).toHaveProperty("isInMatch");
    expect(Object.keys(response).length).toBeGreaterThanOrEqual(2);
  });

  it("should support different userId formats", () => {
    const responses: UserMatchStatusResponse[] = [
      { userId: "123", isInMatch: false },
      { userId: "user-abc-123", isInMatch: true, matchId: "match-1" },
      { userId: "00000000-0000-0000-0000-000000000000", isInMatch: false },
    ];

    responses.forEach((response) => {
      expect(response.userId).toBeTruthy();
      expect(typeof response.userId).toBe("string");
    });
  });

  it("should support different matchId formats", () => {
    const responses: UserMatchStatusResponse[] = [
      { userId: "user-1", isInMatch: true, matchId: "match-123" },
      { userId: "user-2", isInMatch: true, matchId: "game-xyz-456" },
      { userId: "user-3", isInMatch: true, matchId: "uuid-format-match" },
    ];

    responses.forEach((response) => {
      if (response.matchId) {
        expect(response.matchId).toBeTruthy();
        expect(typeof response.matchId).toBe("string");
      }
    });
  });

  it("should validate isInMatch boolean values", () => {
    const trueCase: UserMatchStatusResponse = {
      userId: "user-1",
      isInMatch: true,
      matchId: "match-1",
    };

    const falseCase: UserMatchStatusResponse = {
      userId: "user-2",
      isInMatch: false,
    };

    expect(trueCase.isInMatch).toBe(true);
    expect(falseCase.isInMatch).toBe(false);
    expect(typeof trueCase.isInMatch).toBe("boolean");
    expect(typeof falseCase.isInMatch).toBe("boolean");
  });

  it("should represent consistent state when isInMatch is true", () => {
    const response: UserMatchStatusResponse = {
      userId: "user-active",
      isInMatch: true,
      matchId: "active-match-123",
    };

    // When isInMatch is true, matchId should typically be present
    expect(response.isInMatch).toBe(true);
    expect(response.matchId).toBeDefined();
    expect(response.matchId).toBeTruthy();
  });

  it("should represent consistent state when isInMatch is false", () => {
    const response: UserMatchStatusResponse = {
      userId: "user-inactive",
      isInMatch: false,
    };

    // When isInMatch is false, matchId should typically be absent
    expect(response.isInMatch).toBe(false);
    expect(response.matchId).toBeUndefined();
  });
});
