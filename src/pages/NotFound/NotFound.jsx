import { Link } from 'react-router-dom';
import { Home } from 'lucide-react';
import styles from './NotFound.module.css';

const NotFound = () => {
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <h1 className={styles.errorCode}>404</h1>
        <h2 className={styles.title}>Page Not Found</h2>
        <p className={styles.description}>
          Oops! The air quality data you are looking for seems to have blown away.
          Please check the URL or return to the home page.
        </p>
        <Link to="/" className={styles.homeBtn}>
          <Home size={20} />
          Return Home
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
