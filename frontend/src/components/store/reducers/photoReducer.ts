import { PhotoState } from '../../types/d';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initPhotoState: PhotoState = {
	id: '',
	author: '',
	type: '',
	imageData: '',
	likes: [],
	createdAt: '',
};

export const photoSlice = createSlice({
	name: 'photo',
	initialState: initPhotoState,
	reducers: {
	  setPhotoData(state: PhotoState, action: PayloadAction<object>) {
		return { ...state, ...action.payload };
	  },
	  resetPhotoData(state: PhotoState) {
		return initPhotoState;
	  },
	},
  });
  
  export const { setPhotoData, resetPhotoData } = photoSlice.actions;
