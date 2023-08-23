/**
 * Represents a user performance
 */
export default class UserPerformance {
	kind;
	value;
	userId;

	/**
	 *
	 * @param {object} performancesData user performance data
	 */
	constructor(performancesData) {
		this.kind = performancesData.kind;
		this.value = performancesData.value;
		this.userId = performancesData.userId;
	}
}
