import React from 'react';
import styled from '@emotion/styled';

const Centered = ({ ...props }) => <Container {...props} />;

const Container = styled.div`
	position: absolute;
	left: 50%;
	top: 50%;
	transform: translate(-50%, -50%);
`;

export default Centered;
