import styles from './App.module.css';
import { useState, useEffect } from 'react';

/* Services */
import User from './services/User';

/* Components */
import Layout from './components/Layout/Layout';
import NutrientCard from './components/NutrientCard/NutrientCard';
import ActivityChart from './components/charts/ActivityChart/ActivityChart';
import SessionsChart from './components/charts/SessionsChart/SessionsChart';
import PerformanceChart from './components/charts/PerformanceChart/PerformanceChart';
import ScoreChart from './components/charts/ScoreChart/ScoreChart';

const USER_ID = 12;

function App() {
	const [userInfo, setUserInfo] = useState();
	const [userNutrients, setUserNutrients] = useState();
	const [userActivity, setUserActivity] = useState();
	const [userAverageSessions, setUserAverageSessions] = useState();
	const [userPerformance, setUserPerformance] = useState();

	useEffect(() => {
		async function getData() {
			const user = new User(USER_ID);

			const info = await user.getInfo();
			const nutrients = await user.getNutrients();
			const activity = await user.getActivity();
			const averageSessions = await user.getAverageSessions();
			const performance = await user.getPerformance();

			setUserInfo(info);
			setUserNutrients(nutrients);
			setUserActivity(activity);
			setUserAverageSessions(averageSessions);
			setUserPerformance(performance);
		}
		getData();
	}, []);

	return (
		<div className="App">
			<Layout>
				{userInfo && (
					<header>
						<h1>
							Bonjour <strong>{userInfo.firstName}</strong>
						</h1>
						<h2>Félicitation ! Vous avez explosé vos objectifs hier 👏</h2>
					</header>
				)}
				<main>
					{userActivity && <ActivityChart data={userActivity} />}
					{userInfo && (
						<div className={styles.nutrientCards}>
							{userNutrients.map((item) => (
								<NutrientCard key={item.label} data={item} />
							))}
						</div>
					)}
					{userAverageSessions && <SessionsChart data={userAverageSessions} />}
					{userPerformance && <PerformanceChart data={userPerformance} />}
					{userInfo && <ScoreChart value={userInfo.todayScore} />}
				</main>
			</Layout>
		</div>
	);
}

export default App;
