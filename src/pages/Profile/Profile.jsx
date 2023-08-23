import styles from "./Profile.module.css";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

/* Services */
import User from "../../services/User";

/* Components */
import Welcome from "../../components/Welcome/Welcome";
import NutrientCard from "../../components/NutrientCard/NutrientCard";
import ActivityChart from "../../components/charts/ActivityChart/ActivityChart";
import SessionsChart from "../../components/charts/SessionsChart/SessionsChart";
import PerformanceChart from "../../components/charts/PerformanceChart/PerformanceChart";
import ScoreChart from "../../components/charts/ScoreChart/ScoreChart";

const USER_ID = 18;

export default function Profile() {
  const { id: userID } = useParams();
  const [userInfo, setUserInfo] = useState();
  const [userNutrients, setUserNutrients] = useState();
  const [userAverageSessions, setUserAverageSessions] = useState();
  const [userPerformance, setUserPerformance] = useState();
  const [userActivity, setUserActivity] = useState();

  useEffect(() => {
    async function getData() {
      try {
        const user = new User(userID);
        const [info, nutrients, activity, averageSessions, performance] =
          await Promise.all([
            user.getInfo(),
            user.getNutrients(),
            user.getActivity(),
            user.getAverageSessions(),
            user.getPerformance(),
          ]);
        setUserInfo(info);
        setUserNutrients(nutrients);
        setUserActivity(activity);
        setUserAverageSessions(averageSessions);
        setUserPerformance(performance);
      } catch (error) {
        console.log(error);
      }
      // const info = await user.getInfo();
      // const nutrients = await user.getNutrients();
      // const activity = await user.getActivity();
      // const averageSessions = await user.getAverageSessions();
      // const performance = await user.getPerformance();
    }
    getData();
  }, [userID]);

  return (
    <>
      <Welcome userInfo={userInfo} />
      <main className={styles.datas}>
        <div className={styles.left}>
          <div className={styles.top}>
            {userActivity && <ActivityChart data={userActivity} />}
          </div>
          <div className={styles.bottom}>
            {userAverageSessions && (
              <SessionsChart data={userAverageSessions} />
            )}
            {userPerformance && <PerformanceChart data={userPerformance} />}
            {userInfo && <ScoreChart value={userInfo.todayScore} />}
          </div>
        </div>
        <div className={styles.right}>
          {userInfo && (
            <div className={styles.nutrientCards}>
              {userNutrients.map((item) => (
                <NutrientCard key={item.label} data={item} />
              ))}
            </div>
          )}
        </div>
      </main>
    </>
  );
}
