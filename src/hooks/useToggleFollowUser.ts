import toast from "react-hot-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toggleFollowUserRequest } from "../services/toggleFollowUserServices";
import type { AxiosError } from "axios";
import type { ErrorResponse } from "../types/ErrorResponseType";
import { useAuthStore } from "../store/authStore";
import { splitUsername } from "../utils/splitUsername";


export const useToggleFollowUser = () => {
  const queryClient = useQueryClient();
  
  const {user} = useAuthStore()

  const query = useMutation({
    mutationFn: toggleFollowUserRequest,

    onSuccess: (res) => {
      queryClient.invalidateQueries({ queryKey: ["recommendedUsers"] });
      queryClient.invalidateQueries({ queryKey: ["get-by-userName" , splitUsername(user?.email || "")] });
      queryClient.invalidateQueries({queryKey: ["FollowingList"]});
      toast.success(res.message);
    },

    onError: (error: AxiosError<ErrorResponse>) => {
      toast.error(
        error.response?.data?.message || "Something went wrong",
      );
    },

    retry: false,
  });

  return query;
};
