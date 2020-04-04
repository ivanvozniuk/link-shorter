import { ADD_LINK, REMOVE_LINK, SET_LINKS } from './types';

export const addLink = ({ middlewareLink, finalLink, code, date, clicks, owner }) => ({
	type: ADD_LINK,
	payload: { middlewareLink, finalLink, code, date, clicks, owner },
});

export const removeLink = ({ code }) => ({
	type: REMOVE_LINK,
	payload: { code },
});

export const setLinks = ({ links }) => ({
	type: SET_LINKS,
	payload: { links },
});
