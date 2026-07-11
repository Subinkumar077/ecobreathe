import { AlertTriangle, Database, Gauge, RefreshCw } from 'lucide-react'
import AqiDial from '../ui/AqiDial'
import Button from '../ui/Button'
import useAqi from '../../hooks/useAqi'

const BAND_CONFIG = {
  Good:      { text: 'text-aqi-good',      glow: 'shadow-[0_0_60px_rgba(62,124,89,0.35)]',   bg: 'bg-aqi-good/10',      border: 'border-aqi-good/30' },
  Moderate:  { text: 'text-aqi-moderate',  glow: 'shadow-[0_0_60px_rgba(232,163,61,0.35)]',  bg: 'bg-aqi-moderate/10',  border: 'border-aqi-moderate/30' },
  Unhealthy: { text: 'text-aqi-unhealthy', glow: 'shadow-[0_0_60px_rgba(196,67,43,0.35)]',   bg: 'bg-aqi-unhealthy/10', border: 'border-aqi-unhealthy/30' },
  Hazardous: { text: 'text-aqi-hazardous', glow: 'shadow-[0_0_60px_rgba(122,32,72,0.35)]',   bg: 'bg-aqi-hazardous/10', border: 'border-aqi-hazardous/30' },
}

const LOCATION_MESSAGES = {
  locating:    'Finding your nearest air-quality station…',
  found:       'Showing air quality near your current location',
  fallback:    'Showing Delhi · location unavailable',
  unavailable: 'Showing Delhi · location access denied',
}

const STAT_PILLS = [
  { icon: Gauge,    label: 'PM2.5',    value: 'Dominant pollutant' },
  { icon: Database, label: 'OpenAQ',   value: 'Data source' },
]

function HeroLoading() {
  return (
    <div className="flex h-[380px] flex-col items-center justify-center gap-4">
      <div className="h-40 w-40 rounded-full border-4 border-haze/10 border-t-accent-amber animate-spin" />
      <p className="font-mono text-sm text-haze/50">Loading live air quality…</p>
    </div>
  )
}

function HeroError({ error, retry }) {
  return (
    <div className="flex h-[380px] flex-col items-center justify-center gap-4 text-center px-4">
      <AlertTriangle size={32} className="text-aqi-moderate" aria-hidden="true" />
      <p className="max-w-xs text-sm text-haze/70 leading-relaxed">{error}</p>
      <button
        type="button"
        onClick={retry}
        className="flex items-center gap-2 mt-1 rounded-full border border-accent-amber px-5 py-2.5 text-xs font-semibold uppercase tracking-wider text-accent-amber transition hover:bg-accent-amber hover:text-charcoal focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-amber"
      >
        <RefreshCw size={12} aria-hidden="true" />
        Retry
      </button>
    </div>
  )
}

function HeroReading({ reading }) {
  const config = BAND_CONFIG[reading.band] ?? BAND_CONFIG.Moderate

  return (
    <div
      className="flex flex-col items-center text-center animate-fade-in-up"
      aria-live="polite"
      aria-atomic="true"
    >
      {/* Live indicator */}
      <div className="flex items-center gap-2 mb-6">
        <span className="h-2 w-2 rounded-full bg-aqi-good animate-live-pulse" aria-hidden="true" />
        <span className="text-xs font-medium uppercase tracking-[0.2em] text-haze/50">Live reading</span>
      </div>

      {/* Dial with colored glow ring */}
      <div className={`rounded-full p-3 ${config.bg} ${config.glow} transition-all duration-700`}>
        <AqiDial aqi={reading.aqi} size={220} />
      </div>

      {/* Band label */}
      <span
        className={`mt-5 inline-flex items-center gap-2 rounded-full border px-4 py-1.5 text-sm font-semibold ${config.text} ${config.border} ${config.bg}`}
      >
        {reading.band}
      </span>

      {/* Station name */}
      <p className="mt-4 text-sm font-medium text-haze/80 leading-snug max-w-[220px]">
        {reading.city}
      </p>
      {reading.cityName && reading.cityName !== reading.city && (
        <p className="mt-0.5 text-xs text-haze/45">{reading.cityName}</p>
      )}

      {/* Updated at */}
      {reading.updatedAt && (
        <p className="mt-2 font-mono text-xs text-haze/40">
          Updated {reading.updatedAt}
        </p>
      )}

      {/* Guidance */}
      {reading.guidance && (
        <p className={`mt-5 max-w-[230px] text-xs leading-relaxed ${config.text} opacity-80`}>
          {reading.guidance}
        </p>
      )}
    </div>
  )
}

