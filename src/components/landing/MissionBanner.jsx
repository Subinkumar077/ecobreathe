import Button from '../ui/Button.jsx'

const missionImage =
  'https://images.unsplash.com/photo-1464278533981-50106e6176b1?auto=format&fit=crop&w=1800&q=80'

export default function MissionBanner() {
  return (
    <section id="mission" className="relative overflow-hidden bg-charcoal text-haze">
      {/* Background image */}
      <img
        src={missionImage}
        alt="Lush green valley landscape"
        className="absolute inset-0 h-full w-full object-cover opacity-30"
      />

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-charcoal/70 via-charcoal/50 to-charcoal/80" aria-hidden="true" />

      {/* Content */}
      <div className="relative max-w-7xl mx-auto px-6 md:px-10 py-24 md:py-36 text-center flex flex-col items-center">
        <p className="text-xs uppercase tracking-[0.2em] text-accent-amber mb-5">Our mission</p>

        {/* Decorative quote mark */}
        <div className="text-haze/10 font-display text-[10rem] leading-none select-none -mb-12 mt-2" aria-hidden="true">"</div>

        <h2 className="text-3xl md:text-5xl font-semibold max-w-2xl leading-tight mb-6 relative z-10">
          A cleaner breath for every Delhi household
        </h2>

        <p className="text-haze/70 max-w-xl mb-10 leading-relaxed">
          Clear data is the first step toward cleaner decisions — at home, at school,
          and across the city. Eco Breathe makes that data accessible, immediate, and actionable.
        </p>

        <Button variant="outline" as="a" href="#air-quality-map">
          Explore the live map
        </Button>
      </div>
    </section>
  )
}
