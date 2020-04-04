import { combineReducers } from 'redux';

import { userReducer } from './user/reducer';
import { authReducer } from './auth/reducer';
import { linksReducer } from './links/reducer';

export const authorizedReducer = combineReducers({
	user: userReducer,
	auth: authReducer,
	links: linksReducer,
});
