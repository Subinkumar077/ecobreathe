import { aqiBands } from '../../data/aqi.js'

// Static class maps so Tailwind JIT can detect them
const ACCENT_COLOR = {
  good:      'bg-aqi-good      text-aqi-good',
  moderate:  'bg-aqi-moderate  text-aqi-moderate',
  unhealthy: 'bg-aqi-unhealthy text-aqi-unhealthy',
  hazardous: 'bg-aqi-hazardous text-aqi-hazardous',
}

const BORDER_COLOR = {
  good:      'border-l-aqi-good',
  moderate:  'border-l-aqi-moderate',
  unhealthy: 'border-l-aqi-unhealthy',
  hazardous: 'border-l-aqi-hazardous',
}

export default function UnderstandYourAir() {
  return (
    <section id="understand" className="bg-haze">
      <div className="max-w-7xl mx-auto px-6 md:px-10 py-16 md:py-24">

        {/* Header */}
        <div className="max-w-2xl mb-12">
          <p className="text-xs uppercase tracking-[0.2em] text-ink-muted mb-3">
            Understand your air
          </p>
          <h2 className="text-3xl md:text-4xl font-semibold text-ink">
            One number, four bands, one clear action
          </h2>
        </div>

        {/* Cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {aqiBands.map((band) => (
            <article
              key={band.id}
              className={`group bg-paper rounded-xl p-6 border border-ink/5 border-l-4 ${BORDER_COLOR[band.id]} transition-all duration-200 hover:-translate-y-1 hover:shadow-lg`}
            >
              {/* Color dot + label row */}
              <div className="flex items-center gap-3 mb-4">
                <span
                  className={`inline-block h-3 w-3 rounded-full ${ACCENT_COLOR[band.id].split(' ')[0]}`}
                  aria-hidden="true"
                />
                <p className="font-display font-semibold text-ink">{band.label}</p>
              </div>

              {/* AQI range badge */}
              <p className="font-mono text-xs text-ink-muted mb-4 bg-ink/5 inline-block rounded px-2 py-0.5">
                AQI {band.range}
              </p>

              {/* Guidance */}
              <p className="text-sm text-ink-muted leading-relaxed">{band.guidance}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
