import { Heart, MessageCircle, UserRoundPlus } from "lucide-react";
import type { NotificationTypes } from "../../types/NotificationTypes";
import { Link } from "react-router";
import { splitUsername } from "../../utils/splitUsername";

const NotificationContent = ( notification: NotificationTypes) => {
  switch (notification.type) {
    case "LIKE":
      return (
        <div className="flex flex-col gap-3">
          <button className="flex flex-wrap items-center gap-2 text-sm">
            <Heart size={20} className="shrink-0 text-red-500" stroke="red" />

            <Link to={`/profile/${splitUsername(notification.creator.email)}`} className="font-semibold text-gray-900 dark:text-white">
              {notification.creator.name}
            </Link>

            <span className="text-gray-500 dark:text-gray-400">
              liked your post
            </span>
          </button>

          <p className="text-sm leading-6 text-gray-700 dark:text-gray-300">
            {notification.post?.content}
          </p>

        </div>
      );

    case "COMMENT":
      return (
        <div className="flex flex-col gap-3">
          <button className="flex flex-wrap items-center gap-2 text-sm">
            <MessageCircle size={20} className="shrink-0 text-blue-500" />

            <Link to={`/profile/${splitUsername(notification.creator.email)}`} className="font-semibold text-gray-900 dark:text-white">
              {notification.creator.name}
            </Link>

            <span className="text-gray-500 dark:text-gray-400">
              commented on your post
            </span>
          </button>

          <p className="text-sm leading-6 text-gray-700 dark:text-gray-300">
            {notification.post?.content}
          </p>

          <div className="rounded-lg bg-white px-3 py-2 dark:bg-[#161616]">
            <p className="text-sm leading-6 text-gray-600 dark:text-gray-300">
              {notification.comment?.content}
            </p>
          </div>

          
        </div>
      );

    case "FOLLOW":
      return (
        <div className="flex flex-col gap-3">
          <button className="flex flex-wrap items-center gap-2 text-sm">
            <UserRoundPlus size={20} className="shrink-0 text-green-500" />

            <Link to={`/profile/${splitUsername(notification.creator.email)}`} className="font-semibold text-gray-900 dark:text-white">
              {notification.creator.name}
            </Link>

            <span className="text-gray-500 dark:text-gray-400">
              started following you
            </span>
          </button>
        </div>
      );

    default:
      return null;
  }
};

export default NotificationContent;
