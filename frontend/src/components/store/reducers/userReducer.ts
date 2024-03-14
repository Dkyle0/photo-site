import { ROLE } from '../../../constants/role';
import { ACTION_TYPE } from '../../actions';
import { Action } from 'redux';


const initUserState = {
	id: null,
	login: null,
	roleId: ROLE.GUEST,
	session: null,
};

interface UserAction extends Action {
	type: string;
	payload: any; 
  }

export function userReducer(state = initUserState, action: UserAction) {
	switch (action.type) {
		case ACTION_TYPE.SET_USER:
			return { ...state, ...action.payload };
		case ACTION_TYPE.LOGOUT:
			return initUserState;
		default:
			return state;
	}
}
