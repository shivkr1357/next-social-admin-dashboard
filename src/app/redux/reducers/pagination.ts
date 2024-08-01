import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Order } from "@/utils/utils";

interface IPaginationState {
   order: Order;
   orderBy: string;
   selected: number[];
   page: number;
   dense: boolean;
   rowsPerPage: number;
   total: number;
}

const initialState: IPaginationState = {
   order: "asc",
   orderBy: "_id", // Ensure this property exists in both Data and PostData
   selected: [],
   page: 1,
   dense: false,
   rowsPerPage: 5,
   total: 0,
};

export const paginationSlice = createSlice({
   name: "pagination",
   initialState,
   reducers: {
      setOrder: (state, action: PayloadAction<Order>) => {
         state.order = action.payload;
      },
      setOrderBy: (state, action: PayloadAction<string>) => {
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
      setTotal: (state, action: PayloadAction<number>) => {
         state.total = action.payload;
      },
   },
});

export const paginationReducer = paginationSlice.reducer;
export const paginationActions = paginationSlice.actions;