export default function Hero({ city, locationStatus }) {
  const { data: currentReading, loading, error, retry } = useAqi(city)

  const locationMessage =
    LOCATION_MESSAGES[locationStatus] ?? 'Live air quality updates'

  return (
    <section className="relative overflow-hidden text-haze" style={{background: 'linear-gradient(135deg, #060D1B 0%, #0D1828 40%, #1C1B1A 100%)'}}>
      {/* Decorative glow blobs */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div className="absolute -top-32 -right-32 h-[700px] w-[700px] rounded-full bg-accent-amber/10 blur-3xl" />
        <div className="absolute top-1/2 left-1/3 h-[400px] w-[400px] rounded-full bg-blue-600/8 blur-3xl" />
        <div className="absolute -bottom-24 -left-24 h-[500px] w-[500px] rounded-full bg-aqi-good/8 blur-3xl" />
      </div>

      <div className="relative mx-auto grid max-w-7xl gap-12 px-6 py-16 md:grid-cols-2 md:px-10 md:py-24 lg:gap-20">

        {/* ── Left: Copy ── */}
        <div className="flex flex-col justify-center animate-fade-in-up">
          {/* Eyebrow */}
          <p className="mb-4 flex items-center gap-2 text-xs font-medium uppercase tracking-[0.2em] text-accent-amber">
            <span className="h-px w-6 bg-accent-amber inline-block" aria-hidden="true" />
            {locationMessage}
          </p>

          <h1 className="mb-5 text-4xl font-bold leading-[1.1] tracking-tight md:text-6xl lg:text-7xl">
            Know your air.<br />
            <span className="text-gradient-amber">Before you step outside.</span>
          </h1>

          <p className="mb-8 max-w-md text-base leading-relaxed text-haze/65 md:text-lg">
            Get live PM2.5 readings, understand what today's air means for you,
            and make healthier decisions before heading outdoors.
          </p>

          {/* CTAs */}
          <div className="flex flex-wrap gap-3 mb-10">
            <Button variant="primary" as="a" href="#air-quality-map">
              Explore Live Map
            </Button>
            <Button variant="outline" as="a" href="#products">
              Clean Air Solutions
            </Button>
          </div>

          {/* Trust stat pills */}
          <div className="flex flex-wrap gap-3">
            {STAT_PILLS.map(({ icon: Icon, label, value }) => (
              <div
                key={label}
                className="flex items-center gap-2 rounded-full border border-haze/15 bg-haze/5 px-4 py-2 text-xs text-haze/60"
              >
                <Icon size={12} className="text-accent-amber" aria-hidden="true" />
                <span className="font-medium text-haze/80">{label}</span>
                <span>·</span>
                <span>{value}</span>
              </div>
            ))}
          </div>
        </div>

        {/* ── Right: Live AQI card ── */}
        <div
          className="rounded-2xl border border-white/10 bg-midnight-soft/80 backdrop-blur-sm px-8 py-10 shadow-2xl shadow-black/40 md:px-10 animate-fade-in-up animate-delay-200"
          aria-busy={loading}
        >
          {loading ? (
            <HeroLoading />
          ) : error ? (
            <HeroError error={error} retry={retry} />
          ) : (
            currentReading && <HeroReading reading={currentReading} />
          )}
        </div>

      </div>
    </section>
  )
}