import { RouterProvider } from 'react-router-dom';
import routes from '@/router/routes';
import { LocationProvider, AQIDataProvider } from '@/context';
import { AuthProvider } from '@/context/AuthContext';
import { ErrorBoundary } from '@/components/common';

function App() {
  return (
    <ErrorBoundary>
      <AuthProvider>
        <LocationProvider>
          <AQIDataProvider>
            <RouterProvider router={routes} />
          </AQIDataProvider>
        </LocationProvider>
      </AuthProvider>
    </ErrorBoundary>
  );
}

export default App;
