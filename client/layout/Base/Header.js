import React from 'react';
import styled from '@emotion/styled';

import nav_links from '../../data/nav_links';
import NavLinkElement from '../../elements/NavLink';
import { Wrapper } from '../../layout';

const Header = () => (
	<Container>
		<Wrapper>
			{nav_links.map(({ name, path }) => (
				<NavLink href={path} key={name}>
					<a>{name}</a>
				</NavLink>
			))}
		</Wrapper>
	</Container>
);

const Container = styled.header`
	width: 100%;
	display: flex;
	height: 70px;
	background: #fff;
	box-shadow: ${({ theme }) => theme.shadows.default};
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

export default Header;
