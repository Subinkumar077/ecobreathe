import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { format } from 'date-fns';
import { getAQIColor } from '@/utils';
import styles from './HourlyChart.module.css';

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    return (
      <div className={styles.tooltip}>
        <p className={styles.time}>{format(new Date(data.dt * 1000), 'MMM dd, h:mm a')}</p>
        <p className={styles.aqi} style={{ color: getAQIColor(data.main.aqi * 50) }}>
          AQI Proxy: {data.main.aqi}
        </p>
        <p className={styles.detail}>PM2.5: {data.components.pm2_5.toFixed(1)} µg/m³</p>
        <p className={styles.detail}>PM10: {data.components.pm10.toFixed(1)} µg/m³</p>
      </div>
    );
  }
  return null;
};

const HourlyChart = ({ history }) => {
  if (!history || history.length === 0) {
    return <div className={styles.empty}>No historical data available</div>;
  }

  // OWM history data returns an array. We'll map it for the chart.
  // Note: OWM AQI is 1-5 scale. We'll chart PM2.5 as the main indicator for variance.
  const chartData = history.map(item => ({
    ...item,
    timeLabel: format(new Date(item.dt * 1000), 'HH:mm')
  }));

  return (
    <div className={styles.container}>
      <h3 className={styles.title}>24-Hour PM2.5 Trend</h3>
      <div className={styles.chartWrapper}>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--border-subtle)" vertical={false} />
            <XAxis 
              dataKey="timeLabel" 
              stroke="var(--text-tertiary)" 
              fontSize={12}
              tickLine={false}
              axisLine={false}
              minTickGap={30}
            />
            <YAxis 
              stroke="var(--text-tertiary)" 
              fontSize={12}
              tickLine={false}
              axisLine={false}
            />
            <Tooltip content={<CustomTooltip />} cursor={{ fill: 'var(--bg-tertiary)' }} />
            <Bar dataKey="components.pm2_5" radius={[4, 4, 0, 0]}>
              {chartData.map((entry, index) => (
                <Cell 
                  key={`cell-${index}`} 
                  fill={getAQIColor(entry.main.aqi * 50)} // Rough mapping for color
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default HourlyChart;
