import apiClient from "@api/apiClient";
import { setAuthToken } from "@api/utils";
import type { AuthSuccessResponse, LoginRequest, SignUpRequest } from "@lib";

export const loginUser = async (
  credentials: LoginRequest
): Promise<AuthSuccessResponse> => {
  const response = await apiClient.post<AuthSuccessResponse>(
    "/auth/login",
    credentials
  );

  if (response.data.token) {
    setAuthToken(response.data.token);
  }

  return response.data;
};

export const signupUser = async (
  credential: SignUpRequest
): Promise<AuthSuccessResponse> => {
  const response = await apiClient.post<AuthSuccessResponse>(
    "/auth/signup",
    credential
  );

  if (response.data.token) {
    setAuthToken(response.data.token);
  }

  return response.data;
};
