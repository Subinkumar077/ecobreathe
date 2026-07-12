import { NavLink } from 'react-router-dom';
import { Home, Map as MapIcon, BarChart2 } from 'lucide-react';
import styles from './BottomNav.module.css';

const BottomNav = () => {
  return (
    <nav className={styles.bottomNav}>
      <NavLink 
        to="/" 
        className={({ isActive }) => isActive ? `${styles.navItem} ${styles.active}` : styles.navItem}
        end
      >
        <Home size={24} />
        <span>Home</span>
      </NavLink>
      
      <NavLink 
        to="/map" 
        className={({ isActive }) => isActive ? `${styles.navItem} ${styles.active}` : styles.navItem}
      >
        <MapIcon size={24} />
        <span>Map</span>
      </NavLink>
      
      <NavLink 
        to="/rankings" 
        className={({ isActive }) => isActive ? `${styles.navItem} ${styles.active}` : styles.navItem}
      >
        <BarChart2 size={24} />
        <span>Rankings</span>
      </NavLink>
    </nav>
  );
};

export default BottomNav;
