/* eslint-disable @typescript-eslint/no-explicit-any */
import type { AxiosResponse } from "axios";
import api from "./axiosConfig";
import type { EditProfileFormData } from "../types/ProfileTypes";

export const GetProfileDataRequest = (userId : string): Promise<AxiosResponse<any>> => {
  return api.get(`/users/${userId}`);
};


export const GetUserPostsRequest = (userId : string): Promise<AxiosResponse<any>> => {
  return api.get(`/users/${userId}/posts`);
};

export const GetUserLikesRequest = (userId : string): Promise<AxiosResponse<any>> => {
  return api.get(`/users/${userId}/likes`);
};

export const UpdateUserProfileRequest = (userId : string , data : EditProfileFormData): Promise<AxiosResponse<any>> => {
  return api.put(`/users/${userId}` , data);
};