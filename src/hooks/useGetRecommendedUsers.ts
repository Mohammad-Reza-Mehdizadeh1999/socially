import { useQuery } from "@tanstack/react-query";
import { getRecommendedUsers } from "../services/getRecommendedUsersServices";

export const useGetRecommendedUsers = () => {

  const query = useQuery({
    queryKey: ["recommendedUsers"],
    queryFn: getRecommendedUsers,
    retry: false,
    refetchOnWindowFocus: false,
    staleTime: 1000 * 60 * 5,
  });

  return query;
};