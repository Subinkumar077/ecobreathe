import Hero from '../components/landing/Hero.jsx'
import LiveMap from '../components/landing/LiveMap.jsx'
import UnderstandYourAir from '../components/landing/UnderstandYourAir.jsx'
import ProductShowcase from '../components/landing/ProductShowcase.jsx'
import TrustedBy from '../components/landing/TrustedBy.jsx'
import MissionBanner from '../components/landing/MissionBanner.jsx'
import HelpMeChoose from '../components/landing/HelpMeChoose.jsx'
import NewsSection from '../components/landing/NewsSection.jsx'
import ForOrganizations from '../components/landing/ForOrganizations.jsx'

export default function LandingPage({ city, locationStatus }) {
  return <>
    <Hero city={city} locationStatus={locationStatus} />
    <LiveMap city={city} />
    <UnderstandYourAir />
    <ProductShowcase />
    <TrustedBy />
    <MissionBanner />
    <HelpMeChoose />
    <NewsSection />
    <ForOrganizations />
  </>
}
