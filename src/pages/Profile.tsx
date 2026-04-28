import { useParams } from "react-router";
import ProfileCard from "../components/profile/ProfileCard";
import ProfileDetails from "../components/profile/ProfileDetails";
import type { LikedPost } from "../types/ProfileTypes";
import { useGetProfileData } from "../hooks/useGetProfileData";
import { useGetUserPosts } from "../hooks/useGetUserPosts";

export default function ProfilePage() {

  const {userId} = useParams()

  const {data: profileData , isLoading } = useGetProfileData(userId!)


  const likesData: LikedPost[] = [
    {
      id: "cmlz4cyim00elqr0k7v2efbsy",
      userId: "p0ITHdTH8wYDH3LUX6C2eBO6XIhRmPtU",
      postId: "cmlnucpds0009qr0k5koxzr62",
      createdAt: "2026-02-23T11:54:38.398Z",
      post: {
        id: "cmlnucpds0009qr0k5koxzr62",
        authorId: "c5P2W5dP75NR5btZoQ9H4if9VMLIPVjE",
        content: "هیچ صحبتی ندارم بای :|",
        createdAt: "2026-02-15T14:29:02.465Z",
        updatedAt: "2026-02-15T14:29:02.465Z",
        author: {
          id: "c5P2W5dP75NR5btZoQ9H4if9VMLIPVjE",
          email: "morez.mehdizadeh1999@gmail.com",
          image: null,
          name: "mohammad reza"
        },
        likes: [
          { userId: "sTHgdCt4A9lSqT8C2LvZNayawk7un1lb" },
          { userId: "TRMtbZuoupZ1wksg6DMy4T9Xh3jz2afw" },
          { userId: "Cjx0SeYgJ4rz3pKJvIYdUcyBziN50HnW" },
          { userId: "JQhfNOBOvwg7U26AYCjiTrLCJqQGytja" },
          { userId: "FqitbO2SMFcbRG7ot7T4b4UBPIKgSm5p" },
          { userId: "p0ITHdTH8wYDH3LUX6C2eBO6XIhRmPtU" }
        ],
        comments: [
          {
            id: "cmlz49av500ehqr0kps56eezz",
            content: "منم همینطور",
            author: {
              id: "p0ITHdTH8wYDH3LUX6C2eBO6XIhRmPtU",
              email: "behtash@gmail.com",
              image: null,
              name: "behtash"
            },
            createdAt: "2026-02-23T11:51:47.778Z"
          }
        ],
        _count: {
          likes: 6,
          comments: 1
        }
      }
    }
  ];

  const {data: profilePostsData } = useGetUserPosts(userId!)

  

  if (isLoading) return <div>Loading...</div>;
  if (!profileData) return <div>پروفایلی یافت نشد</div>;

  return (
    <div className="w-full min-h-screen mx-auto pt-5 dark:bg-black">
      <ProfileCard profileData={profileData}/>
      <ProfileDetails  profilePostsData={profilePostsData}  likesData={likesData}/>
    </div>
  )
}

