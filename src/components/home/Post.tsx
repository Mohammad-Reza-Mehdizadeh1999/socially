import Avatar from "../Ui/Avatar";
import { Edit, Heart, MessageCircle, Trash2 } from "lucide-react";
import { useState } from "react";
import Comment from "./Comment";
import type { PostType } from "../../types/AllPostsTypes";
import { useToggleLikedPostsMutation } from "../../hooks/useToggleLikedPostsMutation";
import { useAuthStore } from "../../store/authStore";
import { Link } from "react-router";
import { splitUsername } from "../../utils/splitUsername";
import { useDeletePost } from "../../hooks/useDeletePost";
import DeleteModal from "../profile/DeleteModal";
import EditPostModal from "../profile/EditPostModal";
import toast from "react-hot-toast";
import { useEditPost } from "../../hooks/useEditPostMutation";
import { getTimeAgo } from "../../utils/getTimeAgo";

type PostProps = {
  post: PostType;
};

export default function Post({ post }: PostProps) {
  const [isCommentOpen, setIsCommentOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const { user } = useAuthStore();

  const isLiked = post.likes.some((like) => like.userId === user?.id);
  const canDelete = user?.id === post.authorId;

  const { mutate: toggleLikedPostMutation, isPending: isPendingToggleLike } =
    useToggleLikedPostsMutation();

  const {
    mutate: toggleDeletedPostMutation,
    isPending: isPendingToggleDelete,
  } = useDeletePost();

  const { mutate: editPostMutation, isPending: isEditingPost } = useEditPost();

  const toggleComment = () => {
    setIsCommentOpen((prev) => !prev);
  };

  const toggleLikeHandler = () => {
    toggleLikedPostMutation({
      id: post.id,
    });
  };

  const handleOpenDeleteModal = () => {
    setIsDeleteModalOpen(true);
  };

  const handleCloseDeleteModal = () => {
    setIsDeleteModalOpen(false);
  };

  const handleConfirmDelete = () => {
    toggleDeletedPostMutation(post.id, {
      onSuccess: () => {
        setIsDeleteModalOpen(false);
      },
    });
  };

  function handleEditPost() {
    setIsEditModalOpen(true);
  }

  return (
    <div className="my-5 min-h-40 rounded-2xl border border-[#E5E5E5] p-6 shadow-sm dark:border-[#262626] dark:bg-[#0A0A0A]">
      {/* Author */}
      <div className="flex w-full items-center gap-5">
        <Avatar
          src={post.author.image}
          width={40}
          height={40}
          alt={`${post.author.name}'s profile`}
        />

        <div className="min-w-0">
          <div className="flex items-center gap-5">
            <Link
              to={`/profile/${splitUsername(post.author.email)}`}
              className="font-bold text-[#171717] dark:text-[#FAFAFA]"
            >
              {post.author.name}
            </Link>

            <p className="text-[14px] font-light text-[#737373] dark:text-[#A3A3A3]">
              @{post.author.name.toLowerCase().replace(/\s+/g, "")}
            </p>

            <p className="hidden text-[14px] font-light text-[#737373] dark:text-[#A3A3A3] md:block">
              . {getTimeAgo(post.createdAt)}
            </p>
          </div>
        </div>
        {canDelete && (
          <div className="ml-auto flex items-center gap-4">
            <button
              type="button"
              onClick={() => handleEditPost()}
              className="shrink-0"
            >
              <Edit
                width={17}
                height={17}
                className="cursor-pointer text-[#737373] transition-colors hover:text-green-600 dark:text-[#A3A3A3]"
              />
            </button>
            <button
              type="button"
              onClick={handleOpenDeleteModal}
              className="shrink-0"
            >
              <Trash2
                width={17}
                height={17}
                className="cursor-pointer text-[#737373] transition-all duration-200 hover:scale-110 hover:text-red-600 dark:text-[#A3A3A3] dark:hover:text-red-400"
              />
            </button>
          </div>
        )}
      </div>

      {/* post img */}
      <div className="mt-5 whitespace-pre-line md:w-4/5 mx-auto ">
        {post.image && (
          <img
            src={`https://1p5nep1spk.ucarecd.net/${post.image}/`}
            className="rounded-xl"
            alt="post-img"
          />
        )}
      </div>

      {/* Content */}
      <p className="mt-6 whitespace-pre-line dark:text-[#FAFAFA]">
        {post.content}
      </p>

      {/* Actions */}
      <div className="mt-6 flex items-center justify-start gap-8">
        {/* Like */}
        <button
          type="button"
          onClick={toggleLikeHandler}
          disabled={isPendingToggleLike}
          className="flex cursor-pointer items-center justify-between gap-2"
        >
          {isPendingToggleLike ? (
            <span className="spinner-mini"></span>
          ) : (
            <>
              <Heart
                size={16}
                className={
                  isLiked
                    ? "text-[#EF4444]"
                    : "text-[#171717] dark:text-[#FAFAFA]"
                }
                fill={isLiked ? "#EF4444" : "none"}
              />

              <p
                className={
                  isLiked
                    ? "text-[#EF4444]"
                    : "text-[#171717] dark:text-[#FAFAFA]"
                }
              >
                {post._count.likes}
              </p>
            </>
          )}
        </button>

        {/* Comments */}
        <button
          type="button"
          onClick={toggleComment}
          className="flex cursor-pointer items-center justify-between gap-2"
        >
          <MessageCircle
            size={16}
            className={
              isCommentOpen
                ? "text-[#3B82F6]"
                : "text-[#171717] dark:text-[#FAFAFA]"
            }
            fill={isCommentOpen ? "#3B82F6" : "none"}
          />

          <p
            className={
              isCommentOpen
                ? "text-[#3B82F6]"
                : "text-[#171717] dark:text-[#FAFAFA]"
            }
          >
            {post._count.comments}
          </p>
        </button>
      </div>

      {/* Comments */}
      {isCommentOpen && <Comment post={post} />}

      {isEditModalOpen && (
        <EditPostModal
          text={post.content}
          image={post.image}
          isSaving={isEditingPost}
          onClose={() => {
            setIsEditModalOpen(false);
          }}
          onSave={(data) => {
            editPostMutation(
              {
                postId: post.id,
                payload: {
                  image: data.imageId,
                  content: data.text,
                },
              },
              {
                onSuccess: async () => {
                  toast.success("Post updated successfully");
                  setIsEditModalOpen(false);
                },

                onError: () => {
                  toast.error("Failed to update post");
                },
              },
            );
          }}
        />
      )}
      <DeleteModal
        isOpen={isDeleteModalOpen}
        onClose={handleCloseDeleteModal}
        onConfirm={handleConfirmDelete}
        isDeleting={isPendingToggleDelete}
      />
    </div>
  );
}
