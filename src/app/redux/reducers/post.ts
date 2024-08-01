import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { PostData } from "@/types/types";

export interface IPostsState {
   posts: PostData[];
}

const initialState: IPostsState = {
   posts: [],
};

export const postsSlice = createSlice({
   name: "posts",
   initialState,
   reducers: {
      setPosts: (state, action: PayloadAction<PostData[]>) => {
         state.posts = action.payload; // Replace existing posts with new data
      },
      appendPosts: (state, action: PayloadAction<PostData[]>) => {
         state.posts = [...state.posts, ...action.payload]; // Append new posts
      },
   },
});

export const postsReducer = postsSlice.reducer;
export const postsActions = postsSlice.actions;
