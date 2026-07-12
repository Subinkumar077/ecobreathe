import { aqiScaleData } from '@/data';
import styles from './AQIScaleExplainer.module.css';

const AQIScaleExplainer = () => {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h2 className={styles.title}>Understanding the AQI Scale</h2>
          <p className={styles.subtitle}>
            The Air Quality Index (AQI) is a yardstick that runs from 0 to 500. The higher the AQI value, the greater the level of air pollution and the greater the health concern.
          </p>
        </div>

        <div className={styles.grid}>
          {aqiScaleData.US.map((level) => (
            <div 
              key={level.category} 
              className={styles.card}
              style={{ borderTopColor: level.color }}
            >
              <div className={styles.cardHeader}>
                <div 
                  className={styles.rangeBadge}
                  style={{ backgroundColor: level.color }}
                >
                  {level.min} - {level.max}
                </div>
                <h3 className={styles.levelName} style={{ color: level.color }}>
                  {level.category}
                </h3>
              </div>
              <p className={styles.description}>{level.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AQIScaleExplainer;
