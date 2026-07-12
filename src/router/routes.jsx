import { lazy, Suspense } from 'react';
import { createBrowserRouter } from 'react-router-dom';
import MainLayout from '@/layouts/MainLayout';
import DashboardLayout from '@/layouts/DashboardLayout';
import ProtectedRoute from '@/components/auth/ProtectedRoute';

// Lazy load pages for better performance
const Home = lazy(() => import('@/pages/Home'));
const Dashboard = lazy(() => import('@/pages/Dashboard'));
const Rankings = lazy(() => import('@/pages/Rankings'));
const MapPage = lazy(() => import('@/pages/MapPage'));
const CityDetail = lazy(() => import('@/pages/CityDetail'));
const NotFound = lazy(() => import('@/pages/NotFound'));
const AuthPage = lazy(() => import('@/pages/Auth/AuthPage'));

// Loader fallback
const PageLoader = () => (
  <div style={{ padding: '50px', textAlign: 'center', color: 'var(--text-secondary)' }}>
    Loading...
  </div>
);

const routes = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: (
          <Suspense fallback={<PageLoader />}>
            <Home />
          </Suspense>
        ),
      },
      {
        path: 'rankings',
        element: (
          <Suspense fallback={<PageLoader />}>
            <Rankings />
          </Suspense>
        ),
      },
      {
        path: 'map',
        element: (
          <Suspense fallback={<PageLoader />}>
            <MapPage />
          </Suspense>
        ),
      },
    ],
  },
  {
    path: '/auth',
    element: (
      <Suspense fallback={<PageLoader />}>
        <AuthPage />
      </Suspense>
    ),
  },
  {
    path: '/dashboard',
    element: <ProtectedRoute />,
    children: [
      {
        path: '',
        element: <DashboardLayout />,
        children: [
          {
            path: '*',
            element: (
              <Suspense fallback={<PageLoader />}>
                <Dashboard />
              </Suspense>
            ),
          },
        ]
      }
    ],
  },
  {
    path: '*',
    element: (
      <Suspense fallback={<PageLoader />}>
        <NotFound />
      </Suspense>
    ),
  },
]);

export default routes;
