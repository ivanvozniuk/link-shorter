import { createContext } from 'react';

const AuthContext = createContext({
	logIn: () => {},
	logOut: () => {},
	token: null,
	userId: null,
	isAuthenticated: false,
});

export default AuthContext;
