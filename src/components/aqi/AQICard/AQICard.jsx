import { format } from 'date-fns';
import { MapPin, Info } from 'lucide-react';
import AQIGauge from '../AQIGauge';
import { getAQICategory, getAQIDescription } from '@/utils';
import styles from './AQICard.module.css';

const AQICard = ({ aqi, stationName, timestamp }) => {
  const category = getAQICategory(aqi);
  const formattedTime = timestamp 
    ? format(new Date(timestamp), 'MMM dd, yyyy • h:mm a') 
    : 'Live Data';

  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <div className={styles.locationInfo}>
          <MapPin size={18} className={styles.icon} />
          <h2 className={styles.stationName}>{stationName || 'Unknown Station'}</h2>
        </div>
        <div className={styles.timestamp}>Last updated: {formattedTime}</div>
      </div>

      <div className={styles.content}>
        <div className={styles.gaugeWrapper}>
          <AQIGauge value={aqi} size={240} />
        </div>
        
        <div className={styles.statusInfo}>
          <div 
            className={styles.statusBadge} 
            style={{ backgroundColor: category.color }}
          >
            {category.label}
          </div>
          <p className={styles.description}>
            {getAQIDescription(aqi)}
          </p>
          <a href="#health-advice" className={styles.adviceLink}>
            <Info size={14} /> See health advice
          </a>
        </div>
      </div>
    </div>
  );
};

export default AQICard;
