import { Order } from "@/utils/utils";
import { createSlice } from "@reduxjs/toolkit";

const initialState: IUserState = {
   users: [],
   order: "asc",
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
      setOrderBy: (s, a) => {
         s.orderBy = a.payload;
      },
      setPage: (s, a) => {
         s.page = a.payload;
      },
      setDense: (s, a) => {
         s.dense = a.payload;
      },
      setRowPerPage: (s, a) => {
         s.rowsPerPage = a.payload;
      },
      setSelected: (s, a) => {
         s.selected = a.payload;
      },
   },
});

export const usersReducer = usersSlice.reducer;
export const usersActions = usersSlice.actions;

export interface IUserState {
   users: any;
   order: Order;
   orderBy: string;
   selected: readonly number[];
   page: number;
   dense: boolean;
   rowsPerPage: number;
}
