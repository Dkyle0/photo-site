import { Action, Dispatch } from 'redux';
import { ThunkAction } from 'redux-thunk';
import { AppState } from '../types/d'; 
import { PostState, IPostError } from '../types/d';
import { request } from '../utils';
import { setPostData } from '../store/reducers';

export const loadPostAsync = (postId: string): ThunkAction<Promise<PostState | IPostError>, AppState, unknown, Action> => (
    dispatch: Dispatch
): Promise<PostState | IPostError> =>
    request(`/posts/${postId}`).then((postData) => {
        if (postData.data) {
            dispatch(setPostData(postData.data));
        }

        return postData;
    });
