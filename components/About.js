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
      { threshold: 0.12 }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])
  return [ref, visible]
}

export default function About() {
  const [ref, visible] = useReveal()

  return (
    <section ref={ref} style={{
      background: 'var(--dark-2)',
      padding: '120px 48px',
      opacity: visible ? 1 : 0,
      transform: visible ? 'translateY(0)' : 'translateY(24px)',
      transition: 'opacity 0.7s ease, transform 0.7s ease',
    }}>
      <div style={{ maxWidth: '900px', margin: '0 auto' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '80px', alignItems: 'start' }}>

          {/* Left: label + heading */}
          <div>
            <div style={{
              fontSize: '11px', fontWeight: 500, letterSpacing: '3px',
              textTransform: 'uppercase', color: 'var(--red)',
              marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '10px',
            }}>
              <span style={{ width: '24px', height: '1px', background: 'var(--red)', display: 'block' }} />
              About
            </div>
            <h2 style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(40px, 4.5vw, 64px)',
              letterSpacing: '3px', color: 'var(--off-white)',
              lineHeight: 0.92,
            }}>
              THE<br />COACH<br /><span style={{ color: 'var(--red)' }}>BEHIND</span><br />THE WHEEL.
            </h2>
          </div>

          {/* Right: copy */}
          <div style={{ paddingTop: '4px' }}>
            <p style={{
              fontSize: '16px', fontWeight: 300,
              color: 'var(--cream)', lineHeight: 1.85,
              marginBottom: '28px',
            }}>
              DTS Academy, led by Anton Rushevich, is dedicated to helping sim racers improve through personalized, accessible, and confidence-driven coaching. The focus is on steady growth, clear goals, and empowering each driver to find their own pace — without the pressure to become someone else.
            </p>
            <p style={{
              fontSize: '16px', fontWeight: 300,
              color: 'var(--cream)', lineHeight: 1.85,
            }}>
              Everything I teach, I taught myself first. Years of trial, error, and obsessing over the data shaped the way I coach today — and I've spent 5+ years teaching across multiple disciplines. I know what it takes to actually get faster, and how to explain it in a way that clicks.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
