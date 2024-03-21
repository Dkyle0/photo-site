import { Action } from 'redux';
import { ACTION_TYPE } from '../../actions';
import { ModalParams } from '../../types/d';


interface AppState {
	wasLogout: boolean;
	modal: {
	  isOpen: boolean;
	  text: string;
	  onConfirm: () => void;
	  onCancel: () => void;
	};
  }

  
const initAppState:AppState  = {
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
	payload: ModalParams; 
  }
  

  export function AppReducer(state: AppState = initAppState, action: AppAction): AppState {
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
