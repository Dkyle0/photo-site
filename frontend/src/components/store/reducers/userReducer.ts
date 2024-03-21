import { AnyAction, Reducer } from 'redux';
import { ROLE } from '../../../constants/role';
import { ACTION_TYPE } from '../../actions';
import { UserState } from '../../types/d';

const initUserState:UserState = {
	id: null,
	login: null,
	roleId: ROLE.GUEST,
	session: null,
};

 export const userReducer: Reducer<UserState, AnyAction> = (state = initUserState, action) => {
	switch (action.type) {
		case ACTION_TYPE.SET_USER:
			return { ...state, ...action.payload };
		case ACTION_TYPE.LOGOUT:
			return initUserState;
		default:
			return state;
	}
}
