import React from 'react';
import { Heart, MessageCircle } from 'lucide-react';
import type { LikedPost } from '../../types/ProfileTypes';
import { getTimeAgo } from '../../utiles/geTimeAgo';
import { likePostRequest } from '../../services/postServices';
import toast from 'react-hot-toast';
import { useQueryClient } from '@tanstack/react-query';
import { Await } from 'react-router';
import { useAuthStore } from '../../store/authStore';

interface ProfileLikesProps {
  likes: LikedPost[];
}

const ProfileLikes: React.FC<ProfileLikesProps> = ({ likes }) => {

  const queryClient = useQueryClient()

  const {user} = useAuthStore()

  const handleRemoveLike = async (postId : string) => {
    await likePostRequest(postId)
    toast.success("like removed successfully")
    await queryClient.invalidateQueries({queryKey: ["UserLikes", user?.id]})
  }

  if (likes.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-400">No liked posts</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {likes?.map((like) => {
        const post = like.post;
        return (
          <div
            key={like.id}
            className="bg-gray-900 rounded-xl p-4 border border-gray-800"
          >
            {/* Header */}
            <div className="flex items-start gap-3 mb-3">
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
                <p className="text-gray-400 text-xs">
                  {post?.author.email}
                </p>
                <span className="text-gray-500 text-xs">
                  {getTimeAgo(post?.createdAt)}
                </span>
              </div>
            </div>

            {/* Content */}
            <div className="mb-4">
              <p className="text-gray-300 leading-relaxed whitespace-pre-wrap">
                {post?.content}
              </p>
            </div>

            {/* Stats */}
            <div className="flex items-center gap-6">
              <div 
                className="flex items-center gap-2 text-red-400 hover:text-red-600 cursor-pointer"
                onClick={() => handleRemoveLike(post.id)}
                >
                <Heart className="w-4 h-4" fill="currentColor" />
                <span className="text-sm font-medium">{post._count.likes}</span>
              </div>
              <div className="flex items-center gap-2 text-gray-400">
                <MessageCircle className="w-4 h-4" />
                <span className="text-sm">{post._count.comments}</span>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ProfileLikes;