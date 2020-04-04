import { SET_USER_DATA } from './types';

export const setUserInfo = ({ login, email, password }) => ({
	type: SET_USER_DATA,
	payload: { login, email, password },
});
