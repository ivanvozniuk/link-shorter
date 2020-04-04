import React from 'react';
import styled from '@emotion/styled';
import { useSelector, useDispatch } from 'react-redux';

import nav_links from '../../data/nav_links';
import { NavLink as NavLinkElement } from '../../elements';
import { Wrapper } from '../../layout';
import { Button } from '../../elements';

import { logout } from '../../store/auth/actions';

const Header = () => {
	const isAuthenticated = useSelector((state) => state.authorized.auth.isAuthenticated);
	const dispatch = useDispatch();

	const handleClickLogout = () => {
		dispatch(logout());
	};

	return (
		<Container>
			<Wrapper>
				<LinksContainer>
					{nav_links[isAuthenticated ? 'authenticated' : 'not_authenticated'].map(
						({ name, path, exact }) => (
							<NavLink to={path} exact={exact} key={name}>
								{name}
							</NavLink>
						),
					)}
					{isAuthenticated && (
						<LogoutButton variant="contained" color="primary" onClick={handleClickLogout}>
							Log out
						</LogoutButton>
					)}
				</LinksContainer>
			</Wrapper>
		</Container>
	);
};

const Container = styled.header`
	width: 100%;
	display: flex;
	height: 70px;
	background: #fff;
	box-shadow: ${({ theme }) => theme.shadows.default};
	display: flex;
	align-items: center;
`;
const LinksContainer = styled.div`
	width: 100%;
	display: flex;
	align-items: center;
`;
const NavLink = styled(NavLinkElement)`
	font-size: 20px;
	color: ${({ theme }) => theme.color.text_main};
	text-decoration: none;
	transition: 0.2s;
	&:not(:last-of-type) {
		margin-right: 30px;
	}
	&.active {
		color: ${({ theme }) => theme.color.main};
	}
`;
const LogoutButton = styled(Button)`
	margin-left: auto !important;
`;

export default Header;
