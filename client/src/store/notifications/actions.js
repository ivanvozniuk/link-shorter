import { ADD_NOTIFICATION, REMOVE_NOTIFICATION } from './types';

export const addNotification = ({ text, type }) => ({
	type: ADD_NOTIFICATION,
	payload: { text, type, id: Date.now() },
});

export const removeNotification = ({ id }) => ({
	type: REMOVE_NOTIFICATION,
	payload: { id },
});
