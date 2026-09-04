import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteComment, type DeleteCommentParams } from "../services/deleteUsersCommentService";

export const useDeleteComment = () => {
    
  const queryClient = useQueryClient();

  return useMutation({

    mutationFn: (param: DeleteCommentParams) => deleteComment(param),
    onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["allPosts"] });
    },

    onError: (error) => {
      console.error("Error deleting comment:", error);
    },

  });
};