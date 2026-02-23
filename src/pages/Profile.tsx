import ProfileCard from "../components/profile/ProfileCard";
import ProfileDetails from "../components/profile/ProfileDetails";
import type { LikedPost, Post } from "../types/ProfileTypes";

export default function ProfilePage() {

    const postsData: Post[] = [
    {
      id: "cmlz4ff1v00erqr0kiobmdz2s",
      authorId: "p0ITHdTH8wYDH3LUX6C2eBO6XIhRmPtU",
      content: "سلام سلااااااام همگی سلام",
      createdAt: "2026-02-23T11:56:33.139Z",
      updatedAt: "2026-02-23T11:56:33.139Z",
      author: {
        id: "p0ITHdTH8wYDH3LUX6C2eBO6XIhRmPtU",
        email: "behtash@gmail.com",
        image: null,
        name: "behtash"
      },
      likes: [{ userId: "c5P2W5dP75NR5btZoQ9H4if9VMLIPVjE" }],
      comments: [
        {
          id: "cmlz4gg5400exqr0kzxiwl34h",
          content: "علیک سلام",
          author: {
            id: "c5P2W5dP75NR5btZoQ9H4if9VMLIPVjE",
            email: "morez.mehdizadeh1999@gmail.com",
            image: null,
            name: "mohammad reza"
          },
          createdAt: "2026-02-23T11:57:21.209Z"
        }
      ],
      _count: {
        likes: 1,
        comments: 1
      }
    }
  ];

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




  return (
    <div className="w-full min-h-screen mx-auto pt-5 dark:bg-black">
      <ProfileCard />
      <ProfileDetails  postsData={postsData}  likesData={likesData}/>
    </div>
  )
}

