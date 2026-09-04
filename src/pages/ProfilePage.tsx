import { useParams } from "react-router";
import PostAndLikeButton from "../components/profile/PostAndLikeButton";
import ProfileCardDetails from "../components/profile/ProfileCardDetails";
import { useGetUserByUserName } from "../hooks/useGetUserByUserName";
import { splitUsername } from "../utils/splitUsername";

export default function ProfilePage() {

  const { username } = useParams<{ username: string }>();

  const { data, isLoading, isError } = useGetUserByUserName({username: username ?? ""});

   if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Failed to load profile</div>;
  }

  return (
    <>
      <div className="flex w-[calc(100%-2rem)] max-w-250 justify-center">
        <ProfileCardDetails 
          name={data?.data.name}
          email={splitUsername(data?.data.email)}
          bio={data?.data.bio}
          image={data?.data.image}
          location={!data?.data.location ? "No locatin" : data?.data.location}
          website={!data?.data.website ? "No website" : data?.data.website} 
          createdAt={data?.data.createdAt}
          updatedAt={data?.data.updatedAt}
          _count={data?.data._count}
          followers={data?.data.followers}
          />
      </div>
      <PostAndLikeButton profileId={data.data.id}/>
    </>
  );
}
