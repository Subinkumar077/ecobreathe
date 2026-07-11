import { Github, Twitter, Linkedin } from 'lucide-react'

const COLUMNS = [
  {
    title: 'Product',
    links: [
      { label: 'Air Quality Map', href: '#air-quality-map' },
      { label: 'Purifiers', href: '#products' },
      { label: 'Masks', href: '#products' },
      { label: 'Monitors', href: '#products' },
      { label: 'Help Me Choose', href: '#help-me-choose' },
    ],
  },
  {
    title: 'Learn',
    links: [
      { label: 'What is AQI?', href: '#understand' },
      { label: 'PM2.5 explained', href: '#understand' },
      { label: 'Indoor vs outdoor air', href: '#understand' },
      { label: 'News', href: '#news' },
    ],
  },
  {
    title: 'Organizations',
    links: [
      { label: 'Schools', href: '#organizations' },
      { label: 'Hospitals & Clinics', href: '#organizations' },
      { label: 'Offices', href: '#organizations' },
      { label: 'Laboratories', href: '#organizations' },
    ],
  },
  {
    title: 'Company',
    links: [
      { label: 'About', href: '#' },
      { label: 'Our Mission', href: '#mission' },
      { label: 'Contact', href: '#' },
      { label: 'Support', href: '#' },
    ],
  },
]

const SOCIALS = [
  { icon: Twitter, label: 'Twitter', href: '#' },
  { icon: Github, label: 'GitHub', href: '#' },
  { icon: Linkedin, label: 'LinkedIn', href: '#' },
]

export default function Footer() {
  return (
    <footer className="bg-charcoal text-haze/70">
      <div className="max-w-7xl mx-auto px-6 md:px-10 pt-16 pb-10">

        {/* Top row: brand + newsletter */}
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-10 mb-14">
          <div className="max-w-xs">
            <p className="font-display font-semibold text-haze text-xl mb-2">Eco Breathe</p>
            <p className="text-sm leading-relaxed">
              Real-time PM2.5 air quality data and guidance for Delhi — powered by{' '}
              <a
                href="https://openaq.org"
                target="_blank"
                rel="noopener noreferrer"
                className="text-accent-amber underline underline-offset-4 hover:text-accent-amber/80 transition-colors"
              >
                OpenAQ
              </a>.
            </p>
          </div>

          {/* Newsletter */}
          <div className="md:max-w-sm w-full">
            <p className="text-xs uppercase tracking-[0.2em] text-haze/50 mb-3">Air quality alerts</p>
            <form
              onSubmit={(e) => e.preventDefault()}
              className="flex gap-2"
              aria-label="Newsletter signup"
            >
              <input
                type="email"
                placeholder="your@email.com"
                className="flex-1 min-w-0 bg-haze/10 border border-haze/20 rounded-full px-4 py-2.5 text-sm text-haze placeholder:text-haze/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-amber"
              />
              <button
                type="submit"
                className="shrink-0 bg-accent-amber text-charcoal font-medium text-sm px-5 py-2.5 rounded-full hover:bg-accent-amber/90 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-amber"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        {/* Link columns */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 mb-14">
          {COLUMNS.map((col) => (
            <div key={col.title}>
              <p className="text-xs uppercase tracking-[0.2em] text-haze/50 mb-4">{col.title}</p>
              <ul className="space-y-2.5 text-sm">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="hover:text-haze transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-amber rounded"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="border-t border-haze/10 pt-6 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-haze/40">
          <p>&copy; {new Date().getFullYear()} Eco Breathe. Data via OpenAQ (CC BY 4.0).</p>

          <div className="flex items-center gap-6">
            <a href="#" className="hover:text-haze/70 transition-colors">Privacy</a>
            <a href="#" className="hover:text-haze/70 transition-colors">Terms</a>
            <div className="flex items-center gap-3 ml-2">
              {SOCIALS.map(({ icon: Icon, label, href }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="hover:text-haze/70 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-amber rounded"
                >
                  <Icon size={16} aria-hidden="true" />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
