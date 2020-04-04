import { ADD_NOTIFICATION, REMOVE_NOTIFICATION } from './types';

const initialState = {
	list: [],
};

export const notificationsReducer = (state = initialState, action) => {
	const { type, payload } = action;
	switch (type) {
		case ADD_NOTIFICATION: {
			return { ...state, list: [...state.list, payload] };
		}
		case REMOVE_NOTIFICATION: {
			return { ...state, list: state.list.filter(({ id }) => id !== payload.id) };
		}
		default:
			return state;
	}
};
