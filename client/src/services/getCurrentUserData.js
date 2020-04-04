import { fetchUserInfo } from '../store/user/thunks';
import { fetchUserLinks } from '../store/links/thunks';

const getCurrentUserData = ({ token, dispatch }) => {
	dispatch(fetchUserInfo({ token }));
	dispatch(fetchUserLinks({ token }));
};

export default getCurrentUserData;
