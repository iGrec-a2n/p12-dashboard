import React from "react";
import { Link } from "react-router-dom";

import styles from "./Error.module.css"
import logo from "../../assets/logo/sportsee_logo.svg"

export default function Error() {
  return (
    <div className={styles.error}>
      <img className={styles.errorLogo} src={logo} alt="SportSee logo" />
      <div className={styles.errorMessage}>Oups :/ Utilisateur introuvable</div>
      <Link to="/" className={styles.errorLink}>Retourner sur la page d'accueil</Link>
    </div>
  );
}
