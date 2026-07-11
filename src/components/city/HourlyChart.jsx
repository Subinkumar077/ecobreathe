import { pm25ToAqi } from '../../utils/aqi.js'

function formatHour(datetime) {
  return new Intl.DateTimeFormat('en-IN', {
    hour: 'numeric',
    timeZone: 'Asia/Kolkata',
  }).format(new Date(datetime))
}

export default function HourlyChart({ hours }) {
  const readings = hours
    .map((reading) => ({
      datetime: reading.period?.datetimeFrom?.utc,
      aqi: pm25ToAqi(reading.value),
    }))
    .filter((reading) => reading.datetime && reading.aqi !== null)
  const highestAqi = Math.max(...readings.map((reading) => reading.aqi), 1)

  return (
    <section className="rounded-xl bg-paper p-6">
      <h2 className="text-2xl font-semibold text-ink">Hourly PM2.5</h2>
      <p className="mt-2 text-sm text-ink-muted">The most recent 24 hours of station readings.</p>
      {readings.length === 0 ? (
        <p className="mt-8 text-sm text-ink-muted">No hourly readings are available yet.</p>
      ) : (
        <div className="mt-8 overflow-x-auto">
          <div className="flex h-48 min-w-[36rem] items-end gap-1 border-b border-ink/10 px-2" aria-label="Hourly AQI chart">
            {readings.map((reading) => (
              <div key={reading.datetime} className="flex flex-1 flex-col items-center justify-end gap-2">
                <span className="font-mono text-[10px] text-ink-muted">{reading.aqi}</span>
                <div
                  className="w-full rounded-t bg-aqi-unhealthy"
                  style={{ height: `${Math.max((reading.aqi / highestAqi) * 100, 4)}%` }}
                  title={`${formatHour(reading.datetime)}: AQI ${reading.aqi}`}
                />
                <span className="text-[10px] text-ink-muted">{formatHour(reading.datetime)}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </section>
  )
}
