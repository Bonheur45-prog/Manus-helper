import React, { useState } from 'react'
import Header from './components/Header.jsx'
import Sidebar from './components/Sidebar.jsx'
import BrandPage from './pages/BrandPage.jsx'
import ServicesPage from './pages/ServicesPage.jsx'
import GalleryPage from './pages/GalleryPage.jsx'
import CaptionsPage from './pages/CaptionsPage.jsx'
import WeeklyFocusPage from './pages/WeeklyFocusPage.jsx'
import ApiPage from './pages/ApiPage.jsx'

export default function App() {
  const [activePage, setActivePage] = useState('brand')

  const pages = {
    brand: <BrandPage />,
    services: <ServicesPage />,
    gallery: <GalleryPage />,
    captions: <CaptionsPage />,
    weekly: <WeeklyFocusPage />,
    api: <ApiPage />,
  }

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: 'var(--dark)' }}>
      <Sidebar activePage={activePage} setActivePage={setActivePage} />
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        <Header activePage={activePage} />
        <main style={{ flex: 1, padding: '32px', overflowY: 'auto' }}>
          {pages[activePage]}
        </main>
      </div>
    </div>
  )
}
