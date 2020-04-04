import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

import View from './View';
import { LinkValidation } from '../../services/validation';

import { addAutoRemovableNotification } from '../../store/notifications/thunks';
import { createUserLink } from '../../store/links/thunks';

const CreateLink = ({ detectAndHandle401Status }) => {
	const [loading, setLoading] = useState(false);
	const [linkInput, setLinkInput] = useState({ error: undefined, value: '' });
	const history = useHistory();

	const linkValidation = new LinkValidation();

	const token = useSelector((state) => state.authorized.auth.token);
	const dispatch = useDispatch();

	const handleFrontValidateLink = () => {
		return linkValidation.validateLink(linkInput.value);
	};

	const handleChangeInput = (value) => {
		const { error } = linkInput;
		setLinkInput({
			error: typeof error === 'string' ? handleFrontValidateLink() : error,
			value,
		});
	};

	const handleBlurInput = () => {
		setLinkInput({
			...linkInput,
			error: handleFrontValidateLink(),
		});
	};

	const handleSubmit = async () => {
		if (loading) {
			return;
		}
		const isLinkValid = handleFrontValidateLink() === null;
		if (isLinkValid) {
			setLoading(true);
			const data = await dispatch(createUserLink({ finalLink: linkInput.value, token }));
			setLoading(false);

			if (detectAndHandle401Status(data) === true) {
				return;
			}

			if (data.status === 201) {
				dispatch(
					addAutoRemovableNotification({
						text: 'Link has been successfully created',
						type: 'success',
					}),
				);
			} else if (data.status === 200) {
				dispatch(
					addAutoRemovableNotification({
						text: 'Link is already exists. We have redirected you to it.',
						type: 'info',
					}),
				);
			}
			history.push(`/links/${data.link.code}`);
		} else {
			setLinkInput({
				...linkInput,
				error: handleFrontValidateLink(),
			});
		}
	};
	return (
		<View
			loading={loading}
			linkInput={linkInput}
			handleChangeInput={handleChangeInput}
			handleBlurInput={handleBlurInput}
			handleSubmit={handleSubmit}
		/>
	);
};

export default CreateLink;
