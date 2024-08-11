import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ReportData } from "@/types/types";

export interface IReportsState {
  reports: ReportData[];
}

const initialState: IReportsState = {
  reports: [],
};

export const reportsSlice = createSlice({
  name: "reports",
  initialState,
  reducers: {
    setReports: (state, action: PayloadAction<ReportData[]>) => {
      state.reports = action.payload; // Replace existing suggestions with new data
    },
    appendReports: (state, action: PayloadAction<ReportData[]>) => {
      state.reports = [...state.reports, ...action.payload]; // Append new suggestions
    },
  },
});

export const reportsReducer = reportsSlice.reducer;
export const reportsActions = reportsSlice.actions;
