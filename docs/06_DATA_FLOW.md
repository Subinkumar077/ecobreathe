# 06 — Data Flow

This document explains the complete data flow architecture: how data moves from external APIs to the user's screen, including state management, error handling, loading states, and caching.

---

## Architecture Overview

```
┌─────────────────────────────────────────────────────────────────┐
│                        USER INTERACTION                         │
│  (Page load, search, navigation, refresh)                       │
└───────────────────────────────┬─────────────────────────────────┘
                                │
                                ▼
┌─────────────────────────────────────────────────────────────────┐
│                     COMPONENT LAYER                             │
│  Pages & Components that render UI                              │
│  • Read state from Context                                      │
│  • Dispatch actions to update state                             │
│  • Render loading/error/data states                             │
└───────────────────────────────┬─────────────────────────────────┘
                                │
                    (useContext / custom hooks)
                                │
                                ▼
┌─────────────────────────────────────────────────────────────────┐
│                   CONTEXT / STATE LAYER                         │
│  React Context + useReducer                                     │
│  • LocationContext (user location, search state)                │
│  • AQIDataContext (AQI data, loading, errors)                   │
│  Dispatches actions → calls services                            │
└───────────────────────────────┬─────────────────────────────────┘
                                │
                    (async service calls)
                                │
                                ▼
┌─────────────────────────────────────────────────────────────────┐
│                    SERVICE LAYER                                │
│  Business logic & data transformation                           │
│  • aqiService.js — merges WAQI + OWM data                      │
│  • weatherService.js — processes weather data                   │
│  • locationService.js — geolocation + geocoding                 │
│  • searchService.js — city/state search logic                   │
└───────────────────────────────┬─────────────────────────────────┘
                                │
                    (axios requests with caching)
                                │
                                ▼
┌─────────────────────────────────────────────────────────────────┐
│                    API CLIENT LAYER                              │
│  Axios instances with interceptors                              │
│  • Request interceptors (add API keys, headers)                 │
│  • Response interceptors (error normalization)                  │
│  • Cache check before sending request                           │
└───────────────────────────────┬─────────────────────────────────┘
                                │
                    (HTTP GET requests)
                                │
                                ▼
┌─────────────────────────────────────────────────────────────────┐
│                   CACHE LAYER                                   │
│  In-memory cache with TTL                                       │
│  • Check cache before API call                                  │
│  • Store response with timestamp                                │
│  • Evict expired entries                                        │
│  • Persist last-known data in localStorage                      │
└───────────────────────────────┬─────────────────────────────────┘
                                │
                   (if cache miss → network)
                                │
                                ▼
┌─────────────────────────────────────────────────────────────────┐
│                  EXTERNAL APIs                                  │
│  • WAQI API (AQI, pollutants, search, map)                     │
│  • OpenWeatherMap (weather, historical, forecast)               │
│  • IQAir (fallback: city lists, nearest)                        │
└─────────────────────────────────────────────────────────────────┘
```

---

## State Management

### Why React Context + useReducer?

The application has relatively simple global state needs:
1. **User location** (detected or searched) — shared across all pages
2. **Current AQI data** — used by dashboard components
3. **Search state** — query and suggestions

This doesn't justify Redux/Zustand overhead. React Context with `useReducer` provides:
- Predictable state transitions via reducer pattern
- Built-in with React (no extra dependency)
- Clear action → state change mapping
- Easy debugging with action logging

---

### LocationContext

**File**: `src/context/LocationContext.jsx`

**Purpose**: Manages user location state — how the app knows which city to display.

#### State Shape

```javascript
const initialState = {
  // Current location
  location: {
    city: 'New Delhi',
    state: 'Delhi',
    country: 'India',
    lat: 28.6353,
    lng: 77.2250,
    slug: 'india/delhi/new-delhi',
  },
  
  // Detection method
  source: 'default',  // 'geolocation' | 'search' | 'ip' | 'default'
  
  // Geolocation state
  geoPermission: 'prompt',  // 'prompt' | 'granted' | 'denied'
  isDetecting: false,
  detectionError: null,
};
```

#### Actions

```javascript
const locationReducer = (state, action) => {
  switch (action.type) {
    case 'SET_LOCATION':
      return { ...state, location: action.payload, source: action.source };
    
    case 'DETECTION_START':
      return { ...state, isDetecting: true, detectionError: null };
    
    case 'DETECTION_SUCCESS':
      return { 
        ...state, 
        location: action.payload, 
        source: 'geolocation',
        isDetecting: false,
        geoPermission: 'granted',
      };
    
    case 'DETECTION_FAILURE':
      return { 
        ...state, 
        isDetecting: false, 
        detectionError: action.error,
        geoPermission: 'denied',
      };
    
    case 'SET_GEO_PERMISSION':
      return { ...state, geoPermission: action.payload };
    
    default:
      return state;
  }
};
```

