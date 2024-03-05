// import { ACTION_TYPE } from '../../actions';
// import { ROLE } from '../../constants/role';

const initUserState = {
	id: null,
	login: null,
	roleId: 1,
	session: null,
};

// export function userReducer(state = initUserState, action) {
// 	switch (action.type) {
// 		case ACTION_TYPE.SET_USER:
// 			return { ...state, ...action.payload };
// 		case ACTION_TYPE.LOGOUT:
// 			return initUserState;
// 		default:
// 			return state;
// 	}
// }

export function userReducer(state = initUserState, action) {
	switch (action.type) {
		case 'aaa':
			return { ...state, ...action.payload };
		default:
			return state;
	}
}
