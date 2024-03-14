import { request } from '../utils';

export const removePostAsync = (id:number) => { request(`/portfolio/${id}`, 'DELETE', null)
return {
		type: 'REMOVE_PHOTO', 
		payload: id
	};

};
