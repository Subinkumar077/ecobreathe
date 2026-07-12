import { HeroSection, AQIScaleExplainer, ProductShowcase } from '@/components/home';
import styles from './Home.module.css';

const Home = () => {
  return (
    <div className={styles.homeContainer}>
      <HeroSection />
      
      <div className={styles.contentSection}>
        <AQIScaleExplainer />
        <ProductShowcase />
      </div>
    </div>
  );
};

export default Home;
