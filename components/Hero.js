'use client'

export default function Hero() {
  return (
    <section style={{
      position: 'relative',
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'flex-end',
      padding: '0 48px 80px',
      overflow: 'hidden',
    }}>
      <div style={{
        position: 'absolute', inset: 0, zIndex: 0,
        background: `
          repeating-linear-gradient(90deg, transparent, transparent 119px, rgba(255,255,255,0.025) 119px, rgba(255,255,255,0.025) 120px),
          repeating-linear-gradient(0deg, transparent, transparent 119px, rgba(255,255,255,0.025) 119px, rgba(255,255,255,0.025) 120px),
          radial-gradient(ellipse 80% 60% at 60% 40%, #1a0306 0%, var(--dark) 70%)
        `,
      }} />

      <div style={{
        position: 'absolute', right: 0, top: 0, bottom: 0, width: '45%',
        background: 'linear-gradient(135deg, transparent 30%, rgba(232,25,44,0.06) 100%)',
        zIndex: 0,
      }} />

      <div style={{
        position: 'absolute', left: 0, right: 0, bottom: 0,
        height: '3px',
        background: 'linear-gradient(90deg, var(--red) 0%, transparent 60%)',
        zIndex: 1,
      }} />

      <div style={{ position: 'relative', zIndex: 2, maxWidth: '680px' }}>
        <div style={{
          fontSize: '12px', fontWeight: 500, letterSpacing: '3px',
          textTransform: 'uppercase', color: 'var(--red)',
          marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '12px',
        }}>
          <span style={{ display: 'block', width: '32px', height: '1px', background: 'var(--red)' }} />
          Sim Racing Coaching
        </div>

        <h1 style={{
          fontFamily: 'var(--font-display)',
          fontSize: 'clamp(72px, 10vw, 120px)',
          lineHeight: 0.92,
          letterSpacing: '4px',
          color: 'var(--off-white)',
          marginBottom: '28px',
        }}>
          Drive.<br />
          Think.<br />
          <span style={{ color: 'var(--red)' }}>Succeed.</span>
        </h1>

        <p style={{
          fontSize: '16px', fontWeight: 300, color: 'var(--cream)',
          maxWidth: '480px', lineHeight: 1.7, marginBottom: '40px',
        }}>
          Elite coaching and data-driven training for sim racers who want to find the last tenth — and the one after that.
        </p>

        <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
          <button style={{
            background: 'var(--red)', color: 'var(--off-white)', border: 'none',
            padding: '16px 36px', fontSize: '13px', fontWeight: 500,
            letterSpacing: '1.5px', textTransform: 'uppercase', cursor: 'pointer',
            fontFamily: 'var(--font-body)',
          }}
            onMouseEnter={e => e.currentTarget.style.background = 'var(--red-dim)'}
            onMouseLeave={e => e.currentTarget.style.background = 'var(--red)'}
          >
            Book a Session
          </button>
          <button style={{
            background: 'none', color: 'var(--cream)',
            border: '1px solid rgba(200,194,181,0.3)',
            padding: '15px 36px', fontSize: '13px', fontWeight: 400,
            letterSpacing: '1.5px', textTransform: 'uppercase', cursor: 'pointer',
            fontFamily: 'var(--font-body)',
          }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--cream)'; e.currentTarget.style.color = 'var(--off-white)' }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(200,194,181,0.3)'; e.currentTarget.style.color = 'var(--cream)' }}
          >
            View Library
          </button>
        </div>
      </div>
    </section>
  )
}