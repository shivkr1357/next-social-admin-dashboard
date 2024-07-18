import axiosInstance from "@/utils/axiosInstance";
import { BASE_URL } from "@/utils/config";

export const getAllUsers = async () => {
   const response = await axiosInstance.get(BASE_URL + "/users/getAllUsers");

   return response;
};
