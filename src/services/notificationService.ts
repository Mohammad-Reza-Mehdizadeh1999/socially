import api from "./axiosConfig";


export const getAllNotificationsRequest = () => {
  return api.get("/notifications");
};

export const markOneNotificationRead = (ids: string) => {
  const idToTransfer = { ids : [ids] }  
  return api.patch(`/notifications` , idToTransfer);
};
