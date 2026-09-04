import { useQuery } from "@tanstack/react-query";
import { getFollowerList } from "../services/FollowListService";

export const useGetFollowerList = (
  id: string,
  options?: {
    enabled?: boolean;
  },
) => {
  return useQuery({
    queryKey: ["FollowerList", id],
    queryFn: () => getFollowerList(id),

    enabled: options?.enabled,

    retry: false,
    staleTime: 1000 * 60 * 5,
  });
};