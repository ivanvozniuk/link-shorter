const fetchWrapper = async (url, { method = 'GET', body = null, headers = {}, token } = {}) => {
	try {
		const response = await fetch(url, {
			method,
			body: method !== 'GET' ? JSON.stringify(body) : null,
			headers: {
				...(body ? { 'Content-Type': 'application/json' } : null),
				...(token ? { Authorization: `Bearer ${token}` } : null),
				...headers,
			},
		});
		const json = await response.json();
		const data = { ...json, ok: response.ok, status: response.status };
		return data;
	} catch (e) {
		console.log(e);
	}
};

export default fetchWrapper;
