import { useMutation, useQueryClient } from "@tanstack/react-query";
import  { type AxiosError } from "axios";
import toast from "react-hot-toast";

import {
  toggleLikedPosts,
  type toggleLikedPostsType,
} from "../services/toggleLikedPostsServices";

type ErrorResponse = {
  message: string;
  success: boolean;
};

export const useToggleLikedPostsMutation = () => {
  const queryClient = useQueryClient();

  return useMutation<
    { message: string; success: boolean },
    AxiosError<ErrorResponse>,
    toggleLikedPostsType
  >({
    mutationFn: (data) => toggleLikedPosts(data),

    onSuccess: (data) => {
      toast.success(data.message);

      queryClient.invalidateQueries({
        queryKey: ["allPosts"],
      });
      queryClient.invalidateQueries({
        queryKey: ["get-users-posts"],
      });
      queryClient.invalidateQueries({
        queryKey: ["get-users-liked-posts"],
      });
    },

    onError: (error) => {
      toast.error(
        error.response?.data?.message || "Please try again"
      );
    },
  });
};