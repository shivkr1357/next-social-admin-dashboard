import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { SuggestionsData } from "@/types/types";

export interface ISuggestionsState {
  suggestions: SuggestionsData[];
}

const initialState: ISuggestionsState = {
  suggestions: [],
};

export const suggestionsSlice = createSlice({
  name: "suggestions",
  initialState,
  reducers: {
    setSuggestions: (state, action: PayloadAction<SuggestionsData[]>) => {
      state.suggestions = action.payload; // Replace existing suggestions with new data
    },
    appendSuggestions: (state, action: PayloadAction<SuggestionsData[]>) => {
      state.suggestions = [...state.suggestions, ...action.payload]; // Append new suggestions
    },
  },
});

export const suggestionsReducer = suggestionsSlice.reducer;
export const suggestionsActions = suggestionsSlice.actions;
