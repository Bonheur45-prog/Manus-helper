import React, { useEffect, useState } from 'react'
import Card, { SectionTitle, InfoRow } from '../components/Card.jsx'

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:3001'

const colors = [
  { name: 'Primary Orange', hex: '#F15A22', role: 'Main accent, CTAs, logo' },
  { name: 'Dark Navy', hex: '#1B3A6B', role: 'Secondary, text, backgrounds' },
  { name: 'Steel Gray', hex: '#8A9BA8', role: 'Subtle accents, dividers' },
  { name: 'Pure White', hex: '#FFFFFF', role: 'Text on dark backgrounds' },
  { name: 'Pure Black', hex: '#000000', role: 'Logo background original' },
]

export default function BrandPage() {
  const [company, setCompany] = useState(null)
  const [status, setStatus] = useState(null)

  useEffect(() => {
    fetch(`${API_BASE}/api/company`)
      .then(r => r.json())
      .then(setCompany)
      .catch(() => setCompany(null))
  }, [])

  const save = async () => {
    setStatus('saving')
    try {
      const res = await fetch(`${API_BASE}/api/company`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(company),
      })
      if (!res.ok) throw new Error('Failed')
      const data = await res.json()
      setCompany(data.company)
      setStatus('saved')
      setTimeout(() => setStatus(null), 2000)
    } catch (e) {
      setStatus('error')
      setTimeout(() => setStatus(null), 2000)
    }
  }

  if (!company) return (
    <div style={{ padding: '24px', color: 'var(--steel)' }}>Loading company profile…</div>
  )

  return (
    <div style={{ display: 'grid', gap: '24px' }}>
      <Card accent>
        <SectionTitle tag="AI Source">Company Information</SectionTitle>
        <div style={{ display: 'grid', gap: '10px' }}>
          <label style={{ color: 'var(--steel)', fontSize: '12px' }}>Company Name</label>
          <input value={company.name} onChange={e => setCompany({ ...company, name: e.target.value })} style={{ padding: '10px', borderRadius: '8px', background: 'var(--dark)', border: '1px solid var(--border-dim)', color: 'var(--white)' }} />

          <label style={{ color: 'var(--steel)', fontSize: '12px' }}>Tagline</label>
          <input value={company.tagline} onChange={e => setCompany({ ...company, tagline: e.target.value })} style={{ padding: '10px', borderRadius: '8px', background: 'var(--dark)', border: '1px solid var(--border-dim)', color: 'var(--white)' }} />

          <label style={{ color: 'var(--steel)', fontSize: '12px' }}>Phone</label>
          <input value={company.phone} onChange={e => setCompany({ ...company, phone: e.target.value })} style={{ padding: '10px', borderRadius: '8px', background: 'var(--dark)', border: '1px solid var(--border-dim)', color: 'var(--white)' }} />

          <label style={{ color: 'var(--steel)', fontSize: '12px' }}>Email</label>
          <input value={company.email} onChange={e => setCompany({ ...company, email: e.target.value })} style={{ padding: '10px', borderRadius: '8px', background: 'var(--dark)', border: '1px solid var(--border-dim)', color: 'var(--white)' }} />

          <label style={{ color: 'var(--steel)', fontSize: '12px' }}>Website</label>
          <input value={company.website} onChange={e => setCompany({ ...company, website: e.target.value })} style={{ padding: '10px', borderRadius: '8px', background: 'var(--dark)', border: '1px solid var(--border-dim)', color: 'var(--white)' }} />

          <label style={{ color: 'var(--steel)', fontSize: '12px' }}>Address</label>
          <input value={company.address} onChange={e => setCompany({ ...company, address: e.target.value })} style={{ padding: '10px', borderRadius: '8px', background: 'var(--dark)', border: '1px solid var(--border-dim)', color: 'var(--white)' }} />

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
            <div>
              <label style={{ color: 'var(--steel)', fontSize: '12px' }}>Instagram</label>
              <input value={company.social?.instagram || ''} onChange={e => setCompany({ ...company, social: { ...company.social, instagram: e.target.value } })} style={{ padding: '10px', borderRadius: '8px', background: 'var(--dark)', border: '1px solid var(--border-dim)', color: 'var(--white)' }} />
            </div>
            <div>
              <label style={{ color: 'var(--steel)', fontSize: '12px' }}>LinkedIn</label>
              <input value={company.social?.linkedin || ''} onChange={e => setCompany({ ...company, social: { ...company.social, linkedin: e.target.value } })} style={{ padding: '10px', borderRadius: '8px', background: 'var(--dark)', border: '1px solid var(--border-dim)', color: 'var(--white)' }} />
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
            <div>
              <label style={{ color: 'var(--steel)', fontSize: '12px' }}>Twitter / X</label>
              <input value={company.social?.twitter || ''} onChange={e => setCompany({ ...company, social: { ...company.social, twitter: e.target.value } })} style={{ padding: '10px', borderRadius: '8px', background: 'var(--dark)', border: '1px solid var(--border-dim)', color: 'var(--white)' }} />
            </div>
            <div>
              <label style={{ color: 'var(--steel)', fontSize: '12px' }}>Phone (alt)</label>
              <input value={company.phoneAlt || ''} onChange={e => setCompany({ ...company, phoneAlt: e.target.value })} style={{ padding: '10px', borderRadius: '8px', background: 'var(--dark)', border: '1px solid var(--border-dim)', color: 'var(--white)' }} />
            </div>
          </div>

          <div style={{ display: 'flex', gap: '8px', marginTop: '12px' }}>
            <button onClick={save} disabled={status === 'saving'} style={{ padding: '12px 18px', borderRadius: '8px', background: status === 'saved' ? 'rgba(34,197,94,0.15)' : 'var(--orange)', color: status === 'saved' ? '#22c55e' : 'var(--white)', border: 'none', fontWeight: '700' }}>{status === 'saving' ? 'SAVING...' : status === 'saved' ? '✓ SAVED' : 'SAVE COMPANY PROFILE'}</button>
          </div>
        </div>
      </Card>

      {/* Brand Colors */}
      <Card>
        <SectionTitle tag="Brand">Color Palette</SectionTitle>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', gap: '12px' }}>
          {colors.map(c => (
            <div key={c.hex} style={{
              borderRadius: '10px',
              overflow: 'hidden',
              border: '1px solid var(--border-dim)',
            }}>
              <div style={{
                height: '64px',
                background: c.hex,
                border: c.hex === '#FFFFFF' ? '1px solid #333' : 'none',
              }} />
              <div style={{ padding: '10px 12px', background: 'var(--dark2)' }}>
                <div style={{ fontFamily: 'monospace', fontSize: '13px', color: 'var(--orange)' }}>{c.hex}</div>
                <div style={{ fontSize: '12px', color: 'var(--white)', marginTop: '2px', fontWeight: '600' }}>{c.name}</div>
                <div style={{ fontSize: '11px', color: 'var(--gray)', marginTop: '2px' }}>{c.role}</div>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Logo */}
      <Card>
        <SectionTitle tag="Assets">Logo Variants (paste Cloudinary URLs)</SectionTitle>
        <div style={{ display: 'grid', gap: '10px' }}>
          <label style={{ color: 'var(--steel)', fontSize: '12px' }}>Main Logo URL</label>
          <input value={company.logo?.main || ''} onChange={e => setCompany({ ...company, logo: { ...company.logo, main: e.target.value } })} style={{ padding: '10px', borderRadius: '8px', background: 'var(--dark)', border: '1px solid var(--border-dim)', color: 'var(--white)' }} />
          <label style={{ color: 'var(--steel)', fontSize: '12px' }}>Transparent Logo URL</label>
          <input value={company.logo?.transparent || ''} onChange={e => setCompany({ ...company, logo: { ...company.logo, transparent: e.target.value } })} style={{ padding: '10px', borderRadius: '8px', background: 'var(--dark)', border: '1px solid var(--border-dim)', color: 'var(--white)' }} />
          <label style={{ color: 'var(--steel)', fontSize: '12px' }}>White Logo URL</label>
          <input value={company.logo?.white || ''} onChange={e => setCompany({ ...company, logo: { ...company.logo, white: e.target.value } })} style={{ padding: '10px', borderRadius: '8px', background: 'var(--dark)', border: '1px solid var(--border-dim)', color: 'var(--white)' }} />
        </div>
      </Card>

      {/* Design Guidelines */}
      <Card>
        <SectionTitle tag="Guidelines">Design Guidelines for Manus</SectionTitle>
        {[
          'Use bold orange (#F15A22) as the dominant accent color',
          'Dark navy (#1B3A6B) for secondary text elements and backgrounds',
          'White space matters — never overcrowd the flyer',
          'Photographs must show real construction/architecture/interior work',
          'Always include SAGEC logo and contact info on every flyer',
          'Use strong geometric shapes inspired by architectural blueprints',
          'Font pairing: Bebas Neue (display/headers) + Barlow (body text)',
          'Tone: Professional, modern, premium, and trustworthy',
        ].map((g, i) => (
          <div key={i} style={{
            display: 'flex',
            gap: '12px',
            padding: '10px 0',
            borderBottom: '1px solid var(--border-dim)',
            alignItems: 'flex-start',
          }}>
            <span style={{
              fontFamily: 'var(--font-display)',
              fontSize: '14px',
              color: 'var(--orange)',
              minWidth: '22px',
              paddingTop: '1px',
            }}>0{i + 1}</span>
            <span style={{ fontSize: '13px', color: 'var(--white)', lineHeight: '1.5' }}>{g}</span>
          </div>
        ))}
      </Card>
    </div>
  )
}
