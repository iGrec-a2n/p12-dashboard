import { USER_MAIN_DATA, USER_ACTIVITY, USER_AVERAGE_SESSIONS, USER_PERFORMANCE } from "../data/mocks/mockData"

/**
 * MockedService
 * @returns mocked datas : USER_ACTIVITY | USER_AVERAGE_SESSIONS | USER_PERFORMANCE | USER_MAIN_DATA
 */
export default class MockedService {
	static async fetchData(path) {
		const endPath = path.match(/\/\d+\/(?<path>[a-zA-Z-]+)/)?.groups.path;

		switch (endPath) {
			case "activity":
				return USER_ACTIVITY;
			case "average-sessions":
				return USER_AVERAGE_SESSIONS;
			case "performance":
				return USER_PERFORMANCE;
			default:
				return USER_MAIN_DATA;
		}
	}
}
