import React from 'react';
import styled from '@emotion/styled';

import theme from '../theme';

const Fade = ({ children }) => <Container>{children}</Container>;

const Container = styled.div`
	animation: ${theme.fadeAnimation} ${theme.fadeLong};
	height: 100%;
	max-width: 100%;
`;

export default Fade;
