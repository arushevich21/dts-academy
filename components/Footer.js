'use client'
import Image from 'next/image'

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
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <Image
          src="/logo.png"
          alt="DTS Academy"
          width={120}
          height={40}
          style={{ height: '32px', width: 'auto', objectFit: 'contain' }}
        />
      </div>

      <ul style={{ display: 'flex', gap: '24px', listStyle: 'none' }}>
        {['Privacy', 'Terms', 'Contact'].map((item) => (
          <li key={item}>
            <a href="#" style={{
              fontSize: '12px', color: 'var(--text-muted)',
              textDecoration: 'none', letterSpacing: '1.5px', textTransform: 'uppercase',
              transition: 'color 0.2s',
            }}
              onMouseEnter={e => e.target.style.color = 'var(--off-white)'}
              onMouseLeave={e => e.target.style.color = 'var(--text-muted)'}
            >{item}</a>
          </li>
        ))}
      </ul>

      <div style={{ fontSize: '12px', color: 'var(--text-muted)', fontWeight: 300 }}>
        © 2026 DTS Academy. All rights reserved.
      </div>
    </footer>
  )
}
