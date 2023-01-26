import {
  AnyAction,
  createSelector,
  createSlice,
  PayloadAction,
} from "@reduxjs/toolkit";
import uuid from "react-uuid";
// Define a type for the slice state
import produce from "immer";

export type boarDetailsState = {
  boardSelected: string;
  boardSelectedIndex: number;
};

const initialState: boarDetailsState = {
  boardSelected: "",
  boardSelectedIndex: 0,
};

// Define the initial state using that type

export const boardDetailsSlice = createSlice({
  name: "boardDetails",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    addDetails: (state, action: PayloadAction<AnyAction>) => {
      state.boardSelected = action.payload.boardSelected;
      state.boardSelectedIndex = action.payload.boardSelectedIndex;
    },
  },
});

export const {} = boardDetailsSlice.actions;

export default boardDetailsSlice.reducer;
