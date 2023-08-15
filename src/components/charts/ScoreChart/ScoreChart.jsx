import PropTypes from 'prop-types';
import styled from 'styled-components';

const Background = styled.div`
  background-color: #fbfbfb;
  padding: 24px 0;
  border-radius: 5px;
  height: 263px;
  width: 100%;
  max-width: 258px;
  position: relative;
  grid-area: score;
  overflow: hidden;

  h3 {
    color: #20253a;
    font-weight: 500;
    font-size: 15px;
    line-height: 24px;
    position: absolute;
    max-width: 150px;
    left: 34px;
  }
`;

const ProgressCircle = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  border-radius: 5px;
  width: 100%;
  ascpect-ratio: 1/1;

  svg {
    position: relative;
    width: 210px;
    height: 210px;
    transform: rotate(-90deg) scale(0.73);
    background-color: #fff;
    border-radius: 50%;
    overflow: visible;
    margin-top: 2%;
  }

  svg circle {
    width: 100%;
    height: 100%;
    fill: none;
    stroke: #f0f0f0;
    stroke-width: 12;
    stroke-linecap: round;
  }

  svg circle:last-of-type {
    stroke-dasharray: 625px;
    stroke-dashoffset: calc(625px - (625px * var(--percent)) / 100);
    stroke: #f0f0f0;
  }

  :nth-child(1) svg circle:last-of-type {
    stroke: #f39c12;
  }

  :nth-child(2) svg circle:last-of-type {
    stroke: var(--color-primary);
  }
`;

const Percentage = styled.div`
  position: absolute;
  top: 52%;
  left: 50%;
  transform: translate(-50%, -50%);
  line-height: 26px;
  font-size: 16px;
  font-weight: 500;
  color: #74798c;
  display: flex;
  text-align: center;
  justify-content: center;
  max-width: 110px;

  h4 {
    position: absolute;
    text-align: center;
    font-size: 26px;
    font-weight: 700;
    color: #282d30;
  }

  span {
    display: block;
    margin-top: 30px;
  }
`;

/**
 * Component displaying the user's daily score chart.
 *
 * @example
 * const score = 12
 *
 * <ScoreChart value={score} />
 */
function ScoreChart({ value }) {
	return (
		<Background>
			<h3>Score</h3>
			<ProgressCircle>
				<div className="percent">
					<svg>
						<circle cx="105" cy="105" r="110" style={{ '--percent': -value }} />
					</svg>
					<Percentage>
						<h4>{value}%</h4>
						<span>de votre objectif</span>
					</Percentage>
				</div>
			</ProgressCircle>
		</Background>
	);
}

ScoreChart.propTypes = {
	value: PropTypes.number.isRequired,
};

export default ScoreChart;
