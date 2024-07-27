import axiosInstance from "@/utils/axiosInstance";
import { BASE_URL } from "@/utils/config";

export const getAllEvents = async () => {
  const response = await axiosInstance.get(BASE_URL + "/events/getAllEvent");

  return response;
};
