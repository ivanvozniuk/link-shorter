import React from 'react';
import styled from '@emotion/styled';

import { Fade, Wrapper } from '../layout';

const Page = ({ children, fluid }) => (
	<Fade>
		<Wrapper>
			<Padding fluid={fluid}>{children}</Padding>
		</Wrapper>
	</Fade>
);

const Padding = styled.div`
	padding: ${({ fluid }) => (fluid ? 0 : '20px 0 40px')};
	height: 100%;
`;

export default Page;
