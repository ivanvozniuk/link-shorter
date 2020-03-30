import React from 'react';
import styled from '@emotion/styled';

const Wrapper = ({ children, fluid, ...props }) => (
	<StyledWrapper fluid={fluid} {...props}>
		{children}
	</StyledWrapper>
);

const StyledWrapper = styled.div`
	max-width: ${({ fluid }) => (fluid ? '100%' : '1250px')};
	padding: ${({ fluid }) => (fluid ? '0' : '0 15px')};
	margin: 0 auto;
	width: 100%;
`;

export default Wrapper;
