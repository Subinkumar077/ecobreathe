import PollutantCard from '../PollutantCard';
import styles from './PollutantGrid.module.css';

// The primary pollutants we want to show if available
const PRIMARY_POLLUTANTS = ['pm25', 'pm10', 'o3', 'no2', 'so2', 'co'];

const PollutantGrid = ({ pollutants }) => {
  if (!pollutants || Object.keys(pollutants).length === 0) {
    return <div className={styles.empty}>No pollutant data available</div>;
  }

  // Filter and sort to show primary pollutants first
  const availablePollutants = PRIMARY_POLLUTANTS
    .filter(p => pollutants[p])
    .map(p => ({
      id: p,
      value: pollutants[p].v
    }));

  return (
    <div className={styles.grid}>
      {availablePollutants.map(pollutant => (
        <PollutantCard 
          key={pollutant.id} 
          id={pollutant.id} 
          value={pollutant.value} 
        />
      ))}
    </div>
  );
};

export default PollutantGrid;
