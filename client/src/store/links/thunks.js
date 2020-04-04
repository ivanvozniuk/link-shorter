import { fetch } from '../../services';
import { addLink, setLinks } from './actions';

export const createUserLink = ({ finalLink, token }) => async (dispatch) => {
	const data = await fetch(`/link/create`, { method: 'POST', body: { finalLink }, token });
	if (data.status === 201) {
		dispatch(addLink(data.link));
	}
	return data;
};

export const fetchUserLinks = ({ token }) => async (dispatch) => {
	const data = await fetch(`/link/all`, { token });
	if (data.ok) {
		dispatch(setLinks({ links: data.links }));
	}
	return data;
};
