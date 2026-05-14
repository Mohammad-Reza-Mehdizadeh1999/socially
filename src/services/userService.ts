import type { RecommendedUser } from "../types/recommendedUser";
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