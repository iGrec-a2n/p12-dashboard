import PropTypes from 'prop-types';
import styled from 'styled-components';
import {
	Line,
	LineChart,
	CartesianGrid,
	ResponsiveContainer,
	Tooltip,
	XAxis,
	YAxis,
	Rectangle,
} from 'recharts';

const Background = styled.div`
  background-color: var(--color-primary);
  border-radius: 5px;
  height: 263px;
  width: 100%;
  max-width: 258px;
  position: relative;
  grid-area: sessions;
  overflow: hidden;

  &::before,
  &::after {
    content: '';
    width: calc(10% - 5px);
    height: 100%;
    background-color: transparent;
    position: absolute;
    top: 0;
    z-index: 3;
  }

  &::before {
    left: 0;
  }

  &::after {
    right: 0;
  }

  h3 {
    color: #fff;
    opacity: 0.5;
    font-weight: 500;
    font-size: 15px;
    line-height: 24px;
    position: absolute;
    left: 34px;
    top: 24px;
    max-width: 150px;
    z-index: 2;
  }

  .recharts-wrapper {
    width: 100%;
  }

  .recharts-rectangle {
    transform: translateY(-5px);
    z-index: -1;
    opacity: 0.1;
  }

  .recharts-surface {
    transform: scale(1.1);
  }

  .xAxis {
    transform: translateY(-10px);
  }
`;

function CustomCursor(props) {
	const { points, width } = props; /* eslint-disable-line react/prop-types */
	const { x, y } = points[0]; /* eslint-disable-line react/prop-types */
	return (
		<Rectangle
			fill="#000"
			stroke="#000"
			x={x}
			y={y}
			width={width}
			height={263}
		/>
	);
}

/**
 * Component displaying the user's sessions chart.
 *
 * @example
 * const sessions = [
 *   {"day": 1, "sessionLength": 30},
 *   {"day": 2, "sessionLength": 23},
 *   {"day": 3, "sessionLength": 45},
 *   {"day": 4, "sessionLength": 50},
 *   {"day": 5, "sessionLength": 0},
 *   {"day": 6, "sessionLength": 0},
 *   {"day": 7, "sessionLength": 60}
 * ]
 *
 * <SessionsChart data={sessions} />
 */
function SessionsChart({ data }) {
	const modifiedData = data;
	if (modifiedData.length === 7) {
		modifiedData.unshift({ day: '', sessionDuration: data[0].sessionDuration });
		modifiedData.push({
			day: '',
			sessionDuration: data[data.length - 1].sessionDuration,
		});
	}

	return (
		<Background>
			<h3>Durée moyenne des sessions</h3>
			<ResponsiveContainer width="100%">
				<LineChart data={data}>
					<CartesianGrid vertical={false} horizontal={false} />
					<YAxis
						dataKey="sessionDuration"
						tickLine={false}
						tickCount={3}
						orientation="right"
						domain={['dataMin - 20', 'dataMax + 50']}
						width={0}
					/>
					<XAxis
						style={{ fill: '#fff', opacity: '.5', fontSize: '12px' }}
						type="category"
						dataKey="day"
						tickLine={false}
						axisLine={false}
					/>
					<Tooltip
						offset={10}
						contentStyle={{
							backgroundColor: '#fff',
							border: 'none',
							textAlign: 'center',
						}}
						wrapperStyle={{
							outline: 'none',
						}}
						itemStyle={{
							fontSize: '12px',
							fontWeight: '500',
							color: '#000',
							lineHeight: '0',
						}}
						labelFormatter={() => ''}
						separator=""
						formatter={(value) => ['', value]}
						cursor={<CustomCursor />}
					/>
					<defs>
						<linearGradient id="linear" x1="0%" y1="0%" x2="100%" y2="0%">
							<stop offset="0%" stopColor="rgba(255,255,255,30%)" />
							<stop offset="100%" stopColor="rgba(255,255,255,100%)" />
						</linearGradient>
					</defs>
					<Line
						style={{ stroke: 'url(#linear)' }}
						dot={false}
						activeDot={{
							fill: '#fff',
							strokeWidth: '5px',
							stroke: 'rgba(255,255,255,.2)',
						}}
						dataKey="sessionDuration"
						strokeWidth={2}
						type="natural"
						unit="min"
						radius={[10, 10, 0, 0]}
					/>
				</LineChart>
			</ResponsiveContainer>
		</Background>
	);
}

SessionsChart.propTypes = {
	data: PropTypes.arrayOf(
		PropTypes.shape({
			day: PropTypes.string.isRequired,
			sessionDuration: PropTypes.number.isRequired,
		})
	).isRequired,
};

export default SessionsChart;
