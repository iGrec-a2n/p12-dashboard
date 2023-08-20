import { Link } from "react-router-dom";
import styles from "./Home.module.css";

export default function Home() {
	return (
		<div className={styles.main}>
			<div className={styles.top}>
				<h1>
					Choisissez un utilisateur 
				</h1>
			</div>
			<Link to="/user/12" className={styles.button}>
				Karl
			</Link>
			<Link to="/user/18" className={styles.button}>
				Cecilia
			</Link>
		</div>
	);
}
