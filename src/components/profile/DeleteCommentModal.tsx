import { Trash2, X } from "lucide-react";
import Button from "../Ui/Button";
import { useDeleteComment } from "../../hooks/useDeleteCommentMutation";

interface DeleteCommentModalProps {
  isOpen: boolean;
  onClose: () => void;
  postId: string;
  commentId: string | null;
  onSuccess?: () => void | Promise<void>;
}

export default function DeleteCommentModal({
  isOpen,
  onClose,
  postId,
  commentId,
  onSuccess,
}: DeleteCommentModalProps) {
  const { mutate: deleteComment, isPending } = useDeleteComment();

  const handleConfirm = () => {
    if (!postId || !commentId) return;

    deleteComment(
      { postId, commentId },
      {
        onSuccess: async () => {
          await onSuccess?.();
          onClose();
        },
      },
    );
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 px-4"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-md rounded-xl bg-white p-6 shadow-xl dark:border dark:border-gray-700 dark:bg-[#0a0a0a]"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute right-4 top-4 cursor-pointer text-[#737373] transition-colors hover:text-black dark:hover:text-white"
        >
          <X width={20} height={20} />
        </button>

        <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-red-100 dark:bg-red-950">
          <Trash2 width={22} height={22} className="text-red-600" />
        </div>

        <h2 className="text-lg font-semibold text-black dark:text-white">
          Delete comment?
        </h2>

        <p className="mt-2 text-sm text-[#737373]">
          Are you sure you want to delete this comment? This action cannot be
          undone.
        </p>

        <div className="mt-6 flex justify-end gap-3">
          <Button
            type="button"
            onClick={onClose}
            disabled={isPending}
            className="rounded-lg border border-[#E5E5E5] bg-white px-4 py-2 text-sm text-black dark:border-[#262626] dark:bg-[#0A0A0A] dark:text-white"
          >
            Cancel
          </Button>

          <Button
            type="button"
            onClick={handleConfirm}
            disabled={isPending}
            className="rounded-lg bg-red-600 px-4 py-2 text-sm text-white transition-colors hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {isPending ? <p className="spinner-mini"></p> : "Delete"}
          </Button>
        </div>
      </div>
    </div>
  );
}
