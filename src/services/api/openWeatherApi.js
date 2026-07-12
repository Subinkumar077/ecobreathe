import { owmClient } from './apiClient';

export const openWeatherApi = {
  /**
   * Get current weather data
   * @param {number} lat - Latitude
   * @param {number} lng - Longitude
   */
  getCurrentWeather: async (lat, lng) => {
    try {
      const response = await owmClient.get('/weather', {
        params: {
          lat,
          lon: lng,
          units: 'metric'
        }
      });
      return response.data;
    } catch (error) {
      console.error(`Error fetching OWM weather for ${lat},${lng}:`, error);
      throw error;
    }
  },

  /**
   * Get air pollution history (for historical charts)
   * @param {number} lat - Latitude
   * @param {number} lng - Longitude
   */
  getAirPollution: async (lat, lng) => {
    try {
      const response = await owmClient.get('/air_pollution', {
        params: {
          lat,
          lon: lng
        }
      });
      return response.data;
    } catch (error) {
      console.error(`Error fetching OWM air pollution for ${lat},${lng}:`, error);
      throw error;
    }
  },

  /**
   * Get historical air pollution (requires history endpoint)
   * Note: We fetch the last 24 hours of data
   */
  getAirPollutionHistory: async (lat, lng) => {
    try {
      // End time is now, start time is 24 hours ago
      const end = Math.floor(Date.now() / 1000);
      const start = end - (24 * 60 * 60);

      const response = await owmClient.get('/air_pollution/history', {
        params: {
          lat,
          lon: lng,
          start,
          end
        }
      });
      return response.data;
    } catch (error) {
      console.error(`Error fetching OWM historical air pollution for ${lat},${lng}:`, error);
      return null;
    }
  }
};
