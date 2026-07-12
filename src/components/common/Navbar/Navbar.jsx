import { Link } from 'react-router-dom';
import styles from './Navbar.module.css';
import { Menu } from 'lucide-react';
import SearchBar from '../SearchBar';

const Navbar = () => {
  return (
    <nav className={styles.navbar}>
      <div className={styles.navContainer}>
        <Link to="/" className={styles.logo}>
          eco<span>Breathe</span>
        </Link>
        
        <div className={styles.desktopNav}>
          <div className={styles.navLinks}>
            <Link to="/rankings">Rankings</Link>
            <Link to="/map">Map</Link>
            <span>Products</span>
            <span>Resources</span>
          </div>
          
          <div className={styles.actions}>
            <div className={styles.searchContainer}>
              <SearchBar placeholder="Search cities..." size="sm" />
            </div>
            <button className={styles.loginBtn}>Login</button>
          </div>
        </div>

        <button className={styles.mobileMenuBtn}>
          <Menu size={24} />
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
