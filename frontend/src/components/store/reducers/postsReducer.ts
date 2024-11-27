import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { PostsState, PostState } from '../../types/d';

const initPostsState: PostsState = {
	posts: [],
	filtredPosts: []
};

export const postsSlice = createSlice({
	name: 'posts',
	initialState: initPostsState,
	reducers: {
	  setPostsData(state: PostsState, action: PayloadAction<PostState[]>) {
		return { ...state,  posts: action.payload, filtredPosts: action.payload };
	  },
	},
});

export const { setPostsData } = postsSlice.actions;
