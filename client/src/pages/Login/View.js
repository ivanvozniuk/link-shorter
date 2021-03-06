import React from 'react';
import styled from '@emotion/styled';

import { Page } from '../../layout';
import Fields from './Fields';
import { Button } from '../../elements';

const View = ({
	fields,
	setFields,
	authValidation,
	handleValidateInput,
	handleClickSubmit,
	loading,
}) => (
	<Page>
		<Container>
			<Title>Log in</Title>
			<Fields
				fields={fields}
				authValidation={authValidation}
				setFields={setFields}
				handleValidateInput={handleValidateInput}
			/>
			<Button variant="contained" color="primary" onClick={handleClickSubmit} loading={loading}>
				Log in
			</Button>
		</Container>
	</Page>
);

const Container = styled.form`
	display: flex;
	flex-direction: column;
	align-items: center;
	margin: 0 auto;
	max-width: 500px;
	width: 100%;
	padding: 20px 20px 40px;
	box-shadow: ${({ theme }) => theme.shadows.default};
	border-radius: ${({ theme }) => theme.borders.default};
`;
const Title = styled.h2`
	font-size: 28px;
	margin-bottom: 25px;
`;

export default View;
