"use client";
import { getAllUsers } from "@/app/redux/actions/user";
import { usersActions } from "@/app/redux/reducers/user";
import { RootState } from "@/app/redux/store";
import EnhancedTable from "@/components/CustomTable/Table";
import { Data } from "@/types/types";
import { generateHeadCells, HeadCell, isAuthenticated } from "@/utils/utils";
import { useRouter } from "next/navigation";
import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const Users = () => {
   const [accessTokenCheck, setAccessTokenCheck] = useState(
      localStorage.getItem("accessToken")
   );
   const [headCells, setHeadCells] = useState<HeadCell[]>([]);
   const dispatch = useDispatch();
   const router = useRouter();

   const { users } = useSelector((state: RootState) => state.users);
   const { order, orderBy, selected, page, dense, rowsPerPage } = useSelector(
      (state: RootState) => state.pagination
   );

   const getAllUsersData = useCallback(async () => {
      try {
         const response = await getAllUsers();
         if (response && response.data.users) {
            setHeadCells(generateHeadCells(response.data.users));
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

   return (
      <EnhancedTable<Data>
         data={users}
         tableHeadData={headCells}
         order={order}
         orderBy={orderBy as keyof Data}
         selected={selected}
         page={page}
         dense={dense}
         rowsPerPage={rowsPerPage}
         title='Users'
      />
   );
};

export default Users;
