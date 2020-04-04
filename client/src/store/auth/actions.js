import { LOG_IN, LOG_OUT } from './types';

export const login = ({ token, userId }) => ({
	type: LOG_IN,
	payload: { token, userId },
});

export const logout = () => ({
	type: LOG_OUT,
});
