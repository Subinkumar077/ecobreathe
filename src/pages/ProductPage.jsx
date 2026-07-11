import { Link, useParams } from 'react-router-dom'
import Button from '../components/ui/Button.jsx'
import { products } from '../data/products.js'

export default function ProductPage() {
  const { id } = useParams()
  const product = products.find((item) => item.id === id)

  if (!product) {
    return (
      <div className="bg-haze py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-6 md:px-10">
          <h1 className="text-4xl font-bold text-ink">Product not found</h1>
          <Link to="/#products" className="mt-6 inline-block text-sm font-medium text-ink underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-amber">
            Browse clean air solutions
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-haze py-12 md:py-16">
      <article className="mx-auto max-w-7xl px-6 md:px-10">
        <Link to="/#products" className="text-sm font-medium text-ink-muted underline-offset-4 hover:text-ink hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-amber">
          ? Back to products
        </Link>
        <div className="mt-8 grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-start">
          <div className="rounded-xl bg-charcoal p-8 text-haze md:p-12">
            <p className="text-xs font-medium uppercase tracking-[0.2em] text-accent-amber">{product.category}</p>
            <h1 className="mt-4 text-4xl font-bold leading-tight md:text-6xl">{product.name}</h1>
            <p className="mt-6 max-w-2xl text-base leading-relaxed text-haze/70 md:text-lg">{product.description}</p>
            <p className="mt-8 font-mono text-2xl text-accent-amber">{product.price}</p>
          </div>
          <aside className="rounded-xl bg-paper p-8">
            <h2 className="text-2xl font-semibold text-ink">Best for</h2>
            <p className="mt-3 leading-relaxed text-ink-muted">{product.idealFor}</p>
            <h2 className="mt-8 text-2xl font-semibold text-ink">Key features</h2>
            <ul className="mt-4 space-y-3 text-ink-muted">
              {product.features.map((feature) => (
                <li key={feature} className="flex gap-3">
                  <span aria-hidden="true" className="mt-2 h-2 w-2 shrink-0 rounded-full bg-accent-amber" />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
            <Button as="a" href="#products" variant="outlineDark" className="mt-10 w-full">Find a retailer</Button>
          </aside>
        </div>
      </article>
    </div>
  )
}
