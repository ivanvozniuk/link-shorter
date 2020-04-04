import React from 'react';
import styled from '@emotion/styled';

import {
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
	Paper,
} from '@material-ui/core';
import { Link as RouterLink } from 'react-router-dom';

import { Page } from '../../layout';

const View = ({ links }) => (
	<Page>
		<TableContainer component={Paper}>
			<Table>
				<TableHead>
					<TableRow>
						<TableCell>№</TableCell>
						<TableCell>Shortened link</TableCell>
						<TableCell>Full link</TableCell>
						<TableCell>Details</TableCell>
					</TableRow>
				</TableHead>
				<TableBody>
					{links.map(({ middlewareLink, finalLink, code }, index) => (
						<TableRow key={code}>
							<TableCell component="th" scope="row">
								{index + 1}
							</TableCell>
							<TableCell>{middlewareLink}</TableCell>
							<TableCell>{finalLink}</TableCell>
							<TableCell>
								<Link to={`/links/${code}`}>Show more</Link>
							</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
		</TableContainer>
	</Page>
);

const Link = styled(RouterLink)`
	color: #3f51b5;
	text-decoration: none;
	font-weight: 600;
`;

export default View;
