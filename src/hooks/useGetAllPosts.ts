import { useQuery } from "@tanstack/react-query";
import { getAllPostRequest } from "../services/postServices";

export const useGetAllPosts = () => {

  const query = useQuery({
    queryKey: ["allPosts"],
    queryFn: getAllPostRequest,
    retry: false,
    refetchOnWindowFocus: false,
    staleTime: 1000 * 60 * 5,
  });

  return query;
};