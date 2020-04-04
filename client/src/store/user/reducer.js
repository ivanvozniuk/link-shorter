import { SET_USER_DATA } from './types';

const user = JSON.parse(localStorage.getItem('user'));

const initialState = user || {
	login: null,
	email: null,
	password: null,
};

export const userReducer = (state = initialState, action) => {
	const { type, payload } = action;
	switch (type) {
		case SET_USER_DATA: {
			const { login, email, password } = payload;
			const newState = { ...state, login, email, password };
			localStorage.setItem('user', JSON.stringify(newState));
			return newState;
		}
		default:
			return state;
	}
};
