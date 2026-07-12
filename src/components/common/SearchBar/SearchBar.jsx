import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, MapPin, Loader2 } from 'lucide-react';
import { waqiApi } from '@/services/api/waqiApi';
import { useDebounce } from '@/hooks';
import styles from './SearchBar.module.css';

const SearchBar = ({ placeholder = "Search for a city...", size = "md", onSelect }) => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  // Debounce the query to prevent spamming the API
  const debouncedQuery = useDebounce(query, 500);

  useEffect(() => {
    const searchCities = async () => {
      if (debouncedQuery.length < 2) {
        setResults([]);
        setIsOpen(false);
        return;
      }

      setIsSearching(true);
      try {
        const data = await waqiApi.searchCities(debouncedQuery);
        setResults(data || []);
        setIsOpen(true);
      } catch (error) {
        console.error("Search failed:", error);
      } finally {
        setIsSearching(false);
      }
    };

    searchCities();
  }, [debouncedQuery]);

  // Handle click outside to close dropdown
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelect = (station) => {
    setQuery('');
    setIsOpen(false);
    
    if (onSelect) {
      onSelect(station);
    } else {
      // The API returns uid for stations or paths. If path has "india", we route based on slug.
      // Easiest is to navigate by uid to our dashboard or build slug. 
      // For now, let's navigate to the WAQI station uid if it exists.
      const urlPath = station.uid ? `@${station.uid}` : station.station.url;
      navigate(`/dashboard/${urlPath}`);
    }
  };

  return (
    <div className={`${styles.searchContainer} ${styles[size]}`} ref={dropdownRef}>
      <div className={styles.inputWrapper}>
        <Search className={styles.icon} size={20} />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => {
            if (results.length > 0) setIsOpen(true);
          }}
          placeholder={placeholder}
          className={styles.input}
        />
        {isSearching && <Loader2 className={`${styles.icon} ${styles.spin}`} size={20} />}
      </div>

      {isOpen && results.length > 0 && (
        <ul className={styles.dropdown}>
          {results.map((station, index) => (
            <li 
              key={station.uid || index} 
              className={styles.dropdownItem}
              onClick={() => handleSelect(station)}
            >
              <MapPin size={16} className={styles.itemIcon} />
              <div className={styles.itemContent}>
                <span className={styles.itemName}>{station.station.name}</span>
                <span className={styles.itemAqi}>AQI: {station.aqi !== '-' ? station.aqi : 'N/A'}</span>
              </div>
            </li>
          ))}
        </ul>
      )}
      
      {isOpen && results.length === 0 && query.length >= 2 && !isSearching && (
        <ul className={styles.dropdown}>
          <li className={styles.noResults}>No cities found</li>
        </ul>
      )}
    </div>
  );
};

export default SearchBar;
