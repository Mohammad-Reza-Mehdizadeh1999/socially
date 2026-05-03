import { useParams } from "react-router";
import ProfileCard from "../components/profile/ProfileCard";
import ProfileDetails from "../components/profile/ProfileDetails";
import { useGetUserPosts } from "../hooks/useGetUserPosts";
import { useGetUserLikes } from "../hooks/useGetUserLikes";
import { useGetProfileDataByUsername } from "../hooks/useGetProfileDataByUsername";
import { useAuthStore } from "../store/authStore";

export default function ProfilePage() {

  const {userName} = useParams()

  const {user} = useAuthStore()

  const {data: profileData , isLoading } = useGetProfileDataByUsername(userName!)

  const {data: profilePostsData } = useGetUserPosts(user?.id)

  const {data: profileLikesData } = useGetUserLikes(user?.id)
  

  if (isLoading) return <div>Loading...</div>;
  if (!profileData) return <div>پروفایلی یافت نشد</div>;

  return (
    <div className="w-full min-h-screen mx-auto pt-5 dark:bg-black">
      <ProfileCard profileData={profileData} userPostsLength={profilePostsData?.length}/>
      <ProfileDetails  profilePostsData={profilePostsData}  profileLikesData={profileLikesData}/>
    </div>
  )
}

