import { useContext } from 'react';
import { AQIDataContext, LocationContext } from '@/context';

/**
 * Custom hook to easily access AQI data and location state
 */
export const useAQIData = () => {
  const dataContext = useContext(AQIDataContext);
  const locationContext = useContext(LocationContext);
  
  if (!dataContext) {
    throw new Error('useAQIData must be used within an AQIDataProvider');
  }
  
  if (!locationContext) {
    throw new Error('useAQIData must be used within a LocationProvider');
  }

  return {
    ...dataContext,
    location: locationContext.location,
    updateLocation: locationContext.updateLocation
  };
};
