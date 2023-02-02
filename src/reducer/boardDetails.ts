import { AnyAction, createSlice, PayloadAction } from '@reduxjs/toolkit';
import InitialStateParser from '../helper/initialStateParser';

export type boardDetailsState = {
  boardSelectedIndex: number;
};

const initialState = InitialStateParser<boardDetailsState>('boardDetails', {
  boardSelectedIndex: 0,
});

export const boardDetailsSlice = createSlice({
  name: 'boardDetails',
  initialState,
  reducers: {
    addDetails: (state, action: PayloadAction<AnyAction>) => {
      state.boardSelectedIndex = action.payload.boardSelectedIndex;
    },
  },
});

export const { addDetails } = boardDetailsSlice.actions;

export default boardDetailsSlice.reducer;
