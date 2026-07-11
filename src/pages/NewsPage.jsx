import { Link, useParams } from 'react-router-dom'
import { news } from '../data/news.js'

export default function NewsPage() {
  const { slug } = useParams()
  const article = news.find((item) => item.id === slug)

  if (!article) {
    return (
      <div className="bg-haze py-16 md:py-24">
        <div className="mx-auto max-w-3xl px-6 md:px-10">
          <h1 className="text-4xl font-bold text-ink">Article not found</h1>
          <Link to="/#news" className="mt-6 inline-block text-sm font-medium text-ink underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-amber">
            Return to air quality news
          </Link>
        </div>
      </div>
    )
  }

  return (
    <article className="bg-haze py-12 md:py-16">
      <div className="mx-auto max-w-3xl px-6 md:px-10">
        <Link to="/#news" className="text-sm font-medium text-ink-muted underline-offset-4 hover:text-ink hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-amber">
          ? Back to news
        </Link>
        <p className="mt-10 text-xs font-medium uppercase tracking-[0.2em] text-accent-amber">{article.tag}</p>
        <h1 className="mt-4 text-4xl font-bold leading-tight text-ink md:text-6xl">{article.title}</h1>
        <p className="mt-5 font-mono text-sm text-ink-muted">{article.readTime}</p>
        <div className="mt-10 space-y-6 text-base leading-relaxed text-ink-muted md:text-lg">
          {article.body.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
        </div>
      </div>
    </article>
  )
}
