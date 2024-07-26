import axiosInstance from "@/utils/axiosInstance";
import { BASE_URL } from "@/utils/config";

export const getAllComments = async () => {
   const response = await axiosInstance.get(
      BASE_URL + "/comments/getAllComments"
   );

   return response;
};
