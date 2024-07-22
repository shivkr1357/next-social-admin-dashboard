import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { PostData } from "@/types/types";

export interface IPostState {
   posts: PostData[];
}

const initialState: IPostState = {
   posts: [],
};

export const postsSlice = createSlice({
   name: "posts",
   initialState,
   reducers: {
      setAllPosts: (state, action: PayloadAction<PostData[]>) => {
         state.posts = action.payload;
      },
   },
});

export const postsReducer = postsSlice.reducer;
export const postsActions = postsSlice.actions;