#### Flow: Location Detection

```
App Mount
    │
    ▼
LocationProvider
    │
    ├─── Check localStorage for saved location
    │    ├── Found → SET_LOCATION (source: 'cached')
    │    └── Not found → continue
    │
    ├─── Request browser geolocation
    │    ├── DETECTION_START
    │    ├── Permission granted
    │    │   ├── Get coordinates
    │    │   ├── Reverse geocode (WAQI geo feed)
    │    │   ├── DETECTION_SUCCESS
    │    │   └── Save to localStorage
    │    │
    │    └── Permission denied
    │        ├── DETECTION_FAILURE
    │        └── Fall back to default (New Delhi)
    │
    └─── Expose: { location, setLocation, isDetecting }
```

---

### AQIDataContext

**File**: `src/context/AQIDataContext.jsx`

**Purpose**: Manages AQI data fetching, caching, and refresh cycles.

#### State Shape

```javascript
const initialState = {
  // Current city AQI data
  currentData: null,        // Normalized AQI object (see 05_API_RESEARCH.md)
  
  // Loading states
  isLoading: false,
  isRefreshing: false,      // Background refresh (no skeleton)
  
  // Error state
  error: null,              // { message, code, canRetry }
  
  // Additional data
  metroCitiesData: [],      // Array of metro city AQI data
  rankingData: [],          // Top polluted cities
  historicalData: null,     // Historical chart data
  
  // Metadata
  lastFetchTime: null,      // Unix timestamp
  dataSource: 'waqi',       // Which API provided the data
};
```

#### Actions

```javascript
const aqiDataReducer = (state, action) => {
  switch (action.type) {
    case 'FETCH_START':
      return { ...state, isLoading: true, error: null };
    
    case 'FETCH_SUCCESS':
      return {
        ...state,
        currentData: action.payload,
        isLoading: false,
        isRefreshing: false,
        error: null,
        lastFetchTime: Date.now(),
        dataSource: action.source || 'waqi',
      };
    
    case 'FETCH_ERROR':
      return {
        ...state,
        isLoading: false,
        isRefreshing: false,
        error: action.error,
      };
    
    case 'REFRESH_START':
      return { ...state, isRefreshing: true };
    
    case 'SET_METRO_CITIES':
      return { ...state, metroCitiesData: action.payload };
    
    case 'SET_RANKINGS':
      return { ...state, rankingData: action.payload };
    
    case 'SET_HISTORICAL':
      return { ...state, historicalData: action.payload };
    
    case 'CLEAR_DATA':
      return { ...initialState };
    
    default:
      return state;
  }
};
```

#### Flow: Fetching AQI Data

```
Location Changes (context update)
    │
    ▼
AQIDataProvider (useEffect watches location)
    │
    ├─── Check cache (cacheService)
    │    ├── Cache hit (< 5 min old) → FETCH_SUCCESS (from cache)
    │    └── Cache miss → continue
    │
    ├─── FETCH_START
    │
    ├─── Parallel API calls:
    │    ├── WAQI: fetch city feed
    │    └── OWM: fetch weather + air pollution
    │
    ├─── Success path:
    │    ├── aqiService.normalize(waqiData, owmData)
    │    ├── FETCH_SUCCESS (normalized data)
    │    ├── cacheService.set(cacheKey, data)
    │    └── localStorage.set('lastKnownData', data)
    │
    └─── Error path:
         ├── Try IQAir fallback
         │   ├── Success → FETCH_SUCCESS (source: 'iqair')
         │   └── Failure → continue
         ├── Try localStorage fallback
         │   ├── Found → FETCH_SUCCESS (stale data + warning)
         │   └── Not found → FETCH_ERROR
         └── FETCH_ERROR ({ message, canRetry: true })
```

---

## Custom Hooks

### useAQIData

**File**: `src/hooks/useAQIData.js`

```javascript
// Usage in components
const { 
  data,           // Normalized AQI data
  isLoading,      // First load
  isRefreshing,   // Background refresh
  error,          // Error object
  retry,          // Manual retry function
  lastUpdated,    // Formatted timestamp
} = useAQIData();
```

**Internal Logic**:
1. Reads from AQIDataContext
2. Sets up auto-refresh interval (5 minutes)
3. Provides retry function for manual refresh
4. Formats `lastUpdated` timestamp

