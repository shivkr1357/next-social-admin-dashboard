import { IUser } from "@/types/types";
import { BASE_URL } from "@/utils/config";
import axiosInstance from "@/utils/axiosInstance";

export const loginUser = async (data: IUser) => {
   const response = await axiosInstance.post(BASE_URL + "/auth/", data);

   return response;
};

export const getUser = async (email: string) => {
   const response = await axiosInstance.get(
      `${BASE_URL}/users/getOneUser/${email}`
   );
   return response;
};
