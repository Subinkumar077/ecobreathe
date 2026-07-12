import { SearchBar } from '@/components/common';
import styles from './HeroSection.module.css';
import { MapPin } from 'lucide-react';
import { useGeolocation } from '@/hooks';
import { useNavigate } from 'react-router-dom';

const HeroSection = () => {
  const { requestLocation, loading } = useGeolocation();
  const navigate = useNavigate();

  const handleLocate = async () => {
    try {
      const coords = await requestLocation();
      navigate(`/dashboard/geo:${coords.lat};${coords.lng}`);
    } catch (error) {
      console.error("Location detection failed", error);
      // Fallback or error toast could go here
    }
  };

  return (
    <section className={styles.hero}>
      <div className={styles.content}>
        <h1 className={styles.title}>
          Breathe <span className={styles.highlight}>Easier</span>, Live <span className={styles.highlight}>Better</span>.
        </h1>
        <p className={styles.subtitle}>
          Check real-time air quality in your city, get health advice, and monitor pollution levels worldwide.
        </p>
        
        <div className={styles.searchBox}>
          <SearchBar size="lg" placeholder="Search any city worldwide..." />
          
          <div className={styles.divider}>
            <span>OR</span>
          </div>

          <button 
            className={styles.locateBtn} 
            onClick={handleLocate}
            disabled={loading}
          >
            <MapPin size={20} />
            {loading ? 'Detecting...' : 'Detect My Location'}
          </button>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
