import { MapPin, Link as LinkIcon, Calendar, UserPlus } from "lucide-react";
import type { UserProfile } from "../../types/ProfileTypes";
import { getTimeAgo } from "../../utiles/geTimeAgo";
import EditProfileModal from "./EditProfileModal";
import { useState } from "react";

interface ProfileCardProps {
  profileData?: UserProfile;
  userPostsLength?: number;
}

const ProfileCard = ({ profileData, userPostsLength }: ProfileCardProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
    
  return (
    <div className="bg-gray-900 rounded-2xl p-6 border border-gray-800 max-w-2xl mx-auto">
      {/* Avatar */}
      <div className="flex justify-center mb-4">
        <div className="w-20 h-20 rounded-full bg-linear-to-br from-blue-500 to-purple-600 flex items-center justify-center overflow-hidden">
          <span className="text-white text-3xl font-bold">B</span>
        </div>
      </div>

      {/* Name & Username */}
      <div className="text-center mb-6">
        <h2 className="text-xl font-bold text-white mb-1">
          {profileData?.name}
        </h2>
        <p className="text-gray-400 text-sm">{profileData?.email}</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        {/* Followings */}
        <div className="text-center cursor-pointer hover:opacity-80 transition-opacity">
          <div className="text-2xl font-bold text-white mb-1">
            {profileData?._count.followings}
          </div>
          <div className="text-gray-400 text-sm">Followings</div>
        </div>

        {/* Followers */}
        <div className="text-center cursor-pointer hover:opacity-80 transition-opacity">
          <div className="text-2xl font-bold text-white mb-1">
            {profileData?._count?.followers}
          </div>
          <div className="text-gray-400 text-sm">Followers</div>
        </div>

        {/* Posts */}
        <div className="text-center cursor-pointer hover:opacity-80 transition-opacity">
          <div className="text-2xl font-bold text-white mb-1">
            {userPostsLength}
          </div>
          <div className="text-gray-400 text-sm">Posts</div>
        </div>
      </div>

      {/* Edit Profile Button */}
      <button
        className="w-full flex items-center justify-center gap-2 py-2.5 px-4 bg-gray-200 cursor-pointer hover:bg-gray-300 text-gray-900 rounded-lg font-medium transition-colors mb-6"
        onClick={() => setIsModalOpen(true)}
      >
        <UserPlus className="w-4 h-4" />
        Edit Profile
      </button>

      {/* Additional Info */}
      <div className="space-y-3 pt-6 border-t border-gray-800">
        {/* Location */}
        <div className="flex items-center gap-2 text-gray-400">
          <MapPin size={18} />
          <span className="text-sm">No location</span>
        </div>

        {/* Website */}
        <div className="flex items-center gap-2 text-gray-400">
          <LinkIcon size={18} />
          <span className="text-sm">No website</span>
        </div>

        {/* Joined Date */}
        <div className="flex items-center gap-2 text-gray-400">
          <Calendar size={18} />
          <span className="text-sm">{getTimeAgo("2026-02-23T11:30:00Z")}</span>
        </div>
      </div>

      <EditProfileModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        profileData={profileData}
      />
    </div>
  );
};

export default ProfileCard;
