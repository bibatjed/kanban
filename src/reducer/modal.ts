import { AnyAction, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { modal } from "../constants";

// Define a type for the slice state
type ModalDetail = {
  id?: string;
};
type ModalState = {
  isOpen: boolean;
  modalType: string;
  modalDetail?: ModalDetail;
};

const { ADD_COLUMN } = modal;
// Define the initial state using that type
const initialState: ModalState = {
  isOpen: false,
  modalType: ADD_COLUMN,
};

export const counterSlice = createSlice({
  name: "modal",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    openModal: (state, action: PayloadAction<AnyAction>) => {
      state.isOpen = true;
      state.modalType = action.payload.type;
      state.modalDetail = action.payload.detail;
    },
    closeModal: (state) => {
      state.isOpen = false;
    },
  },
});

export const { closeModal, openModal } = counterSlice.actions;

// Other code such as selectors can use the imported `RootState` type
// export const selectCount = (state: RootState) => state.counterReducers.value;

export default counterSlice.reducer;
