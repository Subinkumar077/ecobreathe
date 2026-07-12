import { waqiApi } from './api/waqiApi';
import { openWeatherApi } from './api/openWeatherApi';
import { cacheService } from './cacheService';

export const aqiService = {
  /**
   * Aggregates data from WAQI and OWM for a specific city/coordinates
   * Checks cache first before making API calls.
   * 
   * @param {Object} location - Location object
   * @param {string} location.city - City slug (e.g. 'new-delhi')
   * @param {number} location.lat - Latitude
   * @param {number} location.lng - Longitude
   * @returns {Promise<Object>} Aggregated data payload
   */
  getDashboardData: async (location) => {
    if (!location) throw new Error("Location is required");
    
    // Generate cache key based on location
    const cacheKey = location.city 
      ? `dashboard_${location.city}` 
      : `dashboard_${location.lat}_${location.lng}`;
      
    // 1. Check Cache
    const cachedData = cacheService.get(cacheKey);
    if (cachedData) {
      return cachedData;
    }

    try {
      // 2. Fetch Primary Data (WAQI)
      let waqiData;
      if (location.city && location.city !== 'current') {
        waqiData = await waqiApi.getCityFeed(location.city);
      } else if (location.lat && location.lng) {
        waqiData = await waqiApi.getGeoFeed(location.lat, location.lng);
      } else {
        // Fallback to default if somehow missing
        waqiData = await waqiApi.getCityFeed('new-delhi');
      }

      // Extract accurate coordinates from WAQI station to use for OWM
      const stationLat = waqiData.city?.geo?.[0] || location.lat;
      const stationLng = waqiData.city?.geo?.[1] || location.lng;

      // 3. Fetch Secondary Data (OWM Weather + Historical)
      // Run in parallel for performance
      const [weatherData, historicalData] = await Promise.all([
        openWeatherApi.getCurrentWeather(stationLat, stationLng).catch(() => null),
        openWeatherApi.getAirPollutionHistory(stationLat, stationLng).catch(() => null)
      ]);

      // 4. Transform and Aggregate Data
      const aggregatedData = {
        station: {
          name: waqiData.city?.name || 'Unknown Station',
          url: waqiData.city?.url || '',
          time: waqiData.time?.iso || new Date().toISOString()
        },
        aqi: waqiData.aqi,
        pollutants: waqiData.iaqi || {},
        forecast: waqiData.forecast?.daily || null,
        weather: weatherData ? {
          temp: weatherData.main?.temp,
          humidity: weatherData.main?.humidity,
          windSpeed: weatherData.wind?.speed,
          description: weatherData.weather?.[0]?.description,
          icon: weatherData.weather?.[0]?.icon
        } : null,
        history: historicalData?.list || []
      };

      // 5. Save to Cache
      cacheService.set(cacheKey, aggregatedData);

      return aggregatedData;
      
    } catch (error) {
      console.error("Dashboard data aggregation failed:", error);
      throw error;
    }
  },

  /**
   * Get Top 10 most polluted cities for rankings
   * In a real app this would call a specific endpoint, but WAQI doesn't have a free one.
   * We will fetch a predefined list of metro cities in parallel.
   */
  getRankings: async (citiesList) => {
    // Cache based on the number of cities requested so Dashboard and Rankings don't collide
    const cacheKey = `rankings_data_${citiesList.length}`;
    const cachedData = cacheService.get(cacheKey, 600000); // 10 min cache for rankings
    
    // Return cached data only if it actually has results
    if (cachedData && cachedData.length > 0) return cachedData;

    try {
      const validResults = [];
      const batchSize = 5;
      
      for (let i = 0; i < citiesList.length; i += batchSize) {
        const batch = citiesList.slice(i, i + batchSize);
        const promises = batch.map(city => 
          waqiApi.getCityFeed(city.slug)
            .then(data => ({
              ...city,
              aqi: data.aqi,
              station: data.city.name
            }))
            .catch((error) => {
              console.warn(`Rankings fetch failed for ${city.name}`, error);
              return null;
            })
        );
        
        const results = await Promise.all(promises);
        validResults.push(...results.filter(Boolean));
        
        // Small delay between batches to respect rate limits
        if (i + batchSize < citiesList.length) {
          await new Promise(resolve => setTimeout(resolve, 300));
        }
      }
      
      // Sort by AQI descending
      const sorted = validResults.sort((a, b) => b.aqi - a.aqi);
      
      // Only cache if we got actual data
      if (sorted.length > 0) {
        cacheService.set(cacheKey, sorted);
      }
      
      return sorted;
    } catch (error) {
      console.error("Rankings fetch failed:", error);
      throw error;
    }
  }
};
