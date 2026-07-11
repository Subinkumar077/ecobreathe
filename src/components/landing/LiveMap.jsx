import { useEffect, useMemo } from 'react'
import {
  CircleMarker,
  MapContainer,
  Popup,
  TileLayer,
  Tooltip,
  useMap,
} from 'react-leaflet'
import 'leaflet/dist/leaflet.css'

import useMapStations from '../../hooks/useMapStations'
import { getAqiBand } from '../../utils/aqi'

const DEFAULT_ZOOM = 11
const MARKER_RADIUS = 10

const BAND_LEGEND = [
  { band: 'good',      label: 'Good',       range: '0–50',   color: 'bg-aqi-good' },
  { band: 'moderate',  label: 'Moderate',   range: '51–100', color: 'bg-aqi-moderate' },
  { band: 'unhealthy', label: 'Unhealthy',  range: '101–200',color: 'bg-aqi-unhealthy' },
  { band: 'hazardous', label: 'Hazardous',  range: '200+',   color: 'bg-aqi-hazardous' },
]

const timeFormatter = new Intl.DateTimeFormat('en-IN', {
  hour: 'numeric',
  minute: '2-digit',
  timeZone: 'Asia/Kolkata',
})

function formatUpdatedAt(datetime) {
  return timeFormatter.format(new Date(datetime.utc))
}

function MapViewport({ city }) {
  const map = useMap()
  useEffect(() => {
    map.flyTo([city.latitude, city.longitude], DEFAULT_ZOOM, { duration: 1.5 })
  }, [city.latitude, city.longitude, map])
  return null
}

function StationMarker({ station }) {
  const band = getAqiBand(station.aqi)
  return (
    <CircleMarker
      center={[station.latitude, station.longitude]}
      radius={MARKER_RADIUS}
      pathOptions={{ className: `aqi-map-marker aqi-map-marker-${band}` }}
    >
      <Tooltip direction="top" offset={[0, -10]}>
        <span className="text-xs font-medium">{station.name}</span>
      </Tooltip>
      <Popup>
        <div className="space-y-1.5 min-w-[160px]">
          <h3 className="font-display text-sm font-semibold text-ink leading-snug">
            {station.name}
          </h3>
          <p className="font-mono text-sm text-ink">
            AQI: <strong className="text-base">{station.aqi}</strong>
          </p>
          <p className="text-xs text-ink-muted">
            PM2.5: {station.value} µg/m³
          </p>
          <p className="text-xs text-ink-muted">
            Updated {formatUpdatedAt(station.datetime)}
          </p>
        </div>
      </Popup>
    </CircleMarker>
  )
}

function LoadingState() {
  return (
    <div className="flex h-[28rem] items-center justify-center rounded-xl border border-haze/10 bg-charcoal-soft">
      <div className="flex flex-col items-center gap-4">
        <div className="h-10 w-10 rounded-full border-4 border-haze/10 border-t-accent-amber animate-spin" />
        <p className="font-mono text-sm text-haze/50">Loading live station readings…</p>
      </div>
    </div>
  )
}

function ErrorState({ error, retry }) {
  return (
    <div className="flex h-64 flex-col items-center justify-center gap-4 rounded-xl border border-aqi-unhealthy/20 bg-aqi-unhealthy/10 p-6 text-center">
      <p className="text-sm text-aqi-unhealthy max-w-xs leading-relaxed">{error}</p>
      <button
        type="button"
        onClick={retry}
        className="rounded-full border border-accent-amber px-5 py-2 text-xs font-semibold uppercase tracking-wider text-accent-amber transition hover:bg-accent-amber hover:text-charcoal focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-amber"
      >
        Reload Map
      </button>
    </div>
  )
}

function EmptyState() {
  return (
    <div className="flex h-64 items-center justify-center rounded-xl border border-haze/10 bg-charcoal-soft p-6">
      <p className="text-sm text-haze/60 text-center max-w-xs">
        No current PM2.5 station readings are available nearby.
      </p>
    </div>
  )
}

export default function LiveMap({ city }) {
  const { stations, loading, error, retry } = useMapStations(city)

  const center = useMemo(
    () => [city.latitude, city.longitude],
    [city.latitude, city.longitude],
  )

  return (
    <section id="air-quality-map" className="bg-charcoal py-16 text-haze md:py-24">
      <div className="mx-auto max-w-7xl px-6 md:px-10">

        {/* Header row */}
        <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="mb-3 text-xs font-medium uppercase tracking-[0.2em] text-accent-amber">
              Station Network
            </p>
            <h2 className="text-3xl font-semibold md:text-4xl">
              Live Air Quality Map
            </h2>
          </div>

          <div className="flex flex-col items-start md:items-end gap-2">
            <p className="max-w-md text-sm leading-relaxed text-haze/60">
              Real-time PM2.5 from OpenAQ monitoring stations near{' '}
              <span className="text-haze/80 font-medium">{city.name}</span>.
              Click a marker for details.
            </p>
            {!loading && !error && stations.length > 0 && (
              <span className="font-mono text-xs text-haze/40">
                {stations.length} station{stations.length !== 1 ? 's' : ''} reporting
              </span>
            )}
          </div>
        </div>

        {/* Map / states */}
        {loading && <LoadingState />}
        {!loading && error && <ErrorState error={error} retry={retry} />}
        {!loading && !error && stations.length === 0 && <EmptyState />}

        {!loading && !error && stations.length > 0 && (
          <div className="overflow-hidden rounded-xl border border-haze/10 shadow-2xl">
            <MapContainer
              center={center}
              zoom={DEFAULT_ZOOM}
              scrollWheelZoom={false}
              className="h-[30rem] w-full"
              aria-label={`Live PM2.5 station map for ${city.name}`}
            >
              <MapViewport city={city} />
              <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
              />
              {stations.map((station) => (
                <StationMarker
                  key={`${station.id}-${station.datetime.utc}`}
                  station={station}
                />
              ))}
            </MapContainer>
          </div>
        )}

        {/* Legend */}
        {!loading && !error && stations.length > 0 && (
          <div className="mt-4 flex flex-wrap gap-4" role="list" aria-label="AQI band legend">
            {BAND_LEGEND.map(({ band, label, range, color }) => (
              <div key={band} className="flex items-center gap-2" role="listitem">
                <span className={`h-2.5 w-2.5 rounded-full ${color}`} aria-hidden="true" />
                <span className="text-xs text-haze/60">
                  <span className="font-medium text-haze/80">{label}</span>
                  {' '}({range})
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}