import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { modal } from '../constants';
import InitialStateParser from '../helper/initialStateParser';

// Define a type for the slice state
type ModalDetail = {
  id: string;
  title?: string;
};
type ModalState = {
  isOpen: boolean;
  mountModal: boolean;
  modalType: string;
  modalDetail: ModalDetail;
};

const { ADD_COLUMN } = modal;
// Define the initial state using that type
const initialState = InitialStateParser<ModalState>('modal', {
  isOpen: false,
  mountModal: false,
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
    openModal: (state, action: PayloadAction<{ detail?: ModalDetail, type: string }>) => {
      state.isOpen = true;
      state.mountModal = true;
      state.modalType = action.payload.type;
      state.modalDetail.id = action.payload.detail?.id || '';
      state.modalDetail.title = action.payload.detail?.title || '';
    },
    closeModal: (state) => {
      state.isOpen = false;
    },
    unMountModal: (state) => {
      state.isOpen = false;
      state.mountModal = false;
    },
  },
});

export const { closeModal, openModal, unMountModal } = modalSlice.actions;

// Other code such as selectors can use the imported `RootState` type
// export const selectCount = (state: RootState) => state.counterReducers.value;

export default modalSlice.reducer;
