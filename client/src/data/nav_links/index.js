export default {
	authenticated: [
		{
			name: 'Home',
			path: '/',
			exact: true,
		},
		{
			name: 'Links',
			path: '/links',
			exact: true,
		},
		{
			name: 'Create link',
			path: '/create-link',
			exact: true,
		},
	],
	not_authenticated: [
		{
			name: 'Home',
			path: '/',
			exact: true,
		},
		{
			name: 'Login',
			path: '/log-in',
			exact: true,
		},
		{
			name: 'Register',
			path: '/sign-up',
			exact: true,
		},
	],
};
