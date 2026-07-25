import { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import {
  Star, Check, ChevronDown, ChevronUp, ShoppingCart,
  Wind, Zap, Wifi, Shield, Leaf, Volume2,
  ArrowUpRight, Smartphone, Apple
} from 'lucide-react';

/* ─── tiny helpers ─── */
const Rating = ({ score = 5, count }) => (
  <div className="flex items-center gap-2">
    <div className="flex">
      {[1, 2, 3, 4, 5].map(i => (
        <Star
          key={i}
          size={14}
          className={i <= Math.round(score) ? 'text-amber-400 fill-amber-400' : 'text-gray-300 fill-gray-300'}
        />
      ))}
    </div>
    {count && <span className="text-sm text-black/50">{count.toLocaleString()} reviews</span>}
  </div>
);

const Badge = ({ children, variant = 'green' }) => {
  const cls = {
    green: 'bg-[#E4EFDA] text-[#1E4D33]',
    dark: 'bg-[#12281A]/10 text-[#12281A]',
  }[variant];
  return (
    <span className={`inline-block text-[11px] font-semibold uppercase tracking-widest px-3 py-1 rounded-full ${cls}`}>
      {children}
    </span>
  );
};

/* ─── data ─── */
const FEATURES = [
  { icon: Wind,    title: 'True HEPA H13',      desc: 'Captures 99.97% of particles down to 0.1 µm — pet dander, smoke, mold, bacteria.' },
  { icon: Zap,     title: 'Ultra-Quiet 18 dB',   desc: 'Whisper-quiet on sleep mode. Even at max fan speed you can hold a conversation.' },
  { icon: Wifi,    title: 'EcoBreathe App',      desc: 'Real-time AQI from your home sensor synced to the same map you already love.' },
  { icon: Shield,  title: 'Activated Carbon',    desc: 'Dual-layer carbon filter absorbs VOCs, cooking odors, and off-gassing furniture.' },
  { icon: Leaf,    title: '< 5 W on Eco Mode',   desc: 'Runs cheaper than an LED bulb on eco mode. Auto-adjusts to your indoor AQI.' },
  { icon: Volume2, title: '360° Airflow',         desc: 'Cylindrical design pulls air from every direction — no "dead zones" in the room.' },
];

const SPECS = [
  ['Coverage area', 'Up to 540 sq ft'],
  ['CADR', '230 m³/h'],
  ['Noise level', '18 – 52 dB'],
  ['Filter life', '6 – 12 months'],
  ['Power', '5 – 45 W'],
  ['Connectivity', 'Wi-Fi 2.4 GHz'],
  ['Weight', '3.8 kg'],
  ['Dimensions', '⌀ 21 × 36 cm'],
];

const TESTIMONIALS = [
  {
    name: 'Priya S.',
    role: 'Allergist, Bengaluru',
    rating: 5,
    text: '"My asthma attacks dropped significantly within two weeks of running the EcoBreath Pro. The app integration is genuinely the best I\'ve seen on any consumer purifier."',
  },
  {
    name: 'Marcus T.',
    role: 'Work-from-home dad, London',
    rating: 5,
    text: '"Set it up in the nursery. Sleep tracking improved for both baby and us — quieter than our white noise machine on sleep mode."',
  },
  {
    name: 'Yuki N.',
    role: 'Interior designer, Tokyo',
    rating: 5,
    text: '"Finally a purifier that doesn\'t look like an eyesore. Blends perfectly with any aesthetic and the 360° airflow actually works unlike cheaper cylindrical ones."',
  },
];

const FAQS = [
  { q: 'When should I replace the filter?', a: 'The app will notify you when filter efficiency drops. Typical life is 6–12 months depending on local air quality and daily usage hours.' },
  { q: 'Is it compatible with smart-home systems?', a: 'Yes — works with Amazon Alexa, Google Home, and Apple HomeKit out of the box via the EcoBreathe app.' },
  { q: 'Does it remove viruses and bacteria?', a: 'The H13 True HEPA layer captures 99.97% of particles ≥ 0.1 µm, which includes most airborne bacteria and viruses.' },
  { q: 'What is the return policy?', a: '30-day no-questions-asked returns. If you\'re not satisfied with the air quality improvement we\'ll pick it up for free.' },
  { q: 'Is there a warranty?', a: 'Two-year manufacturer warranty on the device. Filter consumables are not covered but replacements ship free for the first year.' },
];

/* ─── FAQ accordion ─── */
const FAQ = ({ q, a }) => {
  const [open, setOpen] = useState(false);
  return (
    <button
      onClick={() => setOpen(p => !p)}
      className="w-full text-left border-b border-black/10 py-5 group"
    >
      <div className="flex items-center justify-between gap-4">
        <p className="font-['Geist'] text-base font-medium text-[#12281A] group-hover:text-[#1E4D33] transition-colors">
          {q}
        </p>
        {open
          ? <ChevronUp size={18} className="shrink-0 text-[#1E4D33]" />
          : <ChevronDown size={18} className="shrink-0 text-black/40" />}
      </div>
      {open && (
        <p className="mt-3 text-sm text-black/60 leading-relaxed pr-8">{a}</p>
      )}
    </button>
  );
};

/* ─── main component ─── */
const Shop = () => {
  const [qty, setQty] = useState(1);
  const heroRef = useRef(null);

  useEffect(() => {
    const io = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('is-in'); io.unobserve(e.target); } }),
      { threshold: 0.1 }
    );
    document.querySelectorAll('[data-reveal]').forEach(el => io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <div className="bg-[#FBFAF7] text-[#12281A] antialiased font-['Inter'] overflow-hidden">

      {/* HERO */}
      <section ref={heroRef} className="relative bg-[#FBFAF7] pt-16 pb-0 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 sm:px-10">
          {/* breadcrumb */}
          <div className="flex items-center gap-2 text-xs text-black/40 mb-10 pt-6" data-reveal="">
            <Link to="/" className="hover:text-black transition-colors hover:no-underline">Home</Link>
            <span>/</span>
            <span className="text-black/60">Shop</span>
            <span>/</span>
            <span className="text-[#1E4D33] font-medium">EcoBreath Pro</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            {/* Left – product image */}
            <div className="relative" data-reveal="">
              <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-[#E4EFDA] via-[#EBF4E3] to-[#D4E8C8] aspect-square flex items-center justify-center shadow-2xl shadow-black/10">
                <img
                  src="/air-purifier-hero.png"
                  alt="EcoBreath Pro Air Purifier"
                  className="w-4/5 h-4/5 object-contain drop-shadow-2xl hover:scale-105 transition-transform duration-700"
                />
                {/* floating AQI badge */}
                <div className="absolute top-6 right-6 bg-white/90 backdrop-blur-sm rounded-2xl px-4 py-3 shadow-lg border border-white/60">
                  <p className="text-[10px] text-black/50 uppercase tracking-wider mb-0.5">Indoor AQI</p>
                  <p className="font-['Geist'] text-2xl font-semibold text-[#42A85D]">12</p>
                  <p className="text-[10px] text-[#42A85D] font-medium">Excellent</p>
                </div>
                {/* floating filter badge */}
                <div className="absolute bottom-6 left-6 bg-white/90 backdrop-blur-sm rounded-2xl px-4 py-3 shadow-lg border border-white/60">
                  <p className="text-[10px] text-black/50 uppercase tracking-wider mb-0.5">Filter life</p>
                  <div className="flex items-center gap-1.5 mt-1">
                    <div className="h-1.5 w-20 rounded-full bg-black/10 overflow-hidden">
                      <div className="h-full w-3/4 rounded-full bg-[#42A85D]" />
                    </div>
                    <p className="text-xs font-semibold text-[#12281A]">74%</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right – product details */}
            <div data-reveal="">
              <div className="flex flex-wrap gap-2 mb-5">
                <Badge variant="green">Best Seller</Badge>
                <Badge variant="dark">New 2025</Badge>
              </div>
              <h1 className="font-['Geist'] text-4xl sm:text-5xl font-light tracking-tighter leading-tight mb-2">
                EcoBreath <em className="font-['Instrument_Serif'] italic font-normal">Pro</em>
              </h1>
              <p className="text-black/50 text-base mb-4">Smart Air Purifier with HEPA H13 + App Control</p>
              <Rating score={4.9} count={2847} />

              <div className="mt-6 mb-8 pb-8 border-b border-black/10">
                <div className="flex items-baseline gap-3">
                  <span className="font-['Geist'] text-4xl font-semibold text-[#12281A]">₹12,999</span>
                  <span className="text-lg text-black/30 line-through">₹18,999</span>
                  <Badge variant="green">32% off</Badge>
                </div>
                <p className="text-sm text-black/40 mt-1.5">Inclusive of all taxes. Free shipping across India.</p>
              </div>

              {/* feature pills */}
              <div className="flex flex-wrap gap-2 mb-8">
                {['True HEPA H13', 'Activated Carbon', 'Wi-Fi Control', '< 18 dB Sleep Mode', '2-Year Warranty'].map(f => (
                  <span key={f} className="inline-flex items-center gap-1.5 text-xs font-medium text-[#1E4D33] bg-[#E4EFDA] px-3 py-1.5 rounded-full">
                    <Check size={11} />
                    {f}
                  </span>
                ))}
              </div>

              {/* quantity + CTA */}
              <div className="flex items-center gap-3 mb-4">
                <div className="flex items-center border border-black/15 rounded-full overflow-hidden">
                  <button
                    onClick={() => setQty(q => Math.max(1, q - 1))}
                    className="px-4 py-2.5 text-black/60 hover:bg-black/5 transition-colors text-lg leading-none"
                  >−</button>
                  <span className="px-4 font-['Geist'] font-medium text-sm">{qty}</span>
                  <button
                    onClick={() => setQty(q => q + 1)}
                    className="px-4 py-2.5 text-black/60 hover:bg-black/5 transition-colors text-lg leading-none"
                  >+</button>
                </div>
                <button className="flex-1 flex items-center justify-center gap-2.5 bg-[#1E4D33] hover:bg-[#2A6647] active:scale-95 text-white font-medium text-sm px-7 py-3.5 rounded-full transition-all duration-300 shadow-xl shadow-[#1E4D33]/30 hover:shadow-2xl hover:shadow-[#1E4D33]/40">
                  <ShoppingCart size={16} />
                  Add to Cart — ₹{(12999 * qty).toLocaleString()}
                </button>
              </div>
              <button className="w-full border border-[#1E4D33] text-[#1E4D33] hover:bg-[#E4EFDA] font-medium text-sm px-7 py-3.5 rounded-full transition-all duration-300">
                Buy Now
              </button>

              <p className="text-xs text-black/40 mt-4 text-center">🔒 Secure checkout · 30-day returns · Ships in 2–4 days</p>
            </div>
          </div>
        </div>
      </section>

      {/* ROOM SCENES */}
      <section className="py-20 sm:py-28 bg-[#FBFAF7]">
        <div className="max-w-7xl mx-auto px-6 sm:px-10">
          <div className="mb-10" data-reveal="">
            <p className="text-xs uppercase tracking-[0.25em] text-[#1E4D33] font-medium mb-3">Designed for every space</p>
            <h2 className="font-['Geist'] text-3xl sm:text-4xl font-light tracking-tighter">
              Fits perfectly in your <em className="font-['Instrument_Serif'] italic font-normal">life.</em>
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5" data-reveal="">
            {[
              { img: 'https://images.unsplash.com/photo-1598928506311-c55ded91a20c?w=800&q=80', label: 'Living Room', desc: 'Covers up to 540 sq ft' },
              { img: 'https://images.unsplash.com/photo-1540518614846-7eded433c457?w=800&q=80', label: 'Bedroom', desc: '18 dB whisper-quiet sleep mode' },
              { img: 'https://images.unsplash.com/photo-1593642632559-0c6d3fc62b89?w=800&q=80', label: 'Home Office', desc: 'Focus better with cleaner air' },
            ].map((s, i) => (
              <div key={i} className="group relative rounded-2xl overflow-hidden aspect-[4/3] shadow-xl shadow-black/10">
                <img src={s.img} alt={s.label} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                <div className="absolute bottom-0 left-0 p-5">
                  <p className="font-['Geist'] text-white font-medium">{s.label}</p>
                  <p className="text-white/60 text-xs mt-0.5">{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="bg-[#1E4D33] py-20 sm:py-28">
        <div className="max-w-7xl mx-auto px-6 sm:px-10">
          <div className="mb-12 text-center" data-reveal="">
            <p className="text-xs uppercase tracking-[0.25em] text-[#42A85D] font-medium mb-3">What the experts say</p>
            <h2 className="font-['Geist'] text-3xl sm:text-4xl font-light tracking-tighter text-white">
              Trusted by people who care about <em className="font-['Instrument_Serif'] italic font-normal">clean air.</em>
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6" data-reveal="">
            {TESTIMONIALS.map((t, i) => (
              <div key={i} className="bg-white/10 backdrop-blur-sm border border-white/10 rounded-2xl p-7 flex flex-col gap-4">
                <Rating score={t.rating} />
                <p className="text-white/80 text-sm leading-relaxed flex-1">{t.text}</p>
                <div>
                  <p className="text-white font-medium text-sm">{t.name}</p>
                  <p className="text-white/40 text-xs">{t.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURES GRID */}
      <section className="bg-[#FBFAF7] py-20 sm:py-28">
        <div className="max-w-7xl mx-auto px-6 sm:px-10">
          <div className="mb-14" data-reveal="">
            <p className="text-xs uppercase tracking-[0.25em] text-[#1E4D33] font-medium mb-3">Why EcoBreathe Pro is better</p>
            <h2 className="font-['Geist'] text-3xl sm:text-4xl font-light tracking-tighter">
              Technology built around <em className="font-['Instrument_Serif'] italic font-normal">real science.</em>
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6" data-reveal="">
            {FEATURES.map(({ icon: Icon, title, desc }) => (
              <div key={title} className="group bg-white rounded-2xl border border-black/5 p-7 hover:shadow-xl hover:shadow-black/8 hover:-translate-y-1 transition-all duration-300">
                <div className="w-11 h-11 rounded-xl bg-[#E4EFDA] flex items-center justify-center mb-5 group-hover:bg-[#1E4D33] transition-colors duration-300">
                  <Icon size={20} className="text-[#1E4D33] group-hover:text-white transition-colors duration-300" />
                </div>
                <p className="font-['Geist'] font-medium text-base mb-2">{title}</p>
                <p className="text-sm text-black/55 leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SPECS TABLE */}
      <section className="bg-[#E4EFDA] py-20 sm:py-28">
        <div className="max-w-7xl mx-auto px-6 sm:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div data-reveal="">
              <p className="text-xs uppercase tracking-[0.25em] text-[#1E4D33] font-medium mb-4">Technical Specs</p>
              <h2 className="font-['Geist'] text-3xl sm:text-4xl font-light tracking-tighter mb-10">
                Precision <em className="font-['Instrument_Serif'] italic font-normal">engineering.</em>
              </h2>
              {SPECS.map(([label, value]) => (
                <div key={label} className="flex items-center justify-between py-3.5 border-b border-black/10 last:border-0">
                  <span className="text-sm text-black/55">{label}</span>
                  <span className="text-sm font-medium text-[#12281A]">{value}</span>
                </div>
              ))}
            </div>
            <div className="space-y-4" data-reveal="">
              <p className="text-xs uppercase tracking-[0.25em] text-[#1E4D33] font-medium mb-6">EcoBreathe Pro vs Others</p>
              {[
                { label: 'CADR (m³/h)', ours: 92, theirs: 61 },
                { label: 'Filter efficiency', ours: 99, theirs: 74 },
                { label: 'Noise rating (lower = better)', ours: 82, theirs: 50 },
                { label: 'App integration score', ours: 97, theirs: 40 },
              ].map(({ label, ours, theirs }) => (
                <div key={label} className="bg-white rounded-2xl p-5 shadow-sm border border-black/5">
                  <p className="text-xs text-black/50 mb-3">{label}</p>
                  <div className="space-y-2">
                    <div>
                      <div className="flex justify-between text-xs mb-1">
                        <span className="font-medium text-[#1E4D33]">EcoBreathe Pro</span>
                        <span className="font-semibold">{ours}%</span>
                      </div>
                      <div className="h-2 w-full bg-[#E4EFDA] rounded-full overflow-hidden">
                        <div className="h-full bg-[#42A85D] rounded-full" style={{ width: `${ours}%` }} />
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between text-xs mb-1">
                        <span className="text-black/40">Category Average</span>
                        <span className="text-black/40">{theirs}%</span>
                      </div>
                      <div className="h-2 w-full bg-black/10 rounded-full overflow-hidden">
                        <div className="h-full bg-black/20 rounded-full" style={{ width: `${theirs}%` }} />
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* APP PROMO */}
      <section className="bg-[#12281A] py-20 sm:py-28 overflow-hidden relative">
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-[#42A85D] blur-3xl" />
          <div className="absolute bottom-0 left-0 w-72 h-72 rounded-full bg-[#42A85D] blur-3xl" />
        </div>
        <div className="relative max-w-7xl mx-auto px-6 sm:px-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div data-reveal="">
            <p className="text-xs uppercase tracking-[0.25em] text-[#42A85D] font-medium mb-5">EcoBreathe App</p>
            <h2 className="font-['Geist'] text-3xl sm:text-5xl font-light tracking-tighter text-white mb-6">
              Your purifier. <br />Your city's air. <br /><em className="font-['Instrument_Serif'] italic font-normal">One app.</em>
            </h2>
            <p className="text-white/60 text-base leading-relaxed mb-10 max-w-md">
              The EcoBreathe app connects your Pro directly to the same global air quality data network. See indoor vs outdoor AQI in real-time, set schedules, and get filter alerts.
            </p>
            <div className="flex flex-wrap gap-3">
              <a href="#" className="flex items-center gap-3 bg-white/10 hover:bg-white/20 border border-white/15 text-white rounded-2xl px-5 py-3.5 transition-all duration-300">
                <Apple size={22} />
                <div className="text-left">
                  <p className="text-[10px] text-white/50 leading-none mb-0.5">Download on the</p>
                  <p className="text-sm font-semibold leading-none">App Store</p>
                </div>
              </a>
              <a href="#" className="flex items-center gap-3 bg-white/10 hover:bg-white/20 border border-white/15 text-white rounded-2xl px-5 py-3.5 transition-all duration-300">
                <Smartphone size={22} />
                <div className="text-left">
                  <p className="text-[10px] text-white/50 leading-none mb-0.5">Get it on</p>
                  <p className="text-sm font-semibold leading-none">Google Play</p>
                </div>
              </a>
            </div>
          </div>
          {/* phone mockup */}
          <div className="flex justify-center lg:justify-end" data-reveal="">
            <div className="relative w-64">
              <div className="bg-gradient-to-br from-[#1E4D33] to-[#0a1a0f] border border-white/10 rounded-[3rem] p-3 shadow-2xl shadow-black/60">
                <div className="bg-[#0a1a0f] rounded-[2.5rem] overflow-hidden p-5">
                  <div className="w-12 h-1.5 bg-white/20 rounded-full mx-auto mb-6" />
                  <p className="text-white/40 text-[10px] uppercase tracking-widest mb-2">Indoor AQI · Now</p>
                  <div className="text-center mb-6">
                    <p className="font-['Geist'] text-6xl font-light text-[#42A85D]">12</p>
                    <p className="text-[#42A85D] text-sm font-medium mt-1">Excellent</p>
                  </div>
                  <div className="bg-white/5 rounded-2xl p-4 mb-3">
                    <div className="flex justify-between text-white/50 text-[10px] mb-2">
                      <span>PM2.5</span><span>2.1 µg/m³</span>
                    </div>
                    <div className="h-1.5 bg-white/10 rounded-full">
                      <div className="h-full w-[15%] bg-[#42A85D] rounded-full" />
                    </div>
                  </div>
                  <div className="bg-white/5 rounded-2xl p-4 mb-3">
                    <div className="flex justify-between text-white/50 text-[10px] mb-2">
                      <span>VOCs</span><span>0.08 ppm</span>
                    </div>
                    <div className="h-1.5 bg-white/10 rounded-full">
                      <div className="h-full w-[8%] bg-[#42A85D] rounded-full" />
                    </div>
                  </div>
                  <div className="bg-white/5 rounded-2xl p-4">
                    <p className="text-white/40 text-[10px] uppercase tracking-widest mb-2">Purifier</p>
                    <div className="flex items-center justify-between">
                      <span className="text-white text-xs font-medium">EcoBreath Pro</span>
                      <span className="text-[10px] bg-[#42A85D]/20 text-[#42A85D] rounded-full px-2 py-0.5">Auto</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="absolute -inset-4 bg-[#42A85D]/10 rounded-full blur-2xl -z-10" />
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-[#FBFAF7] py-20 sm:py-28">
        <div className="max-w-3xl mx-auto px-6 sm:px-10">
          <div className="mb-12 text-center" data-reveal="">
            <p className="text-xs uppercase tracking-[0.25em] text-[#1E4D33] font-medium mb-3">Air Purifier FAQs</p>
            <h2 className="font-['Geist'] text-3xl sm:text-4xl font-light tracking-tighter">
              Frequently asked <em className="font-['Instrument_Serif'] italic font-normal">questions.</em>
            </h2>
          </div>
          <div data-reveal="">
            {FAQS.map(({ q, a }) => <FAQ key={q} q={q} a={a} />)}
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="bg-[#1E4D33] py-20 sm:py-28">
        <div className="max-w-4xl mx-auto px-6 sm:px-10 text-center" data-reveal="">
          <p className="text-xs uppercase tracking-[0.25em] text-[#42A85D] font-medium mb-5">Connect With EcoBreathe</p>
          <h2 className="font-['Geist'] text-3xl sm:text-5xl font-light tracking-tighter text-white mb-6">
            Breathe better, starting <em className="font-['Instrument_Serif'] italic font-normal">today.</em>
          </h2>
          <p className="text-white/60 text-base max-w-lg mx-auto mb-10">
            Join 2 million+ households tracking and improving their indoor air quality with EcoBreathe.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <button className="inline-flex items-center gap-2.5 bg-white text-[#1E4D33] font-semibold text-sm px-8 py-4 rounded-full transition-all duration-300 hover:bg-[#E4EFDA] shadow-xl shadow-black/30 active:scale-95">
              <ShoppingCart size={16} />
              Order EcoBreath Pro
            </button>
            <Link
              to="/"
              className="inline-flex items-center gap-2 text-white/60 hover:text-white text-sm font-medium px-8 py-4 rounded-full border border-white/20 hover:border-white/40 transition-all duration-300 hover:no-underline"
            >
              Explore the App <ArrowUpRight size={14} />
            </Link>
          </div>
          <div className="mt-14 pt-10 border-t border-white/10 flex flex-wrap justify-center gap-6 text-white/30 text-xs">
            {['Twitter', 'Instagram', 'Facebook', 'YouTube', 'LinkedIn'].map(s => (
              <a key={s} href="#" className="hover:text-white transition-colors">{s}</a>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Shop;
