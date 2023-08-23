import request from './request';

/* Assets */
import CaloriesIcon from '../assets/icons/dashboard/icon_calories.svg';
import ProteinIcon from '../assets/icons/dashboard/icon_protein.svg';
import CarbsIcon from '../assets/icons/dashboard/icon_carbs.svg';
import FatIcon from '../assets/icons/dashboard/icon_fat.svg';

const BASE_URL = process.env.REACT_APP_API_URL;

/**
 * @typedef {Object} UserInfo
 * @property {string} firstName
 * @property {string} lastName
 * @property {number} age
 * @property {number} todayScore
 */

/**
 * @typedef {Object} Nutrient
 * @property {string} name
 * @property {number} amount
 * @property {unit} g
 */

/**
 * @typedef {Object} ActivityDay
 * @property {string} date
 * @property {number} dayNumber (1-7)
 * @property {number} bodyweight (kg)
 * @property {calories} kCal
 */

/**
 * @typedef {Object} AverageSession
 * @property {string} day (1st letter: L, M, M, J, V, S, or D)
 * @property {number} sessionLength
 */

/**
 * @typedef {Object} Performance
 * @property {number} value
 * @property {string} kind
 */

/**
 * Class representing a user.
 */
export default class User {
	/**
	 * Create a user.
	 * @param {number} id - The user ID
	 */
	constructor(id) {
		this.id = id;
	}

	/**
	 * Get basic user data.
	 *
	 * @returns {Promise<UserInfo>} Basic user information.
	 */
	async getInfo() {
		const response = await request(`${BASE_URL}/user/${this.id}`);
		if (!response) return null;
		const { data } = response;
		return {
			firstName: data.userInfos.firstName,
			lastName: data.userInfos.lastName,
			age: data.userInfos.age,
			todayScore: (data.score || data.todayScore) * 100,
		};
	}

	/**
	 * Get user calories & macronutrients data.
	 *
	 * @returns {Promise<Nutrient[]>} List of information about calories & macronutrients.
	 */
	async getNutrients() {
		const response = await request(`${BASE_URL}/user/${this.id}`);
		if (!response) return null;
		const { data } = response;
		return [
			{
				icon: CaloriesIcon,
				label: 'Calories',
				amount: data.keyData.calorieCount,
				unit: 'kCal',
			},
			{
				icon: ProteinIcon,
				label: 'Protéines',
				amount: data.keyData.proteinCount,
				unit: 'g',
			},
			{
				icon: CarbsIcon,
				label: 'Glucides',
				amount: data.keyData.carbohydrateCount,
				unit: 'g',
			},
			{
				icon: FatIcon,
				label: 'Lipides',
				amount: data.keyData.lipidCount,
				unit: 'g',
			},
		];
	}

	/**
	 * Get user activity data.
	 *
	 * @returns {Promise<ActivityDay[]>} List of information about user sessions.
	 */
	async getActivity() {
		const response = await request(`${BASE_URL}/user/${this.id}/activity`);
		if (!response) return null;
		const { data } = response;
		return data.sessions.map((session, i) => ({
			date: session.day,
			day: i + 1,
			bodyweight: session.kilogram,
			calories: session.calories,
		}));
	}

	/**
	 * Get user sessions data.
	 *
	 * @returns {Promise<AverageSession[]>} List of information about user sessions.
	 */
	async getAverageSessions() {
		const response = await request(
			`${BASE_URL}/user/${this.id}/average-sessions`
		);
		if (!response) return null;
		const { data } = response;
		const days = ['L', 'M', 'M', 'J', 'V', 'S', 'D'];
		return data.sessions.map((session) => ({
			day: days[session.day - 1],
			sessionDuration: session.sessionLength,
		}));
	}

	/**
	 * Get user performance data.
	 *
	 * @returns {Promise<Performance[]>} List of information about user performance.
	 */
	async getPerformance() {
		const response = await request(`${BASE_URL}/user/${this.id}/performance`);
		if (!response) return null;
		const { data } = response;

		const TRANSLATE = {
			cardio: 'Cardio',
			energy: 'Energie',
			endurance: 'Endurance',
			strength: 'Force',
			speed: 'Vitesse',
			intensity: 'Intensité',
		};

		return data.data.map((item) => ({
			value: item.value,
			kind: TRANSLATE[data.kind[item.kind]],
		}));
	}
}
