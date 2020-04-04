import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import { PrivateRoute, PublicRoute } from '../components';
import { Links, CreateLink, LinkDetail, Home, Login, SignUp } from '../pages';

const Routes = () => {
	return (
		<Switch>
			{/* Guest and user routes */}
			<Route path="/" exact>
				<Home />
			</Route>

			{/* Guest routes */}
			<PublicRoute path="/log-in" exact>
				<Login />
			</PublicRoute>
			<PublicRoute path="/sign-up" exact>
				<SignUp />
			</PublicRoute>

			{/* User routes */}
			<PrivateRoute path="/links" exact>
				<Links />
			</PrivateRoute>
			<PrivateRoute path="/create-link" exact>
				<CreateLink />
			</PrivateRoute>
			<PrivateRoute path="/links/:id">
				<LinkDetail />
			</PrivateRoute>
			<PrivateRoute path="/" exact>
				<Home />
			</PrivateRoute>
			<Redirect to="/" />
		</Switch>
	);
};

export default Routes;
