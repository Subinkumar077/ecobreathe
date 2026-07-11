import { Menu, Wind, X } from 'lucide-react'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import CitySearch from './CitySearch.jsx'

const NAV_LINKS = [
  { label: 'Air Quality Map', href: '#air-quality-map' },
  { label: 'Products', href: '#products' },
  { label: 'For Organizations', href: '#organizations' },
  { label: 'News', href: '#news' },
  { label: 'Learn', href: '#understand' },
]

export default function Header({ onCitySelect }) {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 bg-charcoal/95 backdrop-blur-md border-b border-white/8 text-haze">
      <div className="max-w-7xl mx-auto px-6 md:px-10 h-16 flex items-center justify-between gap-6">

        {/* Brand */}
        <Link
          to="/"
          className="flex items-center gap-2 font-display font-semibold text-lg tracking-tight shrink-0 hover:opacity-90 transition-opacity"
        >
          <Wind size={20} className="text-accent-amber" aria-hidden="true" />
          <span>Eco Breathe</span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden lg:flex items-center gap-7 text-sm" aria-label="Main navigation">
          {NAV_LINKS.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="relative text-haze/90 hover:text-accent-amber transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-amber rounded after:absolute after:-bottom-0.5 after:left-0 after:h-px after:w-0 after:bg-accent-amber after:transition-all after:duration-200 hover:after:w-full"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* City search (desktop) */}
        <div className="hidden md:block w-56 shrink-0">
          <CitySearch onSelect={onCitySelect} />
        </div>

        {/* Mobile hamburger */}
        <button
          className="lg:hidden p-2 rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-amber transition-colors hover:bg-haze/10"
          onClick={() => setMenuOpen((open) => !open)}
          aria-expanded={menuOpen}
          aria-label="Toggle navigation menu"
        >
          {menuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile city search (always visible on small) */}
      <div className="md:hidden px-6 pb-3 border-t border-white/8 pt-3">
        <CitySearch onSelect={onCitySelect} />
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <nav
          className="lg:hidden border-t border-white/10 bg-midnight px-6 py-5 flex flex-col gap-5 text-sm"
          aria-label="Mobile navigation"
        >
          {NAV_LINKS.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="text-haze hover:text-accent-amber transition-colors"
              onClick={() => setMenuOpen(false)}
            >
              {link.label}
            </a>
          ))}
        </nav>
      )}
    </header>
  )
}
