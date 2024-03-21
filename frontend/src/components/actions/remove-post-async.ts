import { request } from '../utils';

export const removePostAsync = (id:string) => () => request(`/posts/${id}`, 'DELETE');
