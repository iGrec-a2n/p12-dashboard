import styles from "./Welcome.module.css";
import PropTypes from "prop-types"

export default function Welcome({userInfo}) {
  const defaultInfo = 'user';
  return (
    <div className={styles.welcome}>
      <h1 className={styles.name}>
        Bonjour <span className={styles.firstname}>{userInfo?userInfo.firstName:defaultInfo}</span>
      </h1>
      <p className={styles.congratulations}>Félicitation ! Vous avez explosé vos objectifs hier 👏</p>
    </div>
  )
}

Welcome.propTypes = {
  userInfo: PropTypes.object.isRequired,
}