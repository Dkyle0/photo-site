import { request } from '../utils';
import { ACTION_TYPE } from './type';

export const logout = () => {
	request('/logout', 'POST', null);

	return {
		type: ACTION_TYPE.LOGOUT,
	};
};
