import Avatar from "../Ui/Avatar";
import avatar from "../../assets/avatar.png";
import { useGetRecommendedUsers } from "../../hooks/useGetRecommendedUsers";
import { toggleFollowRequest } from "../../services/profileServices";
import toast from "react-hot-toast";
import { useQueryClient } from "@tanstack/react-query";
import { useAuthStore } from "../../store/authStore";


  const RecommendedUsers = () => {

    const queryClient = useQueryClient()

    const {user} = useAuthStore()

    const {data : recommendUsers} = useGetRecommendedUsers()
    
    const handleToggleFollow = async (userId: string) => {
      try {
        await toggleFollowRequest(userId)
        toast.success("user followed successfully")
        await queryClient.invalidateQueries({ queryKey: ["recommendedUsers"] })
        await queryClient.invalidateQueries({ queryKey: ["ProfileData", user?.id] })
      } catch (error) {
        console.error(error)
        toast.error("failed to follow user")
      }
      
    };

    return (
      <section>
        <div className="sticky p-6 mt-6 max-w-90 shadow-sm dark:bg-primary-light rounded-xl border border-border-light dark:border-border-dark">
          <h3 className="text-lg font-bold mb-6 dark:text-white">
            Recommended users
          </h3>
          {recommendUsers?.map((user) => (
            <div
              key={user.id}
              className="flex items-center justify-between gap-x-30 mb-3"
            >
              <div className="flex items-center gap-x-2">
                <Avatar src={avatar} height={30} width={30}></Avatar>
                <div className="flex flex-col gap-y-1">
                  <span className="dark:text-white">{user.name}</span>
                  <span className="flex items-center gap-1 text-sm leading-5 text-secondery-light dark:text-secondary-dark">
                    <span>{user._count.followers}</span>followers
                  </span>
                </div>
              </div>
              <div>
                <button
                  onClick={() => handleToggleFollow(user.id)}
                  type="submit"
                  className="flex items-center justify-center text-sm dark:text-white hover:bg-gray-100 py-1 px-2 border border-border-light dark:border-secondary-dark dark:bg-border-dark dark:hover:bg-border-dark/10 rounded-md cursor-pointer transition-colors"
                >
                  {user.isFollowing ? "unfollow" : "follow"}
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>
    );
  };
export default RecommendedUsers;
