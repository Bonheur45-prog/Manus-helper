import React from 'react'

export default function Card({ children, style = {}, accent = false }) {
  return (
    <div style={{
      background: 'var(--dark3)',
      border: `1px solid ${accent ? 'var(--border)' : 'var(--border-dim)'}`,
      borderRadius: '12px',
      padding: '24px',
      ...style,
    }}>
      {children}
    </div>
  )
}

export function SectionTitle({ children, tag }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px' }}>
      <h2 style={{
        fontFamily: 'var(--font-display)',
        fontSize: '20px',
        letterSpacing: '2px',
        color: 'var(--white)',
      }}>{children}</h2>
      {tag && (
        <span style={{
          fontFamily: 'var(--font-condensed)',
          fontSize: '10px',
          letterSpacing: '2px',
          color: 'var(--orange)',
          background: 'rgba(241,90,34,0.1)',
          border: '1px solid rgba(241,90,34,0.25)',
          padding: '3px 8px',
          borderRadius: '4px',
          textTransform: 'uppercase',
        }}>{tag}</span>
      )}
    </div>
  )
}

export function InfoRow({ label, value, mono = false }) {
  return (
    <div style={{
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'flex-start',
      padding: '10px 0',
      borderBottom: '1px solid var(--border-dim)',
      gap: '16px',
    }}>
      <span style={{
        fontFamily: 'var(--font-condensed)',
        fontSize: '11px',
        letterSpacing: '1.5px',
        color: 'var(--steel)',
        textTransform: 'uppercase',
        minWidth: '120px',
        paddingTop: '1px',
      }}>{label}</span>
      <span style={{
        fontSize: '13px',
        color: 'var(--white)',
        fontFamily: mono ? 'monospace' : 'var(--font-body)',
        textAlign: 'right',
        wordBreak: 'break-all',
      }}>{value}</span>
    </div>
  )
}
