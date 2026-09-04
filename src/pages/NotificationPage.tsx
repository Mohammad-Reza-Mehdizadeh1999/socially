import { LoaderCircle } from "lucide-react";
import NotificationCard from "../components/notification/NotificationCard";
import { useGetAllNotifications } from "../hooks/useGetAllNotification";
import { useMarkNotificationsAsRead } from "../hooks/usemarkNotificationsAsRead";
import type { NotificationTypes } from "../types/NotificationTypes";

export default function NotificationPage() {


  const { data: notifications = [], isLoading: isLoadingNotifications, isError} =
    useGetAllNotifications();

  const { mutate: readAllNotification, isPending: isMarkingAsRead } =
    useMarkNotificationsAsRead();

  const unreadCount = notifications.filter(
    (notification: NotificationTypes) => !notification.read,
  ).length;

  const handleReadAllNotification = () => {
    if (unreadCount === 0) return;

    const ids = notifications
      .filter((notification: NotificationTypes) => !notification.read)
      .map((notification: NotificationTypes) => notification.id);

    readAllNotification({ ids });
  };

  const unreadCountTheme =
    unreadCount === 0
      ? "cursor-not-allowed bg-gray-100 text-gray-400 dark:bg-gray-800 dark:text-gray-600"
      : "bg-transparent text-gray-900 hover:bg-blue-50 hover:text-blue-500 dark:text-white dark:hover:bg-blue-950";

  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col rounded-2xl border border-[#E5E5E5] bg-white shadow-sm dark:border-[#2F2F2F] dark:bg-[#111111]">
      <div className="flex items-center justify-between gap-4 rounded-t-2xl bg-white px-5 py-5 sm:px-6 dark:bg-[#111111]">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
          Notifications
        </h3>

        <div className="flex items-center gap-4">
          <span className="text-sm text-gray-500 dark:text-gray-400">
            {unreadCount} unread
          </span>

          <button
            className={`flex items-center gap-2 rounded-full px-3 py-1.5 text-sm font-semibold transition-all ${unreadCountTheme} disabled:opacity-70`}
            onClick={handleReadAllNotification}
            disabled={unreadCount === 0 || isMarkingAsRead}
          >
            {isMarkingAsRead ? (
              <>
                <LoaderCircle className="h-4 w-4 animate-spin" />
                Marking...
              </>
            ) : (
              "Mark all as read"
            )}
          </button>
        </div>
      </div>

      <ul className="flex max-h-102 flex-col gap-3 overflow-y-auto px-5 pb-5 sm:px-6 [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-gray-300 dark:[&::-webkit-scrollbar-thumb]:bg-gray-600 m-0 list-none p-0">
        {isLoadingNotifications ? (
          <li className="flex h-40 items-center justify-center">
            <LoaderCircle className="h-6 w-6 animate-spin text-gray-400" />
          </li>
        ) : isError ? (
          <li className="flex h-40 items-center justify-center text-red-500">
            Failed to load notifications
          </li>
        ) : notifications.length === 0 ? (
          <li className="flex h-40 items-center justify-center text-gray-500">
            No notifications yet
          </li>
        ) : (
          notifications.map((notification:NotificationTypes) => (
            <NotificationCard key={notification.id} {...notification} />
          ))
        )}
      </ul>
    </div>
  );
}
