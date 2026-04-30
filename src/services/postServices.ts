/* eslint-disable @typescript-eslint/no-explicit-any */
import api from "./axiosConfig";

type createPostPayloadType = {
    content : string
}

export const createNewPostRequest = async (payload : createPostPayloadType) => {
  const res = await api.post("/posts" , payload);  
  return res.data;
};


export const getAllPostRequest = async () => {
  const res = await api.get("/posts");  
  return res.data;
};

export const likePostRequest = async (postId: string) => {
  try {
    const res = await api.patch(`/posts/${postId}`);
    return res.data;
  } catch (error: any) {
    throw error.response?.data; 
  }
};

export const deletePostRequest = async (postId: string) => {
  try {
    const res = await api.delete(`/posts/${postId}`);
    return res.data;
  } catch (error: any) {
    throw error.response?.data; 
  }
};

