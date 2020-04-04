import React from 'react';
import styled from '@emotion/styled';

import Header from './Header';

const BaseLayout = ({ children }) => (
	<>
		<Header />
		<Main>{children}</Main>
	</>
);

const Main = styled.main`
	flex-grow: 1;
	padding-top: 30px;
	position: relative;
`;

export default BaseLayout;
