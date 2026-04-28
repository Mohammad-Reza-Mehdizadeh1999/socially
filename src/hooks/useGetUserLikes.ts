import { useQuery } from "@tanstack/react-query";
import type {  LikedPost } from "../types/ProfileTypes";
import { GetUserLikesRequest } from "../services/profileServices";

export const useGetUserLikes = (userId: string) => {
  return useQuery<LikedPost[]>({
    queryKey: ["UserLikes", userId],
    queryFn: async () => {
      const res = await GetUserLikesRequest(userId);

      if (!res.data.success) {
        throw new Error("Failed to fetch profile likes");
      }

      return res.data.data;
    },
    enabled: !!userId,
  });
};