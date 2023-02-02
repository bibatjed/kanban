import { AnyAction, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { modal } from '../constants';
import InitialStateParser from '../helper/initialStateParser';
import { RootState } from '../store';

// Define a type for the slice state
type ModalDetail = {
  id: string;
  title?: string;
};
type ModalState = {
  isOpen: boolean;
  modalType: string;
  modalDetail: ModalDetail;
};

const { ADD_COLUMN } = modal;
// Define the initial state using that type
const initialState = InitialStateParser<ModalState>('modal', {
  isOpen: false,
  modalType: ADD_COLUMN,
  modalDetail: {
    id: '',
    title: '',
  },
});

export const modalSlice = createSlice({
  name: 'modal',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    openModal: (state, action: PayloadAction<AnyAction>) => {
      state.isOpen = true;
      state.modalType = action.payload.type;
      state.modalDetail.id = action.payload.detail?.id || '';
      state.modalDetail.title = action.payload.detail?.title || '';
    },
    closeModal: (state) => {
      state.isOpen = false;
    },
  },
});

export const { closeModal, openModal } = modalSlice.actions;

// Other code such as selectors can use the imported `RootState` type
// export const selectCount = (state: RootState) => state.counterReducers.value;

export default modalSlice.reducer;
