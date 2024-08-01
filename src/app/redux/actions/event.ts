import axiosInstance from "@/utils/axiosInstance";
import { BASE_URL } from "@/utils/config";

export const getAllEvents = async (page?: any, rowsPerPage?: any) => {
   const response = await axiosInstance.get(
      BASE_URL + `/events/getAllEvent?page=${page}&limit=${rowsPerPage}`
   );

   return response;
};

export const createEvent = async (data: any) => {
   const response = await axiosInstance.post(BASE_URL + "/events/create", data);

   console.log("Response", response);

   return response;
};
