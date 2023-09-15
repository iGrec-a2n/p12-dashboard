/**
 * Represents a user
 */
export default class UserModel {
	/**
	 * Créer une nouvelle instance de User
	 * @param {object} userData - User datas object
	 */
	constructor(userData, userNutrients, userActivity, userSession, userPerformance) {
		this.id = userData.id;

		this.firstName = userData.firstName;
		this.lastName = userData.lastName;
		this.age = userData.age;

		this.score = userData.score ?? userData.todayScore;
		
		this.nutrients = userNutrients;
		this.activity = userActivity;
		this.session = userSession;
		this.performance = userPerformance;
	}

}
