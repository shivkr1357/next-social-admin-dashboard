import { Order } from "@/utils/utils";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface IPaginationState {
   order: Order;
   orderBy: string;
   selected: number[];
   page: number;
   dense: boolean;
   rowsPerPage: number;
}

const initialState: IPaginationState = {
   order: "asc",
   orderBy: "_id", // Ensure this property exists in both Data and PostData
   selected: [],
   page: 0,
   dense: false,
   rowsPerPage: 5,
};

export const paginationSlice = createSlice({
   name: "pagination",
   initialState,
   reducers: {
      setOrder: (state, action: PayloadAction<Order>) => {
         state.order = action.payload;
      },
      setOrderBy: (
         state,
         action: PayloadAction<string> // Accept any string, should be validated on usage
      ) => {
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

export const paginationReducer = paginationSlice.reducer;
export const paginationActions = paginationSlice.actions;
