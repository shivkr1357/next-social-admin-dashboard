import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CommentData } from "@/types/types";

export interface ICommentsState {
   comments: CommentData[];
}

const initialState: ICommentsState = {
   comments: [],
};

export const commentsSlice = createSlice({
   name: "comments",
   initialState,
   reducers: {
      setAllComments: (state, action: PayloadAction<CommentData[]>) => {
         state.comments = action.payload;
      },
   },
});

export const commentsReducer = commentsSlice.reducer;
export const commentsActions = commentsSlice.actions;
