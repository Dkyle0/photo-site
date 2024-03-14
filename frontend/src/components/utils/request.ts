export function request(url: string, method?: (string | null), data?: (object | null)) {
	return fetch(url, {
		headers: {
			'Content-Type': 'application/json',
		},
		method: method || 'GET',
		body: data ? JSON.stringify(data) : undefined,
	}).then((res) => res.json());
}
