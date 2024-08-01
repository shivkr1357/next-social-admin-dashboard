"use client";
import { getAllComments } from "@/app/redux/actions/comments";
import { commentsActions } from "@/app/redux/reducers/comments";
import { RootState } from "@/app/redux/store";
import EnhancedTable from "@/components/CustomTable/Table";
import { CommentData, PostData } from "@/types/types";
import { generateHeadCells, HeadCell, isAuthenticated } from "@/utils/utils";
import { useRouter } from "next/navigation";
import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const Comments = () => {
   const [accessTokenCheck, setAccessTokenCheck] = useState(
      localStorage.getItem("accessToken")
   );
   const [headCells, setHeadCells] = useState<HeadCell[]>([]);
   const dispatch = useDispatch();
   const router = useRouter();

   const { comments } = useSelector((state: RootState) => state.comments);
   const { order, orderBy, selected, page, dense, rowsPerPage } = useSelector(
      (state: RootState) => state.pagination
   );

   const getAllCommentsData = useCallback(async () => {
      try {
         const response = await getAllComments();
         if (response && response.data.comments) {
            setHeadCells(generateHeadCells(response.data.comments));
            dispatch(commentsActions.setAllComments(response.data.comments));
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
         getAllCommentsData();
      }
   }, [accessTokenCheck]);

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
         title='Comments'
      />
   );
};

export default Comments;
