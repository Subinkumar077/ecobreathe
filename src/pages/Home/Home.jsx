import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, ArrowRight, Quote } from 'lucide-react';

const Home = () => {
  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Intersection Observer for reveal animations
    const io = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add('is-in');
          io.unobserve(e.target);
        }
      });
    }, { threshold: 0.15 });
    
    document.querySelectorAll('[data-reveal], [data-panel-img], .word-reveal').forEach(el => io.observe(el));

    // Parallax logic
    if (!reduced) {
      const layers = document.querySelectorAll('[data-parallax]');
      let ticking = false;
      const handleScroll = () => {
        if (!ticking) {
          requestAnimationFrame(() => {
            layers.forEach(el => {
              const rect = el.getBoundingClientRect();
              if (rect.bottom > 0 && rect.top < window.innerHeight) {
                const speed = parseFloat(el.dataset.parallax);
                el.style.transform = 'translateY(' + (window.scrollY * speed % 600).toFixed(1) + 'px)';
              }
            });
            ticking = false;
          });
          ticking = true;
        }
      };
      window.addEventListener('scroll', handleScroll, { passive: true });
      return () => window.removeEventListener('scroll', handleScroll);
    }
  }, []);

  return (
    <div className="bg-[#FBFAF7] text-[#12281A] antialiased font-['Inter'] selection:bg-[#42A85D] selection:text-black overflow-hidden">
      {/* ============ HERO ============ */}
      <header id="top" className="relative min-h-screen overflow-hidden flex flex-col">
        {/* cinematic background */}
        <div className="absolute inset-0" data-parallax="0.15">
          <video 
            src="https://hoirqrkdgbmvpwutwuwj.supabase.co/storage/v1/object/public/generated-videos/9109ecbb-cdc4-4815-981e-2ea83be13765/1782999286314-2d8dfd1d-f5c0-4ad1-81a1-2055a64391da.mp4" 
            autoPlay muted playsInline loop 
            className="w-full h-full object-cover scale-110 opacity-90"
          ></video>
        </div>
        {/* floating translucent forms */}
        <div className="absolute inset-0 pointer-events-none" data-parallax="0.3">
          <div className="drift-a absolute top-[12%] left-[8%] w-40 h-40 sm:w-64 sm:h-64 rounded-full bg-gradient-to-br from-white/25 to-white/5 backdrop-blur-sm border border-white/20 shadow-[inset_0_0_60px_rgba(255,255,255,0.25)]"></div>
          <div className="drift-b absolute top-[28%] right-[10%] w-28 h-28 sm:w-44 sm:h-44 rounded-[40%] bg-gradient-to-tl from-[#42A85D]/25 to-white/10 backdrop-blur-md border border-white/15 shadow-[inset_0_0_40px_rgba(66,168,93,0.3)]"></div>
          <div className="drift-c absolute top-[52%] left-[38%] w-20 h-20 sm:w-32 sm:h-32 rounded-full bg-gradient-to-b from-white/20 to-transparent backdrop-blur-[2px] border border-white/25"></div>
          <div className="drift-b absolute top-[8%] left-[55%] w-14 h-14 sm:w-20 sm:h-20 rounded-[45%] bg-white/10 backdrop-blur-sm border border-white/20"></div>
          <div className="drift-a absolute bottom-[38%] right-[28%] w-16 h-16 sm:w-24 sm:h-24 rounded-full bg-gradient-to-br from-[#42A85D]/20 to-transparent backdrop-blur-sm border border-white/10"></div>
        </div>
        {/* readability gradients */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#FBFAF7] via-[#FBFAF7]/55 to-[#FBFAF7]/10"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-[#FBFAF7]/60 via-transparent to-[#FBFAF7]/30"></div>

        {/* manifesto */}
        <div className="relative z-10 flex-1 flex items-end">
          <div className="max-w-7xl mx-auto w-full px-6 sm:px-10 pb-[24vw] sm:pb-[20vw] lg:pb-[17vw] pt-40">
            <div className="max-w-2xl" data-reveal="">
              <p className="text-xs uppercase tracking-[0.25em] text-[#1E4D33] font-medium mb-8">
                Global Air Quality Platform — est. 2026
              </p>
              <h1 className="font-['Geist'] text-5xl sm:text-7xl lg:text-8xl leading-[0.95] text-[#12281A] font-light tracking-tighter">
                Air quality data that carries weight, precision <br /> and <em className="font-['Instrument_Serif'] italic font-normal">substance.</em>
              </h1>
              <p className="mt-8 text-sm text-black/50 tracking-wide">
                / Track real-time indoor and outdoor pollution anywhere /
              </p>
              <div className="mt-10 flex items-center gap-6">
                <Link to="/dashboard/new-delhi" className="group inline-flex items-center gap-2.5 bg-[#1E4D33] hover:bg-[#2A6647] active:scale-95 text-white font-medium text-base px-7 py-3.5 rounded-full transition-all duration-300 shadow-xl shadow-[#1E4D33]/30 hover:shadow-2xl hover:shadow-[#1E4D33]/40">
                  Enter Dashboard
                  <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </Link>
                <Link to="/map" className="text-sm text-black/50 hover:text-black transition-colors duration-300 border-b border-black/20 hover:border-black pb-0.5">
                  View Map
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* giant cropped wordmark */}
        <div className="absolute -bottom-[4vw] left-1/2 -translate-x-1/2 w-full z-[5] pointer-events-none overflow-hidden" data-parallax="0.5">
          <p className="font-['Geist'] text-[19.5vw] leading-none text-center text-[#1E4D33]/10 whitespace-nowrap select-none font-light tracking-tighter" style={{ WebkitTextStroke: '1px rgba(30, 77, 51, 0.12)' }}>
            ECOBREATHE
          </p>
        </div>
      </header>

      {/* ============ PROJECT REEL (Features) ============ */}
      <section id="features" className="relative pt-24 sm:pt-36 pb-8">
        <div className="max-w-7xl mx-auto px-6 sm:px-10">
          <div className="flex items-end justify-between mb-14" data-reveal="">
            <h2 className="font-['Geist'] text-4xl sm:text-5xl font-light tracking-tighter">
              Platform <em className="font-['Instrument_Serif'] italic font-normal">Features</em>
            </h2>
          </div>
        </div>

        {/* panel 01 */}
        <div className="max-w-7xl mx-auto px-6 sm:px-10 mb-6 sm:mb-10">
          <div className="relative rounded-2xl overflow-hidden aspect-[16/10] sm:aspect-[21/9] shadow-2xl shadow-black/15">
            <video 
              src="https://hoirqrkdgbmvpwutwuwj.supabase.co/storage/v1/object/public/generated-videos/9109ecbb-cdc4-4815-981e-2ea83be13765/1782999930583-dfa026f6-bc70-4ea9-b421-6fd67b3eff53.mp4" 
              autoPlay muted playsInline loop 
              data-panel-img="" 
              className="w-full h-full object-cover"
            ></video>
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent"></div>
            <div className="absolute bottom-0 left-0 p-6 sm:p-10 flex flex-col sm:flex-row sm:items-end sm:justify-between w-full gap-4">
              <div data-reveal="">
                <p className="text-xs text-[#42A85D] font-medium mb-2">01</p>
                <h3 className="font-['Geist'] text-2xl sm:text-3xl font-light tracking-tighter text-white">
                  Real-time Dashboards
                </h3>
                <p className="text-base text-white/60 mt-2 max-w-md">
                  Monitor live PM2.5, PM10, and Ozone levels with precision instruments and beautiful visualizations.
                </p>
              </div>
              <div className="flex gap-2 text-xs text-white/60" data-reveal="">
                <span className="border border-white/20 rounded-full px-3 py-1">Analytics</span>
                <span className="border border-white/20 rounded-full px-3 py-1">Live Data</span>
              </div>
            </div>
          </div>
        </div>

        {/* panels 02 + 03 */}
        <div className="max-w-7xl mx-auto px-6 sm:px-10 grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-10 mb-6 sm:mb-10">
          <div className="lg:col-span-7 lg:-mt-4 relative rounded-2xl overflow-hidden aspect-[4/3] shadow-2xl shadow-black/15">
            <img data-panel-img="" src="https://hoirqrkdgbmvpwutwuwj.supabase.co/storage/v1/object/public/assets/assets/5f870fa0-1fa4-4845-bf04-6732d79259fa_1600w.webp" alt="Global Map" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent"></div>
            <div className="absolute bottom-0 left-0 p-6 sm:p-8" data-reveal="">
              <p className="text-xs text-[#42A85D] font-medium mb-2">02</p>
              <h3 className="font-['Geist'] text-2xl font-light tracking-tighter text-white">Interactive Map</h3>
              <p className="text-base text-white/60 mt-2 max-w-sm">
                Explore the world's air quality through our immersive drag-to-search map interface.
              </p>
            </div>
          </div>
          <div className="lg:col-span-5 lg:mt-24 relative rounded-2xl overflow-hidden aspect-[4/5] lg:aspect-auto shadow-2xl shadow-black/15">
            <img data-panel-img="" src="https://hoirqrkdgbmvpwutwuwj.supabase.co/storage/v1/object/public/assets/assets/750647bd-8e6a-40c8-a21a-8398b7c09a75_3840w.png" alt="Rankings" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent"></div>
            <div className="absolute bottom-0 left-0 p-6 sm:p-8" data-reveal="">
              <p className="text-xs text-[#42A85D] font-medium mb-2">03</p>
              <h3 className="font-['Geist'] text-2xl font-light tracking-tighter text-white">Live Rankings</h3>
              <p className="text-base text-white/60 mt-2 max-w-sm">
                A competitive leaderboard of the most polluted cities, updated every hour.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ============ STUDIO METHOD ============ */}
      <section className="bg-[#E4EFDA] text-black py-24 sm:py-36">
        <div className="max-w-7xl mx-auto px-6 sm:px-10">
          <div className="max-w-3xl mb-20" data-reveal="">
            <p className="text-xs uppercase tracking-[0.25em] text-[#1E4D33] font-medium mb-6">Mission</p>
            <h2 className="font-['Geist'] text-4xl sm:text-6xl leading-[1.05] font-light tracking-tighter">
              We make the invisible <em className="font-['Instrument_Serif'] italic font-normal">visible.</em>
            </h2>
            <p className="text-lg text-black/60 mt-6 max-w-xl">
              Air pollution affects millions, yet it remains largely unseen. We combine environmental data with premium design to help you make informed decisions about the air you breathe.
            </p>
          </div>
        </div>
      </section>

      {/* ============ PROOF ============ */}
      <section className="bg-[#FBFAF7] pt-24 pb-24 sm:pb-36">
        <div className="max-w-7xl mx-auto px-6 sm:px-10 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-5 order-2 lg:order-1" data-reveal="">
            <div className="rounded-2xl overflow-hidden aspect-[4/5] shadow-2xl shadow-black/15">
              <img src="https://hoirqrkdgbmvpwutwuwj.supabase.co/storage/v1/object/public/assets/assets/afde836c-8fe0-4c5b-aa0b-fe420a91d1e2_3840w.png" alt="User Testimonial" className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700" />
            </div>
          </div>
          <div className="lg:col-span-7 order-1 lg:order-2" data-reveal="">
            <Quote className="w-8 h-8 text-[#1E4D33] mb-8" />
            <blockquote className="font-['Geist'] text-2xl sm:text-4xl leading-[1.2] text-[#12281A] font-light tracking-tighter">
              "Before EcoBreathe, I relied on clunky government websites to check the air quality. Now, it feels like I have a premium environmental lab right in my pocket."
            </blockquote>
            <div className="mt-8" data-reveal="">
              <p className="text-base font-medium">Elena Marsh</p>
              <p className="text-sm text-black/40">Early Adopter</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
