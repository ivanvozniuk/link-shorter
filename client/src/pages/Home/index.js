import React from 'react';
import styled from '@emotion/styled';
import { useSelector } from 'react-redux';

import { Page, Centered } from '../../layout';

const Home = () => {
	const isAuthenticated = useSelector((state) => state.authorized.auth.isAuthenticated);
	const user = useSelector((state) => state.authorized.user);

	return (
		<Page>
			<Centered>
				<Container>
					{isAuthenticated ? (
						<Title>Hello, {user.login || ''}!</Title>
					) : (
						<Title>Hello, guest!</Title>
					)}
				</Container>
			</Centered>
		</Page>
	);
};

const Container = styled.div`
	display: flex;
	flex-direction: column;
	max-width: 400px;
`;
const Title = styled.h1`
	font-size: 50px;
	margin-bottom: 15px;
	text-align: center;
	font-weight: 600;
`;

export default Home;
