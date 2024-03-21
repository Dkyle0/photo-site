import { AnyAction, Reducer } from 'redux';
import { ACTION_TYPE } from '../../actions';
import { IPostData } from '../../types/d';

const initPostState: IPostData = {
	id: '',
	title: '',
	imageUrl: '',
	content: '',
	publishedAt: '',
};

export const postReducer: Reducer<IPostData, AnyAction> = (state = initPostState, action) => {
	switch (action.type) {
		case ACTION_TYPE.SET_POST_DATA:
			return { ...state, ...action.payload };
		case ACTION_TYPE.RESET_POST_DATA:
			return initPostState;
		default:
			return state;
	}
}
