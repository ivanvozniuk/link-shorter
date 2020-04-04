import { ADD_LINK, REMOVE_LINK, SET_LINKS } from './types';

const linksData = JSON.parse(localStorage.getItem('links'));

const initialState = linksData || { list: [] };

export const linksReducer = (state = initialState, action) => {
	const { type, payload } = action;
	switch (type) {
		case ADD_LINK: {
			const newState = { ...state, list: [...state.list, payload] };
			localStorage.setItem('links', JSON.stringify(newState));
			return newState;
		}
		case REMOVE_LINK: {
			const newState = {
				...state,
				list: state.list.filter(({ code }) => code !== payload.code),
			};
			localStorage.setItem('links', JSON.stringify(newState));
			return newState;
		}
		case SET_LINKS: {
			const newState = {
				...state,
				list: payload.links,
			};
			localStorage.setItem('links', JSON.stringify(newState));
			return newState;
		}
		default:
			return state;
	}
};
