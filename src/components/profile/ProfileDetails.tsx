import React, { useState } from 'react';
import ProfilePosts from './ProfilePosts';
import ProfileLikes from './ProfileLikes';
import type { LikedPost, ProfilePostsType, ProfileTab } from '../../types/ProfileTypes';

interface ProfileDetailsProps {
  profilePostsData?: ProfilePostsType[];
  likesData?: LikedPost[];
}

const ProfileDetails: React.FC<ProfileDetailsProps> = ({
  profilePostsData = [],
  likesData = [],
}) => {
  const [activeTab, setActiveTab] = useState<ProfileTab>('posts');

  return (
    <div className="bg-black rounded-2xl p-6 border border-gray-800 mt-3 max-w-5xl mx-auto">
      {/* Tabs */}
      <div className="flex gap-2 mb-6">
        <button
          onClick={() => setActiveTab('posts')}
          className={`flex-1 py-2.5 px-4 rounded-lg font-medium text-sm transition-all ${
            activeTab === 'posts'
              ? 'bg-gray-200 text-gray-900'
              : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
          }`}
        >
          Posts
        </button>
        <button
          onClick={() => setActiveTab('likes')}
          className={`flex-1 py-2.5 px-4 rounded-lg font-medium text-sm transition-all ${
            activeTab === 'likes'
              ? 'bg-gray-200 text-gray-900'
              : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
          }`}
        >
          Likes
        </button>
      </div>

      {/* Content */}
      <div>
        {activeTab === 'posts' ? (
          <ProfilePosts posts={profilePostsData} />
        ) : (
          <ProfileLikes likes={likesData} />
        )}
      </div>
    </div>
  );
};

export default ProfileDetails;