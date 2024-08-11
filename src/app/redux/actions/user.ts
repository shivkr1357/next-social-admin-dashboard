import axiosInstance from "@/utils/axiosInstance";
import { BASE_URL } from "@/utils/config";

export const getAllUsers = async (page: any, rowsPerPage: any) => {
  const response = await axiosInstance.get(
    BASE_URL + `/users/getAllUsers?page=${page}&limit=${rowsPerPage}`
  );

  return response;
};
