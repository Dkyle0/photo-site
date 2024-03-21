import { IAction } from "../../types/d";

const initPostsState = {};

export function postsReducer(state = initPostsState, action: IAction) {
	switch (action.type) {
		case 'initTodos':
			return { ...state, posts: action.payload, filtredPosts: action.payload };
		default:
			return state;
	}
}
