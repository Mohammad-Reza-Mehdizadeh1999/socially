import api from "./axiosConfig";


export const getAllNotificationsRequest = () => {
  return api.get("/notifications");
};
