import { Order } from "@/utils/utils";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { PostData } from "@/types/types";

export interface IPostState {
   posts: PostData[];
   order: Order;
   orderBy: keyof PostData;
   selected: number[];
   page: number;
   dense: boolean;
   rowsPerPage: number;
}

const initialState: IPostState = {
   posts: [],
   order: "asc",
   orderBy: "title",
   selected: [],
   page: 0,
   dense: false,
   rowsPerPage: 5,
};

export const usersSlice = createSlice({
   name: "posts",
   initialState,
   reducers: {
      setAllPosts: (state, action: PayloadAction<PostData[]>) => {
         state.posts = action.payload;
      },
      setOrder: (state, action: PayloadAction<Order>) => {
         state.order = action.payload;
      },
      setOrderBy: (state, action: PayloadAction<keyof PostData>) => {
         state.orderBy = action.payload;
      },
      setPage: (state, action: PayloadAction<number>) => {
         state.page = action.payload;
      },
      setDense: (state, action: PayloadAction<boolean>) => {
         state.dense = action.payload;
      },
      setRowPerPage: (state, action: PayloadAction<number>) => {
         state.rowsPerPage = action.payload;
      },
      setSelected: (state, action: PayloadAction<number[]>) => {
         state.selected = action.payload;
      },
   },
});

export const usersReducer = usersSlice.reducer;
export const usersActions = usersSlice.actions;
