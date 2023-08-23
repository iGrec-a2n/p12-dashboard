/**
 * Represents a user average session
 */
export default class UserAverageSession {
	day;
	dayOfWeek;
	sessionLength;
	userId;

	/**
	 *
	 * @param {object} averageSessionData user average session datas
	 */
	constructor(averageSessionData) {
		this.day = averageSessionData.day;
		this.dayOfWeek = averageSessionData.dayOfWeek;
		this.sessionLength = averageSessionData.sessionLength;
		this.userId = averageSessionData.userId;
	}
}
