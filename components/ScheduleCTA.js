'use client'

export default function ScheduleCTA() {
  return (
    <section id="schedule" style={{
      background: 'var(--dark)',
      borderTop: '1px solid rgba(255,255,255,0.05)',
      padding: '96px 48px',
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: '48px',
      alignItems: 'center',
    }}>
      <div>
        <div style={{
          fontSize: '11px', fontWeight: 500, letterSpacing: '3px',
          textTransform: 'uppercase', color: 'var(--red)',
          marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '10px',
        }}>
          <span style={{ width: '24px', height: '1px', background: 'var(--red)', display: 'block' }} />
          Book Now
        </div>
        <h2 style={{
          fontFamily: 'var(--font-display)',
          fontSize: 'clamp(40px, 5vw, 72px)',
          letterSpacing: '3px', color: 'var(--off-white)', lineHeight: 0.95,
        }}>
          READY TO<br />
          <span style={{ color: 'var(--red)' }}>FIND TIME?</span>
        </h2>
      </div>

      <div>
        <p style={{
          fontSize: '15px', fontWeight: 300, color: 'var(--cream)',
          lineHeight: 1.7, marginBottom: '32px',
        }}>
          Sessions run 60 minutes. Pick a slot that works for you and we'll get straight to work — no fluff, no filler, just laps and data.
        </p>
        <button style={{
          background: 'var(--red)', color: 'var(--off-white)', border: 'none',
          padding: '16px 36px', fontSize: '13px', fontWeight: 500,
          letterSpacing: '1.5px', textTransform: 'uppercase', cursor: 'pointer',
          fontFamily: 'var(--font-body)',
        }}
          onMouseEnter={e => e.currentTarget.style.background = 'var(--red-dim)'}
          onMouseLeave={e => e.currentTarget.style.background = 'var(--red)'}
        >
          View Open Slots
        </button>
      </div>
    </section>
  )
}