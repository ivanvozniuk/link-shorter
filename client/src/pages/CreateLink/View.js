import React from 'react';
import styled from '@emotion/styled';

import { TextField } from '@material-ui/core';
import { Page } from '../../layout';
import { Button as ButtonElement } from '../../elements';

const View = ({
	linkInput: { value, error },
	loading,
	handleChangeInput,
	handleBlurInput,
	handleSubmit,
}) => (
	<Page>
		<div className="flex align-items-center">
			<Input
				label="Enter link"
				variant="outlined"
				value={value}
				error={typeof error === 'string'}
				helperText={error}
				onBlur={() => handleBlurInput()}
				onChange={({ target }) => handleChangeInput(target.value)}
			/>
			<Button variant="contained" color="primary" onClick={handleSubmit} loading={loading}>
				SHORT IT!
			</Button>
		</div>
	</Page>
);

const Input = styled(TextField)`
	max-width: 400px;
	width: 100% !important;
`;
const Button = styled(ButtonElement)`
	margin-left: 25px !important;
`;

export default View;
