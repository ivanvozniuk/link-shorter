import { useState, useCallback } from 'react';
import isomorphicFetch from 'isomorphic-unfetch';

const useFetch = () => {
	const [loading, setLoading] = useState(false);
	const request = useCallback(async (url, method = 'GET', body = null, headers = {}) => {
		try {
			setLoading(true);

			const response = await isomorphicFetch(url, {
				method,
				body: JSON.stringify(body),
				headers: {
					'Content-Type': body ? 'application/json' : null,
					...headers,
				},
			});
			const firstData = await response.json();
			const data = { ...firstData, ok: response.ok };

			setLoading(false);

			return data;
		} catch (e) {
			setLoading(false);
		}
	}, []);

	return [loading, request];
};

export default useFetch;
