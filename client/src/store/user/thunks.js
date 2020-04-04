import { fetch } from '../../services';
import { setUserInfo } from './actions';

export const fetchUserInfo = ({ token }) => async (dispatch) => {
	const data = await fetch(`/user/current`, { token });
	dispatch(setUserInfo(data.user));
};
