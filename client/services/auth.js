import { useState, useCallback, useEffect } from 'react';

const storageName = 'authData';

const useAuth = () => {
	const [token, setToken] = useState(null);
	const [userId, setUserId] = useState(null);

	useEffect(() => {
		const authData = JSON.parse(localStorage.getItem(storageName));

		if (authData) {
			logIn(authData.token, authData.userId);
		}
	}, [logIn]);

	const logIn = useCallback((jwtToken, id) => {
		setToken(jwtToken);
		setUserId(id);

		localStorage.setItem(
			storageName,
			JSON.stringify({
				token: jwtToken,
				userId: id,
			}),
		);
	}, []);

	const logOut = useCallback(() => {
		setToken(null);
		setUserId(null);
		localStorage.removeItem(storageName);
	}, []);

	return { logIn, logOut, token, userId };
};

export default useAuth;
