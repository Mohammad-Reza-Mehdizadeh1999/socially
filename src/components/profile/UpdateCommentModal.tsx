import { useState } from "react";
import { useUpdateComment } from "../../hooks/useUpdateComment";
type UpdateCommentModalProps = {
  isOpen: boolean;
  onClose: () => void;
  postId: string;
  commentId: string;
  initialContent: string;
  onSuccess?: () => void | Promise<void>;
};
const UpdateCommentModal = ({
  isOpen,
  onClose,
  postId,
  commentId,
  initialContent,
  onSuccess,
}: UpdateCommentModalProps) => {
  const [text, setText] = useState(initialContent);
  const { mutate: updateComment, isPending } = useUpdateComment();
  if (!isOpen) return null;
  const handleUpdate = () => {
    const content = text.trim();
    if (!content || content === initialContent) return;
    updateComment(
      { postId, commentId, content },
      {
        onSuccess: async () => {
          await onSuccess?.();
          onClose();
        },
      },
    );
  };
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      {" "}
      <div className="w-full max-w-lg rounded-xl bg-white p-6 shadow-lg dark:bg-[#262626]">
        {" "}
        <h2 className="mb-4 text-lg font-bold text-[#171717] dark:text-[#FAFAFA]">
          {" "}
          Edit Comment{" "}
        </h2>{" "}
        <div className="flex-1">
          {" "}
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Write a comment..."
            rows={4}
            className="w-full resize-none rounded-lg border border-[#E5E5E5] bg-transparent p-3 text-sm leading-5 text-[#171717] shadow-[0_1px_3px_rgba(0,0,0,0.08)] outline-none placeholder:text-[#737373] focus:border-[#3B82F6] dark:border-[#404040] dark:text-[#FAFAFA] dark:placeholder:text-[#A3A3A3] dark:focus:border-[#3B82F6]"
          />{" "}
        </div>{" "}
        <div className="mt-4 flex items-center justify-end gap-3">
          {" "}
          <button
            type="button"
            onClick={onClose}
            disabled={isPending}
            className="rounded-lg px-4 py-2 text-sm font-medium text-[#737373] transition-colors hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-50 dark:hover:bg-[#404040]"
          >
            {" "}
            Cancel{" "}
          </button>{" "}
          <button
            type="button"
            onClick={handleUpdate}
            disabled={
              isPending || !text.trim() || text.trim() === initialContent
            }
            className="rounded-lg bg-[#7eaffd] px-4 py-2 text-sm font-medium text-black transition-colors hover:bg-blue-600 disabled:cursor-not-allowed disabled:opacity-50 dark:text-white"
          >
            {" "}
            {isPending ? "Updating..." : "Update"}{" "}
          </button>{" "}
        </div>{" "}
      </div>{" "}
    </div>
  );
};
export default UpdateCommentModal;
