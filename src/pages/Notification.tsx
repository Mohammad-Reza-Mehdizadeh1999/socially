import { useState } from "react";
import { Heart, MessageCircle, UserPlus } from "lucide-react";
import type { Notification, NotificationType } from "../types/NotificationTypes";
import { getTimeAgo } from "../utiles/geTimeAgo";

export default function NotificationsPage() {
  const [notificationsData, setNotificationsData] = useState<Notification[]>([
    {
      id: "cmltcv5zf00arqr0k0a0yrymd",
      userId: "TRMtbZuoupZ1wksg6DMy4T9Xh3jz2afw",
      creatorId: "FQwfr1TDF6fAwV5FCffY2VYXZeaXkXtq",
      postId: null,
      commentId: null,
      type: "FOLLOW",
      read: false,
      createdAt: "2026-02-19T11:06:07.755Z",
      creator: {
        id: "FQwfr1TDF6fAwV5FCffY2VYXZeaXkXtq",
        name: "Amir",
        image: null,
        email: "amirabedinzade2@gmail.com",
      },
      post: null,
      comment: null,
    },
    {
      id: "cmlmizhrk0009mm0k0hacnc1b",
      userId: "TRMtbZuoupZ1wksg6DMy4T9Xh3jz2afw",
      creatorId: "sTHgdCt4A9lSqT8C2LvZNayawk7un1lb",
      postId: "cmlmgmumi0001mm0ksf080w2y",
      commentId: "cmlmizhr40007mm0k8ytm4cwz",
      type: "COMMENT",
      read: false,
      createdAt: "2026-02-14T16:23:04.112Z",
      creator: {
        id: "sTHgdCt4A9lSqT8C2LvZNayawk7un1lb",
        name: "Mansoureh",
        image: null,
        email: "mansoureh.1998@gmail.com",
      },
      post: {
        content: "Hey, this is my first post on Socially✌️",
      },
      comment: {
        content: "Hello 👋🏻 Good luck",
      },
    },
    {
      id: "cmlpn8dza005vqr0kgq89rwvd",
      userId: "TRMtbZuoupZ1wksg6DMy4T9Xh3jz2afw",
      creatorId: "FQwfr1TDF6fAwV5FCffY2VYXZeaXkXtq",
      postId: "cmlmgmumi0001mm0ksf080w2y",
      commentId: null,
      type: "LIKE",
      read: true,
      createdAt: "2026-02-16T20:45:16.102Z",
      creator: {
        id: "FQwfr1TDF6fAwV5FCffY2VYXZeaXkXtq",
        name: "Amir",
        image: null,
        email: "amirabedinzade2@gmail.com",
      },
      post: {
        content: "Hey, this is my first post on Socially✌️",
      },
      comment: null,
    },
  ]);

  const unreadCount = notificationsData.filter((n) => !n.read).length;

  const getNotificationIcon = (type: NotificationType) => {
    switch (type) {
      case "LIKE":
        return {
          icon: <Heart className="w-4 h-4 text-red-500" fill="currentColor" />,
          text: "liked your post",
          bgColor: "bg-red-500/10",
        };
      case "COMMENT":
        return {
          icon: <MessageCircle className="w-4 h-4 text-blue-500" />,
          text: "commented on your post",
          bgColor: "bg-blue-500/10",
        };
      case "FOLLOW":
        return {
          icon: <UserPlus className="w-4 h-4 text-green-500" />,
          text: "started following you",
          bgColor: "bg-green-500/10",
        };
      default:
        return {
          icon: null,
          text: "",
          bgColor: "",
        };
    }
  };



  const handleMarkAsRead = () => {
    setNotificationsData((prev) =>
      prev.map((notification) => ({ ...notification, read: true }))
    );
  };



  const handleNotificationClick = (id: string) => {
    setNotificationsData((prev) =>
      prev.map((notification) =>
        notification.id === id ? { ...notification, read: true } : notification
      )
    );
  };



  return (
    <div className="min-h-screen bg-gray-950 p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold text-white">Notifications</h1>
          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-400">
              {unreadCount} unread
            </span>
            {unreadCount > 0 && (
              <button
                onClick={handleMarkAsRead}
                className="text-sm font-medium text-gray-300 hover:text-white transition-colors"
              >
                Mark as read
              </button>
            )}
          </div>
        </div>

        {/* Notifications List */}
        <div className="space-y-3">
          {notificationsData.map((notification) => {
            const { icon, text, bgColor } = getNotificationIcon(notification.type);
            
            return (
              <div
                key={notification.id}
                onClick={() => handleNotificationClick(notification.id)}
                className={`p-4 rounded-lg cursor-pointer transition-all ${
                  notification.read
                    ? "bg-gray-900/50"
                    : "bg-gray-900 border border-gray-800"
                } hover:bg-gray-800/50`}
              >
                <div className="flex items-start gap-3">
                  {/* User Avatar */}
                  <div className="shrink-0">
                    <div className="w-10 h-10 rounded-full bg-linear-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                      <span className="text-white font-medium text-sm">
                        {notification.creator.name.charAt(0).toUpperCase()}
                      </span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    {/* Header Line */}
                    <div className="flex items-center gap-2 mb-2">
                      {/* Icon Badge */}
                      <div className={`p-1 rounded-full ${bgColor}`}>
                        {icon}
                      </div>
                      
                      {/* User Name and Action */}
                      <span className="font-semibold text-white text-sm">
                        {notification.creator.name}
                      </span>
                      <span className="text-gray-400 text-sm">
                        {text}
                      </span>
                    </div>

                    {/* Post Content (if exists) */}
                    {notification?.post && (
                      <div className="mb-2">
                        <p className="text-gray-300 text-sm leading-relaxed">
                          {notification?.post.content}
                        </p>
                      </div>
                    )}

                    {/* Comment Content (if exists) */}
                    {notification.comment && (
                      <div className="mb-2 pl-3 border-l-2 border-gray-700">
                        <p className="text-gray-300 text-sm leading-relaxed">
                          {notification?.comment.content}
                        </p>
                      </div>
                    )}

                    {/* Time */}
                    <p className="text-xs text-gray-500">
                      {getTimeAgo(notification?.createdAt)}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}