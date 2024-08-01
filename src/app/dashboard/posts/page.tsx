"use client";
import { getAllPosts } from "@/app/redux/actions/post";
import { postsActions } from "@/app/redux/reducers/post";
import { paginationActions } from "@/app/redux/reducers/pagination";
import { RootState } from "@/app/redux/store";
import EnhancedTable from "@/components/CustomTable/Table";
import { PostData } from "@/types/types";
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

   // Get state from Redux
   const { posts } = useSelector((state: RootState) => state.posts);
   const { order, orderBy, selected, page, dense, rowsPerPage, total } =
      useSelector((state: RootState) => state.pagination);

   // Data fetching logic with pagination
   const fetchPosts = useCallback(
      async (page: number, rowsPerPage: number) => {
         try {
            const response = await getAllPosts(page, rowsPerPage);
            if (response && response.data.posts) {
               setHeadCells(generateHeadCells(response.data.posts));

               // Check if we are loading the first page or subsequent pages
               if (page === 0) {
                  dispatch(postsActions.setPosts(response.data.posts)); // Replace existing posts
               } else {
                  dispatch(postsActions.appendPosts(response.data.posts)); // Append new posts
               }

               // Update total records count if pagination is being used
               if (response.data.pagination) {
                  dispatch(
                     paginationActions.setTotal(
                        response.data.pagination.totalRecords
                     )
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
         fetchPosts(page, rowsPerPage);
      }
   }, [accessTokenCheck, page, rowsPerPage, fetchPosts]);

   return (
      <EnhancedTable<PostData>
         data={posts}
         tableHeadData={headCells}
         order={order}
         orderBy={orderBy as keyof PostData}
         selected={selected}
         page={page}
         dense={dense}
         rowsPerPage={rowsPerPage}
         total={total}
         title='Posts'
      />
   );
};

export default Comments;
