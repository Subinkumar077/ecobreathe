import styles from './Loader.module.css';

const Loader = ({ fullScreen = true, message = 'Loading...' }) => {
  return (
    <div className={`${styles.container} ${fullScreen ? styles.fullScreen : ''}`}>
      <div className={styles.spinner}></div>
      {message && <p className={styles.message}>{message}</p>}
    </div>
  );
};

export default Loader;
