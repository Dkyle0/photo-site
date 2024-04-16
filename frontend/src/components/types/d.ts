import { compose } from 'redux';


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

export interface PostState {
	id?: string;
	title: string;
	imageUrl: string;
	content: string;
	publishedAt?: string;
}

export interface PostsState {
	posts: PostState[];
	filtredPosts: PostState[];
}

export interface UserState {
	id: string | null;
	login: string | null;
	roleId: number;
	session: string | null;
}

export interface PhotoState {
	id: string;
	author: string;
	type: string;
	imageData: string;
	likes: string[];
	createdAt: string;
}

export interface ModalState {
	isOpen?: boolean;
	text: string;
	type: string;
	id: string;
	needReload?: boolean;
}
export interface AppState {
	wasLogout: boolean;
	modal: ModalState
  }
  
export interface IPostError {
	error: string;
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
