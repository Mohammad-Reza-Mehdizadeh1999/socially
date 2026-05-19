import { useQuery } from "@tanstack/react-query";
import type { Notification } from "../Types/notifications";
import { getAllNotificationsRequest } from "../services/notificationService";

export const useGetAllNotifications = () => {
  return useQuery<Notification[]>({
    queryKey: ["notifications"],
    queryFn: async () => {
      const res = await getAllNotificationsRequest();
      if (!res.data.success) {
        throw new Error("Failed to fetch notifications");
      }
      return res.data.data;
    },
  });
};