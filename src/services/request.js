import UserModel from "./Model/UserModel";
import {
  USER_MAIN_DATA,
  USER_AVERAGE_SESSIONS,
  USER_PERFORMANCE,
  USER_ACTIVITY,
} from "../data/mocks/mockData";

import CaloriesIcon from "../assets/icons/dashboard/icon_calories.svg";
import ProteinIcon from "../assets/icons/dashboard/icon_protein.svg";
import CarbsIcon from "../assets/icons/dashboard/icon_carbs.svg";
import FatIcon from "../assets/icons/dashboard/icon_fat.svg";

const BASE_URL = process.env.REACT_APP_API_URL;

const IS_MOCK_DATA_ACTIVE = false;

/**
 * Proxy function to the fetch API.
 * This function was made to abstract away fetch from the codebase.
 * If another service was to be used in the future instead like Axios,
 * only the request function alone would need to be updated.
 * @param {string} URL - API endpoint
 *
 * @returns {Promise} Promise Object
 */
async function request(id, target) {
  try {
    if (IS_MOCK_DATA_ACTIVE) {
      switch (target) {
        case "/activity":
          return USER_ACTIVITY.find((data) => data.userId === id);
        case "/average-sessions":
          return USER_AVERAGE_SESSIONS.find((data) => data.userId === id);
        case "/performance":
          return USER_PERFORMANCE.find((data) => data.userId === id);
        default:
          return USER_MAIN_DATA.find((data) => data.id === id);
      }
    } else {
      const response = await fetch(`${BASE_URL}/user/${Number(id)}${target}`);
      const responseData = await response.json();
      return responseData.data;
    }
  } catch (err) {
    console.error(err);
    return null;
  }
}

/**
 * Get basic user data.
 *
 * @returns {Promise<UserInfo>} Basic user information and list of information about calories & macronutrients.
 */
async function getUserData(id) {
  const response = await request(Number(id), "");
  if (!response) return null;
  const data = response;
  return {
    id: data.id,
    firstName: data.userInfos.firstName,
    lastName: data.userInfos.lastName,
    age: data.userInfos.age,
    todayScore: (data.score || data.todayScore) * 100,
    nutrients: [
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
    ],
  };
}

/**
 * Get user activity data.
 *
 * @returns {Promise<ActivityDay[]>} List of information about user sessions.
 */
async function getUserActivity(id) {
  const response = await request(Number(id), "/activity");
  if (!response) return null;
  const data = response;
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
  const response = await request(Number(id), "/average-sessions");
  if (!response) return null;
  const data = response;
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
  const response = await request(Number(id), "/performance");
  if (!response) return null;
  const data = response;

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
  const userActivity = await getUserActivity(id);
  const userSession = await getUserAverageSessions(id);
  const userPerformance = await getUserPerformance(id);
  return new UserModel(
    userData,
    userData.nutrients,
    userActivity,
    userSession,
    userPerformance
  );
}
export default getUserProfile;
