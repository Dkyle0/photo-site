import { Action } from 'redux';
import { ACTION_TYPE } from '../../actions';

const initAppState = {
	wasLogout: false,
	modal: {
		isOpen: false,
		text: '',
		onConfirm: () => {},
		onCancel: () => {},
	},
};

interface AppAction extends Action {
	type: string;
	payload: any; 
  }

export function AppReducer(state = initAppState, action: AppAction) {
	switch (action.type) {
		case ACTION_TYPE.LOGOUT:
			return { ...state, wasLogout: !state.wasLogout };
		case ACTION_TYPE.OPEN_MODAL:
			return {
				...state,
				modal: {
					...state.modal,
					...action.payload,
					isOpen: true,
				},
			};
		case ACTION_TYPE.CLOSE_MODAL:
			return initAppState;
		default:
			return state;
	}
}
