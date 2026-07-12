import { Activity, Heart, ShieldAlert, Thermometer, Wind } from 'lucide-react';
import { getAQICategory } from '@/utils';
import { healthData } from '@/data';
import styles from './HealthAdvice.module.css';

// Map specific health conditions to icons
const getIconForCondition = (id) => {
  switch (id) {
    case 'asthma': return <Wind size={24} />;
    case 'heart': return <Heart size={24} />;
    case 'allergies': return <ShieldAlert size={24} />;
    case 'sinus': return <Thermometer size={24} />;
    default: return <Activity size={24} />;
  }
};

const HealthAdvice = ({ aqi }) => {
  if (typeof aqi !== 'number') return null;

  const category = getAQICategory(aqi);

  // Filter advice based on current AQI threshold
  // Only show advice where the AQI is greater than the condition's threshold
  const applicableAdvice = healthData.filter(condition => aqi >= condition.threshold);

  if (applicableAdvice.length === 0) {
    return (
      <div className={styles.container}>
        <h3 className={styles.title}>Health Recommendations</h3>
        <div className={styles.goodAir}>
          <div className={styles.goodIcon} style={{ backgroundColor: category.color }}>
            <Activity size={32} color="#fff" />
          </div>
          <div>
            <h4 style={{ color: category.color }}>Air Quality is Good!</h4>
            <p>Perfect day for outdoor activities. Enjoy the fresh air.</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.container} id="health-advice">
      <div className={styles.header}>
        <h3 className={styles.title}>Health Recommendations</h3>
        <span className={styles.badge} style={{ backgroundColor: category.color }}>
          {category.label} Risk
        </span>
      </div>
      
      <div className={styles.adviceGrid}>
        {applicableAdvice.map((condition) => (
          <div key={condition.id} className={styles.adviceCard}>
            <div className={styles.cardHeader}>
              <div className={styles.iconWrapper}>
                {getIconForCondition(condition.id)}
              </div>
              <h4>{condition.name}</h4>
            </div>
            
            <div className={styles.lists}>
              <div className={styles.dos}>
                <h5>Do's</h5>
                <ul>
                  {condition.dos.map((item, idx) => (
                    <li key={idx}>{item}</li>
                  ))}
                </ul>
              </div>
              <div className={styles.donts}>
                <h5>Don'ts</h5>
                <ul>
                  {condition.donts.map((item, idx) => (
                    <li key={idx}>{item}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HealthAdvice;
