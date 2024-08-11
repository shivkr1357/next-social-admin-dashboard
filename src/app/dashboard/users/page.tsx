"use client";

import { paginationActions } from "@/app/redux/reducers/pagination";
import { RootState } from "@/app/redux/store";
import EnhancedTable from "@/components/CustomTable/Table";
import { Data } from "@/types/types";
import { generateHeadCells, HeadCell, isAuthenticated } from "@/utils/utils";
import { useRouter } from "next/navigation";
import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllUsers } from "@/app/redux/actions/user";
import { usersActions } from "@/app/redux/reducers/user";

const Users = () => {
  const [accessTokenCheck, setAccessTokenCheck] = useState(
    localStorage.getItem("accessToken")
  );
  const [headCells, setHeadCells] = useState<HeadCell[]>([]);
  const dispatch = useDispatch();
  const router = useRouter();

  // Get state from Redux
  const { users } = useSelector((state: RootState) => state.users);
  const { order, orderBy, selected, page, dense, rowsPerPage, total } =
    useSelector((state: RootState) => state.pagination);

  // Data fetching logic with pagination
  const fetchUsers = useCallback(
    async (page: number, rowsPerPage: number) => {
      try {
        const response = await getAllUsers(page, rowsPerPage);
        if (response && response.data.users) {
          setHeadCells(generateHeadCells(response.data.users));

          // Check if we are loading the first page or subsequent pages
          if (page === 0) {
            dispatch(usersActions.setAllUsers(response.data.users)); // Replace existing posts
          } else {
            dispatch(usersActions.appendUsers(response.data.users)); // Append new posts
          }

          // Update total records count if pagination is being used
          if (response.data.pagination) {
            dispatch(
              paginationActions.setTotal(response.data.pagination.totalRecords)
            );
          }
        }
      } catch (error) {
        console.log("Error fetching Users:", error);
      }
    },
    [dispatch]
  );

  // Effect to handle authentication and fetch data
  useEffect(() => {
    if (!isAuthenticated()) {
      setAccessTokenCheck("");
      router.push("/");
    } else {
      fetchUsers(page, rowsPerPage);
    }
  }, [accessTokenCheck, page, rowsPerPage, fetchUsers]);

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
      total={total}
      title="Users"
    />
  );
};

export default Users;
