import { LOG_IN, LOG_OUT } from './types';

const authData = JSON.parse(localStorage.getItem('auth'));

const initialState = authData || {
	token: null,
	userId: null,
	isAuthenticated: false,
};

export const authReducer = (state = initialState, action) => {
	const { type, payload } = action;
	switch (type) {
		case LOG_IN: {
			const { token, userId } = payload;
			const newState = { ...state, token, userId, isAuthenticated: true };
			console.log(newState);
			localStorage.setItem('auth', JSON.stringify(newState));
			return newState;
		}
		case LOG_OUT: {
			localStorage.removeItem('auth');
			return {};
		}
		default:
			return state;
	}
};
