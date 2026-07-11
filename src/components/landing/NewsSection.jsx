import { Clock } from 'lucide-react'
import { Link } from 'react-router-dom'
import { news } from '../../data/news.js'

export default function NewsSection() {
  return (
    <section id="news" className="bg-haze">
      <div className="max-w-7xl mx-auto px-6 md:px-10 py-16 md:py-24">

        {/* Header */}
        <div className="flex items-end justify-between mb-12">
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-ink-muted mb-3">
              Latest coverage
            </p>
            <h2 className="text-3xl md:text-4xl font-semibold text-ink">Air Quality News</h2>
          </div>
          <a
            href="#news"
            className="text-sm underline underline-offset-4 text-ink-muted hover:text-ink transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-amber rounded hidden md:block"
          >
            View all articles
          </a>
        </div>

        {/* Cards */}
        <div className="grid md:grid-cols-3 gap-6">
          {news.map((item) => (
            <article
              key={item.id}
              className="group bg-paper rounded-xl border border-ink/5 p-6 flex flex-col hover:shadow-lg transition-shadow duration-200"
            >
              {/* Tag */}
              <span className="inline-flex self-start items-center rounded-full bg-accent-amber/15 text-accent-amber px-3 py-1 text-xs font-semibold mb-4">
                {item.tag}
              </span>

              {/* Title */}
              <h3 className="font-display font-semibold text-ink text-lg mb-3 leading-snug group-hover:text-accent-amber transition-colors duration-150">
                {item.title}
              </h3>

              {/* Excerpt */}
              <p className="text-sm text-ink-muted leading-relaxed mb-6 flex-1">
                {item.excerpt}
              </p>

              {/* Footer row */}
              <div className="flex items-center justify-between pt-4 border-t border-ink/5">
                {item.readTime && (
                  <span className="flex items-center gap-1.5 text-xs text-ink-muted">
                    <Clock size={12} aria-hidden="true" />
                    {item.readTime}
                  </span>
                )}
                <Link
                  to={`/news/${item.id}`}
                  className="text-sm font-medium text-ink underline underline-offset-4 hover:text-accent-amber transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-amber rounded ml-auto"
                >
                  Read more
                </Link>
              </div>
            </article>
          ))}
        </div>

        {/* Mobile "View all" */}
        <div className="mt-8 text-center md:hidden">
          <a
            href="#news"
            className="text-sm underline underline-offset-4 text-ink-muted hover:text-ink"
          >
            View all articles
          </a>
        </div>
      </div>
    </section>
  )
}
