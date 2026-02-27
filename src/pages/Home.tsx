import AllPosts from "../components/home/AllPosts";
import RecommendedUsers from "../components/home/RecommendedUsers";

export default function Home() {
  return (
    <div className="flex gap-5">
      <AllPosts />
      <RecommendedUsers />
    </div>
  )
}

