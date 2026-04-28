import { useQuery } from "@tanstack/react-query";
import type {  ProfilePostsType } from "../types/ProfileTypes";
import { GetUserPostsRequest } from "../services/profileServices";

export const useGetUserPosts = (userId: string) => {
  return useQuery<ProfilePostsType[]>({
    queryKey: ["UserPosts", userId],
    queryFn: async () => {
      const res = await GetUserPostsRequest(userId);

      if (!res.data.success) {
        throw new Error("Failed to fetch profile");
      }

      return res.data.data;
    },
    enabled: !!userId,
  });
};