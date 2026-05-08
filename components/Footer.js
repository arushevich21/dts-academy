'use client'

export default function Footer() {
  return (
    <footer style={{
      background: 'var(--dark-2)',
      borderTop: '1px solid rgba(255,255,255,0.06)',
      padding: '40px 48px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
    }}>
      <div style={{
        fontFamily: 'var(--font-display)',
        fontSize: '22px', letterSpacing: '3px', color: 'var(--off-white)',
      }}>
        DTS <span style={{ color: 'var(--red)' }}>Academy</span>
      </div>

      <ul style={{ display: 'flex', gap: '24px', listStyle: 'none' }}>
        {['Privacy', 'Terms', 'Contact'].map((item) => (
          <li key={item}>
            <a href="#" style={{
              fontSize: '12px', color: 'var(--text-muted)',
              textDecoration: 'none', letterSpacing: '1px', textTransform: 'uppercase',
              transition: 'color 0.2s',
            }}
              onMouseEnter={e => e.target.style.color = 'var(--off-white)'}
              onMouseLeave={e => e.target.style.color = 'var(--text-muted)'}
            >{item}</a>
          </li>
        ))}
      </ul>

      <div style={{ fontSize: '12px', color: 'var(--text-muted)', fontWeight: 300 }}>
        © 2025 DTS Academy. All rights reserved.
      </div>
    </footer>
  )
}