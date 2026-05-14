import type { RecommendedUser } from "../types/RecommendedUser";
import api from "./axiosConfig";


export interface RecommendedUsersResponse {
  message: string;
  success: boolean;
  data: RecommendedUser[];
}

export const getRecommendedUsersRequest = async (): Promise<RecommendedUsersResponse> => {
  const response = await api.get("/users/recommend");
  return response.data;
};