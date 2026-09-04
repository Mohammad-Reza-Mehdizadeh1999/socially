import { useGetAllPosts } from "../../hooks/useGetAllPosts";
import type { PostType } from "../../types/AllPostsTypes";
import { Spinner } from "../Ui/Spinner";
import Post from "./Post";
import SendPost from "./SendPost";

export default function AllPosts() {
  const { data, isLoading } = useGetAllPosts();  

  if (isLoading) {
    return <Spinner></Spinner>;
  }

  return (
    <div className="">
      <SendPost />

      {data?.data?.map((post: PostType) => (
        <Post key={post.id} post={post} />
      ))}
    </div>
  );
}
