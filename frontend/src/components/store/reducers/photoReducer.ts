import { Action } from 'redux';
import { ACTION_TYPE } from '../../actions';

const initPhotoState = {
	id: '',
	author: '',
	type: '',
	imageData: '',
	likes: [],
	createdAt: '',
};

interface PhotoAction extends Action {
	type: string;
	payload: any; 
  }


export function photoReducer(state = initPhotoState, action:PhotoAction) {
	switch (action.type) {
		case ACTION_TYPE.ADD_LIKE:
			return { ...state, comments: [...state.likes, action.payload] };
		case ACTION_TYPE.SET_PHOTO_DATA:
			return { ...state, ...action.payload };
		case ACTION_TYPE.RESET_PHOTO_DATA:
			return initPhotoState;
		default:
			return state;
	}
}
