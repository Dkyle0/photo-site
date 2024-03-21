import { Reducer, applyMiddleware, combineReducers, compose, createStore } from 'redux';
import { thunk } from 'redux-thunk';
import { IPostData, PhotoState, UserState } from '../types/d';
import {
	AppReducer,
	photoReducer,
	postReducer,
	postsReducer,
	userReducer,
} from './reducers';


export interface AppState {
	user: UserState;
	posts: any;
	post: IPostData;
	photo: PhotoState;
	app: any;
}


export const reducer: Reducer<AppState> = combineReducers({
	user: userReducer,
	posts: postsReducer,
	post: postReducer,
	photo: photoReducer,
	app: AppReducer,
  });

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
export const store = createStore(reducer, composeEnhancers(applyMiddleware(thunk)));
