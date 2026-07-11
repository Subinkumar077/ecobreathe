import { BarChart2, MapPin, ShoppingBag } from 'lucide-react'
import Button from '../ui/Button.jsx'

const choiceImage =
  'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=900&q=80'

const STEPS = [
  { icon: MapPin,       step: '01', label: 'Check your AQI',        desc: 'See your live local air quality reading.' },
  { icon: BarChart2,    step: '02', label: 'Understand the risk',   desc: "Know what today's number means for you." },
  { icon: ShoppingBag, step: '03', label: 'Pick the right solution', desc: 'Mask, purifier, or monitor — matched to your need.' },
]

export default function HelpMeChoose() {
  return (
    <section id="help-me-choose" className="bg-haze">
      <div className="max-w-7xl mx-auto px-6 md:px-10 py-16 md:py-20">
        <div className="grid overflow-hidden rounded-2xl bg-paper border border-ink/5 shadow-sm md:grid-cols-2">

          {/* Left: copy + steps */}
          <div className="p-8 md:p-12 flex flex-col justify-center">
            <p className="text-xs uppercase tracking-[0.2em] text-ink-muted mb-3">Help me choose</p>
            <h2 className="text-2xl md:text-3xl font-semibold text-ink mb-3 leading-snug">
              Not sure what your home needs?
            </h2>
            <p className="text-ink-muted mb-9 leading-relaxed">
              Start with the air in your space, then find the right mask, purifier, or monitor.
            </p>

            {/* 3-step process */}
            <ol className="space-y-5 mb-9" aria-label="How it works">
              {STEPS.map(({ icon: Icon, step, label, desc }) => (
                <li key={step} className="flex items-start gap-4">
                  <div className="shrink-0 flex items-center justify-center h-9 w-9 rounded-full bg-charcoal text-haze">
                    <Icon size={16} aria-hidden="true" />
                  </div>
                  <div>
                    <p className="font-semibold text-ink text-sm">{label}</p>
                    <p className="text-xs text-ink-muted mt-0.5">{desc}</p>
                  </div>
                </li>
              ))}
            </ol>

            <Button variant="primary" as="a" href="#products" className="self-start">
              Explore solutions
            </Button>
          </div>

          {/* Right: image */}
          <div className="relative h-64 md:h-auto overflow-hidden">
            <img
              src={choiceImage}
              alt="Person checking air quality on a phone"
              className="h-full w-full object-cover"
            />
            {/* Overlay on mobile so image doesn't look bare */}
            <div className="absolute inset-0 bg-gradient-to-t from-charcoal/30 to-transparent md:hidden" aria-hidden="true" />
          </div>
        </div>
      </div>
    </section>
  )
}
