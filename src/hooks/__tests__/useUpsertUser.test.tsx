/**
 * @file useUpsertUser.test.tsx
 * @description Tests for user creation/update hook with React Query
 * 
 * Validates:
 * - Successful API call and localStorage storage
 * - Error handling with appropriate logging
 * - React Query mutation integration
 * - User data persistence (id, email, username)
 */
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { renderHook, waitFor } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useUpsertUser } from "../useUpsertUser";
import * as authMutations from "@api/mutations/auth.mutations";
import type { AuthSuccessResponse } from "@lib";
import type { ReactNode } from "react";

// Mock the auth mutations module
vi.mock("@api/mutations/auth.mutations");

describe("useUpsertUser", () => {
  let queryClient: QueryClient;

  const wrapper = ({ children }: { children: ReactNode }) => {
    return (
      <QueryClientProvider client={queryClient}>
        {children}
      </QueryClientProvider>
    );
  };

  beforeEach(() => {
    queryClient = new QueryClient({
      defaultOptions: {
        mutations: {
          retry: false,
        },
      },
    });
    
    vi.clearAllMocks();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("should upsert user successfully and store data in localStorage", async () => {
    const mockUserData: AuthSuccessResponse = {
      userId: "user-123",
      username: "testuser",
      email: "test@example.com",
      gold: 1000,
      gems: 50,
      level: 1,
      trophies: 0,
    };

    vi.mocked(authMutations.upsertUser).mockResolvedValue(mockUserData);

    const { result } = renderHook(() => useUpsertUser(), { wrapper });

    result.current.mutate();

    await waitFor(() => {
      expect(result.current.isSuccess).toBe(true);
      const storedData = localStorage.getItem("user_data");
      expect(storedData).toBe(JSON.stringify(mockUserData));
    });

    expect(result.current.data).toEqual(mockUserData);
  });

  it("should handle error when upsert fails", async () => {
    const mockError = {
      message: "Failed to upsert user",
      status: 500,
    };

    vi.mocked(authMutations.upsertUser).mockRejectedValue(mockError);

    const { result } = renderHook(() => useUpsertUser(), { wrapper });

    result.current.mutate();

    await waitFor(() => expect(result.current.isError).toBe(true));

    expect(result.current.error).toBeTruthy();
  });

  it("should call upsertUser mutation function", async () => {
    const mockUserData: AuthSuccessResponse = {
      userId: "user-456",
      username: "anotheruser",
      email: "another@example.com",
      gold: 2000,
      gems: 100,
      level: 5,
      trophies: 1500,
    };

    vi.mocked(authMutations.upsertUser).mockResolvedValue(mockUserData);

    const { result } = renderHook(() => useUpsertUser(), { wrapper });

    result.current.mutate();

    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    expect(authMutations.upsertUser).toHaveBeenCalledTimes(1);
  });

  it("should be in idle state initially", () => {
    const { result } = renderHook(() => useUpsertUser(), { wrapper });

    expect(result.current.isIdle).toBe(true);
    expect(result.current.data).toBeUndefined();
    expect(result.current.error).toBeNull();
  });
});
