import React, { useState } from 'react'
import Card, { SectionTitle } from '../components/Card.jsx'

const rawApiUrl = import.meta.env.VITE_API_URL
const cleanedApiUrl = rawApiUrl ? rawApiUrl.replace(/\/+$/, '') : ''
const BASE_URL = cleanedApiUrl || 'https://sagec-asset-hub-api.onrender.com'

const endpoints = [
  {
    method: 'GET',
    path: '/api/ai-context',
    label: 'Master AI Context',
    description: 'THE most important endpoint. Give this single URL to Manus as the trusted source. Returns everything: company info, services, brand, captions, assets, and weekly focus in one request.',
    tag: 'GIVE THIS TO MANUS',
    tagColor: '#F15A22',
    priority: true,
  },
  {
    method: 'GET',
    path: '/api/today-prompt',
    label: 'Daily Flyer Prompt',
    description: 'Returns today\'s focused generation instructions. Tell Manus to check this every morning at 7:00 AM before generating.',
    tag: 'DAILY TRIGGER',
    tagColor: '#1B3A6B',
  },
  {
    method: 'GET',
    path: '/api/services',
    label: 'All Services',
    description: 'Returns all 8 SAGEC services with descriptions, keywords, CTAs, and approved image URLs.',
    tag: 'SERVICES',
    tagColor: '#8A9BA8',
  },
  {
    method: 'GET',
    path: '/api/services/:id',
    label: 'Single Service',
    description: 'Returns a specific service. Example: /api/services/interior-design',
    tag: 'SERVICES',
    tagColor: '#8A9BA8',
  },
  {
    method: 'GET',
    path: '/api/captions',
    label: 'All Captions & Hashtags',
    description: 'Returns all ready-to-use social media captions. Add ?service=interior-design to filter by service.',
    tag: 'CAPTIONS',
    tagColor: '#8A9BA8',
  },
  {
    method: 'GET',
    path: '/api/brand',
    label: 'Brand Guidelines',
    description: 'Returns brand colors, fonts, tone, and design guidelines for Manus to follow.',
    tag: 'BRAND',
    tagColor: '#8A9BA8',
  },
]

const manusPrompt = `You are a professional flyer designer for SAGEC Ltd (Architectural and Engineering Solutions), based in Kigali, Rwanda.

TRUSTED SOURCE (use ONLY this — do not browse other websites):
${BASE_URL}/api/ai-context

DAILY INSTRUCTIONS:
1. First, fetch: ${BASE_URL}/api/today-prompt
2. Then fetch: ${BASE_URL}/api/ai-context
3. Generate ONE unique professional marketing flyer based on today's focus.
4. Use ONLY images and assets from the API response.
5. Always include: SAGEC logo, phone (+250 788 470 243), email (sagecltd@gmail.com).
6. Apply brand colors: Primary Orange #F15A22, Navy #1B3A6B.
7. Do NOT repeat flyer styles from previous days.
8. After the flyer, generate a matching caption and hashtags using /api/captions.

SCHEDULE: Run this task every day at 07:00 AM (Kigali time, UTC+2).`

