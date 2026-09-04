import Button from "../Ui/Button";
import { useState } from "react";
import ProfilePosts from "./ProfilePosts";
import ProfileLikes from "./ProfileLikes";

type PostAndLikeButtonProps = {
  profileId : string
}

const PostAndLikeButton = ({profileId} : PostAndLikeButtonProps) => {
  const [activeTab, setActiveTab] = useState<"posts" | "likes">("posts");

  return (
    <div className="flex flex-col">
      <div className="w-[calc(100%-2rem)] max-w-250 mt-8 bg-[#f5f5f5] dark:bg-[#0A0A0A] dark:border dark:border-[#262626] rounded-2xl p-1.5 flex">
        <Button
          onClick={() => setActiveTab("posts")}
          className={`w-1/2 rounded-2xl p-1.5 dark:text-white ${
            activeTab === "posts"
              ? "bg-white dark:bg-[#2f2f2f] transition-all dark:transition-none"
              : "bg-transparent"
          }`}
        >
          Posts
        </Button>

        <Button
          onClick={() => setActiveTab("likes")}
          className={`w-1/2 rounded-2xl p-1.5  dark:text-white ${
            activeTab === "likes"
              ? "bg-white dark:bg-[#2f2f2f] transition-all dark:transition-none"
              : "bg-transparent"
          }`}
        >
          Likes
        </Button>
      </div>
      {activeTab === "posts" && <ProfilePosts profileId={profileId} />}
      {activeTab === "likes" && <ProfileLikes profileId={profileId} />}
    </div>
  );
};

export default PostAndLikeButton;
