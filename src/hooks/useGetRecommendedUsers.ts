import { useQuery } from "@tanstack/react-query";
import type {  ProfilePostsType } from "../types/ProfileTypes";
import { GetUserPostsRequest } from "../services/profileServices";

export const useGetRecommendedUsers = (userId: string | undefined) => {
  return useQuery<ProfilePostsType[]>({
    queryKey: ["recommendedUsers"],
    queryFn: async () => {
      const res = await GetUserPostsRequest(userId!);

      if (!res.data.success) {
        throw new Error("Failed to fetch profile");
      }

      return res.data.data;
    },
    enabled: !!userId,
  });
};