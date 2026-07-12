import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useAQIData } from '@/hooks';
import { Loader } from '@/components/common';
import { 
  AQICard, 
  WeatherStrip, 
  PollutantGrid, 
  HealthAdvice 
} from '@/components/aqi';
import { TrendChart } from '@/components/charts';
import { MiniMap } from '@/components/map';
import { MetroCityCards, CityRankingTable } from '@/components/rankings';
import styles from './Dashboard.module.css';

const Dashboard = () => {
  const params = useParams();
  const cityPath = params['*'];
  const { data, loading, error, updateLocation, refreshData } = useAQIData();

  // Update location context if URL parameter changes
  useEffect(() => {
    if (cityPath) {
      // Pass the entire path string (e.g., '@12429' or 'india/delhi/new-delhi') to the provider
      updateLocation({ city: cityPath });
    }
  }, [cityPath]); // Only run when city parameter changes

  if (loading && !data) {
    // Show full page loader on initial load
    // Later we can implement skeleton loading
    return (
      <div className={styles.loadingContainer}>
        <div className={styles.spinner}></div>
        <p>Loading Air Quality Data...</p>
      </div>
    );
  }

  if (error && !data) {
    return (
      <div className={styles.errorContainer}>
        <h2>Oops! Something went wrong.</h2>
        <p>{error}</p>
        <button onClick={refreshData} className={styles.retryBtn}>Try Again</button>
      </div>
    );
  }

  if (!data) return null;

  return (
    <div className={styles.dashboardContainer}>
      {/* Main Content Area */}
      <div className={styles.mainContent}>
        <AQICard 
          aqi={data.aqi} 
          stationName={data.station.name} 
          timestamp={data.station.time} 
        />
        
        <WeatherStrip weather={data.weather} />
        
        <section className={styles.section}>
          <h3 className={styles.sectionTitle}>Pollutant Overview</h3>
          <PollutantGrid pollutants={data.pollutants} />
        </section>

        <section className={styles.section}>
          <TrendChart 
            history={data.history} 
            forecast={data.forecast} 
          />
        </section>

        <HealthAdvice aqi={data.aqi} />
      </div>

      {/* Sidebar Area */}
      <div className={styles.sidebar}>
        <section className={styles.section}>
          <h3 className={styles.sectionTitle}>Location Map</h3>
          {/* Use coordinates from WAQI geo feed if available */}
          <MiniMap 
            lat={data.station?.geo?.[0] || 28.6353} 
            lng={data.station?.geo?.[1] || 77.2250} 
            stationName={data.station?.name}
          />
        </section>

        <MetroCityCards />
        <CityRankingTable limit={5} />
      </div>
    </div>
  );
};

export default Dashboard;
