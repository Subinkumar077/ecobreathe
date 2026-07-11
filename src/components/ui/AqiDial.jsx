// Signature element: a color-coded arc gauge that reads like an instrument,
// not a generic donut chart. Reused in the hero (large) and can be dropped
// into cards/widgets elsewhere (small).
const BAND_COLOR_CLASS = {
  good: 'text-aqi-good',
  moderate: 'text-aqi-moderate',
  unhealthy: 'text-aqi-unhealthy',
  hazardous: 'text-aqi-hazardous',
}

function bandForAqi(aqi) {
  if (aqi <= 50) return 'good'
  if (aqi <= 100) return 'moderate'
  if (aqi <= 200) return 'unhealthy'
  return 'hazardous'
}

export default function AqiDial({ aqi, size = 220 }) {
  const band = bandForAqi(aqi)
  const radius = size / 2 - 14
  const circumference = 2 * Math.PI * radius
  const pct = Math.min(aqi / 300, 1)
  const dash = circumference * pct

  return (
    <div
      className="relative inline-flex items-center justify-center"
      style={{ width: size, height: size }}
      role="img"
      aria-label={`Current air quality index ${aqi}`}
    >
      <svg width={size} height={size} className="-rotate-90">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="currentColor"
          className="text-haze/10"
          strokeWidth={12}
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="currentColor"
          className={BAND_COLOR_CLASS[band]}
          strokeWidth={12}
          strokeLinecap="round"
          strokeDasharray={`${dash} ${circumference}`}
          style={{ transition: 'stroke-dasharray 900ms ease-out' }}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="font-mono font-semibold text-5xl md:text-6xl text-haze leading-none">
          {aqi}
        </span>
        <span className="text-xs uppercase tracking-[0.2em] text-haze/60 mt-2">AQI</span>
      </div>
    </div>
  )
}
