'use client'
import { useState, useEffect } from 'react'
import { createClient } from '@supabase/supabase-js'
import { useRouter } from 'next/navigation'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
)

export default function Nav() {
  const router = useRouter()
  const [scrolled, setScrolled] = useState(false)
  const [user, setUser] = useState(null)

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handler)

    supabase.auth.getUser().then(({ data }) => setUser(data.user))
    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null)
    })

    return () => {
      window.removeEventListener('scroll', handler)
      listener.subscription.unsubscribe()
    }
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
      <div
        onClick={() => router.push('/')}
        style={{
          fontFamily: 'var(--font-display)',
          fontSize: '28px', letterSpacing: '3px',
          color: 'var(--off-white)', cursor: 'pointer',
        }}>
        DTS <span style={{ color: 'var(--red)' }}>Academy</span>
      </div>

      <ul style={{ display: 'flex', gap: '32px', listStyle: 'none' }}>
        {['Services', 'Coaching', 'Library', 'Schedule'].map((item) => (
          <li key={item}>
            <a href={`#${item.toLowerCase()}`} style={{
              textDecoration: 'none', fontSize: '13px', fontWeight: 400,
              letterSpacing: '1.5px', textTransform: 'uppercase',
              color: 'var(--cream)', transition: 'color 0.2s',
            }}
              onMouseEnter={e => e.target.style.color = 'var(--off-white)'}
              onMouseLeave={e => e.target.style.color = 'var(--cream)'}
            >{item}</a>
          </li>
        ))}
      </ul>

      <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
        {user ? (
          <button
            onClick={() => router.push('/dashboard')}
            style={{
              background: 'none', color: 'var(--cream)',
              border: '1px solid rgba(200,194,181,0.3)',
              padding: '10px 24px', fontSize: '13px', fontWeight: 500,
              letterSpacing: '1px', textTransform: 'uppercase',
              cursor: 'pointer', fontFamily: 'var(--font-body)',
              transition: 'all 0.2s',
            }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--cream)'; e.currentTarget.style.color = 'var(--off-white)' }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(200,194,181,0.3)'; e.currentTarget.style.color = 'var(--cream)' }}
          >Dashboard</button>
        ) : (
          <button
            onClick={() => router.push('/login')}
            style={{
              background: 'none', color: 'var(--cream)',
              border: '1px solid rgba(200,194,181,0.3)',
              padding: '10px 24px', fontSize: '13px', fontWeight: 500,
              letterSpacing: '1px', textTransform: 'uppercase',
              cursor: 'pointer', fontFamily: 'var(--font-body)',
              transition: 'all 0.2s',
            }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--cream)'; e.currentTarget.style.color = 'var(--off-white)' }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(200,194,181,0.3)'; e.currentTarget.style.color = 'var(--cream)' }}
          >Sign In</button>
        )}
        <button style={{
          background: 'var(--red)', color: 'var(--off-white)', border: 'none',
          padding: '10px 24px', fontSize: '13px', fontWeight: 500,
          letterSpacing: '1px', textTransform: 'uppercase',
          cursor: 'pointer', fontFamily: 'var(--font-body)',
        }}
          onMouseEnter={e => e.currentTarget.style.background = 'var(--red-dim)'}
          onMouseLeave={e => e.currentTarget.style.background = 'var(--red)'}
        >Book a Session</button>
      </div>
    </nav>
  )
}