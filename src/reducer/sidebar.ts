import { createSlice } from '@reduxjs/toolkit';
import InitialStateParser from '../helper/initialStateParser';

type SidebarState = {
  isOpen: boolean;
};

const initialState = InitialStateParser<SidebarState>('sidebar', {
  isOpen: false,
});

export const sidebarSlice = createSlice({
  name: 'sidebar',
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
