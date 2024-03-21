import { IPostData } from '../types/d';
import { ACTION_TYPE } from './type';

export const setPostDataAsync = (postData: IPostData) => ({
	type: ACTION_TYPE.SET_POST_DATA,
	payload: postData,
});
