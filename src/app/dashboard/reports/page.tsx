"use client";

import React, { useCallback, useEffect, useState } from "react";
import { paginationActions } from "@/app/redux/reducers/pagination";
import { RootState } from "@/app/redux/store";
import EnhancedTable from "@/components/CustomTable/Table";
import { ReportData } from "@/types/types";
import { generateHeadCells, HeadCell, isAuthenticated } from "@/utils/utils";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { getAllReports } from "@/app/redux/actions/report";
import { reportsActions } from "@/app/redux/reducers/report";

const Reports = () => {
  const [accessTokenCheck, setAccessTokenCheck] = useState(
    localStorage.getItem("accessToken")
  );
  const [headCells, setHeadCells] = useState<HeadCell[]>([]);
  const dispatch = useDispatch();
  const router = useRouter();

  // Get state from Redux
  const { reports } = useSelector((state: RootState) => state.reports);
  const { order, orderBy, selected, page, dense, rowsPerPage, total } =
    useSelector((state: RootState) => state.pagination);

  // Data fetching logic with pagination
  const fetchReports = useCallback(
    async (page: number, rowsPerPage: number) => {
      try {
        const response = await getAllReports(page, rowsPerPage);
        if (response && response.data.reports) {
          setHeadCells(generateHeadCells(response.data.reports));

          // Check if we are loading the first page or subsequent pages
          if (page === 0) {
            dispatch(reportsActions.setReports(response.data.reports)); // Replace existing posts
          } else {
            dispatch(reportsActions.appendReports(response.data.reports)); // Append new posts
          }

          // Update total records count if pagination is being used
          if (response.data.pagination) {
            dispatch(
              paginationActions.setTotal(response.data.pagination.totalRecords)
            );
          }
        }
      } catch (error) {
        console.log("Error fetching posts:", error);
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
      fetchReports(page, rowsPerPage);
    }
  }, [accessTokenCheck, page, rowsPerPage, fetchReports]);

  return (
    <EnhancedTable<ReportData>
      data={reports}
      tableHeadData={headCells}
      order={order}
      orderBy={orderBy as keyof ReportData}
      selected={selected}
      page={page}
      dense={dense}
      rowsPerPage={rowsPerPage}
      total={total}
      title="Reports"
    />
  );
};

export default Reports;
