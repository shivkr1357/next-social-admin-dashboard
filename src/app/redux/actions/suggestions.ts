import axiosInstance from "@/utils/axiosInstance";
import { BASE_URL } from "@/utils/config";

export const getAllSuggestions = async (page?: any, rowsPerPage?: any) => {
  const response = await axiosInstance.get(
    BASE_URL +
      `/suggestions/getAllSuggestions?page=${page}&limit=${rowsPerPage}`
  );
  console.log("Response", response);

  return response;
};
