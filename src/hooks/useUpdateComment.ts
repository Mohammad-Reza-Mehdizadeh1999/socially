import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateCommentService, type updateCommentType } from "../services/updateCommentService";

export const useUpdateComment = () => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: (data: updateCommentType) => updateCommentService(data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["allPosts"] }); },
        onError:(error) => {
            console.error("Error updating comment:", error)
        },
    });

};