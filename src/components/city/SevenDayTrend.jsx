import { getAqiBand, pm25ToAqi } from '../../utils/aqi.js'

const BAND_TEXT_COLOR = {
  good: 'text-aqi-good',
  moderate: 'text-aqi-moderate',
  unhealthy: 'text-aqi-unhealthy',
  hazardous: 'text-aqi-hazardous',
}

function formatDay(datetime) {
  return new Intl.DateTimeFormat('en-IN', {
    day: 'numeric',
    month: 'short',
    timeZone: 'Asia/Kolkata',
  }).format(new Date(datetime))
}

export default function SevenDayTrend({ days }) {
  const readings = days
    .map((reading) => ({
      datetime: reading.period?.datetimeFrom?.utc,
      aqi: pm25ToAqi(reading.value),
    }))
    .filter((reading) => reading.datetime && reading.aqi !== null)

  return (
    <section className="rounded-xl bg-paper p-6">
      <h2 className="text-2xl font-semibold text-ink">7-day trend</h2>
      <p className="mt-2 text-sm text-ink-muted">Daily averages from the last seven days, not a forecast.</p>
      {readings.length === 0 ? (
        <p className="mt-8 text-sm text-ink-muted">No daily averages are available yet.</p>
      ) : (
        <ol className="mt-6 divide-y divide-ink/10">
          {readings.map((reading) => {
            const band = getAqiBand(reading.aqi)
            return (
              <li key={reading.datetime} className="flex items-center justify-between gap-4 py-3">
                <span className="text-sm font-medium text-ink">{formatDay(reading.datetime)}</span>
                <span className={`font-mono text-sm ${BAND_TEXT_COLOR[band]}`}>AQI {reading.aqi}</span>
              </li>
            )
          })}
        </ol>
      )}
    </section>
  )
}
