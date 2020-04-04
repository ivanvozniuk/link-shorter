import React, { useState } from 'react';
import { useDispatch } from 'react-redux';

import View from './View';
import { AuthValidation } from '../../services/validation';
import fieldsData from '../../data/log_in/fields';
import { fetch, getCurrentUserData } from '../../services';

import { login } from '../../store/auth/actions';
import { addAutoRemovableNotification } from '../../store/notifications/thunks';

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
			default:
				return null;
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
		if (loading) {
			return;
		}
		const isFormFieldsValid = fields.every(({ name }) => handleFrontValidateInput(name) === null);
		if (isFormFieldsValid) {
			const loginType = getLoginType();
			const loginEmail = fields.find(({ name }) => name === 'login-email').value;
			const password = fields.find(({ name }) => name === 'password').value;
			setLoading(true);
			const data = await fetch('/auth/login', {
				method: 'POST',
				body: { [loginType]: loginEmail, password },
			});
			setLoading(false);
			const { errors, token, userId } = data;

			if (errors) {
				handleBackValidateInput(data.errors);
			} else {
				dispatch(login({ token, userId }));
				getCurrentUserData({ token, dispatch });
				dispatch(
					addAutoRemovableNotification({
						text: 'You have been successfully logged in',
						type: 'success',
					}),
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
