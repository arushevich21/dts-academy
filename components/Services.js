'use client'

export default function Services() {
  const services = [
    {
      num: '01',
      name: '1-ON-1 COACHING',
      desc: 'Live sessions on your setup, race craft, braking points, and mental approach. Tailored entirely to your weaknesses.',
    },
    {
      num: '02',
      name: 'DATA ANALYSIS',
      desc: 'Telemetry breakdowns, sector-by-sector comparisons, and input trace analysis to identify where time is being lost.',
    },
    {
      num: '03',
      name: 'VIDEO LIBRARY',
      desc: 'Members-only access to recorded lessons, track guides, setup theory, and race craft breakdowns — on demand, any time.',
    },
  ]

  return (
    <section id="services" style={{ padding: '96px 48px', background: 'var(--dark-2)' }}>
      <div style={{
        fontSize: '11px', fontWeight: 500, letterSpacing: '3px',
        textTransform: 'uppercase', color: 'var(--red)',
        marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '10px',
      }}>
        <span style={{ width: '24px', height: '1px', background: 'var(--red)', display: 'block' }} />
        What We Offer
      </div>

      <h2 style={{
        fontFamily: 'var(--font-display)',
        fontSize: 'clamp(40px, 5vw, 64px)',
        letterSpacing: '3px', color: 'var(--off-white)',
        lineHeight: 0.95, marginBottom: '20px',
      }}>THE PROGRAM</h2>

      <p style={{
        fontSize: '15px', fontWeight: 300, color: 'var(--cream)',
        maxWidth: '480px', lineHeight: 1.7, marginBottom: '56px',
      }}>
        From raw beginner to league contender — DTS Academy covers every pillar of performance improvement.
      </p>

      <div style={{
        display: 'grid', gridTemplateColumns: '1fr 1fr 1fr',
        gap: '2px', border: '2px solid var(--dark-4)',
      }}>
        {services.map((s, i) => (
          <div key={i}
            style={{
              background: 'var(--dark-3)', padding: '40px 32px',
              border: '1px solid rgba(255,255,255,0.04)',
              transition: 'background 0.2s',
              cursor: 'default',
            }}
            onMouseEnter={e => e.currentTarget.style.background = 'var(--dark-4)'}
            onMouseLeave={e => e.currentTarget.style.background = 'var(--dark-3)'}
          >
            <div style={{
              fontFamily: 'var(--font-display)',
              fontSize: '64px', color: 'rgba(255,255,255,0.04)',
              letterSpacing: '2px', lineHeight: 1, marginBottom: '20px',
            }}>{s.num}</div>
            <div style={{
              fontFamily: 'var(--font-display)',
              fontSize: '26px', letterSpacing: '2px',
              color: 'var(--off-white)', marginBottom: '12px',
            }}>{s.name}</div>
            <div style={{
              fontSize: '14px', fontWeight: 300,
              color: 'var(--text-muted)', lineHeight: 1.7,
            }}>{s.desc}</div>
          </div>
        ))}
      </div>
    </section>
  )
}