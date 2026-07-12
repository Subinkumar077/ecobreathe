import styles from './Footer.module.css';

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerGrid}>
        <div className={styles.footerColumn}>
          <h4>About AQI</h4>
          <a href="#" className={styles.footerLink}>About Us</a>
          <a href="#" className={styles.footerLink}>Contact Us</a>
          <a href="#" className={styles.footerLink}>Blog</a>
        </div>
        <div className={styles.footerColumn}>
          <h4>Air Quality</h4>
          <a href="#" className={styles.footerLink}>AQI App</a>
          <a href="#" className={styles.footerLink}>TV App</a>
          <a href="#" className={styles.footerLink}>Map</a>
          <a href="#" className={styles.footerLink}>API</a>
        </div>
        <div className={styles.footerColumn}>
          <h4>Rankings</h4>
          <a href="/rankings" className={styles.footerLink}>Live Rank</a>
          <a href="#" className={styles.footerLink}>Historic</a>
          <a href="#" className={styles.footerLink}>Country</a>
        </div>
        <div className={styles.footerColumn}>
          <h4>Location</h4>
          <a href="#" className={styles.footerLink}>Support</a>
          <p className={styles.textSmall}>info@ecobreathe.com</p>
        </div>
      </div>
      <div className={styles.legalBar}>
        <p>© {new Date().getFullYear()} ecoBreathe. All rights reserved.</p>
        <div className={styles.legalLinks}>
          <a href="#">Terms</a>
          <a href="#">Privacy</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
