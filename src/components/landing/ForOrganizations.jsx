import { ArrowRight } from 'lucide-react'
import { organizations } from '../../data/organizations.js'

export default function ForOrganizations() {
  return (
    <section id="organizations" className="bg-charcoal-soft text-haze">
      <div className="max-w-7xl mx-auto px-6 md:px-10 py-16 md:py-24">

        {/* Header */}
        <div className="max-w-xl mb-12">
          <p className="text-xs uppercase tracking-[0.2em] text-accent-amber mb-3">
            For organizations
          </p>
          <h2 className="text-3xl md:text-4xl font-semibold leading-tight">
            Clean air for every environment you're responsible for
          </h2>
        </div>

        {/* Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {organizations.map((org) => (
            <article
              key={org.id}
              className="group relative overflow-hidden rounded-xl bg-charcoal cursor-pointer"
            >
              {/* Image */}
              <div className="relative h-48 overflow-hidden">
                <img
                  src={org.image}
                  alt={org.title}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                {/* Gradient overlay — always visible at bottom */}
                <div
                  className="absolute inset-0 bg-gradient-to-t from-charcoal via-charcoal/40 to-transparent"
                  aria-hidden="true"
                />

                {/* Title overlaid on image */}
                <h3 className="absolute bottom-3 left-4 right-4 font-display font-semibold text-base leading-snug">
                  {org.title}
                </h3>
              </div>

              {/* Description + CTA */}
              <div className="p-5">
                <p className="text-sm text-haze/60 leading-relaxed mb-4">
                  {org.description}
                </p>

                {/* Learn more — slides in on hover */}
                <span className="flex items-center gap-1.5 text-xs font-medium text-accent-amber opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                  Learn more <ArrowRight size={12} aria-hidden="true" />
                </span>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
