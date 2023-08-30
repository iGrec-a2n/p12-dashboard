import styles from "./Profile.module.css";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

/* Services */
import getUserProfile from "../../services/request";

/* Data */
// import User from "../../services/Model/UserModel";
// import userAverageSession from "../../data/entities/UserAverageSession"
// import userPerformance from "../../data/entities/UserPerformance"
// import userSession from "../../data/entities/UserSession"

/* Components */
import Welcome from "../../components/Welcome/Welcome";
import NutrientCard from "../../components/NutrientCard/NutrientCard";
import ActivityChart from "../../components/charts/ActivityChart/ActivityChart";
import SessionsChart from "../../components/charts/SessionsChart/SessionsChart";
import PerformanceChart from "../../components/charts/PerformanceChart/PerformanceChart";
import ScoreChart from "../../components/charts/ScoreChart/ScoreChart";

// const USER_ID = 12;

export default function Profile() {
  const { id: userID } = useParams();
  const [userInfo, setUserInfo] = useState({});
  const [userNutrients, setUserNutrients] = useState([]);
  const [userAverageSessions, setUserAverageSessions] = useState([]);
  const [userPerformance, setUserPerformance] = useState([]);
  const [userActivity, setUserActivity] = useState([]);
  // const navigate = useNavigate()

  useEffect(() => {
    async function getData() {
      
      try {
        // const findCurrentUserId = result.find(user => user.id === userID);
        // if (!findCurrentUserId) navigate('*');
        const user = await getUserProfile(userID);
        const {firstName, lastName, age, score} = user;
        setUserInfo({firstName, lastName, age, score});
        setUserNutrients(user.nutrients)
        setUserActivity(user.activity)
        setUserAverageSessions(user.session)
        setUserPerformance(user.performance)
      } catch (error) {
        console.log(error);
      }
    }
    getData();
  }, [userID]);

  return (
    <>
      <Welcome firstName={userInfo.firstName} lastName={userInfo.lastName} />
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
            {userInfo && <ScoreChart value={userInfo.score} />}
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
