'use client'
import { useEffect, useRef, useState } from 'react'

function useReveal() {
  const ref = useRef(null)
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); obs.disconnect() } },
      { threshold: 0.1 }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])
  return [ref, visible]
}

const FEATURES = [
  {
    title: 'Video Library',
    desc: 'Hot lap guides and track breakdowns built around your style and car. Revisit any time, on demand.',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <polygon points="5,3 19,12 5,21" />
      </svg>
    ),
  },
  {
    title: 'Telemetry Review',
    desc: 'Upload your lap files and receive personal written feedback pointing to exactly where the time is.',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
      </svg>
    ),
  },
  {
    title: '1-on-1 Coaching',
    desc: 'Live sessions built entirely around your weaknesses - real-time corrections, replay analysis, and setup work.',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <rect x="3" y="4" width="18" height="18" rx="2" />
        <line x1="16" y1="2" x2="16" y2="6" />
        <line x1="8" y1="2" x2="8" y2="6" />
        <line x1="3" y1="10" x2="21" y2="10" />
      </svg>
    ),
  },
  {
    title: 'Setup Library',
    desc: 'Coach-tuned setup files for every track and car class - download and load directly into your sim.',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
        <polyline points="14 2 14 8 20 8" />
        <path d="M12 18v-6" />
        <path d="M9 15l3 3 3-3" />
      </svg>
    ),
  },
]

export default function Features() {
  const [ref, visible] = useReveal()

  return (
    <section ref={ref} style={{
      background: 'var(--dark)',
      padding: '120px 48px',
      opacity: visible ? 1 : 0,
      transform: visible ? 'translateY(0)' : 'translateY(24px)',
      transition: 'opacity 0.7s ease, transform 0.7s ease',
    }}>
      <div style={{ maxWidth: '900px', margin: '0 auto' }}>

        <div style={{ marginBottom: '64px' }}>
          <div style={{
            fontSize: '11px', fontWeight: 500, letterSpacing: '3px',
            textTransform: 'uppercase', color: 'var(--red)',
            marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '10px',
          }}>
            <span style={{ width: '24px', height: '1px', background: 'var(--red)', display: 'block' }} />
            What You Get
          </div>
          <h2 style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(40px, 5.5vw, 80px)',
            letterSpacing: '4px', color: 'var(--off-white)',
            lineHeight: 0.9,
          }}>
            EVERYTHING YOU NEED<br /><span style={{ color: 'var(--red)' }}>TO GET FASTER.</span>
          </h2>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2px' }}>
          {FEATURES.map((f, i) => (
            <div key={i} style={{
              background: 'var(--dark-3)',
              border: '1px solid rgba(255,255,255,0.05)',
              borderLeft: '3px solid rgba(232,25,44,0.35)',
              padding: '40px 36px',
              display: 'flex', flexDirection: 'column', gap: '18px',
            }}>
              <div style={{ color: 'var(--red)' }}>{f.icon}</div>
              <div>
                <div style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '28px', letterSpacing: '2px',
                  color: 'var(--off-white)', marginBottom: '12px',
                }}>{f.title.toUpperCase()}</div>
                <div style={{
                  fontSize: '14px', fontWeight: 300,
                  color: 'var(--text-muted)', lineHeight: 1.75,
                }}>{f.desc}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
