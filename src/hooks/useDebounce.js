import { useState, useEffect } from 'react';

/**
 * Custom hook to debounce a fast-changing value (e.g., search input)
 * @param {any} value The value to debounce
 * @param {number} delay Delay in ms (default 500ms)
 * @returns {any} The debounced value
 */
export const useDebounce = (value, delay = 500) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
};
