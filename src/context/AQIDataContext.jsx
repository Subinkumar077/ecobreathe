import { createContext, useReducer, useEffect, useContext } from 'react';
import { aqiService } from '@/services/aqiService';
import { LocationContext } from './LocationContext';
import { REFRESH_INTERVAL } from '@/utils/constants';

// Initial state
const initialState = {
  data: null,
  loading: true,
  error: null,
  lastUpdated: null
};

// Actions
const FETCH_START = 'FETCH_START';
const FETCH_SUCCESS = 'FETCH_SUCCESS';
const FETCH_ERROR = 'FETCH_ERROR';

// Reducer
const aqiReducer = (state, action) => {
  switch (action.type) {
    case FETCH_START:
      return { ...state, loading: true, error: null };
    case FETCH_SUCCESS:
      return { 
        ...state, 
        loading: false, 
        data: action.payload,
        lastUpdated: Date.now(),
        error: null 
      };
    case FETCH_ERROR:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

export const AQIDataContext = createContext();

export const AQIDataProvider = ({ children }) => {
  const [state, dispatch] = useReducer(aqiReducer, initialState);
  const { location } = useContext(LocationContext);

  const fetchData = async (silent = false) => {
    if (!silent) {
      dispatch({ type: FETCH_START });
    }
    
    try {
      const data = await aqiService.getDashboardData(location);
      dispatch({ type: FETCH_SUCCESS, payload: data });
    } catch (error) {
      dispatch({ type: FETCH_ERROR, payload: error.message || 'Failed to fetch AQI data' });
    }
  };

  // Fetch data when location changes
  useEffect(() => {
    fetchData();
  }, [location.city, location.lat, location.lng]); // Explicitly depend on location primitives

  // Auto-refresh timer
  useEffect(() => {
    const timer = setInterval(() => {
      // Silent refresh (doesn't show loading spinner)
      fetchData(true);
    }, REFRESH_INTERVAL);

    return () => clearInterval(timer);
  }, [location]);

  return (
    <AQIDataContext.Provider value={{ ...state, refreshData: () => fetchData(false) }}>
      {children}
    </AQIDataContext.Provider>
  );
};
