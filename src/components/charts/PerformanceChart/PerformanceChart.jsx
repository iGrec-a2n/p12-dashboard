import PropTypes from 'prop-types';
import styled from 'styled-components';
import {
	ResponsiveContainer,
	RadarChart,
	PolarGrid,
	PolarAngleAxis,
	PolarRadiusAxis,
	Radar,
} from 'recharts';

const Background = styled.div`
  background-color: #282d30;
  border-radius: 5px;
  padding: 27px 0;
  height: 263px;
  width: 100%;
  max-width: 258px;
  position: relative;
  overflow: visible;
  grid-area: performance;
  overflow: hidden;

  tspan {
    font-size: 12px;
    fill: #fff;
  }
`;

/**
 * Component displaying the user's performance chart.
 *
 * @example
 * const performance = [
 *   {value: 80, kind: "Cardio"},
 *   {value: 120, kind: "Energie"},
 *   {value: 140, kind: "Endurance"},
 *   {value: 50, kind: "Force"},
 *   {value: 200, kind: "Vitesse"},
 *   {value: 90, kind: "Intensité"},
 * ]
 *
 * <PerformanceChart data={performance} />
 */
function PerformanceChart({ data }) {
	return (
		<Background>
			<ResponsiveContainer width="100%" height={210}>
				<RadarChart
					startAngle={-150}
					endAngle={210}
					margin={{ top: 5, right: 35, bottom: 5, left: 35 }}
					data={data}
				>
					<PolarGrid polarRadius={[10, 20, 40, 60, 80]} radialLines={false} />
					<PolarAngleAxis orient="inner" dataKey="kind" tickLine={false} />
					<PolarRadiusAxis axisLine={false} tick={false} />
					<Radar
						isAnimationActive={false}
						dataKey="value"
						stroke="1"
						fill="var(--color-primary)"
						fillOpacity={0.7}
					/>
				</RadarChart>
			</ResponsiveContainer>
		</Background>
	);
}

PerformanceChart.propTypes = {
	data: PropTypes.arrayOf(
		PropTypes.shape({
			day: PropTypes.string,
			sessionDuration: PropTypes.number,
		})
	).isRequired,
};

export default PerformanceChart;
