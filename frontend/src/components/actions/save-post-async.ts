import { Dispatch } from 'redux';
import { IPostData } from '../types/d';
import { request } from '../utils';
import { setPostDataAsync } from './set-post-data';

export const savePostAsync = (id: string, newPostData: IPostData) => (dispatch: Dispatch) => {
	const seveRequest = id
		? request(`/posts/${id}`, 'PATCH', newPostData)
		: request('/posts', 'POST', newPostData);

	return seveRequest.then((updatedPost) => {
		dispatch(setPostDataAsync(updatedPost.data));

		return updatedPost.data;
	});
};
