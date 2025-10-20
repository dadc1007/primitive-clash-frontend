import { getDeckByUserId } from "@api/queries/deck.queries";
import type { ApiError, DeckResponse } from "@lib";
import { useQuery, type UseQueryResult } from "@tanstack/react-query";

export const useDeck = (
  userId: string
): UseQueryResult<DeckResponse, ApiError> => {
  return useQuery({
    queryKey: ["deck", userId],
    queryFn: () => getDeckByUserId(userId),
    enabled: !!userId,
  });
};
