import { getCardDetailsById } from "@api/queries/card.queries";
import type { ApiError, CardResponse } from "@lib";
import { useQuery, type UseQueryResult } from "@tanstack/react-query";

export const useCard = (
  cardId: string
): UseQueryResult<CardResponse, ApiError> => {
  return useQuery({
    queryKey: ["card", cardId],
    queryFn: () => getCardDetailsById(cardId),
    enabled: !!cardId,
  });
};
