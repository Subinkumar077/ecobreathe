import { useEffect, useState } from 'react';
import { aqiService } from '@/services/aqiService';
import { metroCities } from '@/data';
import { getAQICategory } from '@/utils';
import styles from './MetroCityCards.module.css';

const MetroCityCards = () => {
  const [citiesData, setCitiesData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMetros = async () => {
      try {
        const data = await aqiService.getRankings(metroCities);
        // Take top 4 for the small cards
        setCitiesData(data.slice(0, 4));
      } catch (error) {
        console.error('Failed to load metro cities:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchMetros();
  }, []);

  if (loading) {
    return <div className={styles.loading}>Loading metro cities...</div>;
  }

  return (
    <div className={styles.container}>
      <h3 className={styles.title}>Major Metros</h3>
      <div className={styles.grid}>
        {citiesData.map(city => {
          const category = getAQICategory(city.aqi);
          return (
            <div key={city.name} className={styles.card}>
              <div className={styles.header}>
                <span className={styles.name}>{city.name}</span>
                <span className={styles.aqi} style={{ color: category.color }}>{city.aqi}</span>
              </div>
              <div className={styles.footer}>
                <span className={styles.status} style={{ backgroundColor: category.color }}>
                  {category.label}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default MetroCityCards;
