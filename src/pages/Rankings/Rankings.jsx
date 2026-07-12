import { CityRankingTable } from '@/components/rankings';
import styles from './Rankings.module.css';

const Rankings = () => {
  return (
    <div className={styles.pageContainer}>
      <div className={styles.header}>
        <h1 className={styles.title}>Live City Rankings</h1>
        <p className={styles.subtitle}>
          Track real-time Air Quality Index (AQI) levels across major cities worldwide. 
          The data is continuously updated based on the nearest monitoring stations.
        </p>
      </div>

      <div className={styles.content}>
        {/* Render the table with limit=10 to avoid API rate limiting issues */}
        <CityRankingTable limit={10} />
      </div>
    </div>
  );
};

export default Rankings;
