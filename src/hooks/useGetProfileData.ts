import { useQuery } from "@tanstack/react-query";
import type { User } from "../types/ProfileTypes";
import { GetProfileDataRequest } from "../services/profileServices";

export const useGetAllPosts = () => {
  return useQuery<User[]>({
    queryKey: ["allPosts"],
    queryFn: async (userId) => {
      const res = await GetProfileDataRequest(userId);

      if (!res.data.success) {
        throw new Error("Failed to fetch posts");
      }

      return res.data.data;
    },
  });
};