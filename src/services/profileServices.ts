/* eslint-disable @typescript-eslint/no-explicit-any */
import type { AxiosResponse } from "axios";
import api from "./axiosConfig";

export const GetProfileDataRequest = (userId : string): Promise<AxiosResponse<any>> => {
  return api.get(`/users/${userId}`);
};


export const GetUserPostsRequest = (userId : string): Promise<AxiosResponse<any>> => {
  return api.get(`/users/${userId}/posts`);
};