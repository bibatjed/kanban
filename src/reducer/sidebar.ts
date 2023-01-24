import { AnyAction, createSlice, PayloadAction } from "@reduxjs/toolkit";

// Define a type for the slice state
type SidebarState = {
  isOpen: boolean;
};

// Define the initial state using that type
const initialState: SidebarState = {
  isOpen: false,
};

export const sidebarSlice = createSlice({
  name: "modal",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    openSidebar: (state) => {
      state.isOpen = true;
    },
    closeSidebar: (state) => {
      state.isOpen = false;
    },
  },
});

export const { openSidebar, closeSidebar } = sidebarSlice.actions;

export default sidebarSlice.reducer;
