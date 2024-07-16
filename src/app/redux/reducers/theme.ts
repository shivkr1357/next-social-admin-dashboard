import { createSlice } from "@reduxjs/toolkit";

const themeSlice = createSlice({
   name: "theme",
   initialState: {
      theme: "light",
      sidebar: true,
   },
   reducers: {
      toggleTheme: (state) => {
         state.theme = state.theme === "light" ? "dark" : "light";
      },
      toggleSidebar: (state) => {
         state.sidebar = !state.sidebar;
      },
   },
});

export const themeReducer = themeSlice.reducer;
export const themeActions = themeSlice.actions;

export interface IAuthState {
   theme: string;
   sidebar: boolean;
}
