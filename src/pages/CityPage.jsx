import { Link, useParams } from 'react-router-dom'
import HourlyChart from '../components/city/HourlyChart.jsx'
import SevenDayTrend from '../components/city/SevenDayTrend.jsx'
import useCityHistory from '../hooks/useCityHistory.js'

export default function CityPage({ city }) {
  const { slug } = useParams()
  const { hours, days, error, loading, retry } = useCityHistory(city)
  const pageTitle = slug === 'delhi' ? 'Delhi' : city.name

  return (
    <div className="bg-haze py-12 md:py-16">
      <div className="mx-auto max-w-7xl px-6 md:px-10">
        <Link
          to="/"
          className="text-sm font-medium text-ink-muted underline-offset-4 hover:text-ink hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-amber"
        >
          ? Back to live map
        </Link>
        <div className="mt-8 max-w-2xl">
          <p className="text-xs font-medium uppercase tracking-[0.2em] text-aqi-unhealthy">City detail</p>
          <h1 className="mt-3 text-4xl font-bold text-ink md:text-6xl">{pageTitle} air quality</h1>
          <p className="mt-4 text-base leading-relaxed text-ink-muted md:text-lg">
            PM2.5 measurements from OpenAQ. The data below shows observed station history.
          </p>
        </div>

        {loading && <p className="mt-12 font-mono text-sm text-ink-muted">Loading city history</p>}
        {error && (
          <div className="mt-12 text-sm text-aqi-unhealthy">
            <p>{error}</p>
            <button
              type="button"
              onClick={retry}
              className="mt-3 text-xs font-medium uppercase tracking-[0.15em] underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-amber"
            >
              Try again
            </button>
          </div>
        )}
        {!loading && !error && (
          <div className="mt-12 grid gap-6 lg:grid-cols-2">
            <HourlyChart hours={hours} />
            <SevenDayTrend days={days} />
          </div>
        )}
      </div>
    </div>
  )
}
