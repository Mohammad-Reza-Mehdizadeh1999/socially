import api from "./axiosConfig";

type MarkNotificationsAsReadPayload = {
    ids : string[];
}

export const markNotificationsAsRead = async (payload : MarkNotificationsAsReadPayload) => {
  const res = await api.patch("/notifications" , payload);  
  return res.data;
};


export const getAllNotifications = async () => {
  const res = await api.get("/notifications");  
  return res.data.data;
};