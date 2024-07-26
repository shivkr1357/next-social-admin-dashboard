"use client";
import { getAllPosts } from "@/app/redux/actions/post";
import { postsActions } from "@/app/redux/reducers/post";
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

   const { posts } = useSelector((state: RootState) => state.posts);
   const { order, orderBy, selected, page, dense, rowsPerPage } = useSelector(
      (state: RootState) => state.paginationn
   );

   const getAllPostData = useCallback(async () => {
      try {
         const response = await getAllPosts();
         if (response && response.data.posts) {
            setHeadCells(generateHeadCells(response.data.posts));
            dispatch(postsActions.setAllPosts(response.data.posts));
         }
      } catch (error) {
         console.log("Error", error);
      }
   }, [dispatch]);

   console.log("Head cELLS", headCells, posts);

   useEffect(() => {
      if (!isAuthenticated()) {
         setAccessTokenCheck("");
         router.push("/");
      } else {
         getAllPostData();
      }
   }, [accessTokenCheck]);

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
         title='Posts'
      />
   );
};

export default Comments;
