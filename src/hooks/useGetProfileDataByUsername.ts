import { useQuery } from "@tanstack/react-query";
import type {  UserDataByUsername } from "../types/ProfileTypes";
import { GetProfileDataByUserNameRequest } from "../services/profileServices";

export const useGetProfileDataByUsername = (userName: string) => {
  return useQuery<UserDataByUsername>({
    queryKey: ["ProfileDataUserName", userName],
    queryFn: async () => {
      const res = await GetProfileDataByUserNameRequest(userName);

      if (!res.data.success) {
        throw new Error("Failed to fetch profile");
      }

      return res.data.data;
    },
    enabled: !!userName,
  });
};