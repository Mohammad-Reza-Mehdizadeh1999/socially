/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { Heart, MessageCircle, Trash2 } from "lucide-react";
import type { ProfilePostsType } from "../../types/ProfileTypes";
import { getTimeAgo } from "../../utiles/geTimeAgo";
import { deletePostRequest, likePostRequest } from "../../services/postServices";
import toast from "react-hot-toast";
import { useQueryClient } from "@tanstack/react-query";
import { useAuthStore } from "../../store/authStore";

interface ProfilePostsProps {
  posts: ProfilePostsType[];
}

const ProfilePosts: React.FC<ProfilePostsProps> = ({ posts }) => {

  const queryClient = useQueryClient()

  const {user} = useAuthStore()

  const handlelikeClick = async (postId: string) => {
    try {
      await likePostRequest(postId);
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  const deletePostHandler = async (postId : string) => {
    try {
      await deletePostRequest(postId);
      await queryClient.invalidateQueries({ queryKey: ["UserPosts", user.id] })
      toast.success("post deleted successfully");
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  if (posts.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-400">No posts yet</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {posts?.map((post) => (
        <div
          key={post.id}
          className="bg-gray-900 rounded-xl p-4 border border-gray-800"
        >
          {/* Header */}
          <div className="flex items-start justify-between mb-3">
            <div className="flex items-center gap-3">
              {/* Avatar */}
              <div className="w-10 h-10 rounded-full bg-linear-to-br from-blue-500 to-purple-600 flex items-center justify-center shrink-0">
                <span className="text-white font-medium text-sm">
                  {post.author.name.charAt(0).toUpperCase()}
                </span>
              </div>

              {/* User Info */}
              <div>
                <h3 className="font-semibold text-white text-sm">
                  {post?.author.name}
                </h3>
                <p className="text-gray-400 text-xs">{post?.author.email}</p>
              </div>

              {/* Time */}
              <span className="text-gray-500 text-xs">
                {getTimeAgo(post?.createdAt)}
              </span>
            </div>

            {/* Delete Button */}

            <button
              onClick={() => deletePostHandler(post?.id)}
              className="p-2 text-gray-500 hover:text-red-500 transition-colors cursor-pointer"
              aria-label="Delete post"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>

          {/* Content */}
          <div className="mb-4">
            <p className="text-gray-300 leading-relaxed whitespace-pre-wrap">
              {post.content}
            </p>
          </div>

          {/* Stats */}
          <div className="flex items-center gap-6">
            <div
              className="flex items-center gap-2 text-gray-400 hover:text-red-500 transition-colors cursor-pointer"
              onClick={() => handlelikeClick(post?.id)}
            >
              <Heart className="w-4 h-4" />
              <span className="text-sm">{post._count.likes}</span>
            </div>
            <div className="flex items-center gap-2 text-gray-400 hover:text-blue-400 transition-colors cursor-pointer">
              <MessageCircle className="w-4 h-4" />
              <span className="text-sm">{post._count.comments}</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProfilePosts;
