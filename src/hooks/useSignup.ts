import { signupUser } from "@api/mutations/auth.mutations";
import type { ApiError, AuthSuccessResponse, SignUpRequest } from "@lib";
import { useMutation, type UseMutationResult } from "@tanstack/react-query";
import { log, logError } from "@utils";

export const useSignup = (): UseMutationResult<
  AuthSuccessResponse,
  ApiError,
  SignUpRequest
> => {
  return useMutation({
    mutationFn: signupUser,
    onSuccess: (data) => {
      log("Registro exitoso:", data.username);
      localStorage.setItem("user_data", JSON.stringify(data));
    },
    onError: (error: ApiError) => {
      logError("Error en el registro:", error.message);
    },
  });
};
