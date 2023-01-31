import { createSlice } from "@reduxjs/toolkit";

import { theme } from "../constants";
const { DARK, LIGHT } = theme;
// Define a type for the slice state
type ThemeState = {
  theme: string;
};

const defaultDark = window.matchMedia("(prefers-color-scheme: dark)")?.matches
  ? DARK
  : LIGHT;
const localStorageTheme = localStorage.getItem("theme") || null;
const initialTheme = localStorageTheme ? localStorageTheme : defaultDark;
// Define the initial state using that type
const initialState: ThemeState = {
  theme: initialTheme,
};

export const themeSlice = createSlice({
  name: "theme",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    onChangeTheme: (state) => {
      const theme = state.theme === DARK ? LIGHT : DARK;
      localStorage.setItem("theme", theme);
      state.theme = theme;
    },
  },
});

export const { onChangeTheme } = themeSlice.actions;

// Other code such as selectors can use the imported `RootState` type
// export const selectCount = (state: RootState) => state.counterReducers.value;

export default themeSlice.reducer;
