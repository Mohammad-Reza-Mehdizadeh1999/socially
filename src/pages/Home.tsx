import AllPosts from "../components/home/AllPosts";
import RecommendedUsers from "../components/home/RecommendedUsers";
import { useAuthStore } from "../store/authStore";

export default function Home() {

  const { isAuthenticated } = useAuthStore()

  return (
    <div className="flex gap-5">
      <AllPosts />
      { isAuthenticated && <RecommendedUsers />}
    </div>
  )
}

