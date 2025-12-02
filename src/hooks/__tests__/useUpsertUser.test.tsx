/**
 * @file useUpsertUser.test.tsx
 * @description Tests para hook de creación/actualización de usuario con React Query
 * 
 * Valida:
 * - Llamada exitosa a API y almacenamiento en localStorage
 * - Manejo de errores con logging apropiado
 * - Integración con React Query mutation
 * - Persistencia de datos de usuario (id, email, username)
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
  let localStorageSpy: Storage;

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
    
    localStorageSpy = window.localStorage;
    vi.clearAllMocks();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("should upsert user successfully and store data in localStorage", async () => {
    const mockUserData: AuthSuccessResponse = {
      id: "user-123",
      username: "testuser",
      email: "test@example.com",
      token: "mock-token-123",
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
      id: "user-456",
      username: "anotheruser",
      email: "another@example.com",
      token: "another-token",
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
