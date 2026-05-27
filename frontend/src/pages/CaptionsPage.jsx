import React, { useState } from 'react'
import Card, { SectionTitle } from '../components/Card.jsx'

const captions = [
  {
    service: 'Interior Design',
    id: 'interior-design',
    caption: 'Your space should tell your story. ✨ At SAGEC Ltd, we craft interiors that blend luxury with function. Let\'s design your perfect space.',
    hashtags: '#InteriorDesign #LuxuryInteriors #SAGEC #KigaliDesign #HomeDesign #Rwanda',
  },
  {
    service: 'Architectural Design',
    id: 'architectural-design',
    caption: 'Great buildings start with great ideas. 🏛️ Our architects turn your vision into reality — from concept to blueprint.',
    hashtags: '#Architecture #ArchitecturalDesign #SAGEC #KigaliArchitecture #UrbanDesign #Rwanda',
  },
  {
    service: 'Construction',
    id: 'construction',
    caption: 'Built to last. Built to impress. 🏗️ SAGEC Ltd delivers construction excellence across Rwanda and beyond.',
    hashtags: '#Construction #BuildingKigali #SAGEC #RealEstate #QualityBuild #Rwanda',
  },
  {
    service: 'Renovation Works',
    id: 'renovation-works',
    caption: 'Old spaces deserve new life. 🔨 Renovation experts at SAGEC Ltd bring modern energy to every structure.',
    hashtags: '#Renovation #RenovationRwanda #SAGEC #HomeUpgrade #Remodeling #Kigali',
  },
  {
    service: 'Project Management',
    id: 'project-management',
    caption: 'From concept to completion — seamlessly. 📐 SAGEC Ltd manages every phase of your engineering project with precision.',
    hashtags: '#ProjectManagement #Engineering #SAGEC #Consultancy #Kigali #Rwanda',
  },
  {
    service: 'Civil Engineering',
    id: 'civil-engineering',
    caption: 'Strong foundations. Smarter infrastructure. 🔩 SAGEC Ltd\'s civil engineering team delivers builds that stand the test of time.',
    hashtags: '#CivilEngineering #Infrastructure #SAGEC #Rwanda #Engineering #Kigali',
  },
  {
    service: 'Real Estate Development',
    id: 'real-estate-development',
    caption: 'Building communities, not just properties. 🏢 From residential to commercial — SAGEC Ltd develops spaces that grow with you.',
    hashtags: '#RealEstate #PropertyRwanda #SAGEC #KigaliDevelopment #Investment #Rwanda',
  },
  {
    service: 'Construction Supervision',
    id: 'construction-supervision',
    caption: 'Your project deserves expert eyes on every detail. 👁️ SAGEC Ltd\'s supervision team ensures quality from ground to rooftop.',
    hashtags: '#ConstructionSupervision #QualityControl #SAGEC #SiteManagement #Rwanda',
  },
]

export default function CaptionsPage() {
  const [copied, setCopied] = useState(null)

  const copy = (text, id) => {
    navigator.clipboard.writeText(text)
    setCopied(id)
    setTimeout(() => setCopied(null), 2000)
  }

  return (
    <div style={{ display: 'grid', gap: '20px' }}>
      <Card accent>
        <SectionTitle tag="8 Captions">Social Media Captions</SectionTitle>
        <p style={{ fontSize: '13px', color: 'var(--gray)', marginBottom: '20px', lineHeight: '1.6' }}>
          Ready-to-use captions per service. Manus AI can access these via <code style={{ color: 'var(--orange)', fontFamily: 'monospace', fontSize: '12px' }}>/api/captions</code>. Your friend pastes these directly after downloading the flyer.
        </p>
        <div style={{ display: 'grid', gap: '14px' }}>
          {captions.map((c, i) => (
            <div key={c.id} style={{
              background: 'var(--dark2)',
              border: '1px solid var(--border-dim)',
              borderRadius: '10px',
              overflow: 'hidden',
            }}>
              <div style={{
                padding: '10px 16px',
                borderBottom: '1px solid var(--border-dim)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <span style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: '13px',
                    color: 'var(--orange)',
                  }}>0{i + 1}</span>
                  <span style={{
                    fontFamily: 'var(--font-condensed)',
                    fontSize: '13px',
                    fontWeight: '700',
                    letterSpacing: '1px',
                    color: 'var(--white)',
                  }}>{c.service}</span>
                </div>
                <button
                  onClick={() => copy(c.caption + '\n\n' + c.hashtags, c.id)}
                  style={{
                    padding: '5px 12px',
                    background: copied === c.id ? 'rgba(34,197,94,0.15)' : 'rgba(241,90,34,0.1)',
                    border: `1px solid ${copied === c.id ? 'rgba(34,197,94,0.3)' : 'rgba(241,90,34,0.25)'}`,
                    borderRadius: '5px',
                    color: copied === c.id ? '#22c55e' : 'var(--orange)',
                    fontFamily: 'var(--font-condensed)',
                    fontSize: '11px',
                    letterSpacing: '1px',
                    cursor: 'pointer',
                    transition: 'all 0.2s',
                  }}
                >
                  {copied === c.id ? '✓ COPIED' : 'COPY'}
                </button>
              </div>
              <div style={{ padding: '14px 16px' }}>
                <p style={{ fontSize: '13px', color: 'var(--white)', lineHeight: '1.7', marginBottom: '10px' }}>
                  {c.caption}
                </p>
                <p style={{ fontSize: '12px', color: 'var(--steel)', lineHeight: '1.8', fontFamily: 'monospace' }}>
                  {c.hashtags}
                </p>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  )
}
