import {
  AnyAction,
  createSelector,
  createSlice,
  PayloadAction,
} from "@reduxjs/toolkit";
// Define a type for the slice state
import produce from "immer";

export type boarDetailsState = {
  boardSelectedIndex: number;
};

const initialState: boarDetailsState = {
  boardSelectedIndex: 0,
};

// Define the initial state using that type

export const boardDetailsSlice = createSlice({
  name: "boardDetails",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    addDetails: (state, action: PayloadAction<AnyAction>) => {
      state.boardSelectedIndex = action.payload.boardSelectedIndex;
    },
  },
});

export const { addDetails } = boardDetailsSlice.actions;

export default boardDetailsSlice.reducer;
