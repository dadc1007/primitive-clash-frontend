import apiClient from "@api/apiClient";
import type { CardResponse } from "@lib";

export const getCardDetailsById = async (
  cardId: string
): Promise<CardResponse> => {
  const url = `/cards/${cardId}`;
  const response = await apiClient.get<CardResponse>(url);

  return response.data;
};
