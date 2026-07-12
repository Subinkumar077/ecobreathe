import { RouterProvider } from 'react-router-dom';
import routes from '@/router/routes';
import { LocationProvider, AQIDataProvider } from '@/context';
import { ErrorBoundary } from '@/components/common';

function App() {
  return (
    <ErrorBoundary>
      <LocationProvider>
        <AQIDataProvider>
          <RouterProvider router={routes} />
        </AQIDataProvider>
      </LocationProvider>
    </ErrorBoundary>
  );
}

export default App;
