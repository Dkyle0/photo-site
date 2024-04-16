import { PostState } from '../types/d';
import { ACTION_TYPE } from './type';

export const setPostDataAsync = (postData: PostState) => ({
	type: ACTION_TYPE.SET_POST_DATA,
	payload: postData,
});
