import { Search } from 'lucide-react'
import { useEffect, useId, useState } from 'react'
import useCitySearch from '../../hooks/useCitySearch.js'

export default function CitySearch({ onSelect }) {
  const [query, setQuery] = useState('')
  const [isOpen, setIsOpen] = useState(false)
  const [activeIndex, setActiveIndex] = useState(-1)
  const listboxId = useId()
  const { results, error, loading, retry } = useCitySearch(query)

  useEffect(() => {
    setActiveIndex(-1)
  }, [results])

  function chooseCity(city) {
    setQuery(city.name)
    setIsOpen(false)
    onSelect(city)
  }

  function handleKeyDown(event) {
    if (event.key === 'Escape') {
      setIsOpen(false)
      return
    }

    if (!results.length) return

    if (event.key === 'ArrowDown') {
      event.preventDefault()
      setIsOpen(true)
      setActiveIndex((index) => (index + 1) % results.length)
    }

    if (event.key === 'ArrowUp') {
      event.preventDefault()
      setActiveIndex((index) => (index <= 0 ? results.length - 1 : index - 1))
    }

    if (event.key === 'Enter' && activeIndex >= 0) {
      event.preventDefault()
      chooseCity(results[activeIndex])
    }
  }

  const showResults = isOpen && query.trim().length >= 2

  return (
    <div className="relative w-full">
      <Search size={16} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-ink-muted" />
      <input
        type="search"
        value={query}
        onChange={(event) => {
          setQuery(event.target.value)
          setIsOpen(true)
        }}
        onFocus={() => setIsOpen(true)}
        onKeyDown={handleKeyDown}
        onBlur={() => window.setTimeout(() => setIsOpen(false), 150)}
        placeholder="Search a city"
        className="w-full bg-haze text-ink text-sm rounded-full pl-9 pr-4 py-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-amber"
        role="combobox"
        aria-autocomplete="list"
        aria-expanded={showResults}
        aria-controls={listboxId}
        aria-activedescendant={activeIndex >= 0 ? `${listboxId}-${activeIndex}` : undefined}
      />
      {showResults && (
        <div
          id={listboxId}
          role="listbox"
          className="absolute top-full z-50 mt-2 w-full overflow-hidden rounded-xl bg-paper py-1 text-ink shadow-lg ring-1 ring-charcoal/10"
        >
          {loading && <p className="px-4 py-3 text-sm text-ink-muted">Searching stations…</p>}
                    {error && (
            <div className="px-4 py-3 text-sm text-aqi-unhealthy">
              <p>{error}</p>
              <button
                type="button"
                onClick={retry}
                className="mt-2 text-xs font-medium uppercase tracking-[0.15em] underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-amber"
              >
                Try again
              </button>
            </div>
          )}
          {!loading && !error && results.length === 0 && (
            <p className="px-4 py-3 text-sm text-ink-muted">No PM2.5 stations found.</p>
          )}
          {results.map((city, index) => (
            <button
              key={city.id}
              id={`${listboxId}-${index}`}
              type="button"
              role="option"
              aria-selected={activeIndex === index}
              onMouseDown={(event) => event.preventDefault()}
              onClick={() => chooseCity(city)}
              className={`block w-full px-4 py-3 text-left text-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-accent-amber ${
                activeIndex === index ? 'bg-haze' : 'hover:bg-haze'
              }`}
            >
              <span className="block font-medium">{city.name}</span>
              {city.country && <span className="block text-xs text-ink-muted">{city.country}</span>}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
