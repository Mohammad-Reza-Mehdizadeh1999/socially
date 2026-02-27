import api from "./axiosConfig";

type createPostPayloadType = {
    content : string
}

export const createNewPostRequest = async (payload : createPostPayloadType) => {
  const res = await api.post("/posts" , payload);  
  return res.data;
};
