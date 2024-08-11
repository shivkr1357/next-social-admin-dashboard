import axiosInstance from "@/utils/axiosInstance";
import { BASE_URL } from "@/utils/config";

export const getAllComments = async (page: any, rowsPerPage: any) => {
  const response = await axiosInstance.get(
    BASE_URL + `/comments/getAllComments?page=${page}&limit=${rowsPerPage}`
  );

  return response;
};
