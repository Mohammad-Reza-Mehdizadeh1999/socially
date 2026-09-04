import { useQuery } from "@tanstack/react-query";
import { getUsersLikedPosts, type UserId } from "../services/getUsersLikedPostsServices";


export const useGetUsersLikedPosts = (id: UserId) => {
  return useQuery({
    queryKey: ["get-users-liked-posts", id],
    queryFn: () => getUsersLikedPosts(id),
    retry: false,
    refetchOnWindowFocus: false,
    staleTime: 1000 * 60 * 5,
  });
};