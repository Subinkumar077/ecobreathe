import { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import styles from './MiniMap.module.css';

// Fix Leaflet's default icon path issues in Vite/React
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

// Component to dynamically update map center when coordinates change
const MapUpdater = ({ center }) => {
  const map = useMap();
  useEffect(() => {
    map.setView(center, map.getZoom());
  }, [center, map]);
  return null;
};

const MiniMap = ({ lat, lng, stationName }) => {
  // Prevent hydration errors by ensuring it only renders on client
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted || !lat || !lng) {
    return <div className={styles.placeholder}>Loading map...</div>;
  }

  const center = [lat, lng];

  return (
    <div className={styles.mapContainer}>
      <MapContainer 
        center={center} 
        zoom={12} 
        scrollWheelZoom={false}
        className={styles.map}
        attributionControl={false}
      >
        <TileLayer
          url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
        />
        <Marker position={center}>
          <Popup>
            {stationName || 'Current Location'}
          </Popup>
        </Marker>
        <MapUpdater center={center} />
      </MapContainer>
    </div>
  );
};

export default MiniMap;
