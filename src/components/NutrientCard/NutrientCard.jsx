import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Card = styled.div`
  height: 124px;
  width: 100%;
  max-width: 258px;
  padding: 32px 2.2vw 32px 2.2vw;
  background-color: #fbfbfb;
  border-radius: 5px;
  display: flex;
  align-items: center;

  img {
    width: 60px;
    height: 60px;
    margin-right: 24px;
  }

  p {
    font-size: 14px;
    font-weight: 500;
    color: #74798c;
  }

  strong {
    font-size: 20px;
    color: #000;
    line-height: 24px;
  }
`;

/**
 * Component displaying the user's nutrients cards.
 *
 * @example
 * const nutrient = {icon: "example.png", amount: 2000, unit: "kCal", label: "Calories"}
 *
 * <NutrientCard data={nutrient} />
 */
function NutrientCard({ data }) {
	const { icon, amount, unit, label } = data;
	return (
		<Card>
			<img src={icon} alt={`${label} icon`} />
			<div>
				<p>
					<strong>
						{amount}
						{unit}
					</strong>
				</p>
				<p>{label}</p>
			</div>
		</Card>
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

export default NutrientCard;
