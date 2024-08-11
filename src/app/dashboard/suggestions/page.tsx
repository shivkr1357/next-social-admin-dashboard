"use client";

import { paginationActions } from "@/app/redux/reducers/pagination";
import { RootState } from "@/app/redux/store";
import EnhancedTable from "@/components/CustomTable/Table";
import { SuggestionsData } from "@/types/types";
import { generateHeadCells, HeadCell, isAuthenticated } from "@/utils/utils";
import { useRouter } from "next/navigation";
import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllSuggestions } from "@/app/redux/actions/suggestions";
import { suggestionsActions } from "@/app/redux/reducers/suggestions";

const Suggestions = () => {
  const [accessTokenCheck, setAccessTokenCheck] = useState(
    localStorage.getItem("accessToken")
  );
  const [headCells, setHeadCells] = useState<HeadCell[]>([]);
  const dispatch = useDispatch();
  const router = useRouter();

  // Get state from Redux
  const { suggestions } = useSelector((state: RootState) => state.suggestions);
  const { order, orderBy, selected, page, dense, rowsPerPage, total } =
    useSelector((state: RootState) => state.pagination);

  // Data fetching logic with pagination
  const fetchSuggestions = useCallback(
    async (page: number, rowsPerPage: number) => {
      try {
        const response = await getAllSuggestions(page, rowsPerPage);
        if (response && response.data.suggestions) {
          setHeadCells(generateHeadCells(response.data.suggestions));

          // Check if we are loading the first page or subsequent pages
          if (page === 0) {
            dispatch(
              suggestionsActions.setSuggestions(response.data.suggestions)
            ); // Replace existing Suggestions
          } else {
            dispatch(
              suggestionsActions.appendSuggestions(response.data.suggestions)
            ); // Append new Suggestions
          }

          // Update total records count if pagination is being used
          if (response.data.pagination) {
            dispatch(
              paginationActions.setTotal(response.data.pagination.totalRecords)
            );
          }
        }
      } catch (error) {
        console.log("Error fetching Suggestions:", error);
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
      fetchSuggestions(page, rowsPerPage);
    }
  }, [accessTokenCheck, page, rowsPerPage, fetchSuggestions]);

  return (
    <EnhancedTable<SuggestionsData>
      data={suggestions}
      tableHeadData={headCells}
      order={order}
      orderBy={orderBy as keyof SuggestionsData}
      selected={selected}
      page={page}
      dense={dense}
      rowsPerPage={rowsPerPage}
      total={total}
      title="Suggestions"
    />
  );
};

export default Suggestions;
