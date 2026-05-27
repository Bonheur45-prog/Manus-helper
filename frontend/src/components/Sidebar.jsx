import React from 'react'

const nav = [
  { id: 'brand', label: 'Brand & Info', icon: '◈' },
  { id: 'services', label: 'Services', icon: '⬡' },
  { id: 'gallery', label: 'Gallery', icon: '▦' },
  { id: 'captions', label: 'Captions', icon: '✦' },
  { id: 'weekly', label: 'Weekly Focus', icon: '◎' },
  { id: 'api', label: 'API Endpoints', icon: '⟡' },
]

export default function Sidebar({ activePage, setActivePage }) {
  return (
    <aside style={{
      width: '240px',
      minHeight: '100vh',
      background: 'var(--dark2)',
      borderRight: '1px solid var(--border-dim)',
      display: 'flex',
      flexDirection: 'column',
      position: 'sticky',
      top: 0,
    }}>
      {/* Logo area */}
      <div style={{
        padding: '28px 24px 24px',
        borderBottom: '1px solid var(--border-dim)',
      }}>
        <div style={{
          fontFamily: 'var(--font-display)',
          fontSize: '22px',
          letterSpacing: '3px',
          color: 'var(--orange)',
          lineHeight: 1,
        }}>SAGEC</div>
        <div style={{
          fontFamily: 'var(--font-condensed)',
          fontSize: '10px',
          letterSpacing: '2px',
          color: 'var(--steel)',
          marginTop: '4px',
          textTransform: 'uppercase',
        }}>AI Asset Hub</div>
      </div>

      {/* Nav items */}
      <nav style={{ padding: '16px 12px', flex: 1 }}>
        {nav.map(item => (
          <button
            key={item.id}
            onClick={() => setActivePage(item.id)}
            style={{
              width: '100%',
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              padding: '11px 14px',
              marginBottom: '4px',
              background: activePage === item.id
                ? 'linear-gradient(90deg, rgba(241,90,34,0.15) 0%, transparent 100%)'
                : 'transparent',
              border: activePage === item.id
                ? '1px solid rgba(241,90,34,0.3)'
                : '1px solid transparent',
              borderRadius: '8px',
              color: activePage === item.id ? 'var(--orange)' : 'var(--gray)',
              fontFamily: 'var(--font-body)',
              fontSize: '13px',
              fontWeight: activePage === item.id ? '600' : '400',
              cursor: 'pointer',
              transition: 'all 0.2s',
              textAlign: 'left',
              letterSpacing: '0.3px',
            }}
          >
            <span style={{ fontSize: '16px', width: '18px' }}>{item.icon}</span>
            {item.label}
          </button>
        ))}
      </nav>

      {/* Bottom status */}
      <div style={{
        padding: '16px 20px',
        borderTop: '1px solid var(--border-dim)',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <div style={{
            width: '7px', height: '7px', borderRadius: '50%',
            background: '#22c55e',
            boxShadow: '0 0 6px #22c55e',
          }} />
          <span style={{ fontSize: '11px', color: 'var(--gray)', fontFamily: 'var(--font-condensed)', letterSpacing: '1px' }}>
            SYSTEM ACTIVE
          </span>
        </div>
      </div>
    </aside>
  )
}
