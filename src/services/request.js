/**
 * Proxy function to the fetch API.
 * This function was made to abstract away fetch from the codebase.
 * If another service was to be used in the future instead like Axios,
 * only the request function alone would need to be updated.
 * @param {string} URL - API endpoint
 *
 * @returns {Promise} Promise Object
 */
export default async function request(URL) {
	try {
		const response = await fetch(URL);
		return response.json();
	} catch (err) {
		console.error(err);
		return null;
	}
}
