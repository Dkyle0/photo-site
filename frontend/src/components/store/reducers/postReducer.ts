import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { PostState } from '../../types/d';

const initPostState: PostState = {
	id: '',
	title: '',
	imageUrl: '',
	content: '',
	publishedAt: '',
};

export const postSlice = createSlice({
	name: 'post',
	initialState: initPostState,
	reducers: {
	  setPostData(state: PostState, action: PayloadAction<object>) {
		return { ...state, ...action.payload };
	  },
	  resetPostData(state: PostState) {
		return initPostState;
	  },
	},
  });
  
  export const { setPostData, resetPostData } = postSlice.actions;
