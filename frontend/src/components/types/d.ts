import { Action, compose } from 'redux';


declare global {
	interface Window {
	  __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
	}
}

export type ImageType = {
	id: string;
	author: string;
	likes: string[];
	type: string;
	createdAt: string;
	imageData: string;
};

export interface IPostData {
	id?: string;
	title: string;
	imageUrl: string;
	content: string;
	publishedAt?: string;
}

export interface UserState {
	id: string | null;
	login: string | null;
	roleId: number;
	session: string | null;
}
  
export interface IPostError {
	error: string;
}

export interface PhotoState {
	id: string;
	author: string;
	type: string;
	imageData: string;
	likes: string[];
	createdAt: string;
}


export interface IApp {
	wasLogout: boolean;
	modal: {
		isOpen: boolean;
		text: string;
		onConfirm: () => void;
		onCancel: () => void;
	};
}

export interface IAction extends Action {
	type: string;
	payload: any; 
  }

  export enum ACTION_TYPE {
	OPEN_MODAL = 'OPEN_MODAL',
	CLOSE_MODAL = 'CLOSE_MODAL',
  }
  
  export interface ModalParams {
	text: string;
	onConfirm: () => void;
	onCancel: () => void;
  }
