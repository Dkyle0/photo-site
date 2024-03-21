import { Action, Dispatch } from 'redux';
import { ThunkAction } from 'redux-thunk';
import { AppState } from '../store';
import { IPostData, IPostError } from '../types/d';
import { request } from '../utils';
import { setPostDataAsync } from './set-post-data';

export const loadPostAsync = (postId: string): ThunkAction<Promise<IPostData | IPostError>, AppState, unknown, Action> => (
    dispatch: Dispatch
): Promise<IPostData | IPostError> =>
    request(`/posts/${postId}`).then((postData) => {
        if (postData.data) {
            dispatch(setPostDataAsync(postData.data));
        }

        return postData;
    });
