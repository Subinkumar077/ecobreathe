import { Component } from 'react';
import { AlertTriangle, RefreshCcw } from 'lucide-react';
import styles from './ErrorBoundary.module.css';

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    // You can also log the error to an error reporting service here
    console.error("Uncaught error in ErrorBoundary:", error, errorInfo);
  }

  handleReload = () => {
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className={styles.container}>
          <div className={styles.content}>
            <AlertTriangle className={styles.icon} size={64} />
            <h2 className={styles.title}>Something went wrong</h2>
            <p className={styles.description}>
              We apologize, but an unexpected error has occurred.
            </p>
            {this.state.error && (
              <div className={styles.errorDetails}>
                <code>{this.state.error.toString()}</code>
              </div>
            )}
            <button onClick={this.handleReload} className={styles.reloadBtn}>
              <RefreshCcw size={16} />
              Reload Page
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
