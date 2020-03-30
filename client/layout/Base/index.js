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
	padding-top: 30px;
`;

export default BaseLayout;
