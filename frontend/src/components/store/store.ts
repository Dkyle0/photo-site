import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { appSlice, photoSlice, postSlice, postsSlice, userSlice } from './reducers';

const rootReducer = combineReducers({
  app: appSlice.reducer,
  photo: photoSlice.reducer,
  post: postSlice.reducer,
  posts: postsSlice.reducer,
  user: userSlice.reducer,
});

export type RootState = ReturnType<typeof store.getState>

export const store = configureStore({
  reducer: rootReducer,
});
