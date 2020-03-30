import React, { useState, useEffect } from 'react';
import View from './View';

import { AuthValidation } from '../../validation';
import fieldsData from '../../data/log_in/fields';
import { useFetch, useAuth } from '../../services';

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
		const loginEmail = fields.find(({ name }) => name === 'login-email').value;
		const password = fields.find(({ name }) => name === 'password').value;
		const loginType = getLoginType();

		switch (name) {
			case 'login-email':
				if (loginType === 'login') {
					return authValidation.validateLogin(loginEmail);
				} else if (loginType === 'email') {
					return authValidation.validateEmail(loginEmail);
				} else {
					return false;
				}
			case 'password':
				return authValidation.validatePassword(password);
		}
	};

	const handleBackValidateInput = (errors) => {
		const { login, password } = errors;
		let fieldName;
		let error;

		if (login) {
			fieldName = 'login-email';
			error = login;
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

	const getLoginType = () => {
		const loginEmailInputValue = fields.find(({ name }) => name === 'login-email').value;
		const loginType = loginEmailInputValue.toString().includes('@') ? 'email' : 'login';
		return loginType;
	};

	const handleClickSubmit = async () => {
		const isFormFieldsValid = fields.every(({ name }) => handleFrontValidateInput(name) === null);
		if (isFormFieldsValid) {
			const loginType = getLoginType();
			const loginEmail = fields.find(({ name }) => name === 'login-email').value;
			const password = fields.find(({ name }) => name === 'password').value;

			const data = await request('/auth/login', 'POST', { [loginType]: loginEmail, password });
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
			loading={loading}
		/>
	);
};

export default Login;
