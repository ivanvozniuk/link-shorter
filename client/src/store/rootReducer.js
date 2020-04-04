import { combineReducers } from 'redux';

import { authorizedReducer } from './authorizedReducer';
import { notificationsReducer } from './notifications/reducer';

import { LOG_OUT } from './auth/types';

const appReducer = combineReducers({
	authorized: authorizedReducer,
	notifications: notificationsReducer,
});

export const rootReducer = (state, action) => {
	if (action.type === LOG_OUT) {
		Object.keys(state.authorized).forEach((key) => {
			state.authorized[key] = {};
			localStorage.removeItem(key);
		});
	}

	return appReducer(state, action);
};
