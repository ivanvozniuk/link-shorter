import { addNotification, removeNotification } from './actions';

export const addAutoRemovableNotification = ({ text, type, seconds = 6 }) => (dispatch) => {
	const milliseconds = seconds * 1000;

	const addNotificationObject = addNotification({ text, type });
	dispatch(addNotificationObject);

	setTimeout(() => {
		dispatch(removeNotification({ id: addNotificationObject.payload.id }));
	}, milliseconds);
};
