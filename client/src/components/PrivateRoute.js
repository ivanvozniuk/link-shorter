import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import { logout } from '../store/auth/actions';
import { addAutoRemovableNotification } from '../store/notifications/thunks';

const PrivateRoute = ({ children, ...props }) => {
	const dispatch = useDispatch();

	const isAuthenticated = useSelector((state) => state.authorized.auth.isAuthenticated);

	const detectAndHandle401Status = (data) => {
		if (data.status !== 401) {
			return false;
		}
		dispatch(logout());

		let notificationMessage;
		switch (data.error) {
			case 'jwt expired':
				notificationMessage = 'Your session has expired. Please log in again';
				break;
			default:
				notificationMessage = 'Authorization error. Please log in again.';
		}
		dispatch(addAutoRemovableNotification({ text: notificationMessage, type: 'error' }));

		return true;
	};

	return (
		<>
			{isAuthenticated ? (
				<Route>{React.cloneElement(children, { detectAndHandle401Status, ...props })}</Route>
			) : (
				<Redirect to="/log-in" />
			)}
		</>
	);
};

export default PrivateRoute;
