import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Define a type for the slice state
type ModalState = {
  columnModal: boolean;
  taskModal: boolean;
};
// Define the initial state using that type
const initialState: ModalState = {
  columnModal: false,
  taskModal: false,
};

export const counterSlice = createSlice({
  name: "modal",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    openColumnModal: (state) => {
      state.columnModal = true;
    },
    closeColumnModal: (state) => {
      state.columnModal = false;
    },
    openTaskModal: (state) => {
      state.taskModal = true;
    },
    closeTaskModal: (state) => {
      state.taskModal = false;
    },
  },
});

export const {
  openColumnModal,
  closeColumnModal,
  closeTaskModal,
  openTaskModal,
} = counterSlice.actions;

// Other code such as selectors can use the imported `RootState` type
// export const selectCount = (state: RootState) => state.counterReducers.value;

export default counterSlice.reducer;