export default function ApiPage() {
  const [copied, setCopied] = useState(null)

  const copy = (text, id) => {
    navigator.clipboard.writeText(text)
    setCopied(id)
    setTimeout(() => setCopied(null), 2000)
  }

  return (
    <div style={{ display: 'grid', gap: '20px' }}>

      {/* Manus Prompt */}
      <Card accent>
        <SectionTitle tag="Copy This">Manus AI System Prompt</SectionTitle>
        <p style={{ fontSize: '13px', color: 'var(--gray)', marginBottom: '16px', lineHeight: '1.6' }}>
          Copy and paste this <strong style={{ color: 'var(--white)' }}>exact prompt</strong> into Manus as the main instruction. This replaces all the old setup.
        </p>
        <div style={{ position: 'relative' }}>
          <pre style={{
            background: 'var(--dark)',
            border: '1px solid var(--border-dim)',
            borderRadius: '8px',
            padding: '18px',
            fontFamily: 'monospace',
            fontSize: '12px',
            color: '#86efac',
            lineHeight: '1.8',
            overflowX: 'auto',
            whiteSpace: 'pre-wrap',
          }}>{manusPrompt}</pre>
          <button
            onClick={() => copy(manusPrompt, 'manus-prompt')}
            style={{
              position: 'absolute',
              top: '12px',
              right: '12px',
              padding: '6px 14px',
              background: copied === 'manus-prompt' ? 'rgba(34,197,94,0.2)' : 'rgba(241,90,34,0.15)',
              border: `1px solid ${copied === 'manus-prompt' ? 'rgba(34,197,94,0.4)' : 'rgba(241,90,34,0.3)'}`,
              borderRadius: '6px',
              color: copied === 'manus-prompt' ? '#22c55e' : 'var(--orange)',
              fontFamily: 'var(--font-condensed)',
              fontSize: '11px',
              letterSpacing: '1px',
              cursor: 'pointer',
              transition: 'all 0.2s',
            }}
          >
            {copied === 'manus-prompt' ? '✓ COPIED' : 'COPY'}
          </button>
        </div>
      </Card>

      {/* Endpoints */}
      <Card>
        <SectionTitle tag="6 Endpoints">API Reference</SectionTitle>
        <div style={{ display: 'grid', gap: '12px' }}>
          {endpoints.map((ep, i) => (
            <div
              key={i}
              style={{
                background: ep.priority ? 'rgba(241,90,34,0.04)' : 'var(--dark2)',
                border: `1px solid ${ep.priority ? 'var(--border)' : 'var(--border-dim)'}`,
                borderRadius: '10px',
                padding: '16px 18px',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '12px', flexWrap: 'wrap' }}>
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px', flexWrap: 'wrap' }}>
                    <span style={{
                      fontFamily: 'monospace',
                      fontSize: '11px',
                      color: '#22c55e',
                      background: 'rgba(34,197,94,0.1)',
                      border: '1px solid rgba(34,197,94,0.2)',
                      padding: '2px 8px',
                      borderRadius: '4px',
                    }}>GET</span>
                    <span style={{
                      fontFamily: 'monospace',
                      fontSize: '13px',
                      color: 'var(--orange)',
                    }}>{BASE_URL}{ep.path}</span>
                    {ep.tag && (
                      <span style={{
                        fontFamily: 'var(--font-condensed)',
                        fontSize: '10px',
                        letterSpacing: '1.5px',
                        color: ep.tagColor,
                        background: `${ep.tagColor}15`,
                        border: `1px solid ${ep.tagColor}35`,
                        padding: '2px 8px',
                        borderRadius: '4px',
                        textTransform: 'uppercase',
                      }}>{ep.tag}</span>
                    )}
                  </div>
                  <div style={{ fontFamily: 'var(--font-condensed)', fontSize: '13px', fontWeight: '700', color: 'var(--white)', marginBottom: '5px', letterSpacing: '0.5px' }}>{ep.label}</div>
                  <p style={{ fontSize: '12px', color: 'var(--gray)', lineHeight: '1.6' }}>{ep.description}</p>
                </div>
                <button
                  onClick={() => copy(`${BASE_URL}${ep.path}`, `ep-${i}`)}
                  style={{
                    padding: '6px 14px',
                    background: copied === `ep-${i}` ? 'rgba(34,197,94,0.1)' : 'transparent',
                    border: `1px solid ${copied === `ep-${i}` ? 'rgba(34,197,94,0.3)' : 'var(--border-dim)'}`,
                    borderRadius: '6px',
                    color: copied === `ep-${i}` ? '#22c55e' : 'var(--gray)',
                    fontFamily: 'var(--font-condensed)',
                    fontSize: '11px',
                    letterSpacing: '1px',
                    cursor: 'pointer',
                    transition: 'all 0.2s',
                    whiteSpace: 'nowrap',
                  }}
                >
                  {copied === `ep-${i}` ? '✓ COPIED' : 'COPY URL'}
                </button>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* UptimeRobot reminder */}
      <Card>
        <SectionTitle tag="Important">Keep Render Awake</SectionTitle>
        <div style={{
          padding: '14px 16px',
          background: 'rgba(241,90,34,0.06)',
          border: '1px solid rgba(241,90,34,0.2)',
          borderRadius: '8px',
        }}>
          <p style={{ fontSize: '13px', color: 'var(--gray)', lineHeight: '1.8' }}>
            Render's free plan <strong style={{ color: 'var(--white)' }}>sleeps after 15 minutes</strong> of inactivity. If Manus hits a sleeping server, it wastes actions waiting.<br /><br />
            <strong style={{ color: 'var(--orange)' }}>Fix:</strong> Go to <code style={{ fontFamily: 'monospace', color: 'var(--white)', fontSize: '12px' }}>uptimerobot.com</code> → Create a free monitor → Set it to ping <code style={{ fontFamily: 'monospace', color: 'var(--orange)', fontSize: '12px' }}>{BASE_URL}/</code> every <strong style={{ color: 'var(--white)' }}>10 minutes</strong>. Free plan. Takes 2 minutes to set up.
          </p>
        </div>
      </Card>
    </div>
  )
}
