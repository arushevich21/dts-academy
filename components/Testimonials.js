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
      { threshold: 0.2 }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])
  return [ref, visible]
}

const TESTIMONIALS = [
  {
    quote: "Anton breaks down every corner in a way that actually makes sense. After two sessions I knocked two seconds off my lap at Spa — something I'd been stuck on for months.",
    name: 'James H.',
    context: 'GT3 driver, iRacing',
  },
  {
    quote: "The telemetry feedback alone is worth it. Having someone look at your data and tell you exactly where you're losing time is a completely different experience from watching YouTube guides.",
    name: 'Marcus T.',
    context: 'Rookie class, ACC',
  },
  {
    quote: "I wasn't sure if coaching was for me but Anton made it feel natural. No pressure, no ego — just clear, focused improvement every session.",
    name: 'Sven K.',
    context: 'Open-wheel, rFactor 2',
  },
]

export default function Testimonials() {
  const [ref, visible] = useReveal()
  const [index, setIndex] = useState(0)
  const [fading, setFading] = useState(false)

  useEffect(() => {
    const id = setInterval(() => {
      setFading(true)
      setTimeout(() => {
        setIndex(i => (i + 1) % TESTIMONIALS.length)
        setFading(false)
      }, 500)
    }, 6000)
    return () => clearInterval(id)
  }, [])

  const goTo = (i) => {
    if (i === index) return
    setFading(true)
    setTimeout(() => { setIndex(i); setFading(false) }, 300)
  }

  const t = TESTIMONIALS[index]

  return (
    <section ref={ref} style={{
      background: 'var(--dark-2)',
      padding: '120px 48px',
      opacity: visible ? 1 : 0,
      transform: visible ? 'translateY(0)' : 'translateY(24px)',
      transition: 'opacity 0.7s ease, transform 0.7s ease',
    }}>
      <div style={{ maxWidth: '680px', margin: '0 auto', textAlign: 'center' }}>

        <div style={{
          fontSize: '11px', fontWeight: 500, letterSpacing: '3px',
          textTransform: 'uppercase', color: 'var(--red)',
          marginBottom: '64px',
          display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '12px',
        }}>
          <span style={{ width: '24px', height: '1px', background: 'var(--red)', display: 'block' }} />
          From the Drivers
          <span style={{ width: '24px', height: '1px', background: 'var(--red)', display: 'block' }} />
        </div>

        {/* Quote block */}
        <div style={{
          minHeight: '200px',
          display: 'flex', flexDirection: 'column', justifyContent: 'center',
          opacity: fading ? 0 : 1,
          transition: 'opacity 0.5s ease',
        }}>
          <blockquote style={{
            fontSize: '19px', fontWeight: 400,
            fontStyle: 'italic',
            fontFamily: 'Georgia, "Times New Roman", serif',
            color: 'var(--cream)',
            lineHeight: 1.8,
            marginBottom: '36px',
            letterSpacing: '0.15px',
          }}>
            &ldquo;{t.quote}&rdquo;
          </blockquote>

          <div>
            <div style={{
              fontFamily: 'var(--font-display)',
              fontSize: '18px', letterSpacing: '2.5px',
              color: 'var(--off-white)', marginBottom: '4px',
            }}>
              {t.name.toUpperCase()}
            </div>
            <div style={{
              fontSize: '12px', color: 'var(--text-muted)',
              fontWeight: 300, letterSpacing: '0.5px',
            }}>
              {t.context}
            </div>
          </div>
        </div>

        {/* Dot indicators */}
        <div style={{
          display: 'flex', justifyContent: 'center',
          alignItems: 'center', gap: '10px',
          marginTop: '52px',
        }}>
          {TESTIMONIALS.map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              aria-label={`Go to testimonial ${i + 1}`}
              style={{
                width: i === index ? '24px' : '6px',
                height: '6px',
                background: i === index ? 'var(--red)' : 'rgba(255,255,255,0.2)',
                border: 'none', padding: 0, cursor: 'pointer',
                transition: 'width 0.3s ease, background 0.3s ease',
              }}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
