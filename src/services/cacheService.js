import { REFRESH_INTERVAL } from '@/utils/constants';

const CACHE_PREFIX = 'ecoBreathe_';

export const cacheService = {
  /**
   * Save data to localStorage with a timestamp
   */
  set: (key, data) => {
    try {
      const cacheItem = {
        data,
        timestamp: Date.now()
      };
      localStorage.setItem(`${CACHE_PREFIX}${key}`, JSON.stringify(cacheItem));
    } catch (error) {
      console.warn('Failed to save to cache:', error);
    }
  },

  /**
   * Retrieve data from localStorage if it's within the TTL
   * @param {string} key Cache key
   * @param {number} ttl Time to live in ms (defaults to REFRESH_INTERVAL)
   * @returns {any|null} Cached data or null if expired/not found
   */
  get: (key, ttl = REFRESH_INTERVAL) => {
    try {
      const itemStr = localStorage.getItem(`${CACHE_PREFIX}${key}`);
      if (!itemStr) return null;

      const item = JSON.parse(itemStr);
      const now = Date.now();
      
      // Check if cache expired
      if (now - item.timestamp > ttl) {
        localStorage.removeItem(`${CACHE_PREFIX}${key}`);
        return null;
      }
      
      return item.data;
    } catch (error) {
      console.warn('Failed to read from cache:', error);
      return null;
    }
  },

  /**
   * Remove specific item from cache
   */
  remove: (key) => {
    try {
      localStorage.removeItem(`${CACHE_PREFIX}${key}`);
    } catch (error) {
      console.warn('Failed to remove from cache:', error);
    }
  },

  /**
   * Clear all app-specific cache
   */
  clear: () => {
    try {
      const keysToRemove = [];
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key && key.startsWith(CACHE_PREFIX)) {
          keysToRemove.push(key);
        }
      }
      keysToRemove.forEach(key => localStorage.removeItem(key));
    } catch (error) {
      console.warn('Failed to clear cache:', error);
    }
  }
};
