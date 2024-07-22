import axiosInstance from "@/utils/axiosInstance";
import { BASE_URL } from "@/utils/config";

export const getAllPosts = async () => {
   const response = await axiosInstance.get(BASE_URL + "/posts/");

   return response;
};
