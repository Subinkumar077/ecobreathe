import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { format, parseISO } from 'date-fns';
import { getAQIColor } from '@/utils';
import styles from './DailyChart.module.css';

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    return (
      <div className={styles.tooltip}>
        <p className={styles.time}>{format(parseISO(data.day), 'MMM dd, yyyy')}</p>
        <p className={styles.detail}>Avg AQI: {Math.round(data.avg)}</p>
        <p className={styles.detail}>Min AQI: {Math.round(data.min)}</p>
        <p className={styles.detail}>Max AQI: {Math.round(data.max)}</p>
      </div>
    );
  }
  return null;
};

const DailyChart = ({ forecast }) => {
  if (!forecast || !forecast.pm25 || forecast.pm25.length === 0) {
    return <div className={styles.empty}>No forecast data available</div>;
  }

  // WAQI returns arrays of daily forecast for each pollutant
  const chartData = forecast.pm25.map(item => ({
    day: item.day,
    dayLabel: format(parseISO(item.day), 'E'), // Mon, Tue, etc.
    avg: item.avg,
    min: item.min,
    max: item.max
  }));

  return (
    <div className={styles.container}>
      <h3 className={styles.title}>7-Day Forecast (PM2.5 AQI)</h3>
      <div className={styles.chartWrapper}>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--border-subtle)" vertical={false} />
            <XAxis 
              dataKey="dayLabel" 
              stroke="var(--text-tertiary)" 
              fontSize={12}
              tickLine={false}
              axisLine={false}
            />
            <YAxis 
              stroke="var(--text-tertiary)" 
              fontSize={12}
              tickLine={false}
              axisLine={false}
            />
            <Tooltip content={<CustomTooltip />} cursor={{ stroke: 'var(--border-default)' }} />
            <Line 
              type="monotone" 
              dataKey="avg" 
              stroke="var(--accent-blue)" 
              strokeWidth={3}
              dot={{ r: 4, fill: 'var(--accent-blue)', strokeWidth: 0 }}
              activeDot={{ r: 6 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default DailyChart;
