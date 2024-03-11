import { ACTION_TYPE } from './type';

interface Iuser {
	id: ( number | null ),
	login: ( string | null ),
	roleId: ( number | null ),
	session: any,
};

export const setUser = (user: Iuser) => ({
	type: ACTION_TYPE.SET_USER,
	payload: user,
});
