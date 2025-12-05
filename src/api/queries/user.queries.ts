import apiClient from "@api/apiClient";
import type { UserMatchStatusResponse } from "@lib";

export const getUserMatchStatus = async (
  userId: string
): Promise<UserMatchStatusResponse> => {
  const url = `/users/${userId}/match`;
  const response = await apiClient.get<UserMatchStatusResponse>(url);

  return response.data;
};
