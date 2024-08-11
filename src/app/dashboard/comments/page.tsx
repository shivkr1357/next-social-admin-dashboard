"use client";
import { getAllPosts } from "@/app/redux/actions/post";
import { postsActions } from "@/app/redux/reducers/post";
import { paginationActions } from "@/app/redux/reducers/pagination";
import { RootState } from "@/app/redux/store";
import EnhancedTable from "@/components/CustomTable/Table";
import { CommentData, PostData } from "@/types/types";
import { generateHeadCells, HeadCell, isAuthenticated } from "@/utils/utils";
import { useRouter } from "next/navigation";
import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllComments } from "@/app/redux/actions/comments";
import { commentsActions } from "@/app/redux/reducers/comments";

const Comments = () => {
  const [accessTokenCheck, setAccessTokenCheck] = useState(
    localStorage.getItem("accessToken")
  );
  const [headCells, setHeadCells] = useState<HeadCell[]>([]);
  const dispatch = useDispatch();
  const router = useRouter();

  // Get state from Redux
  const { comments } = useSelector((state: RootState) => state.comments);
  const { order, orderBy, selected, page, dense, rowsPerPage, total } =
    useSelector((state: RootState) => state.pagination);

  // Data fetching logic with pagination
  const fetchComments = useCallback(
    async (page: number, rowsPerPage: number) => {
      try {
        const response = await getAllComments(page, rowsPerPage);
        if (response && response.data.comments) {
          setHeadCells(generateHeadCells(response.data.comments));

          // Check if we are loading the first page or subsequent pages
          if (page === 0) {
            dispatch(commentsActions.setAllComments(response.data.comments)); // Replace existing posts
          } else {
            dispatch(commentsActions.appendComments(response.data.comments)); // Append new posts
          }

          // Update total records count if pagination is being used
          if (response.data.pagination) {
            dispatch(
              paginationActions.setTotal(response.data.pagination.totalRecords)
            );
          }
        }
      } catch (error) {
        console.log("Error fetching comments:", error);
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
      fetchComments(page, rowsPerPage);
    }
  }, [accessTokenCheck, page, rowsPerPage, fetchComments]);

  return (
    <EnhancedTable<CommentData>
      data={comments}
      tableHeadData={headCells}
      order={order}
      orderBy={orderBy as keyof CommentData}
      selected={selected}
      page={page}
      dense={dense}
      rowsPerPage={rowsPerPage}
      total={total}
      title="Comments"
    />
  );
};

export default Comments;
