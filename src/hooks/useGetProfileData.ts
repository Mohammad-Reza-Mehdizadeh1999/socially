import { useQuery } from "@tanstack/react-query";
import type {  UserProfile } from "../types/ProfileTypes";
import { GetProfileDataRequest } from "../services/profileServices";

export const useGetProfileData = (userId: string) => {
  return useQuery<UserProfile>({
    queryKey: ["ProfileData", userId],
    queryFn: async () => {
      const res = await GetProfileDataRequest(userId);

      if (!res.data.success) {
        throw new Error("Failed to fetch profile");
      }

      return res.data.data;
    },
    enabled: !!userId,
  });
};