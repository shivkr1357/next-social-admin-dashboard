import { createSlice } from "@reduxjs/toolkit";

const initialState: IUserState = {
  users: [],
  order: "",
  orderBy: "",
  selected: [],
  page: 0,
  dense: false,
  rowsPerPage: 5,
};

export const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    setAllUser: (s, a) => {
      s.users = a.payload;
    },
    setOrder: (s, a) => {
      s.order = a.payload;
    },
  },
});

export const usersReducer = usersSlice.reducer;
export const usersActions = usersSlice.actions;

export interface IUserState {
  users: any;
  order: string;
  orderBy: string;
  selected: [];
  page: number;
  dense: boolean;
  rowsPerPage: number;
}
