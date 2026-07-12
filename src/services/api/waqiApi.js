import { waqiClient } from './apiClient';

export const waqiApi = {
  /**
   * Get AQI data for a specific city
   * @param {string} city - City name or path (e.g. 'new-delhi' or 'india/delhi/new-delhi')
   */
  getCityFeed: async (city) => {
    try {
      const response = await waqiClient.get(`/feed/${city}/`);
      if (response.data && response.data.status === 'ok') {
        return response.data.data;
      }
      throw new Error(response.data?.data || 'Failed to fetch city AQI data');
    } catch (error) {
      console.error(`Error fetching WAQI feed for ${city}:`, error);
      throw error;
    }
  },

  /**
   * Get AQI data based on coordinates
   * @param {number} lat - Latitude
   * @param {number} lng - Longitude
   */
  getGeoFeed: async (lat, lng) => {
    try {
      const response = await waqiClient.get(`/feed/geo:${lat};${lng}/`);
      if (response.data && response.data.status === 'ok') {
        return response.data.data;
      }
      throw new Error(response.data?.data || 'Failed to fetch geo AQI data');
    } catch (error) {
      console.error(`Error fetching WAQI feed for ${lat},${lng}:`, error);
      throw error;
    }
  },

  /**
   * Search for cities
   * @param {string} keyword - Search query
   */
  searchCities: async (keyword) => {
    try {
      const response = await waqiClient.get(`/search/?keyword=${encodeURIComponent(keyword)}`);
      if (response.data && response.data.status === 'ok') {
        return response.data.data;
      }
      return [];
    } catch (error) {
      console.error(`Error searching WAQI cities for ${keyword}:`, error);
      return [];
    }
  },

  /**
   * Get stations within map bounds
   * @param {string} bounds - String format 'lat1,lng1,lat2,lng2'
   */
  getMapBoundsFeed: async (bounds) => {
    try {
      const response = await waqiClient.get(`/map/bounds/?latlng=${bounds}`);
      if (response.data && response.data.status === 'ok') {
        return response.data.data;
      }
      return [];
    } catch (error) {
      console.error(`Error fetching WAQI map bounds for ${bounds}:`, error);
      return [];
    }
  }
};
