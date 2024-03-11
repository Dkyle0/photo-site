import { request } from '../utils';

export const removePostAsync = (id:number) => () => request(`/posts/${id}`, 'DELETE', null);
