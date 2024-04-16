import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppState, ModalState } from '../../types/d';

const initAppState: AppState = {
  wasLogout: false,
  modal: {
    isOpen: false,
    text: '',
	type:'',
	id: '',
	needReload: false
  },
};

export const appSlice = createSlice({
  name: 'app',
  initialState: initAppState,
  reducers: {
    logout(state: AppState, action: PayloadAction<boolean>) {
      state.wasLogout = action.payload;
    },
    openModal(state: AppState, action: PayloadAction<ModalState>) {
      state.modal.isOpen = true;
      state.modal.text = action.payload.text;
	  state.modal.type = action.payload.type;
	  state.modal.id = action.payload.id;
    },
	startReload(state: AppState) {
		state.modal.needReload = true;
	},
	stopReload(state: AppState) {
		state.modal.needReload = false;
	},
    closeModal(state: AppState) {
		return initAppState
    },
  },
});

export const { logout, openModal, closeModal, startReload, stopReload } = appSlice.actions;
