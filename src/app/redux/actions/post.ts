import axiosInstance from "@/utils/axiosInstance";
import { BASE_URL } from "@/utils/config";

export const getAllPosts = async (page?: any, rowsPerPage?: any) => {
   const response = await axiosInstance.get(
      BASE_URL + `/posts/getAllPosts?page=${page}&limit=${rowsPerPage}`
   );

   return response;
};
