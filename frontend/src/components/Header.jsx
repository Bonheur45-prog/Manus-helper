import React from 'react'

const pageTitles = {
  brand: { title: 'Brand & Company Info', sub: 'Core identity data fed to Manus AI' },
  services: { title: 'Services', sub: 'All SAGEC service offerings with descriptions' },
  gallery: { title: 'Image Gallery', sub: 'Approved Cloudinary assets for flyer generation' },
  captions: { title: 'Captions & Hashtags', sub: 'Ready-to-use social media copy per service' },
  weekly: { title: 'Weekly Focus', sub: 'Direct Manus AI campaign direction' },
  api: { title: 'API Endpoints', sub: 'Live endpoint URLs to feed into Manus' },
}

export default function Header({ activePage }) {
  const { title, sub } = pageTitles[activePage] || {}
  const now = new Date()
  const dateStr = now.toLocaleDateString('en-GB', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })

  return (
    <header style={{
      padding: '20px 32px',
      borderBottom: '1px solid var(--border-dim)',
      background: 'var(--dark2)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
    }}>
      <div>
        <h1 style={{
          fontFamily: 'var(--font-display)',
          fontSize: '26px',
          letterSpacing: '2px',
          color: 'var(--white)',
          lineHeight: 1,
        }}>{title}</h1>
        <p style={{
          fontSize: '12px',
          color: 'var(--steel)',
          marginTop: '5px',
          fontFamily: 'var(--font-condensed)',
          letterSpacing: '0.5px',
        }}>{sub}</p>
      </div>

      <div style={{ textAlign: 'right' }}>
        <div style={{
          fontFamily: 'var(--font-condensed)',
          fontSize: '11px',
          letterSpacing: '2px',
          color: 'var(--orange)',
          textTransform: 'uppercase',
        }}>Manus Ready</div>
        <div style={{
          fontSize: '11px',
          color: 'var(--gray)',
          marginTop: '3px',
          fontFamily: 'var(--font-body)',
        }}>{dateStr}</div>
      </div>
    </header>
  )
}
