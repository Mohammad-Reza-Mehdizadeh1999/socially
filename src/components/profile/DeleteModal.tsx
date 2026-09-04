import { Trash2, X } from "lucide-react";
import Button from "../Ui/Button";

interface DeleteModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  isDeleting : boolean
}

export default function DeleteModal({
  isOpen,
  onClose,
  onConfirm,
  isDeleting
}: DeleteModalProps) {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 px-4"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-md rounded-xl bg-white p-6 shadow-xl dark:bg-[#0a0a0a] dark:border border-gray-700"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute right-4 top-4 cursor-pointer text-[#737373] transition-colors hover:text-black dark:hover:text-white"
          aria-label="Close delete confirmation"
        >
          <X width={20} height={20} />
        </button>

        <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-red-100 dark:bg-red-950">
          <Trash2 width={22} height={22} className="text-red-600" />
        </div>

        <h2 className="text-lg font-semibold text-black dark:text-white">
          Delete post?
        </h2>

        <p className="mt-2 text-sm text-[#737373]">
          Are you sure you want to delete this post? This action cannot be
          undone.
        </p>

        <div className="mt-6 flex justify-end gap-3">
          <Button
            type="button"
            onClick={onClose}
            className="rounded-lg border border-[#E5E5E5] bg-white px-4 py-2 text-sm text-black dark:border-[#262626] dark:bg-[#0A0A0A] dark:text-white"
          >
            Cancel
          </Button>

          <Button
            type="button"
            onClick={onConfirm}
            className="rounded-lg bg-red-600 px-4 py-2 text-sm text-white transition-colors hover:bg-red-700"
          >
            {isDeleting ? <p className="spinner-mini"></p> : "Delete"}
          </Button>
        </div>
      </div>
    </div>
  );
}
