'use client'

import { useState, useEffect } from 'react'

export default function Nav() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handler)
    return () => window.removeEventListener('scroll', handler)
  }, [])

  return (
    <nav style={{
      position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      padding: '20px 48px',
      background: scrolled ? 'rgba(13,12,11,0.95)' : 'linear-gradient(to bottom, rgba(13,12,11,0.95) 0%, transparent 100%)',
      backdropFilter: 'blur(2px)',
      transition: 'background 0.3s',
      borderBottom: scrolled ? '1px solid rgba(255,255,255,0.06)' : 'none',
    }}>
      <div style={{
        fontFamily: 'var(--font-display)',
        fontSize: '28px',
        letterSpacing: '3px',
        color: 'var(--off-white)',
      }}>
        DTS <span style={{ color: 'var(--red)' }}>Academy</span>
      </div>

      <ul style={{ display: 'flex', gap: '32px', listStyle: 'none' }}>
        {['Services', 'Coaching', 'Library', 'Schedule'].map((item) => (
          <li key={item}>
            <a href={`#${item.toLowerCase()}`} style={{
              textDecoration: 'none',
              fontSize: '13px',
              fontWeight: 400,
              letterSpacing: '1.5px',
              textTransform: 'uppercase',
              color: 'var(--cream)',
              transition: 'color 0.2s',
            }}
              onMouseEnter={e => e.target.style.color = 'var(--off-white)'}
              onMouseLeave={e => e.target.style.color = 'var(--cream)'}
            >{item}</a>
          </li>
        ))}
      </ul>

      <button style={{
        background: 'var(--red)',
        color: 'var(--off-white)',
        border: 'none',
        padding: '10px 24px',
        fontSize: '13px',
        fontWeight: 500,
        letterSpacing: '1px',
        textTransform: 'uppercase',
        cursor: 'pointer',
        fontFamily: 'var(--font-body)',
      }}
        onMouseEnter={e => e.currentTarget.style.background = 'var(--red-dim)'}
        onMouseLeave={e => e.currentTarget.style.background = 'var(--red)'}
      >
        Book a Session
      </button>
    </nav>
  )
}