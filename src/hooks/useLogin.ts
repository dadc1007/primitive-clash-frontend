import { loginUser } from "@api/mutations/auth.mutations";
import type { ApiError, AuthSuccessResponse, LoginRequest } from "@lib";
import { useMutation, type UseMutationResult } from "@tanstack/react-query";
import { log, logError } from "@utils";

export const useLogin = (): UseMutationResult<
  AuthSuccessResponse,
  ApiError,
  LoginRequest
> => {
  return useMutation({
    mutationFn: loginUser,
    onSuccess: (data) => {
      log("Login exitoso:", data.username);
      localStorage.setItem("user_data", JSON.stringify(data));
    },
    onError: (error: ApiError) => {
      logError("Error en login:", error.message);
    },
  });
};
