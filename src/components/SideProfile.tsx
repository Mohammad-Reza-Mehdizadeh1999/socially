import React from 'react';
import { MapPin, Link as LinkIcon } from 'lucide-react';
import { useAuthStore } from '../store/authStore';
import { useGetProfileData } from '../hooks/useGetProfileData';

const SideProfile: React.FC = () => {

  const { user } = useAuthStore();
  
  const {data: profileData } = useGetProfileData(user?.id)
  
  console.log("assasasasasas",profileData);
  
  return (
    <div className="bg-gray-200 dark:bg-black rounded-2xl p-6 border border-gray-800">
      {/* Avatar */}
      <div className="flex justify-center ">
        <div className="w-20 h-20 rounded-full bg-linear-to-br from-blue-500 to-purple-600 flex items-center justify-center overflow-hidden">
          <svg
            className="w-10 h-10 text-white"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              fillRule="evenodd"
              d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
              clipRule="evenodd"
            />
          </svg>
        </div>
      </div>

      {/* Name & Username */}
      <div className="text-center mb-6">
        <h2 className="text-xl font-bold text-white my-1">{user?.name}</h2>
        <p className="text-gray-400 text-sm">{user?.email}</p>
      </div>

      {/* Divider */}
      <div className="border-t border-gray-800 mb-6"></div>

      {/* Stats */}
      <div className="flex justify-around mb-6">
        <div className="text-center">
          <div className="text-2xl font-bold text-white mb-1">{profileData?._count.followings}</div>
          <div className="text-gray-400 text-sm">Followings</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-white mb-1">{profileData?._count.followers}</div>
          <div className="text-gray-400 text-sm">Followers</div>
        </div>
      </div>

      {/* Divider */}
      <div className="border-t border-gray-800 mb-6"></div>

      {/* Location & Website */}
      <div className="space-y-3">
        {/* Location */}
        <div className="flex items-center space-x-2 text-gray-400">
          <MapPin size={18} />
          <span className="text-sm">{profileData?.location ? profileData?.location : "No Location"}</span>
        </div>

        {/* Website */}
        <div className="flex items-center space-x-2 text-gray-400">
          <LinkIcon size={18} />
          <span className="text-sm">{profileData?.website ? profileData?.website : "No Website"}</span>
        </div>
      </div>
    </div>
  );
};

export default SideProfile;