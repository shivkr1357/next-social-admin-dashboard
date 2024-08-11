import axiosInstance from "@/utils/axiosInstance";
import { BASE_URL } from "@/utils/config";

export const getAllReports = async (page?: any, rowsPerPage?: any) => {
  const response = await axiosInstance.get(
    BASE_URL + `/reports/getAllReports?page=${page}&limit=${rowsPerPage}`
  );

  return response;
};
