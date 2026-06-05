import type { Notification } from "../types/NotificationTypes";

  export const getNotificationText = (notification: Notification) => {
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