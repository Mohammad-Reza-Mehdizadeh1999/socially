import { useNavigate, useParams } from "react-router";
import ProfileCard from "../components/profile/ProfileCard";
import ProfileDetails from "../components/profile/ProfileDetails";
import { useGetUserPosts } from "../hooks/useGetUserPosts";
import { useGetUserLikes } from "../hooks/useGetUserLikes";
import { useGetProfileDataByUsername } from "../hooks/useGetProfileDataByUsername";
import { useAuthStore } from "../store/authStore";

export default function ProfilePage() {

  const { isAuthenticated } = useAuthStore()

  const navigate = useNavigate()

  const {userName} = useParams()

  const {data: profileData , isLoading , isError } = useGetProfileDataByUsername(userName!)

  const {data: profilePostsData , isError : isErrorUserPosts } = useGetUserPosts(profileData?.id)

  const {data: profileLikesData , isError : isErrorUserLikes } = useGetUserLikes(profileData?.id)
  

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div className="text-red-500">fail to load user profile</div>;
  if (isErrorUserPosts) return <div className="text-red-500">fail to load user posts</div>;
  if (isErrorUserLikes) return <div className="text-red-500">fail to load user likes</div>;
  if (!profileData) return <div>پروفایلی یافت نشد</div>;

  if(!isAuthenticated){
    navigate("/login")
  }

  return (
    <div className="w-full min-h-screen mx-auto pt-5 dark:bg-black">
      <ProfileCard profileData={profileData} userPostsLength={profilePostsData?.length}/>
      <ProfileDetails  profilePostsData={profilePostsData}  profileLikesData={profileLikesData}/>
    </div>
  )
}

