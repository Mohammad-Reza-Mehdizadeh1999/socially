import { useQuery } from "@tanstack/react-query";
import { getRecommendedUsersRequest } from "../services/userService";
import type { RecommendedUser } from "../types/RecommendedUser";

export const useGetRecommendedUsers = () => {
  return useQuery<RecommendedUser[]>({
    queryKey: ["recommendedUsers"],
    queryFn: async () => {
      const res = await getRecommendedUsersRequest();

      if (!res.success) {
        throw new Error("Failed to fetch profile");
      }

      return res.data;
    },
  });
};