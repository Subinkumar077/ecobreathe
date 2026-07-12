import { Thermometer, Droplets, Wind, CloudRain } from 'lucide-react';
import styles from './WeatherStrip.module.css';

const WeatherStrip = ({ weather }) => {
  if (!weather) return null;

  return (
    <div className={styles.weatherStrip}>
      <div className={styles.weatherItem}>
        <Thermometer className={styles.icon} size={20} />
        <div className={styles.info}>
          <span className={styles.label}>Temperature</span>
          <span className={styles.value}>{Math.round(weather.temp)}°C</span>
        </div>
      </div>
      
      <div className={styles.divider} />
      
      <div className={styles.weatherItem}>
        <Droplets className={styles.icon} size={20} />
        <div className={styles.info}>
          <span className={styles.label}>Humidity</span>
          <span className={styles.value}>{weather.humidity}%</span>
        </div>
      </div>
      
      <div className={styles.divider} />
      
      <div className={styles.weatherItem}>
        <Wind className={styles.icon} size={20} />
        <div className={styles.info}>
          <span className={styles.label}>Wind</span>
          <span className={styles.value}>{weather.windSpeed} m/s</span>
        </div>
      </div>

      <div className={styles.divider} />
      
      <div className={styles.weatherItem}>
        <CloudRain className={styles.icon} size={20} />
        <div className={styles.info}>
          <span className={styles.label}>Conditions</span>
          <span className={styles.value} style={{ textTransform: 'capitalize' }}>
            {weather.description}
          </span>
        </div>
      </div>
    </div>
  );
};

export default WeatherStrip;
