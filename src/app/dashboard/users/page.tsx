"use client";
import { getAllUsers } from "@/app/redux/actions/user";
import { usersActions } from "@/app/redux/reducers/user";
import { RootState } from "@/app/redux/store";
import EnhancedTable from "@/components/CustomTable/Table";
import { isAuthenticated } from "@/utils/utils";
import { useRouter } from "next/navigation";
import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const Users = () => {
   const [accessTokenCheck, setAccessTokenCheck] = useState(
      localStorage.getItem("accessToken")
   );
   const dispatch = useDispatch();
   const router = useRouter();

   const { users } = useSelector((state: RootState) => state.users);

   const getAllUsersData = useCallback(async () => {
      try {
         const response = await getAllUsers();
         if (response && response.data.users) {
            dispatch(usersActions.setAllUser(response.data.users));
         }
      } catch (error) {
         console.log("Error", error);
      }
   }, [dispatch]);

   useEffect(() => {
      if (!isAuthenticated()) {
         setAccessTokenCheck("");
         router.push("/");
      } else {
         getAllUsersData();
      }
   }, [accessTokenCheck]);

   return <EnhancedTable data={users} />;
};

export default Users;
