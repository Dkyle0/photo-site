import { AnyAction, Reducer } from 'redux';
import { ACTION_TYPE } from '../../actions';
import { PhotoState } from '../../types/d';

const initPhotoState: PhotoState = {
	id: '',
	author: '',
	type: '',
	imageData: '',
	likes: [],
	createdAt: '',
};

export const photoReducer:Reducer<PhotoState, AnyAction> = (state: PhotoState = initPhotoState, action) => {
	switch (action.type) {
		case ACTION_TYPE.SET_PHOTO_DATA:
			return { ...state, ...action.payload };
		case ACTION_TYPE.RESET_PHOTO_DATA:
			return initPhotoState;
		default:
			return state;
	}
}
