import { useState } from "react";
import Avatar from "../Ui/Avatar";
import avatar from "../../assets/avatar.png";
import type { RecommendedUser } from "../../types/RecommendedUser";

const initialUsers: RecommendedUser[] = [
  {
    id: "MSg1gAmYplPDsyG1Bgk3jGsBI483cbPe",
    name: "hadi",
    email: "hadi@gmail.com",
    emailVerified: false,
    image: null,
    bio: null,
    location: null,
    website: null,
    createdAt: "2026-02-25T10:59:34.665Z",
    updatedAt: "2026-02-25T10:59:34.665Z",
    _count: { followers: 0 },
    isFollowing: false,
  },
  {
    id: "auRGViZsMXLr00Jy6aq5l7K8rsh9SSpQ",
    name: "nastaran",
    email: "nastaranadib1383@gmail.com",
    emailVerified: false,
    image: null,
    bio: null,
    location: null,
    website: null,
    createdAt: "2026-02-25T07:37:07.074Z",
    updatedAt: "2026-02-25T07:37:07.074Z",
    _count: { followers: 0 },
    isFollowing: false,
  },
  {
    id: "42pLF9HtxQHoRmRytrrYYp7VHp7pcnsR",
    name: "morez",
    email: "morez@gmail.com",
    emailVerified: false,
    image: null,
    bio: null,
    location: null,
    website: null,
    createdAt: "2026-02-24T18:11:34.422Z",
    updatedAt: "2026-02-25T18:11:34.422Z",
    _count: { followers: 1 },
    isFollowing: false,
  },
];

  const RecommendedUsers = () => {
    const [users, setUsers] = useState<RecommendedUser[]>(initialUsers);

    const handleToggleFollow = (userId: string) => {
      setUsers((prevUsers) =>
        prevUsers.map((user) => {
          if (user.id === userId) {
            const isCurrentlyFollowing = user.isFollowing;

            return {
              ...user,
              isFollowing: !isCurrentlyFollowing,
              _count: {
                followers: isCurrentlyFollowing
                  ? user._count.followers - 1
                  : user._count.followers + 1,
              },
            };
          }
          return user;
        }),
      );
    };

    return (
      <section>
        <div className="sticky p-6 mt-6 max-w-90 shadow-sm dark:bg-primary-light rounded-xl border border-border-light dark:border-border-dark">
          <h3 className="text-lg font-bold mb-6 dark:text-white">
            Recommended users
          </h3>
          {users.map((user) => (
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
