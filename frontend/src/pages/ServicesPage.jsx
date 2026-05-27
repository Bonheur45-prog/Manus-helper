import React, { useState } from 'react'
import Card, { SectionTitle } from '../components/Card.jsx'

const services = [
  {
    id: 'architectural-design',
    title: 'Architectural Design',
    description: 'Modern structural conceptualization and blueprint layout for residential, commercial, and industrial projects.',
    keywords: ['architecture', 'blueprint', 'design', 'modern', 'structural'],
    cta: 'Design your dream space',
    color: '#F15A22',
  },
  {
    id: 'civil-engineering',
    title: 'Civil Engineering',
    description: 'Structural analysis and infrastructure development for lasting, safe, and efficient builds.',
    keywords: ['civil', 'engineering', 'infrastructure', 'structural analysis'],
    cta: 'Build on solid foundations',
    color: '#1B3A6B',
  },
  {
    id: 'real-estate-development',
    title: 'Real Estate Development',
    description: 'Residential, commercial, and industrial property design and building tailored to client vision.',
    keywords: ['real estate', 'property', 'residential', 'commercial', 'industrial'],
    cta: 'Invest in the future',
    color: '#8A9BA8',
  },
  {
    id: 'construction',
    title: 'Construction',
    description: 'Full-scale construction services delivering quality builds from foundation to finishing.',
    keywords: ['construction', 'building', 'contractor', 'quality'],
    cta: "Let's build it right",
    color: '#F15A22',
  },
  {
    id: 'interior-design',
    title: 'Interior Design',
    description: 'Premium interior design solutions blending aesthetics, function, and lifestyle for every space.',
    keywords: ['interior', 'design', 'luxury', 'decor', 'space', 'modern'],
    cta: 'Transform your interiors',
    color: '#D4A853',
  },
  {
    id: 'construction-supervision',
    title: 'Construction Supervision',
    description: 'Professional site oversight, quality control, and execution management from start to handover.',
    keywords: ['supervision', 'quality control', 'site management', 'oversight'],
    cta: 'Your project, our supervision',
    color: '#1B3A6B',
  },
  {
    id: 'project-management',
    title: 'Project Management',
    description: 'Turnkey engineering consultancy managing every phase from initial concept to final completion.',
    keywords: ['project management', 'consultancy', 'turnkey', 'planning'],
    cta: 'From concept to completion',
    color: '#F15A22',
  },
  {
    id: 'renovation-works',
    title: 'Renovation Works',
    description: 'Structural updating and modernizing of existing properties with minimal disruption and maximum impact.',
    keywords: ['renovation', 'remodeling', 'upgrade', 'modernize', 'restore'],
    cta: 'Renew your space',
    color: '#8A9BA8',
  },
]

export default function ServicesPage() {
  const [expanded, setExpanded] = useState(null)

  return (
    <div style={{ display: 'grid', gap: '20px' }}>
      <Card accent>
        <SectionTitle tag="8 Services">All Services</SectionTitle>
        <p style={{ fontSize: '13px', color: 'var(--gray)', marginBottom: '20px', lineHeight: '1.6' }}>
          Each service card below is fed into Manus AI via the <code style={{ color: 'var(--orange)', fontFamily: 'monospace', fontSize: '12px' }}>/api/services</code> endpoint. Update descriptions and keywords here to guide flyer generation.
        </p>
        <div style={{ display: 'grid', gap: '10px' }}>
          {services.map(s => (
            <div
              key={s.id}
              style={{
                background: expanded === s.id ? 'rgba(241,90,34,0.05)' : 'var(--dark2)',
                border: `1px solid ${expanded === s.id ? 'var(--border)' : 'var(--border-dim)'}`,
                borderRadius: '10px',
                overflow: 'hidden',
                transition: 'all 0.2s',
              }}
            >
              <button
                onClick={() => setExpanded(expanded === s.id ? null : s.id)}
                style={{
                  width: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '14px 18px',
                  background: 'transparent',
                  border: 'none',
                  cursor: 'pointer',
                  color: 'var(--white)',
                  fontFamily: 'var(--font-body)',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                  <div style={{ width: '4px', height: '28px', background: s.color, borderRadius: '2px' }} />
                  <div>
                    <div style={{ fontFamily: 'var(--font-condensed)', fontSize: '15px', fontWeight: '700', letterSpacing: '1px', textAlign: 'left' }}>{s.title}</div>
                    <div style={{ fontSize: '11px', color: 'var(--gray)', marginTop: '2px', textAlign: 'left' }}>ID: {s.id}</div>
                  </div>
                </div>
                <span style={{ color: 'var(--orange)', fontSize: '18px' }}>{expanded === s.id ? '−' : '+'}</span>
              </button>

              {expanded === s.id && (
                <div style={{ padding: '0 18px 18px', borderTop: '1px solid var(--border-dim)' }}>
                  <div style={{ paddingTop: '14px', display: 'grid', gap: '12px' }}>
                    <div>
                      <div style={{ fontSize: '11px', color: 'var(--steel)', letterSpacing: '1.5px', textTransform: 'uppercase', marginBottom: '6px', fontFamily: 'var(--font-condensed)' }}>Description</div>
                      <p style={{ fontSize: '13px', color: 'var(--white)', lineHeight: '1.6' }}>{s.description}</p>
                    </div>
                    <div>
                      <div style={{ fontSize: '11px', color: 'var(--steel)', letterSpacing: '1.5px', textTransform: 'uppercase', marginBottom: '8px', fontFamily: 'var(--font-condensed)' }}>Keywords</div>
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                        {s.keywords.map(k => (
                          <span key={k} style={{
                            fontFamily: 'var(--font-condensed)',
                            fontSize: '11px',
                            color: 'var(--orange)',
                            background: 'rgba(241,90,34,0.1)',
                            border: '1px solid rgba(241,90,34,0.2)',
                            padding: '3px 10px',
                            borderRadius: '4px',
                            letterSpacing: '0.5px',
                          }}>{k}</span>
                        ))}
                      </div>
                    </div>
                    <div>
                      <div style={{ fontSize: '11px', color: 'var(--steel)', letterSpacing: '1.5px', textTransform: 'uppercase', marginBottom: '6px', fontFamily: 'var(--font-condensed)' }}>Call to Action</div>
                      <p style={{ fontSize: '14px', color: 'var(--orange)', fontWeight: '600', fontFamily: 'var(--font-condensed)', letterSpacing: '1px' }}>"{s.cta}"</p>
                    </div>
                    <div>
                      <div style={{ fontSize: '11px', color: 'var(--steel)', letterSpacing: '1.5px', textTransform: 'uppercase', marginBottom: '6px', fontFamily: 'var(--font-condensed)' }}>Images Slot</div>
                      <div style={{
                        padding: '10px 14px',
                        background: 'var(--dark)',
                        borderRadius: '6px',
                        fontFamily: 'monospace',
                        fontSize: '11px',
                        color: 'var(--steel)',
                      }}>
                        → Upload images to Cloudinary → paste URL in server.js
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </Card>
    </div>
  )
}
