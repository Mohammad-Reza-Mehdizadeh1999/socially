import { useState } from "react";
import { LoaderCircle } from "lucide-react";
import { useGetRecommendedUsers } from "../hooks/useGetRecommendedUsers";
import { useToggleFollowUser } from "../hooks/useToggleFollowUser";
import type { RecommendedUserTypes } from "../types/RecommendedUserTypes";
import { splitUsername } from "../utils/splitUsername";
import { Link } from "react-router";
import Avatar from "./Ui/Avatar";

export const SideRecommendedUsers: React.FC = () => {
  const [followingUserId, setFollowingUserId] = useState<string | null>(null);

  const { data: recommendedUsers, isLoading: isLoadingRecommendedUsers } =
    useGetRecommendedUsers();

  const { mutate: toggleFollowUser, isPending: isFollowingUser } =
    useToggleFollowUser();

  const handleFollowToggle = (id: string) => {
    setFollowingUserId(id);

    toggleFollowUser(id, {
      onSettled: () => {
        setFollowingUserId(null);
      },
    });
  };

  return (
    <div className="flex flex-col rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-[#0A0A0A]">
      <h3 className="mb-4 text-lg font-bold text-zinc-900 dark:text-white">
        Recommended users
      </h3>

      <div className="flex flex-col gap-4">
        {isLoadingRecommendedUsers ? (
          <div className="flex min-h-32 items-center justify-center">
            <LoaderCircle className="h-6 w-6 animate-spin text-zinc-400" />
          </div>
        ) : (
          recommendedUsers?.data.map((user: RecommendedUserTypes) => {
            const userName = splitUsername(user.email);

            return (
              <div
                key={user.id}
                className="flex items-center justify-between"
              >
                <Link
                  to={`/profile/${userName}`}
                  className="flex min-w-0 items-center gap-3"
                >
                  <Avatar
                    src={user.image}
                    width={40}
                    height={40}
                  />

                  <div className="flex min-w-0 flex-col">
                    <span className="truncate text-sm font-semibold text-zinc-900 dark:text-white">
                      {user.name}
                    </span>

                    <span className="text-xs text-zinc-500 dark:text-zinc-400">
                      {user._count.followers} followers
                    </span>
                  </div>
                </Link>

                <button
                  type="button"
                  onClick={() => handleFollowToggle(user.id)}
                  disabled={isFollowingUser && followingUserId === user.id}
                  className="ml-3 flex h-8 min-w-18 cursor-pointer items-center justify-center rounded-xl border border-zinc-300 px-4 py-1.5 text-xs font-medium text-zinc-900 transition-all disabled:cursor-not-allowed disabled:opacity-60 dark:border-zinc-800 dark:text-white"
                >
                  {isFollowingUser && followingUserId === user.id ? (
                    <LoaderCircle className="h-4 w-4 animate-spin" />
                  ) : (
                    "Follow"
                  )}
                </button>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default SideRecommendedUsers;