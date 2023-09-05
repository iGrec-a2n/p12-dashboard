import PropTypes from 'prop-types';
import styles from "./ActivityChart.module.css"
import {
	Bar,
	BarChart,
	CartesianGrid,
	Legend,
	ResponsiveContainer,
	Tooltip,
	XAxis,
	YAxis,
} from 'recharts';

const renderLegend = (props) => {
	const { payload } = props;

	return (
		<ul className={styles.rechartsLegendWrapper}>
			{payload.map((entry) => (
				<li key={`item-${entry.value}`} className={styles.legendItem}>{entry.value}</li>
			))}
		</ul>
	);
};

/**
 * Component displaying the user's activity chart.
 *
 * @example
 * const activityDays = [
 *   {date: "2020-07-01", day: 1, bodyweight: 80, calories: 240},
 *   {date: "2020-07-02", day: 2, bodyweight: 80, calories: 220},
 *   {date: "2020-07-03", day: 3, bodyweight: 81, calories: 280},
 *   {date: "2020-07-04", day: 4, bodyweight: 81, calories: 290},
 *   {date: "2020-07-05", day: 5, bodyweight: 80, calories: 160},
 *   {date: "2020-07-06", day: 6, bodyweight: 78, calories: 162},
 *   {date: "2020-07-07", day: 7, bodyweight: 76, calories: 390},
 * ]
 *
 * <ActivityChart data={activityDays} />
 */
function ActivityChart({ data }) {
	return (
		<div className={styles.background}>
			<h3>Activité quotidienne</h3>
			<ResponsiveContainer width="100%" height={272}>
				<BarChart barGap={8} data={data}>
					<CartesianGrid vertical={false} strokeDasharray="3 3" />
					<YAxis
						dataKey="bodyweight"
						tickLine={false}
						tickCount={3}
						orientation="right"
						yAxisId="right"
						domain={['dataMin - 2', 'dataMax + 5']}
					/>
					<YAxis
						dataKey="calories"
						tickLine={false}
						tickCount={3}
						orientation="left"
						yAxisId="left"
						domain={['dataMin - 100', 'dataMax + 20']}
						hide
					/>
					<XAxis type="category" dataKey="daily" tickLine={false} />
					<Tooltip
						cursor={{ fill: '#C4C4C4', fillOpacity: '50%' }}
						offset={20}
						contentStyle={{
							backgroundColor: 'var(--color-primary)',
							border: 'none',
							textAlign: 'center',
						}}
						wrapperStyle={{
							outline: 'none',
						}}
						itemStyle={{
							fontSize: '12px',
							color: '#fff',
							lineHeight: '24px',
						}}
						labelFormatter={() => ''}
						separator=""
						formatter={(value) => ['', value]}
						active="true"
					/>
					<Legend
						iconType="circle"
						height={50}
						align="right"
						verticalAlign="top"
						iconSize={8}
						content={renderLegend}
					/>
					<Bar
						barSize={7}
						name="Poids (kg)"
						unit="kg"
						dataKey="bodyweight"
						fill="#000"
						radius={[10, 10, 0, 0]}
						yAxisId="right"
					/>
					<Bar
						barSize={7}
						name="Calories brûlées (kCal)"
						unit="kCal"
						dataKey="calories"
						fill="var(--color-primary)"
						radius={[10, 10, 0, 0]}
						yAxisId="left"
					/>
				</BarChart>
			</ResponsiveContainer>
		</div>
	);
}

ActivityChart.propTypes = {
	data: PropTypes.arrayOf(
		PropTypes.shape({
			daily: PropTypes.number.isRequired,
			bodyweight: PropTypes.number.isRequired,
			calories: PropTypes.number.isRequired,
		})
	).isRequired,
};

export default ActivityChart;
