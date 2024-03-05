// import { ACTION_TYPE } from '../../actions';

const initPostState = {
	id: '',
	title: '',
	imageUrl: '',
	content: '',
	publishedAt: '',
	comments: [],
};

// export function postReducer(state = initPostState, action) {
// 	switch (action.type) {
// 		case ACTION_TYPE.SET_POST_DATA:
// 			return { ...state, ...action.payload };
// 		case ACTION_TYPE.RESET_POST_DATA:
// 			return initPostState;
// 		default:
// 			return state;
// 	}
// }

export function postReducer(state = initPostState, action) {
	switch (action.type) {
		case '11':
			return { ...state, ...action.payload };
		default:
			return state;
	}
}
