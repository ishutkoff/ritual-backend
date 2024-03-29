function defaultFetchOptions(options) {
	const update = { ...options }
	if (localStorage.jwt) {
		update.headers = {
			...update.headers,
			Authorization: `Bearer ${localStorage.jwt}`,
		}
	}
	return update
}

export { defaultFetchOptions }
