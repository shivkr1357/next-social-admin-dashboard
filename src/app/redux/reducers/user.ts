import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Data } from "@/types/types";

export interface IUserState {
  users: Data[];
}

const initialState: IUserState = {
  users: [],
};

export const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    setAllUsers: (state, action: PayloadAction<Data[]>) => {
      state.users = action.payload; // Replace existing users with new data
    },
    appendUsers: (state, action: PayloadAction<Data[]>) => {
      state.users = [...state.users, ...action.payload]; // Append new users
    },
    // You can add more reducers here if needed
  },
});

export const usersReducer = usersSlice.reducer;
export const usersActions = usersSlice.actions;
