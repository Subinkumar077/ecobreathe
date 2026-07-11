import { partners } from '../../data/partners.js'

export default function TrustedBy() {
  return (
    <section className="bg-haze border-y border-ink/5 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-10 py-10">
        <p className="text-xs uppercase tracking-[0.2em] text-ink-muted text-center mb-8">
          Trusted by hospitals, universities, and health organizations
        </p>

        {/* Faded edges + partner strip */}
        <div className="relative">
          {/* Left fade */}
          <div
            className="pointer-events-none absolute left-0 top-0 h-full w-16 bg-gradient-to-r from-haze to-transparent z-10"
            aria-hidden="true"
          />
          {/* Right fade */}
          <div
            className="pointer-events-none absolute right-0 top-0 h-full w-16 bg-gradient-to-l from-haze to-transparent z-10"
            aria-hidden="true"
          />

          <div className="flex flex-wrap justify-center gap-x-10 gap-y-3 px-8">
            {partners.map((partner, i) => (
              <span
                key={partner}
                className="font-display text-sm md:text-base text-ink-muted hover:text-ink transition-colors cursor-default select-none"
              >
                {partner}
                {i < partners.length - 1 && (
                  <span className="ml-10 text-ink/20 hidden md:inline" aria-hidden="true">·</span>
                )}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
