import { useState, useCallback } from 'react';
import { waqiApi } from '@/services/api/waqiApi';

export const useGeolocation = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const requestLocation = useCallback(() => {
    return new Promise((resolve, reject) => {
      if (!navigator.geolocation) {
        const err = new Error('Geolocation is not supported by your browser');
        setError(err.message);
        reject(err);
        return;
      }

      setLoading(true);
      setError(null);

      navigator.geolocation.getCurrentPosition(
        async (position) => {
          try {
            const { latitude, longitude } = position.coords;
            
            // Immediately resolve with coordinates
            const coords = { lat: latitude, lng: longitude };
            
            // Optionally, we could reverse geocode here via WAQI to get the exact station name
            // but for now, returning coords is enough for our location context to trigger a fetch
            setLoading(false);
            resolve(coords);
          } catch (err) {
            setError(err.message);
            setLoading(false);
            reject(err);
          }
        },
        (err) => {
          let errorMessage = 'Unable to retrieve your location';
          if (err.code === 1) errorMessage = 'Location access denied';
          if (err.code === 2) errorMessage = 'Location unavailable';
          if (err.code === 3) errorMessage = 'Location request timed out';
          
          setError(errorMessage);
          setLoading(false);
          reject(new Error(errorMessage));
        },
        { enableHighAccuracy: true, timeout: 5000, maximumAge: 0 }
      );
    });
  }, []);

  return { requestLocation, loading, error };
};
