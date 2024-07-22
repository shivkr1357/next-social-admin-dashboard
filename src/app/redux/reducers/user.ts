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
      setAllUser: (state, action: PayloadAction<Data[]>) => {
         state.users = action.payload;
      },
   },
});

export const usersReducer = usersSlice.reducer;
export const usersActions = usersSlice.actions;
