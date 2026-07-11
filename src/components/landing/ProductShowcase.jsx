import { Link } from 'react-router-dom'
import { products } from '../../data/products.js'
import Button from '../ui/Button.jsx'

const CATEGORY_COLOR = {
  Mask:     'bg-aqi-good/20 text-aqi-good',
  Purifier: 'bg-accent-amber/20 text-accent-amber',
  Monitor:  'bg-aqi-unhealthy/20 text-aqi-unhealthy',
}

export default function ProductShowcase() {
  return (
    <section id="products" className="bg-charcoal-soft text-haze">
      <div className="max-w-7xl mx-auto px-6 md:px-10 py-16 md:py-24">

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-accent-amber mb-3">
              Clean air solutions
            </p>
            <h2 className="text-3xl md:text-4xl font-semibold max-w-lg">
              Proven protection for every room and routine
            </h2>
          </div>
          <Button variant="outline" as="a" href="#products" className="shrink-0">
            Shop all solutions
          </Button>
        </div>

        {/* Product cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product) => (
            <article
              key={product.id}
              className="group bg-charcoal rounded-xl overflow-hidden flex flex-col transition-transform duration-200 hover:-translate-y-1 hover:shadow-2xl"
            >
              {/* Image with category badge */}
              <div className="relative h-52 overflow-hidden">
                <img
                  src={product.image}
                  alt={product.name}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <span
                  className={`absolute top-3 left-3 rounded-full px-3 py-1 text-xs font-semibold ${CATEGORY_COLOR[product.category] ?? 'bg-haze/20 text-haze'}`}
                >
                  {product.category}
                </span>
              </div>

              {/* Body */}
              <div className="p-6 flex flex-col flex-1">
                <h3 className="font-display font-semibold text-lg mb-2 leading-snug">
                  {product.name}
                </h3>
                <p className="text-sm text-haze/60 leading-relaxed mb-5 flex-1">
                  {product.blurb}
                </p>

                {/* Feature tags */}
                {product.features && (
                  <div className="flex flex-wrap gap-1.5 mb-5">
                    {product.features.map((feat) => (
                      <span
                        key={feat}
                        className="rounded border border-haze/15 bg-haze/5 px-2.5 py-0.5 text-xs text-haze/60"
                      >
                        {feat}
                      </span>
                    ))}
                  </div>
                )}

                {/* Price + link */}
                <div className="flex items-center justify-between pt-4 border-t border-haze/10">
                  <span className="font-mono text-accent-amber font-semibold">
                    {product.price}
                  </span>
                  <Link
                    to={`/products/${product.id}`}
                    className="text-sm font-medium text-haze/70 underline underline-offset-4 hover:text-accent-amber transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-amber rounded"
                  >
                    View details
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
