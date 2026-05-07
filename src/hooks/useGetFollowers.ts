import { useQuery } from "@tanstack/react-query";
import { useAuthStore } from "../store/authStore";
import api from "../services/axiosConfig";

interface UseGetFollowersParams {
  followers?: Array<{ followerId: string }>;
  enabled?: boolean;
}

export const useGetFollowers = ({ followers, enabled = true }: UseGetFollowersParams) => {
  
  const {user} = useAuthStore()

  return useQuery({
    queryKey: ["followers", user?.id],
    queryFn: async () => {
      if (!followers) return [];
      
      const requests = followers.map((f) =>
        api.get(`/users/${f.followerId}`)
      );

      const responses = await Promise.all(requests);
      return responses.map((res) => res.data.data);
    },
    enabled: enabled && !!followers && followers.length > 0,
  });
};
