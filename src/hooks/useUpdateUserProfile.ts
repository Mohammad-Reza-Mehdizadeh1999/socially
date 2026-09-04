import { useMutation, useQueryClient } from "@tanstack/react-query";

import {
  updateUserById,
  type UserId,
} from "../services/updateUserProfileServices";

export const useUpdateUserProfile = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: UserId) => updateUserById(data),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["get-by-userName"],
      });

      queryClient.invalidateQueries({
        queryKey: ["session"],
      });
    },
  });
};