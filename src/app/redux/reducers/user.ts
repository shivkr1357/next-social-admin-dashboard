import { Data, Order } from "@/utils/utils";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface IUserState {
  users: Data[];
  order: Order;
  orderBy: keyof Data;
  selected: number[];
  page: number;
  dense: boolean;
  rowsPerPage: number;
}

const initialState: IUserState = {
  users: [],
  order: "asc",
  orderBy: "email",
  selected: [],
  page: 0,
  dense: false,
  rowsPerPage: 5,
};

export const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    setAllUser: (state, action: PayloadAction<Data[]>) => {
      state.users = action.payload;
    },
    setOrder: (state, action: PayloadAction<Order>) => {
      state.order = action.payload;
    },
    setOrderBy: (state, action: PayloadAction<keyof Data>) => {
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
