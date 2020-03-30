import React from 'react';
import styled from '@emotion/styled';

import { Button as MaterialButton, CircularProgress } from '@material-ui/core';

const ButtonComponent = ({ loading, ...props }) => (
	<Button {...props}>{loading ? <Progress color="inherit" /> : props.children}</Button>
);

const Progress = styled(CircularProgress)`
	width: 24px !important;
	height: 24px !important;
`;
const Button = styled(MaterialButton)`
	max-height: 36px;
`;

export default ButtonComponent;
