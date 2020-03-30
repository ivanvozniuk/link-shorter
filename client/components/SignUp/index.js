import React, { useState } from 'react';
import View from './View';

import { AuthValidation } from '../../validation';
import fieldsData from '../../data/sign_up/fields';
import { useFetch } from '../../services';

const Login = () => {
	const [loading, request] = useFetch();
	const transformedFieldsData = fieldsData.map((item) => ({
		...item,
		error: undefined,
		value: '',
	}));
	const [fields, setFields] = useState(transformedFieldsData);
	const authValidation = new AuthValidation();

	const handleFrontValidateInput = (name) => {
		const login = fields.find(({ name }) => name === 'login').value;
		const email = fields.find(({ name }) => name === 'email').value;
		const password = fields.find(({ name }) => name === 'password').value;
		const repeatPassword = fields.find(({ name }) => name === 'repeat-password').value;

		switch (name) {
			case 'login':
				return authValidation.validateLogin(login);
			case 'email':
				return authValidation.validateEmail(email);
			case 'password':
				return authValidation.validatePassword(password);
			case 'repeat-password':
				return authValidation.validateRepeatPassword(password, repeatPassword);
		}
	};

	const handleBackValidateInput = (errors) => {
		const { login, email, password } = errors;
		let fieldName;
		let error;

		if (login) {
			fieldName = 'login';
			error = login;
		} else if (email) {
			fieldName = 'email';
			error = email;
		} else if (password) {
			fieldName = 'password';
			error = password;
		}

		setFields(
			fields.map((field) =>
				field.name === fieldName
					? {
							...field,
							error,
					  }
					: field,
			),
		);
	};

	const handleClickSubmit = async () => {
		const isFormFieldsValid = fields.every(({ name }) => handleFrontValidateInput(name) === null);
		if (isFormFieldsValid) {
			const login = fields.find(({ name }) => name === 'login').value;
			const email = fields.find(({ name }) => name === 'email').value;
			const password = fields.find(({ name }) => name === 'password').value;

			const data = await request('/auth/register', 'POST', { login, email, password });
			console.log(data);
			if (data.errors) {
				handleBackValidateInput(data.errors);
			} else {
				console.log('valid');
			}
		} else {
			setFields(
				fields.map((field) => ({
					...field,
					error: handleFrontValidateInput(field.name),
				})),
			);
		}
	};

	return (
		<View
			fields={fields}
			authValidation={authValidation}
			setFields={setFields}
			handleValidateInput={handleFrontValidateInput}
			handleClickSubmit={handleClickSubmit}
		/>
	);
};

export default Login;
