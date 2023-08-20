import styles from "./Welcome.module.css";

export default function Welcome({userInfo}) {
  return (
    <div className={styles.welcome}>
      <h1 className={styles.name}>
        Bonjour <span className={styles.fistname}>{styles.firstName}</span>
      </h1>
      <p className={styles.congratulations}>Félicitation ! Vous avez explosé vos objectifs hier 👏</p>
    </div>
  )
}