import { useEffect, useState } from 'react'
import { Navigate, Route, Routes, useNavigate } from 'react-router-dom'
import Header from './components/layout/Header.jsx'
import Footer from './components/layout/Footer.jsx'
import { defaultCity } from './data/cities.js'
import useDeviceLocation from './hooks/useDeviceLocation.js'
import LandingPage from './pages/LandingPage.jsx'
import CityPage from './pages/CityPage.jsx'
import ProductPage from './pages/ProductPage.jsx'
import NewsPage from './pages/NewsPage.jsx'

function toSlug(name) { return name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '') }

export default function App() {
  const [city, setCity] = useState(defaultCity)
  const { city: detectedCity, status: locationStatus } = useDeviceLocation()
  const navigate = useNavigate()

  useEffect(() => { if (detectedCity) setCity(detectedCity) }, [detectedCity])
  function handleCitySelect(nextCity) { setCity(nextCity); navigate(`/city/${toSlug(nextCity.name)}`) }

  return <div className="min-h-screen flex flex-col">
    <Header onCitySelect={handleCitySelect} />
    <main className="flex-1"><Routes>
      <Route path="/" element={<LandingPage city={city} locationStatus={locationStatus} />} />
      <Route path="/city/:slug" element={<CityPage city={city} />} />
      <Route path="/products/:id" element={<ProductPage />} />
      <Route path="/news/:slug" element={<NewsPage />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes></main>
    <Footer />
  </div>
}
