import React, { useState } from 'react';
import { useDispatch } from 'react-redux';

import View from './View';
import { AuthValidation } from '../../services/validation';
import fieldsData from '../../data/sign_up/fields';
import { fetch, getCurrentUserData } from '../../services';

import { login as authLogin } from '../../store/auth/actions';
import { addNotification } from '../../store/notifications/actions';

const Login = () => {
	const [loading, setLoading] = useState(false);
	const dispatch = useDispatch();
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
			default:
				return null;
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
		if (loading) {
			return;
		}
		const isFormFieldsValid = fields.every(({ name }) => handleFrontValidateInput(name) === null);
		if (isFormFieldsValid) {
			const login = fields.find(({ name }) => name === 'login').value;
			const email = fields.find(({ name }) => name === 'email').value;
			const password = fields.find(({ name }) => name === 'password').value;
			setLoading(true);
			const data = await fetch('/auth/register', {
				method: 'POST',
				body: { login, email, password },
			});
			setLoading(false);
			const { errors, token, userId } = data;
			if (errors) {
				handleBackValidateInput(errors);
			} else {
				dispatch(authLogin(token, userId));
				getCurrentUserData({ token, dispatch });
				dispatch(
					addNotification({ text: 'You have been successfully registered', type: 'success' }),
				);
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
			loading={loading}
			fields={fields}
			authValidation={authValidation}
			setFields={setFields}
			handleValidateInput={handleFrontValidateInput}
			handleClickSubmit={handleClickSubmit}
		/>
	);
};

export default Login;