### useWeatherData

**File**: `src/hooks/useWeatherData.js`

```javascript
const {
  weather,        // Weather data object
  isLoading,
  error,
} = useWeatherData(lat, lng);
```

### useSearch

**File**: `src/hooks/useSearch.js`

```javascript
const {
  query,          // Current search query
  setQuery,       // Update query
  suggestions,    // Filtered results
  isSearching,    // Loading state
  selectCity,     // Navigate to city
  clearSearch,    // Reset search
} = useSearch();
```

**Internal Logic**:
1. Debounces input (300ms)
2. Searches static city list first (instant results)
3. If no local match, calls WAQI search API
4. Filters to Indian cities only
5. Returns max 10 suggestions

### useGeolocation

**File**: `src/hooks/useGeolocation.js`

```javascript
const {
  position,       // { lat, lng }
  permission,     // 'prompt' | 'granted' | 'denied'
  error,          // Error message
  requestPermission,  // Function to trigger permission
} = useGeolocation();
```

---

## Service Layer Details

### aqiService.js

The core service that orchestrates API calls and normalizes data:

```javascript
// Public API
const aqiService = {
  // Get complete AQI data for a city
  getAQIData: async (city) => {
    const [waqiData, weatherData] = await Promise.allSettled([
      waqiApi.getCityFeed(city),
      openWeatherApi.getWeather(lat, lng),
    ]);
    return normalize(waqiData, weatherData);
  },
  
  // Search cities
  searchCities: async (query) => { /* ... */ },
  
  // Get metro cities data (parallel fetches)
  getMetroCities: async () => { /* ... */ },
  
  // Get ranking data
  getRankings: async (country, limit) => { /* ... */ },
  
  // Get historical data for charts
  getHistorical: async (lat, lng, days) => { /* ... */ },
  
  // Get map stations in bounds
  getMapStations: async (bounds) => { /* ... */ },
};
```

### cacheService.js

In-memory cache with TTL-based expiration:

```javascript
const cache = new Map();
const DEFAULT_TTL = 5 * 60 * 1000; // 5 minutes

const cacheService = {
  get: (key) => {
    const entry = cache.get(key);
    if (!entry) return null;
    if (Date.now() - entry.timestamp > entry.ttl) {
      cache.delete(key);
      return null;
    }
    return entry.data;
  },
  
  set: (key, data, ttl = DEFAULT_TTL) => {
    cache.set(key, { data, timestamp: Date.now(), ttl });
  },
  
  clear: () => cache.clear(),
  
  // Persist critical data to localStorage
  persist: (key, data) => {
    try {
      localStorage.setItem(`ecoBreathe_${key}`, JSON.stringify({
        data,
        timestamp: Date.now(),
      }));
    } catch (e) {
      console.warn('localStorage full, clearing old data');
    }
  },
  
  getPersistedFallback: (key) => {
    try {
      const stored = localStorage.getItem(`ecoBreathe_${key}`);
      if (!stored) return null;
      return JSON.parse(stored);
    } catch {
      return null;
    }
  },
};
```

---

## Error Handling Strategy

### Error Types

| Error Type | Cause | User Experience | Recovery |
|-----------|-------|-----------------|----------|
| Network Error | No internet / API down | Error banner + cached data | Auto-retry in 30s |
| Rate Limit (429) | Too many requests | Silent fallback to cache | Wait + retry |
| API Error (4xx) | Invalid city / bad request | Error message + search prompt | User searches different city |
| Server Error (5xx) | API server issues | Error banner + fallback API | Try backup API (IQAir) |
| Geolocation Denied | User denied permission | Show default city + search | User searches manually |
| Timeout | Slow network | Loading timeout message | Manual retry button |

### Error Handling Flow

```
API Call
    │
    ├── Response 200 → Process data → Success
    │
    ├── Response 429 (Rate Limit)
    │   ├── Check in-memory cache → Return cached data
    │   ├── Check localStorage → Return stale data + warning
    │   └── Wait 60s → Retry
    │
    ├── Response 4xx (Client Error)
    │   ├── Log error
    │   └── Show user-friendly message
    │       ("City not found. Try searching for a different city.")
    │
    ├── Response 5xx (Server Error)
    │   ├── Try fallback API (IQAir)
    │   ├── Success → Process + mark as fallback source
    │   └── Failure → Show error with retry button
    │
    ├── Network Error (no response)
    │   ├── Check localStorage for last known data
    │   ├── Found → Display with "Last updated X ago" warning
    │   └── Not found → "No internet connection" message
    │
    └── Timeout (> 10s)
        ├── Abort request
        └── Show "Request timed out" with retry button
```

