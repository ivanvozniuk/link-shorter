import React from 'react';
import styled from '@emotion/styled';
import { useSelector, useDispatch } from 'react-redux';

import { Alert as MuiAlert } from '@material-ui/lab';
import theme from '../theme';

import { removeNotification } from '../store/notifications/actions';

const Notifications = () => {
	const notifications = useSelector((state) => state.notifications.list);
	const dispatch = useDispatch();

	const handleClose = (id) => {
		dispatch(removeNotification({ id }));
	};

	return (
		<Container>
			{notifications.map(({ text, type, id }) => (
				<Alert
					key={id}
					variant="filled"
					elevation={8}
					severity={type}
					onClose={() => handleClose(id)}
				>
					{text}
				</Alert>
			))}
		</Container>
	);
};

const Container = styled.div`
	display: flex;
	flex-direction: column;
	position: fixed;
	right: 20px;
	top: 20px;
	max-width: 420px;
	z-index: 10;
`;
const Alert = styled(MuiAlert)`
	margin-bottom: 15px;
	box-shadow: 0 0 18px #ccc;
	animation: ${theme.slideAnimation} ${theme.fadeMedium} ease;
`;

export default Notifications;
