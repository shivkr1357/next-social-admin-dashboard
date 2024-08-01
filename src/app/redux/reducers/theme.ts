import { createSlice } from "@reduxjs/toolkit";

const themeSlice = createSlice({
   name: "theme",
   initialState: {
      theme: "light",
      sidebar: true,
      alert: false,
   },
   reducers: {
      toggleTheme: (state) => {
         state.theme = state.theme === "light" ? "dark" : "light";
      },
      toggleSidebar: (state) => {
         state.sidebar = !state.sidebar;
      },
      toogleAlert: (state, action) => {
         state.alert = action.payload;
      },
   },
});

export const themeReducer = themeSlice.reducer;
export const themeActions = themeSlice.actions;

export interface IAuthState {
   theme: string;
   sidebar: boolean;
   alert: boolean;
}