### Axios Interceptors

```javascript
// apiClient.js
const apiClient = axios.create({
  timeout: 10000,
});

// Request interceptor
apiClient.interceptors.request.use((config) => {
  // Add timestamp for cache tracking
  config.metadata = { startTime: Date.now() };
  return config;
});

// Response interceptor
apiClient.interceptors.response.use(
  (response) => {
    // Log response time
    const duration = Date.now() - response.config.metadata.startTime;
    console.debug(`[API] ${response.config.url} — ${duration}ms`);
    return response;
  },
  (error) => {
    // Normalize error structure
    const normalizedError = {
      message: getErrorMessage(error),
      code: error.response?.status || 'NETWORK_ERROR',
      canRetry: isRetryable(error),
      original: error,
    };
    return Promise.reject(normalizedError);
  }
);
```

---

## Loading States

### Three-Phase Loading

1. **Initial Load** (first visit)
   - Full skeleton screen
   - Geolocation detection in progress
   - Loading spinner on AQI card

2. **Navigation Load** (city change)
   - Skeleton cards for data sections
   - Previous city data fades out
   - New city data fades in

3. **Background Refresh** (5-min interval)
   - No visible loading indicator
   - Data updates seamlessly
   - Small "Updated just now" timestamp change

### Skeleton Mapping

| Component | Skeleton Variant |
|-----------|-----------------|
| AQICard | Large circular skeleton + text lines |
| PollutantCard | Rectangle with shimmer |
| HourlyChart | Bar chart placeholder skeleton |
| MetroCityCard | Small card skeleton |
| BlogCard | Image + text lines skeleton |
| WeatherStrip | Horizontal strip skeleton |

---

## Auto-Refresh Strategy

```javascript
// useInterval hook usage in AQIDataProvider
useInterval(() => {
  if (document.visibilityState === 'visible') {
    dispatch({ type: 'REFRESH_START' });
    aqiService.getAQIData(location.slug)
      .then(data => dispatch({ type: 'FETCH_SUCCESS', payload: data }))
      .catch(() => {/* Silent failure on background refresh */});
  }
}, REFRESH_INTERVAL); // 5 minutes (300,000ms)
```

**Key Rules**:
- Only refresh when tab is visible (`document.visibilityState`)
- Don't show loading skeleton on refresh (only `isRefreshing` flag)
- Silently fail on refresh errors (keep showing current data)
- Reset timer when user manually navigates to new city

---

## Data Flow Diagrams

### User Visits Home Page

```
1. App mounts → LocationProvider initializes
2. LocationProvider checks localStorage → no saved location
3. LocationProvider requests geolocation
4. Browser prompts user for permission
5a. User allows:
    → Geolocation returns (28.63, 77.22)
    → WAQI geo feed: /feed/geo:28.63;77.22/
    → Response: "New Delhi"
    → SET_LOCATION: New Delhi
5b. User denies:
    → DETECTION_FAILURE
    → SET_LOCATION: New Delhi (default)
6. AQIDataProvider detects location change
7. FETCH_START
8. Parallel: WAQI feed + OWM weather
9. Both succeed → normalize → FETCH_SUCCESS
10. Components re-render with data
11. Auto-refresh timer starts (5 min)
```

### User Searches for "Mumbai"

```
1. User types "Mum" in SearchBar
2. useSearch debounces (300ms)
3. Search static indianCities.js → finds "Mumbai"
4. Show suggestion dropdown
5. User selects "Mumbai"
6. LocationContext: SET_LOCATION (Mumbai)
7. React Router: navigate('/dashboard/india/maharashtra/mumbai')
8. AQIDataProvider: location changed
9. Check cache: key = 'aqi_mumbai'
10a. Cache hit → FETCH_SUCCESS (instant)
10b. Cache miss → FETCH_START → API calls → FETCH_SUCCESS
11. Dashboard renders Mumbai data
12. Save to localStorage
```

### API Failure Recovery

```
1. WAQI API returns 500
2. Service layer catches error
3. Try IQAir fallback API
4a. IQAir succeeds → FETCH_SUCCESS (source: 'iqair')
4b. IQAir fails too:
    5. Check localStorage for last known data
    6a. Found (< 24h old) → FETCH_SUCCESS + stale warning
    6b. Not found or too old → FETCH_ERROR
        → Show error UI with retry button
```

---

## Next Steps

Proceed to [07_IMPLEMENTATION_ROADMAP.md](./07_IMPLEMENTATION_ROADMAP.md) for the step-by-step development plan.
