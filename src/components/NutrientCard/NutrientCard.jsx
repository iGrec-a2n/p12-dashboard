import React from 'react';
import PropTypes from 'prop-types';
import styles from './NutrientCard.module.css';


/**
 * Component displaying the user's nutrients cards.
 *
 * @example
 * const nutrient = {icon: "example.png", amount: 2000, unit: "kCal", label: "Calories"}
 *
 * <NutrientCard data={nutrient} />
 */
export default function NutrientCard({ data }) {
	const { icon, amount, unit, label } = data;
	return (
		<div className={styles.Card}>
			<img className={styles.icon} src={icon} alt={`${label} icon`} />
			<div>
				<p>
					<strong>
						{amount}
						{unit}
					</strong>
				</p>
				<p>{label}</p>
			</div>
		</div>
	);
}

NutrientCard.propTypes = {
	data: PropTypes.shape({
		icon: PropTypes.string.isRequired,
		amount: PropTypes.number.isRequired,
		unit: PropTypes.string.isRequired,
		label: PropTypes.string.isRequired,
	}).isRequired,
};

