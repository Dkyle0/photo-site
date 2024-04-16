import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ROLE } from '../../../constants/role';
import { UserState } from '../../types/d';

const initUserState:UserState = {
	id: null,
	login: null,
	roleId: ROLE.GUEST,
	session: null,
};

export const userSlice = createSlice({
	name: 'user',
	initialState: initUserState,
	reducers: {
	  setUser(state: UserState, action: PayloadAction<object>) {
		return { ...state, ...action.payload };
	  },
	  userLogout(state: UserState) {
		return initUserState;
	  },
	},
  });
  
  export const { setUser, userLogout } = userSlice.actions;
