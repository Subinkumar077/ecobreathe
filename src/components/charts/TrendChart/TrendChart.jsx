import { useState } from 'react';
import HourlyChart from '../HourlyChart';
import DailyChart from '../DailyChart';
import styles from './TrendChart.module.css';

const TrendChart = ({ history, forecast }) => {
  const [activeTab, setActiveTab] = useState('hourly'); // 'hourly' or 'daily'

  return (
    <div className={styles.container}>
      <div className={styles.controls}>
        <button 
          className={`${styles.tab} ${activeTab === 'hourly' ? styles.active : ''}`}
          onClick={() => setActiveTab('hourly')}
        >
          24h History
        </button>
        <button 
          className={`${styles.tab} ${activeTab === 'daily' ? styles.active : ''}`}
          onClick={() => setActiveTab('daily')}
        >
          7-Day Forecast
        </button>
      </div>

      <div className={styles.chartArea}>
        {activeTab === 'hourly' ? (
          <HourlyChart history={history} />
        ) : (
          <DailyChart forecast={forecast} />
        )}
      </div>
    </div>
  );
};

export default TrendChart;
