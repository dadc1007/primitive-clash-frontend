import { upsertUser } from "@api/mutations/auth.mutations";
import type { ApiError, AuthSuccessResponse } from "@lib";
import { useMutation } from "@tanstack/react-query";
import { log, logError } from "@utils";

export const useUpsertUser = () => {
  return useMutation<AuthSuccessResponse, ApiError>({
    mutationFn: upsertUser,
    onSuccess: (user) => {
      log("Login exitoso:", user.username);
      localStorage.setItem("user_data", JSON.stringify(user));
    },
    onError: (error: ApiError) => {
      logError("Error en login:", error.message);
    },
  });
};
