import { getAQICategory } from '@/utils';
import styles from './AQIGauge.module.css';

const AQIGauge = ({ value = 0, size = 200 }) => {
  const category = getAQICategory(value);
  
  // Cap value at 500 for the gauge calculation
  const clampedValue = Math.min(Math.max(value, 0), 500);
  
  // Calculate stroke dasharray for the semi-circle
  const strokeWidth = size * 0.1;
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * Math.PI; // Half circle
  
  // Calculate how much to fill based on a 0-500 scale
  const fillPercentage = clampedValue / 500;
  const strokeDashoffset = circumference - (fillPercentage * circumference);

  return (
    <div className={styles.gaugeContainer} style={{ width: size, height: size / 2 + 20 }}>
      <svg
        width={size}
        height={size / 2}
        viewBox={`0 0 ${size} ${size / 2}`}
        className={styles.svg}
      >
        {/* Background Arc */}
        <path
          d={`M ${strokeWidth / 2} ${size / 2} A ${radius} ${radius} 0 0 1 ${size - strokeWidth / 2} ${size / 2}`}
          fill="none"
          stroke="var(--border-subtle)"
          strokeWidth={strokeWidth}
          strokeLinecap="round"
        />
        
        {/* Foreground Arc (Value) */}
        <path
          d={`M ${strokeWidth / 2} ${size / 2} A ${radius} ${radius} 0 0 1 ${size - strokeWidth / 2} ${size / 2}`}
          fill="none"
          stroke={category.color}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          className={styles.valueArc}
        />
      </svg>
      
      <div className={styles.gaugeData}>
        <span className={styles.value} style={{ color: category.color }}>{value}</span>
        <span className={styles.label}>AQI</span>
      </div>
    </div>
  );
};

export default AQIGauge;
