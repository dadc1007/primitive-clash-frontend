import { getUserMatchStatus } from "@api/queries/user.queries";
import type { ApiError, UserMatchStatusResponse } from "@lib";
import { useQuery, type UseQueryResult } from "@tanstack/react-query";

export const useUserMatchStatus = (
  userId: string
): UseQueryResult<UserMatchStatusResponse, ApiError> => {
  return useQuery({
    queryKey: ["user", userId, "matchStatus"],
    queryFn: () => getUserMatchStatus(userId),
    enabled: !!userId,
  });
};
