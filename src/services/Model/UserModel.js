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

		
		// this.calorieCount = userNutrients.find(nutrient => nutrient.label === "Calories").amount;
		// this.proteinCount = userNutrients.find(nutrient => nutrient.label === "Protéines").amount;
		// this.carbohydrateCount = userNutrients.find(nutrient => nutrient.label === "Glucides").amount;
		// this.lipidCount = userNutrients.find(nutrient => nutrient.label === "Lipides").amount;
		
		this.nutrients = userNutrients;
		this.activity = userActivity;
		this.session = userSession;
		this.performance = userPerformance;
	}

}
