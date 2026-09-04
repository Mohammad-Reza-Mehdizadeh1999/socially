import { useQuery } from "@tanstack/react-query";
import { getUsersPostsById, type GetUsersPostsData } from "../services/getUsersPostsServices";


export const useGetUsersPosts = ({ id }: GetUsersPostsData) => {
  return useQuery({
    queryKey: ["get-users-posts", id],
    queryFn: () => getUsersPostsById({ id }),
    retry: false,
    refetchOnWindowFocus: false,
    refetchOnMount : true,
  });
};