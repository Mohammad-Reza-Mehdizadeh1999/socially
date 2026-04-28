import { useParams } from "react-router";
import ProfileCard from "../components/profile/ProfileCard";
import ProfileDetails from "../components/profile/ProfileDetails";
import { useGetProfileData } from "../hooks/useGetProfileData";
import { useGetUserPosts } from "../hooks/useGetUserPosts";
import { useGetUserLikes } from "../hooks/useGetUserLikes";

export default function ProfilePage() {

  const {userId} = useParams()

  const {data: profileData , isLoading } = useGetProfileData(userId!)

  const {data: profilePostsData } = useGetUserPosts(userId!)

  const {data: profileLikesData } = useGetUserLikes(userId!)
  

  if (isLoading) return <div>Loading...</div>;
  if (!profileData) return <div>پروفایلی یافت نشد</div>;

  return (
    <div className="w-full min-h-screen mx-auto pt-5 dark:bg-black">
      <ProfileCard profileData={profileData}/>
      <ProfileDetails  profilePostsData={profilePostsData}  profileLikesData={profileLikesData}/>
    </div>
  )
}

