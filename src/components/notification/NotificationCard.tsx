import type { NotificationTypes } from "../../types/NotificationTypes";
import Avatar from "../Ui/Avatar";
import NotificationContent from "./NotificationContent";
import { getTimeAgo } from "../../utils/getTimeAgo";
import { useMarkOneNotificationAsRead } from "../../hooks/useMarkOneNotificationAsRead";

const NotificationCard = (notification: NotificationTypes) => {
  const cardTheme = notification.read
    ? "border-gray-200 bg-white hover:bg-gray-50 dark:border-[#2F2F2F] dark:bg-[#161616] dark:hover:bg-[#1C1C1C]"
    : "border-transparent bg-[#F5F5F5] hover:bg-[#EEEEEE] dark:bg-[#252525] dark:hover:bg-[#2B2B2B] cursor-pointer";

  const { mutate: readOneNotification, isPending: isReading } =
    useMarkOneNotificationAsRead();

  const pendingTheme = isReading ? "opacity-60" : "";

  const handleReadOneNotification = () => {
    if (notification.read || isReading) {
      return;
    }
    readOneNotification({ ids: [notification.id] });
  };

  return (
    <li
      
      className={`relative flex gap-3 rounded-xl border p-4 transition-colors ${cardTheme} ${pendingTheme}`}
      onClick={handleReadOneNotification}
    >
      <Avatar
        src={notification.creator.image}
        width={40}
        height={40}
        alt={`${notification.creator.name} avatar`}
      />

      <div className="min-w-0 flex-1">
        <NotificationContent {...notification} />

        <p className="mt-2 text-xs text-gray-400 dark:text-gray-500">
          {getTimeAgo(notification.createdAt)}
        </p>
      </div>

      {!notification.read && (
        <span className="absolute right-4 top-4 h-2.5 w-2.5 rounded-full bg-blue-500" />
      )}
    </li>
  );
};

export default NotificationCard;
