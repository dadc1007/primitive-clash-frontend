import apiClient from "@api/apiClient";
import type { DeckResponse } from "@lib";

export const getDeckByUserId = async (
  userId: string
): Promise<DeckResponse> => {
  const url = `/decks/user/${userId}`;
  const response = await apiClient.get<DeckResponse>(url);

  return response.data;
};
