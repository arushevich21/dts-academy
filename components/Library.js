'use client'

export default function Library() {
  const videos = [
    {
      title: 'Trail Braking Theory — The Why and How',
      tag: 'Fundamentals',
      meta: '18 min · ACC · Free preview',
      locked: false,
      bg: 'linear-gradient(135deg, #1a1008 0%, #2d1a0a 100%)',
    },
    {
      title: 'Spa-Francorchamps — Sector 1 Mastery',
      tag: 'Track Guide',
      meta: '34 min · ACC · Student+',
      locked: true,
      bg: 'linear-gradient(135deg, #0a1018 0%, #0d1a2a 100%)',
    },
    {
      title: 'Reading Telemetry: Input Smoothness Deep Dive',
      tag: 'Data Analysis',
      meta: '27 min · Multi-sim · Driver+',
      locked: true,
      bg: 'linear-gradient(135deg, #0e0a18 0%, #1a102a 100%)',
    },
  ]

  return (
    <section id="library" style={{ padding: '96px 48px', background: 'var(--dark-2)' }}>
      <div style={{
        fontSize: '11px', fontWeight: 500, letterSpacing: '3px',
        textTransform: 'uppercase', color: 'var(--red)',
        marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '10px',
      }}>
        <span style={{ width: '24px', height: '1px', background: 'var(--red)', display: 'block' }} />
        Content Hub
      </div>

      <h2 style={{
        fontFamily: 'var(--font-display)',
        fontSize: 'clamp(40px, 5vw, 64px)',
        letterSpacing: '3px', color: 'var(--off-white)',
        lineHeight: 0.95, marginBottom: '20px',
      }}>THE LIBRARY</h2>

      <p style={{
        fontSize: '15px', fontWeight: 300, color: 'var(--cream)',
        maxWidth: '480px', lineHeight: 1.7, marginBottom: '56px',
      }}>
        Recorded sessions, technique breakdowns, and track guides. New content drops every week — always growing.
      </p>

      <div style={{
        display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px',
      }}>
        {videos.map((v, i) => (
          <div key={i} style={{
            background: 'var(--dark-4)',
            border: '1px solid rgba(255,255,255,0.05)',
            transition: 'border-color 0.2s',
          }}
            onMouseEnter={e => e.currentTarget.style.borderColor = 'rgba(232,25,44,0.3)'}
            onMouseLeave={e => e.currentTarget.style.borderColor = 'rgba(255,255,255,0.05)'}
          >
            <div style={{
              aspectRatio: '16/9', background: v.bg,
              position: 'relative', display: 'flex',
              alignItems: 'center', justifyContent: 'center',
            }}>
              {v.locked && (
                <div style={{
                  position: 'absolute', inset: 0,
                  background: 'rgba(13,12,11,0.6)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  zIndex: 2,
                }}>
                  <div style={{
                    fontSize: '10px', fontWeight: 500, letterSpacing: '2px',
                    textTransform: 'uppercase', color: 'var(--off-white)',
                    background: 'rgba(0,0,0,0.7)',
                    border: '1px solid rgba(232,25,44,0.5)',
                    padding: '5px 14px',
                  }}>Members Only</div>
                </div>
              )}
              <div style={{
                width: '44px', height: '44px',
                border: '1.5px solid rgba(240,237,230,0.6)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                position: 'relative', zIndex: 1,
              }}>
                <svg viewBox="0 0 10 12" width="14" height="14" style={{ marginLeft: '2px' }}>
                  <polygon points="0,0 10,6 0,12" fill="var(--off-white)" />
                </svg>
              </div>
            </div>

            <div style={{ padding: '16px 18px 20px' }}>
              <div style={{
                fontSize: '10px', fontWeight: 500, letterSpacing: '2px',
                textTransform: 'uppercase', color: 'var(--red)', marginBottom: '6px',
              }}>{v.tag}</div>
              <div style={{
                fontSize: '14px', fontWeight: 400, color: 'var(--off-white)',
                lineHeight: 1.4, marginBottom: '8px',
              }}>{v.title}</div>
              <div style={{ fontSize: '12px', color: 'var(--text-muted)', fontWeight: 300 }}>{v.meta}</div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}