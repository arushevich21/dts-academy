'use client'
import { useEffect, useState } from 'react'
import { createClient } from '@supabase/supabase-js'
import { useRouter } from 'next/navigation'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
)

const CAL_USERNAME = 'dts-anton'
const CAL_EVENT = 'dts-academy-coaching-session'

export default function Schedule() {
  const router = useRouter()
  const [user, setUser] = useState(null)

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      if (!data.user) { router.push('/login'); return }
      setUser(data.user)
    })
  }, [])

  if (!user) return null

  const calUrl = `https://cal.com/${CAL_USERNAME}/${CAL_EVENT}?theme=dark`

  return (
    <div style={{
      minHeight: '100vh', background: 'var(--dark)',
      position: 'relative',
    }}>
      <div style={{
        position: 'absolute', inset: 0, zIndex: 0,
        background: `
          repeating-linear-gradient(90deg, transparent, transparent 119px, rgba(255,255,255,0.02) 119px, rgba(255,255,255,0.02) 120px),
          repeating-linear-gradient(0deg, transparent, transparent 119px, rgba(255,255,255,0.02) 119px, rgba(255,255,255,0.02) 120px)
        `,
      }} />

      <div style={{ position: 'relative', zIndex: 1, maxWidth: '900px', margin: '0 auto', padding: '120px 48px 80px' }}>

        <button
          onClick={() => router.push('/dashboard')}
          style={{
            background: 'none', border: 'none', cursor: 'pointer',
            color: 'var(--text-muted)', fontSize: '12px', letterSpacing: '2px',
            textTransform: 'uppercase', fontFamily: 'var(--font-body)',
            display: 'flex', alignItems: 'center', gap: '8px',
            marginBottom: '32px', padding: 0,
          }}
          onMouseEnter={e => e.currentTarget.style.color = 'var(--cream)'}
          onMouseLeave={e => e.currentTarget.style.color = 'var(--text-muted)'}
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <line x1="19" y1="12" x2="5" y2="12" />
            <polyline points="11,6 5,12 11,18" />
          </svg>
          Back to dashboard
        </button>

        <div style={{
          fontSize: '11px', fontWeight: 500, letterSpacing: '3px',
          textTransform: 'uppercase', color: 'var(--red)',
          marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '10px',
        }}>
          <span style={{ width: '24px', height: '1px', background: 'var(--red)', display: 'block' }} />
          Coaching
        </div>

        <h1 style={{
          fontFamily: 'var(--font-display)', fontSize: 'clamp(40px, 6vw, 64px)',
          letterSpacing: '3px', color: 'var(--off-white)',
          lineHeight: 0.95, marginBottom: '12px',
        }}>BOOK A<br /><span style={{ color: 'var(--red)' }}>SESSION</span></h1>

        <p style={{
          fontSize: '14px', fontWeight: 300, color: 'var(--text-muted)',
          lineHeight: 1.7, marginBottom: '48px', maxWidth: '480px',
        }}>
          Pick a time that works for you. Sessions are 60 minutes.
        </p>

        <div style={{
          background: 'var(--dark-3)',
          border: '1px solid rgba(255,255,255,0.05)',
          borderTop: '2px solid var(--red)',
          overflow: 'hidden',
        }}>
          <iframe
            src={calUrl}
            style={{
              width: '100%',
              height: '700px',
              border: 'none',
              display: 'block',
            }}
            title="Book a coaching session"
          />
        </div>

      </div>
    </div>
  )
}