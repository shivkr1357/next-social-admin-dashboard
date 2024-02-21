import { IUser } from "@/types/types";
import { createSlice } from "@reduxjs/toolkit";

const initialState: IAuthState = {
   user: undefined,
   blockedUsers: [],
};

export const authSlice = createSlice({
   name: "auth",
   initialState,
   reducers: {
      setCurrentUser: (s, a) => {
         s.user = a.payload;
      },
   },
});

export const authReducer = authSlice.reducer;
export const authActions = authSlice.actions;

export interface IAuthState {
   user?: IUser;
   blockedUsers: any[];
}
