/**
 * @file useUser.test.tsx
 * @description Tests for useUserMatchStatus hook
 * 
 * Validates:
 * - User match status fetching
 * - Loading and error states
 * - Data refetching
 * - TanStack Query caching
 */
import { renderHook, waitFor } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { useUserMatchStatus } from "../useUser";
import apiClient from "@api/apiClient";
import type { UserMatchStatusResponse } from "@lib";
import type { ReactNode } from "react";

vi.mock("@api/apiClient");

const createWrapper = () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  });

  const Wrapper = ({ children }: { children: ReactNode }) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );

  return Wrapper;
};

describe("useUserMatchStatus", () => {
  const mockUserId = "user-123";

  beforeEach(() => {
    vi.clearAllMocks();
  });

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
      config: { headers: {} } as any,
    });

    const { result } = renderHook(() => useUserMatchStatus(mockUserId), {
      wrapper: createWrapper(),
    });

    await waitFor(() => {
      expect(result.current.isSuccess).toBe(true);
    });

    expect(result.current.data).toEqual(mockResponse);
    expect(result.current.data?.isInMatch).toBe(true);
    expect(result.current.data?.matchId).toBe("match-456");
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
      config: { headers: {} } as any,
    });

    const { result } = renderHook(() => useUserMatchStatus(mockUserId), {
      wrapper: createWrapper(),
    });

    await waitFor(() => {
      expect(result.current.isSuccess).toBe(true);
    });

    expect(result.current.data?.isInMatch).toBe(false);
    expect(result.current.data?.matchId).toBeUndefined();
  });

  it("should handle loading state", () => {
    vi.mocked(apiClient.get).mockImplementation(
      () => new Promise(() => {}) // Never resolves
    );

    const { result } = renderHook(() => useUserMatchStatus(mockUserId), {
      wrapper: createWrapper(),
    });

    expect(result.current.isLoading).toBe(true);
    expect(result.current.data).toBeUndefined();
  });

  it("should handle error state", async () => {
    vi.mocked(apiClient.get).mockRejectedValueOnce({
      response: {
        status: 404,
        data: { message: "User not found" },
      },
    });

    const { result } = renderHook(() => useUserMatchStatus(mockUserId), {
      wrapper: createWrapper(),
    });

    await waitFor(() => {
      expect(result.current.isError).toBe(true);
    });

    expect(result.current.error).toBeDefined();
    expect(result.current.data).toBeUndefined();
  });

  it("should not fetch when userId is empty", () => {
    const { result } = renderHook(() => useUserMatchStatus(""), {
      wrapper: createWrapper(),
    });

    expect(result.current.isFetching).toBe(false);
    expect(apiClient.get).not.toHaveBeenCalled();
  });

  it("should refetch data when refetch is called", async () => {
    const mockResponse: UserMatchStatusResponse = {
      userId: mockUserId,
      isInMatch: false,
    };

    const updatedResponse: UserMatchStatusResponse = {
      userId: mockUserId,
      isInMatch: true,
      matchId: "new-match-789",
    };

    vi.mocked(apiClient.get)
      .mockResolvedValueOnce({
        data: mockResponse,
        status: 200,
        statusText: "OK",
        headers: {},
        config: { headers: {} } as any,
      })
      .mockResolvedValueOnce({
        data: updatedResponse,
        status: 200,
        statusText: "OK",
        headers: {},
        config: { headers: {} } as any,
      });

    const { result } = renderHook(() => useUserMatchStatus(mockUserId), {
      wrapper: createWrapper(),
    });

    await waitFor(() => {
      expect(result.current.isSuccess).toBe(true);
    });

    expect(result.current.data?.isInMatch).toBe(false);

    await result.current.refetch();

    await waitFor(() => {
      expect(result.current.data?.isInMatch).toBe(true);
    });

    expect(result.current.data?.matchId).toBe("new-match-789");
  });

  it("should use correct query key", async () => {
    const mockResponse: UserMatchStatusResponse = {
      userId: mockUserId,
      isInMatch: false,
    };

    vi.mocked(apiClient.get).mockResolvedValueOnce({
      data: mockResponse,
      status: 200,
      statusText: "OK",
      headers: {},
      config: { headers: {} } as any,
    });

    const { result } = renderHook(() => useUserMatchStatus(mockUserId), {
      wrapper: createWrapper(),
    });

    await waitFor(() => {
      expect(result.current.isSuccess).toBe(true);
    });

    // The query key should be ["user", userId, "matchStatus"]
    expect(apiClient.get).toHaveBeenCalledWith(`/users/${mockUserId}/match`);
  });

  it("should handle 401 unauthorized error", async () => {
    vi.mocked(apiClient.get).mockRejectedValueOnce({
      response: {
        status: 401,
        data: { message: "Unauthorized" },
      },
    });

    const { result } = renderHook(() => useUserMatchStatus(mockUserId), {
      wrapper: createWrapper(),
    });

    await waitFor(() => {
      expect(result.current.isError).toBe(true);
    });

    expect(result.current.error).toBeDefined();
  });

  it("should handle network error", async () => {
    vi.mocked(apiClient.get).mockRejectedValueOnce(
      new Error("Network error")
    );

    const { result } = renderHook(() => useUserMatchStatus(mockUserId), {
      wrapper: createWrapper(),
    });

    await waitFor(() => {
      expect(result.current.isError).toBe(true);
    });

    expect(result.current.error).toBeDefined();
  });

  it("should cache data between rerenders", async () => {
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
      config: { headers: {} } as any,
    });

    const { result, rerender } = renderHook(() => useUserMatchStatus(mockUserId), {
      wrapper: createWrapper(),
    });

    await waitFor(() => {
      expect(result.current.isSuccess).toBe(true);
    });

    expect(apiClient.get).toHaveBeenCalledTimes(1);

    // Rerender should use cached data
    rerender();

    expect(apiClient.get).toHaveBeenCalledTimes(1);
    expect(result.current.data).toEqual(mockResponse);
  });
});
