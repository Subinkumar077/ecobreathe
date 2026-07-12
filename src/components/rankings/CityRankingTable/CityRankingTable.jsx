import { useEffect, useState } from 'react';
import { aqiService } from '@/services/aqiService';
import { indianCities } from '@/data';
import { getAQICategory } from '@/utils';
import styles from './CityRankingTable.module.css';
import { Link } from 'react-router-dom';

const CityRankingTable = ({ limit = 10 }) => {
  const [rankings, setRankings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRankings = async () => {
      try {
        // Shuffle cities randomly and take up to `limit` to fetch
        const citiesToFetch = Math.min(limit, indianCities.length);
        const randomCities = [...indianCities].sort(() => 0.5 - Math.random()).slice(0, citiesToFetch);
        const data = await aqiService.getRankings(randomCities);
        setRankings(data);
      } catch (error) {
        console.error('Failed to load rankings:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchRankings();
  }, [limit]);

  if (loading) {
    return <div className={styles.loading}>Loading rankings...</div>;
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h3 className={styles.title}>Top Polluted Cities</h3>
        <Link to="/rankings" className={styles.viewAll}>View All</Link>
      </div>
      
      <div className={styles.tableWrapper}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Rank</th>
              <th>City</th>
              <th>AQI</th>
            </tr>
          </thead>
          <tbody>
            {rankings.map((city, index) => {
              const category = getAQICategory(city.aqi);
              return (
                <tr key={city.name}>
                  <td className={styles.rank}>#{index + 1}</td>
                  <td>
                    <Link to={`/dashboard/${city.slug}`} className={styles.cityLink}>
                      {city.name}
                    </Link>
                  </td>
                  <td>
                    <span className={styles.aqiBadge} style={{ backgroundColor: category.color }}>
                      {city.aqi}
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CityRankingTable;
