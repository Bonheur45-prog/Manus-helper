import React, { useState, useEffect } from 'react'
import Card, { SectionTitle } from '../components/Card.jsx'

// Use both display name and ID together so dropdown is human-readable
// but the API receives the correct kebab-case ID
const services = [
  { id: 'architectural-design',    label: 'Architectural Design' },
  { id: 'civil-engineering',       label: 'Civil Engineering' },
  { id: 'real-estate-development', label: 'Real Estate Development' },
  { id: 'construction',            label: 'Construction' },
  { id: 'interior-design',         label: 'Interior Design' },
  { id: 'construction-supervision',label: 'Construction Supervision' },
  { id: 'project-management',      label: 'Project Management' },
  { id: 'renovation-works',        label: 'Renovation Works' },
]

const rawApiUrl = import.meta.env.VITE_API_URL
const cleanedApiUrl = rawApiUrl ? rawApiUrl.replace(/\/+$/, '') : ''
const API_BASE = cleanedApiUrl ? cleanedApiUrl : 'http://localhost:3001'

export default function WeeklyFocusPage() {
  const [focusId, setFocusId]   = useState('interior-design')
  const [theme, setTheme]       = useState('Modern Luxury Living Spaces')
  const [style, setStyle]       = useState('Clean, minimal, premium — use white backgrounds with orange accents')
  const [goal, setGoal]         = useState('Generate high-conversion flyers showcasing luxury interior transformations')
  const [status, setStatus]     = useState(null) // null | 'saving' | 'saved' | 'error'
  const [loadError, setLoadError] = useState(false)

  // Load current focus from backend on mount
  useEffect(() => {
    fetch(`${API_BASE}/api/weekly-focus`)
      .then(r => r.json())
      .then(data => {
        if (data.service) setFocusId(data.service)
        if (data.theme)   setTheme(data.theme)
        if (data.style)   setStyle(data.style)
        if (data.goal)    setGoal(data.goal)
      })
      .catch(() => setLoadError(true))
  }, [])

  const handleSave = async () => {
    setStatus('saving')
    try {
      const res = await fetch(`${API_BASE}/api/weekly-focus`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ service: focusId, theme, style, goal }),
      })
      if (!res.ok) throw new Error('Server error')
      setStatus('saved')
      setTimeout(() => setStatus(null), 3000)
    } catch {
      setStatus('error')
      setTimeout(() => setStatus(null), 3000)
    }
  }

  const focusLabel = services.find(s => s.id === focusId)?.label || focusId

  const inputStyle = {
    width: '100%',
    padding: '10px 14px',
    background: 'var(--dark)',
    border: '1px solid var(--border-dim)',
    borderRadius: '8px',
    color: 'var(--white)',
    fontFamily: 'var(--font-body)',
    fontSize: '13px',
    outline: 'none',
    transition: 'border-color 0.2s',
  }

  const labelStyle = {
    display: 'block',
    fontFamily: 'var(--font-condensed)',
    fontSize: '11px',
    letterSpacing: '1.5px',
    color: 'var(--steel)',
    textTransform: 'uppercase',
    marginBottom: '8px',
  }

  const btnColor = status === 'saved' ? '#22c55e' : status === 'error' ? '#ef4444' : 'var(--orange)'
  const btnBg    = status === 'saved' ? 'rgba(34,197,94,0.15)' : status === 'error' ? 'rgba(239,68,68,0.15)' : 'var(--orange)'
  const btnText  = status === 'saving' ? 'SAVING...' : status === 'saved' ? '✓ SAVED' : status === 'error' ? '✗ FAILED — RETRY' : 'UPDATE WEEKLY FOCUS'

  return (
    <div style={{ display: 'grid', gap: '20px' }}>
      <Card accent>
        <SectionTitle tag="Manus Control">Weekly Campaign Focus</SectionTitle>

        {loadError && (
          <div style={{ padding: '10px 14px', background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.3)', borderRadius: '8px', marginBottom: '16px', fontSize: '12px', color: '#fca5a5' }}>
            ⚠ Could not load current focus from backend. Make sure the API server is running.
          </div>
        )}

        <p style={{ fontSize: '13px', color: 'var(--gray)', marginBottom: '24px', lineHeight: '1.6' }}>
          This controls what Manus AI focuses on <strong style={{ color: 'var(--white)' }}>every day this week</strong>. Update it every Monday. Manus reads this live from <code style={{ color: 'var(--orange)', fontFamily: 'monospace', fontSize: '12px' }}>/api/today-prompt</code>.
        </p>

        <div style={{ display: 'grid', gap: '18px' }}>
          <div>
            <label style={labelStyle}>This Week's Service Focus</label>
            <select
              value={focusId}
              onChange={e => setFocusId(e.target.value)}
              style={{ ...inputStyle, cursor: 'pointer' }}
            >
              {services.map(s => (
                <option key={s.id} value={s.id}>{s.label}</option>
              ))}
            </select>
          </div>

          <div>
            <label style={labelStyle}>Campaign Theme</label>
            <input
              type="text"
              value={theme}
              onChange={e => setTheme(e.target.value)}
              style={inputStyle}
              placeholder="e.g. Modern Luxury Living Spaces"
              onFocus={e => e.target.style.borderColor = 'rgba(241,90,34,0.5)'}
              onBlur={e => e.target.style.borderColor = 'var(--border-dim)'}
            />
          </div>

          <div>
            <label style={labelStyle}>Visual Style Instructions</label>
            <textarea
              value={style}
              onChange={e => setStyle(e.target.value)}
              rows={3}
              style={{ ...inputStyle, resize: 'vertical', lineHeight: '1.6' }}
              placeholder="e.g. Clean, minimal, premium — dark backgrounds with orange accents"
              onFocus={e => e.target.style.borderColor = 'rgba(241,90,34,0.5)'}
              onBlur={e => e.target.style.borderColor = 'var(--border-dim)'}
            />
          </div>

          <div>
            <label style={labelStyle}>Campaign Goal</label>
            <input
              type="text"
              value={goal}
              onChange={e => setGoal(e.target.value)}
              style={inputStyle}
              placeholder="e.g. Generate high-conversion flyers showcasing interior transformations"
              onFocus={e => e.target.style.borderColor = 'rgba(241,90,34,0.5)'}
              onBlur={e => e.target.style.borderColor = 'var(--border-dim)'}
            />
          </div>

          <button
            onClick={handleSave}
            disabled={status === 'saving'}
            style={{
              padding: '13px 24px',
              background: status ? btnBg : 'var(--orange)',
              border: status ? `1px solid ${btnColor}55` : 'none',
              borderRadius: '8px',
              color: status ? btnColor : 'var(--white)',
              fontFamily: 'var(--font-condensed)',
              fontSize: '13px',
              fontWeight: '700',
              letterSpacing: '2px',
              cursor: status === 'saving' ? 'not-allowed' : 'pointer',
              transition: 'all 0.3s',
              alignSelf: 'flex-start',
              opacity: status === 'saving' ? 0.7 : 1,
            }}
          >
            {btnText}
          </button>
        </div>
      </Card>

      {/* Live preview of what Manus will get */}
      <Card>
        <SectionTitle tag="Live Preview">What Manus Gets from /api/today-prompt</SectionTitle>
        <pre style={{
          background: 'var(--dark)',
          border: '1px solid var(--border-dim)',
          borderRadius: '8px',
          padding: '18px',
          fontFamily: 'monospace',
          fontSize: '12px',
          color: '#86efac',
          overflowX: 'auto',
          lineHeight: '1.7',
          whiteSpace: 'pre-wrap',
        }}>
{`{
  "date": "${new Date().toISOString().split('T')[0]}",
  "company": "SAGEC Ltd",
  "focus": "${focusId}",
  "theme": "${theme}",
  "style": "${style}",
  "goal": "${goal}",
  "instructions": [
    "Generate ONE unique professional flyer for SAGEC Ltd.",
    "Today's focus: ${focusLabel} — ${theme}",
    "Use only approved images from /api/ai-context assets.",
    "Always include company logo, phone and email.",
    "Apply brand colors: Orange #F15A22, Navy #1B3A6B.",
    "Do NOT repeat styles from previous days.",
    "Generate matching caption and hashtags."
  ]
}`}
        </pre>
      </Card>
    </div>
  )
}
