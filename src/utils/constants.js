// API URLs
export const WAQI_BASE_URL = 'https://api.waqi.info';
export const OWM_BASE_URL = 'https://api.openweathermap.org/data/2.5';
export const OWM_ONECALL_URL = 'https://api.openweathermap.org/data/3.0';
export const IQAIR_BASE_URL = 'https://api.airvisual.com/v2';

// Config
export const REFRESH_INTERVAL = import.meta.env.VITE_REFRESH_INTERVAL || 300000; // 5 minutes
export const DEFAULT_LOCATION = {
  city: import.meta.env.VITE_DEFAULT_CITY || 'new-delhi',
  lat: parseFloat(import.meta.env.VITE_DEFAULT_LAT || '28.6353'),
  lng: parseFloat(import.meta.env.VITE_DEFAULT_LNG || '77.2250')
};

// Breakpoints (matching CSS variables)
export const BREAKPOINTS = {
  mobile: 480,
  tablet: 768,
  desktop: 1024,
  largeDesktop: 1440
};

// AQI Categories (US EPA standard)
export const AQI_CATEGORIES = {
  GOOD: { min: 0, max: 50, label: 'Good', color: '#009966' },
  MODERATE: { min: 51, max: 100, label: 'Moderate', color: '#FFDE33' },
  POOR: { min: 101, max: 150, label: 'Poor', color: '#FF9933' },
  UNHEALTHY: { min: 151, max: 200, label: 'Unhealthy', color: '#CC0033' },
  SEVERE: { min: 201, max: 300, label: 'Severe', color: '#660099' },
  HAZARDOUS: { min: 301, max: 9999, label: 'Hazardous', color: '#7E0023' }
};
