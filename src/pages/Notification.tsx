import Avatar from "../components/Ui/Avatar";
import avatar from "../assets/avatar.png";
import { useGetAllNotifications } from "../hooks/useGetAllNotification";
import {useMarkOneAsRead,useMarkAllAsRead} from "../hooks/useMarkNotificationsRead";
import toast from "react-hot-toast";
import { useAuthStore } from "../store/authStore";
import { getTimeAgo } from "../utiles/geTimeAgo";
import type {Notification,NotificationType} from "../types/NotificationTypes";
import Button from "../components/Ui/Button";
import { Heart, MessageCircle, UserRoundPlus } from "lucide-react";
import { useNavigate } from "react-router";

const NotificationsPage = () => {
  const {data: notificationsData, isLoading, isError, error} = useGetAllNotifications();
  const { isAuthenticated } = useAuthStore();
  const navigate = useNavigate()


  const markOneMutation = useMarkOneAsRead();
  const markAllMutation = useMarkAllAsRead();

  const unreadCount = notificationsData
    ? notificationsData.filter((notif) => !notif.read).length
    : 0;

  if(!isAuthenticated){
    navigate("/login")
  }

  const getNotificationText = (notification: Notification) => {
    switch (notification.type) {
      case "LIKE":
        return "liked your post";
      case "COMMENT":
        return "commented on your post";
      case "FOLLOW":
        return "started following you";
      default:
        return "";
    }
  };

  const renderIcon = (type: NotificationType) => {
    switch (type) {
      case "LIKE":
        return (
          <Heart />
        );
      case "COMMENT":
        return (
          <MessageCircle />
        );
      case "FOLLOW":
        return (
          <UserRoundPlus />
        );
    }
  };

  const handleMarkAllRead = () => {
    const notReadNotifIds: string[] = [];

    notificationsData?.forEach((notif) => {
      if (!notif.read) {
        notReadNotifIds.push(notif.id);
      }
    });

    if (notReadNotifIds.length > 0) {
      markAllMutation.mutate(notReadNotifIds);
    } else {
      toast.success("You’ve read all notifications");
    }
  };

  if (isLoading) {
    return (
      <section className="px-5">
        <div className="mt-6 flex flex-col mx-auto max-w-154 lg:max-w-190 xl:max-w-244 h-128 border border-border-light dark:border-border-dark dark:bg-primary-light rounded-xl items-center justify-center">
          <p className="dark:text-white">Is Loading ... </p>
        </div>
      </section>
    );
  }

  if (isError) {
    return (
      <section className="px-5">
        <div className="mt-6 flex flex-col mx-auto max-w-154 lg:max-w-190 xl:max-w-244 h-128 border border-border-light dark:border-border-dark dark:bg-primary-light rounded-xl items-center justify-center">
          <p className="text-red-500">Error: {error.message}</p>
        </div>
      </section>
    );
  }

  return (
    <section className="px-4 sm:px-5">
      <div
        className="mt-6 flex flex-col mx-auto max-w-full sm:max-w-154 lg:max-w-190 xl:max-w-244 
                   h-140 border border-border-light dark:border-border-dark bg-white dark:bg-primary-light rounded-xl"
      >
        <div className="flex justify-between items-center p-4 sm:p-6 sticky top-0 bg-white dark:bg-primary-light z-10">
          <h4 className="text-base font-bold dark:text-white">Notifications</h4>

          <div className="flex items-center gap-2">
            <span className="text-sm text-secondery-light dark:text-secondary-dark">
              {unreadCount} unread
            </span>

            <Button
              onClick={handleMarkAllRead}
              className="
            text-sm font-medium px-3 py-1 rounded-md cursor-pointer transition-colors
            hover:bg-gray-100 dark:hover:bg-border-dark
            dark:text-white
          "
            >
              {markAllMutation.isPending ? "Marking..." : "Mark as read"}
            </Button>
          </div>
        </div>

        <span className="block h-px w-full bg-border-light dark:bg-border-dark"></span>

        <div className="flex flex-col space-y-3 max-h-full p-3 sm:p-4 overflow-y-auto">
          {notificationsData?.map((notif) => (
            <div
              key={notif.id}
              onClick={() => {
                if (!notif.read) {
                  markOneMutation.mutate(notif.id);
                }
              }}
              className={`
            flex items-start relative p-2 gap-3 
            rounded-md border 
            border-border-light dark:border-border-dark
            transition-colors

            ${
              notif.read
                ? "bg-white dark:bg-primary-light"
                : "bg-gray-100 dark:bg-border-dark cursor-pointer"
            }
          `}
            >
              <Avatar src={avatar} height={30} width={30} />

              <div className="flex flex-col gap-2 w-full">
                <div className="flex items-center gap-2 w-full flex-wrap">
                  {renderIcon(notif.type)}

                  <span className="text-base font-medium dark:text-white">
                    {notif.creator.name}
                  </span>

                  <span className="text-sm text-secondery-light dark:text-secondary-dark">
                    {getNotificationText(notif)}
                  </span>
                </div>

                {notif.post && (
                  <span className="dark:text-white">{notif.post.content}</span>
                )}

                {notif.comment && (
                  <span
                    className="
                  dark:text-white 
                  w-full sm:w-1/2 
                  border my-2 p-3 rounded-lg 
                  border-gray-300 dark:border-gray-600
                "
                  >
                    {notif.comment.content}
                  </span>
                )}

                <span className="text-sm text-secondery-light dark:text-secondary-dark">
                  {getTimeAgo(notif.createdAt)}
                </span>
              </div>

              {!notif.read && (
                <span className="size-2 rounded-full absolute bg-blue-500 right-4 top-4"></span>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default NotificationsPage;
