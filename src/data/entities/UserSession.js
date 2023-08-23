/**
 * Represents a user session
 */
export default class UserSession {
	day;
	kilogram;
	calories;
	userId;

	/**
	 *
	 * @param {object} sessionData user session data
	 */
	constructor(sessionData) {
		this.day = new Date(sessionData.day);
		this.kilogram = sessionData.kilogram;
		this.calories = sessionData.calories;
		this.userId = sessionData.userId;
	}
}
