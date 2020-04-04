import React from 'react';
import styled from '@emotion/styled';

import { TextField as TextFieldElement } from '@material-ui/core';

const Fields = ({ fields, setFields, handleValidateInput }) => {
	const handleChangeInput = (name, value, error) => {
		setFields(
			fields.map((field) =>
				field.name === name
					? {
							...field,
							value,
							error:
								typeof error === 'string' || name === 'repeat-password'
									? handleValidateInput(name)
									: error,
					  }
					: field,
			),
		);
	};

	const handleBlurInput = (name) => {
		setFields(
			fields.map((field) =>
				field.name === name
					? {
							...field,
							error: handleValidateInput(name),
					  }
					: field,
			),
		);
	};

	return (
		<>
			{fields.map(({ name, label, type, error, value }) => (
				<Row key={name}>
					<TextField
						value={value}
						label={label}
						type={type}
						error={typeof error === 'string'}
						helperText={error}
						onChange={({ target }) => handleChangeInput(name, target.value, error)}
						onBlur={() => handleBlurInput(name)}
					/>
				</Row>
			))}
		</>
	);
};

const Row = styled.div`
	width: 100%;
	display: flex;
	justify-content: center;
	margin-bottom: 15px;
	&:last-of-type {
		margin-bottom: 40px;
	}
`;
const TextField = styled(TextFieldElement)`
	max-width: 250px;
	width: 100%;
`;

export default Fields;
