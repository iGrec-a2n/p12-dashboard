import UserModel from "./Model/UserModel";

import CaloriesIcon from "../assets/icons/dashboard/icon_calories.svg";
import ProteinIcon from "../assets/icons/dashboard/icon_protein.svg";
import CarbsIcon from "../assets/icons/dashboard/icon_carbs.svg";
import FatIcon from "../assets/icons/dashboard/icon_fat.svg";

const BASE_URL = process.env.REACT_APP_API_URL;

/**
 * Proxy function to the fetch API.
 * This function was made to abstract away fetch from the codebase.
 * If another service was to be used in the future instead like Axios,
 * only the request function alone would need to be updated.
 * @param {string} URL - API endpoint
 *
 * @returns {Promise} Promise Object
 */
async function request(URL) {
  try {
    const response = await fetch(URL);
    return response.json();
  } catch (err) {
    console.error(err);
    return null;
  }
}

/**
 * Get basic user data.
 *
 * @returns {Promise<UserInfo>} Basic user information.
 */
async function getUserData(id) {
  const response = await request(`${BASE_URL}/user/${Number(id)}`);
  if (!response) return null;
  const { data } = response;
  return {
		id: data.id,
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
async function getUserNutrients(id) {
  const response = await request(`${BASE_URL}/user/${id}`);
  if (!response) return null;
  const { data } = response;
  return [
    {
      icon: CaloriesIcon,
      label: "Calories",
      amount: data.keyData.calorieCount,
      unit: "kCal",
    },
    {
      icon: ProteinIcon,
      label: "Protéines",
      amount: data.keyData.proteinCount,
      unit: "g",
    },
    {
      icon: CarbsIcon,
      label: "Glucides",
      amount: data.keyData.carbohydrateCount,
      unit: "g",
    },
    {
      icon: FatIcon,
      label: "Lipides",
      amount: data.keyData.lipidCount,
      unit: "g",
    },
  ];
}

/**
 * Get user activity data.
 *
 * @returns {Promise<ActivityDay[]>} List of information about user sessions.
 */
async function getUserActivity(id) {
  const response = await request(`${BASE_URL}/user/${id}/activity`);
  if (!response) return null;
  const { data } = response;
  return data.sessions.map((session, i) => ({
    date: session.day,
    daily: i + 1,
    bodyweight: session.kilogram,
    calories: session.calories,
  }));
}

/**
 * Get user sessions data.
 *
 * @returns {Promise<AverageSession[]>} List of information about user sessions.
 */
async function getUserAverageSessions(id) {
  const response = await request(`${BASE_URL}/user/${id}/average-sessions`);
  if (!response) return null;
  const { data } = response;
  const days = ["L", "M", "M", "J", "V", "S", "D"];
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
async function getUserPerformance(id) {
  const response = await request(`${BASE_URL}/user/${id}/performance`);
  if (!response) return null;
  const { data } = response;

  const TRANSLATE = {
    cardio: "Cardio",
    energy: "Energie",
    endurance: "Endurance",
    strength: "Force",
    speed: "Vitesse",
    intensity: "Intensité",
  };

  return data.data.map((item) => ({
    value: item.value,
    kind: TRANSLATE[data.kind[item.kind]],
  }));
}

async function getUserProfile(id) {
  const userData = await getUserData(id);
  const userNutrients = await getUserNutrients(id);
  const userActivity = await getUserActivity(id);
  const userSession = await getUserAverageSessions(id);
  const userPerformance = await getUserPerformance(id);
  return new UserModel(
    userData,
    userNutrients,
    userActivity,
    userSession,
    userPerformance
  );
}
export default getUserProfile;
