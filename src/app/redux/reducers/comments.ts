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
      state.comments = action.payload; // Replace existing comments with new data
    },
    appendComments: (state, action: PayloadAction<CommentData[]>) => {
      state.comments = [...state.comments, ...action.payload]; // Append new comments
    },
    // You can add more reducers here if needed
  },
});

export const commentsReducer = commentsSlice.reducer;
export const commentsActions = commentsSlice.actions;
