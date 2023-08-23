/**
 * Represents a user
 */
export default class User {
	id;

	firstName;
	lastName;
	age;

	score;

	calorieCount;
	proteinCount;
	carbohydrateCount;
	lipidCount;

	/**
	 * Créer une nouvelle instance de User
	 * @param {object} userData - User datas object
	 */
	constructor(userData) {
		this.id = userData.id;

		this.firstName = userData.userInfos.firstName;
		this.lastName = userData.userInfos.lastName;
		this.age = userData.userInfos.age;

		this.score = userData.score ?? userData.todayScore;

		this.calorieCount = userData.keyData.calorieCount;
		this.proteinCount = userData.keyData.proteinCount;
		this.carbohydrateCount = userData.keyData.carbohydrateCount;
		this.lipidCount = userData.keyData.lipidCount;
	}
}
