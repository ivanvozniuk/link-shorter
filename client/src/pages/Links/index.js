import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';

import View from './View';

const Links = () => {
	const links = useSelector((state) => state.authorized.links.list);

	useEffect(() => {
		console.log(links);
	}, [links]);
	return <View links={links} />;
};

export default Links;
