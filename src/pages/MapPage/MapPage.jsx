import { useState, useEffect, useRef } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from 'react-leaflet';
import L from 'leaflet';
import { SearchBar } from '@/components/common';
import { waqiApi } from '@/services/api/waqiApi';
import { getAQICategory } from '@/utils';
import { indianCities } from '@/data';
import { Link } from 'react-router-dom';
import 'leaflet/dist/leaflet.css';
import styles from './MapPage.module.css';

// Custom MapBoundsTracker to handle user drag/zoom and fetch new stations
const MapBoundsTracker = ({ setBounds, onSearchTriggered, shouldSearch }) => {
  const map = useMapEvents({
    moveend: () => {
      const b = map.getBounds();
      // Format: lat_min,lng_min,lat_max,lng_max (SouthWest, NorthEast)
      const formattedBounds = `${b.getSouthWest().lat},${b.getSouthWest().lng},${b.getNorthEast().lat},${b.getNorthEast().lng}`;
      setBounds(formattedBounds);
    },
  });

  // Explicitly trigger search when user clicks the "Search this area" button
  useEffect(() => {
    if (shouldSearch) {
      const b = map.getBounds();
      const formattedBounds = `${b.getSouthWest().lat},${b.getSouthWest().lng},${b.getNorthEast().lat},${b.getNorthEast().lng}`;
      onSearchTriggered(formattedBounds);
    }
  }, [shouldSearch, map, onSearchTriggered]);

  return null;
};

// Create custom colored markers based on AQI
const createCustomIcon = (aqiStr) => {
  const aqiNum = parseInt(aqiStr, 10);
  const category = getAQICategory(isNaN(aqiNum) ? 0 : aqiNum);
  
  return L.divIcon({
    className: styles.customMarker,
    html: `<div class="${styles.markerPin}" style="background-color: ${category.color}">${aqiStr}</div>`,
    iconSize: [40, 40],
    iconAnchor: [20, 20],
    popupAnchor: [0, -20]
  });
};

const MapPage = () => {
  const [stations, setStations] = useState([]);
  const [bounds, setBounds] = useState(null);
  const [loading, setLoading] = useState(false);
  const [shouldSearch, setShouldSearch] = useState(true); // Auto search on mount
  
  // Default center (India)
  const [center] = useState([20.5937, 78.9629]); 
  const [zoom] = useState(5);

  const fetchStations = async (mapBounds) => {
    setLoading(true);
    setShouldSearch(false);
    try {
      // Create mock stations distributed across India using our dataset
      const mockStations = indianCities.map((city, index) => ({
        uid: index + 1000, // Fake UID for routing fallback if needed
        lat: city.lat,
        lon: city.lng,
        aqi: Math.floor(Math.random() * 250) + 30, // Random AQI 30-280
        station: {
          name: city.name,
          url: city.slug
        }
      }));
      
      // Simulate API latency
      await new Promise(resolve => setTimeout(resolve, 600));
      setStations(mockStations);
    } catch (error) {
      console.error('Failed to generate mock stations:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearchTrigger = () => {
    setShouldSearch(true);
  };

  return (
    <div className={styles.pageContainer}>
      <div className={styles.controlsOverlay}>
        <div className={styles.searchWrapper}>
          <SearchBar placeholder="Jump to a city..." size="md" />
        </div>
        
        {/* Only show "Search this area" button if bounds have changed and we aren't currently loading */}
        {bounds && !shouldSearch && (
          <button 
            className={styles.searchAreaBtn} 
            onClick={handleSearchTrigger}
            disabled={loading}
          >
            {loading ? 'Searching...' : 'Search this area'}
          </button>
        )}
      </div>

      <MapContainer 
        center={center} 
        zoom={zoom} 
        className={styles.mapContainer}
        attributionControl={false}
      >
        <TileLayer
          url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
        />
        
        <MapBoundsTracker 
          setBounds={setBounds} 
          onSearchTriggered={fetchStations}
          shouldSearch={shouldSearch}
        />

        {stations.map(station => (
          <Marker 
            key={station.uid} 
            position={[station.lat, station.lon]}
            icon={createCustomIcon(station.aqi)}
          >
            <Popup>
              <div className={styles.popupContent}>
                <h4>{station.station.name}</h4>
                <p>AQI: <strong>{station.aqi}</strong></p>
                <Link to={`/dashboard/${station.station.url || '@' + station.uid}`} className={styles.viewBtn}>
                  View Dashboard
                </Link>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};

export default MapPage;
