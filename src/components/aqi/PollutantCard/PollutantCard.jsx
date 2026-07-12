import styles from './PollutantCard.module.css';
import { getAQICategory } from '@/utils';

// Approximate WHO guidelines or standard thresholds for progress bars
const POLLUTANT_THRESHOLDS = {
  pm25: 50,
  pm10: 100,
  o3: 100,
  no2: 100,
  so2: 100,
  co: 10,
};

const POLLUTANT_LABELS = {
  pm25: 'PM2.5',
  pm10: 'PM10',
  o3: 'Ozone',
  no2: 'Nitrogen Dioxide',
  so2: 'Sulfur Dioxide',
  co: 'Carbon Monoxide',
};

const PollutantCard = ({ id, value }) => {
  if (value === undefined) return null;

  // Assuming value is already an AQI sub-index from WAQI
  const category = getAQICategory(value);
  const threshold = POLLUTANT_THRESHOLDS[id] || 100;
  
  // Calculate width for progress bar (capped at 100%)
  const percentage = Math.min((value / (threshold * 2)) * 100, 100);

  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <span className={styles.label}>{POLLUTANT_LABELS[id] || id.toUpperCase()}</span>
        <span className={styles.value}>{Math.round(value)}</span>
      </div>
      
      <div className={styles.progressBarBg}>
        <div 
          className={styles.progressBarFill} 
          style={{ 
            width: `${percentage}%`,
            backgroundColor: category.color
          }} 
        />
      </div>
      
      <div className={styles.status} style={{ color: category.color }}>
        {category.label}
      </div>
    </div>
  );
};

export default PollutantCard;
