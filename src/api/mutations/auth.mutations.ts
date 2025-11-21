import apiClient from "@api/apiClient";
import type { AuthSuccessResponse } from "@lib";

export const upsertUser = async (): Promise<AuthSuccessResponse> => {
  const response = await apiClient.post<AuthSuccessResponse>("/auth/upsert");
  return response.data;
};
