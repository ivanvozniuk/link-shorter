import React from 'react';
import { NavLink as Link } from 'react-router-dom';

const NavLink = ({ ...props }) => {
	return <Link activeClassName="active" {...props} />;
};

export default NavLink;
