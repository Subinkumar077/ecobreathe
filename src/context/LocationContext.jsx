import { createContext, useState, useEffect } from 'react';
import { DEFAULT_LOCATION } from '@/utils/constants';

export const LocationContext = createContext();

export const LocationProvider = ({ children }) => {
  const [location, setLocation] = useState(() => {
    // Try to restore from localStorage first
    const saved = localStorage.getItem('ecoBreathe_saved_location');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.warn('Failed to parse saved location');
      }
    }
    return DEFAULT_LOCATION;
  });

  // Save to localStorage whenever location changes
  useEffect(() => {
    localStorage.setItem('ecoBreathe_saved_location', JSON.stringify(location));
  }, [location]);

  const updateLocation = (newLocation) => {
    setLocation(prev => ({ ...prev, ...newLocation }));
  };

  return (
    <LocationContext.Provider value={{ location, updateLocation }}>
      {children}
    </LocationContext.Provider>
  );
};
