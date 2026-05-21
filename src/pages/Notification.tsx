import Button from "../components/Ui/Button";
import Avatar from "../components/Ui/Avatar";
import avatar from "../assets/avatar.png";
import { useGetAllNotifications } from "../hooks/useGetAllNotification";
import { useMarkOneAsRead, useMarkAllAsRead } from "../hooks/useMarkNotificationsRead";
import toast from "react-hot-toast";
import NotFoundPage from "./NotFoundPage";
import { useAuthStore } from "../store/authStore";
import { getTimeAgo } from "../utiles/geTimeAgo";
import type { Notification, NotificationType } from "../types/NotificationTypes";

const NotificationsPage = () => {

  const { data: notificationsData, isLoading, isError, error} = useGetAllNotifications();
  const { isAuthenticated } = useAuthStore();

  const markOneMutation = useMarkOneAsRead();
  const markAllMutation = useMarkAllAsRead();

  const unreadCount = notificationsData ? notificationsData.filter((notif) => !notif.read).length : 0;

  if (!isAuthenticated) {
    return <NotFoundPage />;
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
          <svg
            className="size-4"
            viewBox="0 0 15 14"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M12 8.00001C12.9933 7.02667 14 5.86001 14 4.33334C14 3.36088 13.6137 2.42825 12.9261 1.74061C12.2384 1.05298 11.3058 0.666672 10.3333 0.666672C9.16 0.666672 8.33333 1.00001 7.33333 2.00001C6.33333 1.00001 5.50667 0.666672 4.33333 0.666672C3.36087 0.666672 2.42824 1.05298 1.74061 1.74061C1.05298 2.42825 0.666668 3.36088 0.666668 4.33334C0.666668 5.86667 1.66667 7.03334 2.66667 8.00001L7.33333 12.6667L12 8.00001Z"
              stroke="#EF4444"
              stroke-width="1.33333"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        );
      case "COMMENT":
        return (
          <svg
            className="size-4"
            viewBox="0 0 14 14"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M4.60002 12.0052C5.87241 12.6579 7.33608 12.8347 8.72728 12.5038C10.1185 12.1728 11.3457 11.3558 12.1879 10.2C13.03 9.04426 13.4316 7.62572 13.3204 6.20002C13.2092 4.77432 12.5924 3.43522 11.5812 2.42404C10.57 1.41286 9.23095 0.796079 7.80525 0.684856C6.37955 0.573632 4.961 0.975276 3.80523 1.81741C2.64947 2.65954 1.83248 3.88678 1.5015 5.27799C1.17052 6.66919 1.34732 8.13286 2.00002 9.40525L0.666687 13.3386L4.60002 12.0052Z"
              stroke="#3B82F6"
              stroke-width="1.33333"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        );
      case "FOLLOW":
        return (
          <svg
            className="size-4 text-green-500"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M12.6666 14V12.6667C12.6666 11.9594 12.3857 11.2811 11.8856 10.781C11.3855 10.281 10.7072 10 9.99998 10H5.99998C5.29274 10 4.61446 10.281 4.11436 10.781C3.61426 11.2811 3.33331 11.9594 3.33331 12.6667V14"
              stroke="currentColor"
              stroke-width="1.33333"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M7.99998 7.33333C9.47274 7.33333 10.6666 6.13943 10.6666 4.66667C10.6666 3.19391 9.47274 2 7.99998 2C6.52722 2 5.33331 3.19391 5.33331 4.66667C5.33331 6.13943 6.52722 7.33333 7.99998 7.33333Z"
              stroke="currentColor"
              stroke-width="1.33333"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
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
    } else{
      toast.success("You’ve read all notifications")
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
    <section className="px-5">
      <div className="mt-6 flex flex-col mx-auto max-w-154 lg:max-w-190 xl:max-w-244 h-140 border border-border-light dark:border-border-dark dark:bg-primary-light rounded-xl">
        <div className="flex justify-between items-center p-6 sticky">
          <h4 className="text-base font-bold leading-4 dark:text-white">
            Notifications
          </h4>
          <div className="flex items-center justify-center gap-2">
            <span className="text-sm leading-5 text-secondery-light dark:text-secondary-dark">
              {unreadCount} unread
            </span>
            <Button
              onClick={handleMarkAllRead}
              className="text-sm font-medium hover:bg-gray-100 dark:hover:bg-border-dark px-3 py-1 cursor-pointer transition-colors rounded-md dark:text-white"
            >
              {markAllMutation.isPending ? "Marking..." : "Mark as read"}
            </Button>
          </div>
        </div>
        <span className="block h-px w-full bg-border-light dark:bg-border-dark"></span>
        <div className="flex flex-col space-y-3 max-h-full p-4 overflow-y-auto"> 
          {notificationsData?.map((notif) => (
            <div
              key={notif.id}
              onClick={() => {
                if (!notif.read) {
                  markOneMutation.mutate(notif.id);
                }
              }}
              className={`flex items-start relative p-2 gap-3 bg-gray-100 dark:bg-border-dark rounded-md border border-border-light dark:border-border-dark ${
                notif.read
                  ? "bg-white dark:bg-primary-light"
                  : "bg-gray-100 dark:bg-border-dark cursor-pointer"
              }`}
            >
              <Avatar src={avatar} height={30} width={30}></Avatar>
              <div className="flex flex-col gap-2 w-full">
                <div className="flex items-center gap-2 w-full">
                  {renderIcon(notif.type)}
                  <span className="text-base font-medium dark:text-white">
                    {notif.creator.name}
                  </span>
                  <span className="text-sm leading-5 text-secondery-light dark:text-secondary-dark">
                    {getNotificationText(notif)}
                  </span>
                </div>
                {notif.post && (
                  <span className="dark:text-white">{notif.post.content}</span>
                )}
                {notif.comment && (
                  <span className="dark:text-white w-1/2 border my-2 p-3 rounded-lg dark:border-gray-600">
                    {notif.comment.content}
                  </span>
                )}
                <span className="text-sm leading-5 text-secondery-light dark:text-secondary-dark">
                  {getTimeAgo(notif.createdAt)}
                </span>
              </div>
              {notif.read || (
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
