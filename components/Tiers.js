'use client'

export default function Tiers() {
  const tiers = [
    {
      name: 'STUDENT',
      price: '$9',
      period: '/mo',
      featured: false,
      features: ['Full video library access', 'New content monthly', 'Community Discord access', 'Track & car guides'],
    },
    {
      name: 'DRIVER',
      price: '$49',
      period: '/mo',
      featured: true,
      features: ['Everything in Student', '2 × 60-min live sessions/mo', 'Telemetry review included', 'Setup file library', 'Priority scheduling'],
    },
    {
      name: 'ELITE',
      price: '$120',
      period: '/mo',
      featured: false,
      features: ['Everything in Driver', 'Weekly 1-on-1 sessions', 'Race preparation calls', 'VOD review on request', 'Direct message access'],
    },
  ]

  return (
    <section id="coaching" style={{ padding: '96px 48px', background: 'var(--dark)' }}>
      <div style={{
        fontSize: '11px', fontWeight: 500, letterSpacing: '3px',
        textTransform: 'uppercase', color: 'var(--red)',
        marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '10px',
      }}>
        <span style={{ width: '24px', height: '1px', background: 'var(--red)', display: 'block' }} />
        Pricing
      </div>

      <h2 style={{
        fontFamily: 'var(--font-display)',
        fontSize: 'clamp(40px, 5vw, 64px)',
        letterSpacing: '3px', color: 'var(--off-white)',
        lineHeight: 0.95, marginBottom: '56px',
      }}>COACHING TIERS</h2>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '2px' }}>
        {tiers.map((tier, i) => (
          <div key={i} style={{
            background: tier.featured ? 'var(--dark-4)' : 'var(--dark-3)',
            padding: '40px 32px',
            border: tier.featured ? '1px solid rgba(232,25,44,0.3)' : '1px solid rgba(255,255,255,0.05)',
          }}>
            {tier.featured && (
              <div style={{
                display: 'inline-block', background: 'var(--red)',
                color: 'var(--off-white)', fontSize: '10px', fontWeight: 500,
                letterSpacing: '2px', textTransform: 'uppercase',
                padding: '4px 12px', marginBottom: '24px',
              }}>Most Popular</div>
            )}

            <div style={{
              fontFamily: 'var(--font-display)', fontSize: '32px',
              letterSpacing: '3px', color: 'var(--off-white)', marginBottom: '8px',
            }}>{tier.name}</div>

            <div style={{
              fontFamily: 'var(--font-display)', fontSize: '52px',
              letterSpacing: '2px', color: 'var(--off-white)', lineHeight: 1, marginBottom: '4px',
            }}>
              {tier.price}
              <span style={{ fontFamily: 'var(--font-body)', fontSize: '14px', color: 'var(--text-muted)', fontWeight: 300 }}>
                {tier.period}
              </span>
            </div>

            <div style={{ height: '1px', background: 'rgba(255,255,255,0.06)', margin: '28px 0' }} />

            <ul style={{ listStyle: 'none' }}>
              {tier.features.map((f, j) => (
                <li key={j} style={{
                  fontSize: '14px', fontWeight: 300, color: 'var(--cream)',
                  padding: '8px 0', borderBottom: '1px solid rgba(255,255,255,0.04)',
                  display: 'flex', alignItems: 'center', gap: '10px',
                }}>
                  <span style={{ width: '4px', height: '4px', background: 'var(--red)', flexShrink: 0, display: 'block' }} />
                  {f}
                </li>
              ))}
            </ul>

            <button
              style={{
                marginTop: '32px', width: '100%', padding: '14px',
                fontSize: '13px', fontWeight: 500, letterSpacing: '1.5px',
                textTransform: 'uppercase', cursor: 'pointer',
                fontFamily: 'var(--font-body)',
                background: tier.featured ? 'var(--red)' : 'none',
                color: tier.featured ? 'var(--off-white)' : 'var(--cream)',
                border: tier.featured ? 'none' : '1px solid rgba(200,194,181,0.25)',
                transition: 'all 0.2s',
              }}
              onMouseEnter={e => {
                if (tier.featured) e.currentTarget.style.background = 'var(--red-dim)'
                else { e.currentTarget.style.borderColor = 'var(--cream)'; e.currentTarget.style.color = 'var(--off-white)' }
              }}
              onMouseLeave={e => {
                if (tier.featured) e.currentTarget.style.background = 'var(--red)'
                else { e.currentTarget.style.borderColor = 'rgba(200,194,181,0.25)'; e.currentTarget.style.color = 'var(--cream)' }
              }}
            >
              {tier.name === 'STUDENT' ? 'Get Access' : tier.name === 'DRIVER' ? 'Start Coaching' : 'Go Elite'}
            </button>
          </div>
        ))}
      </div>
    </section>
  )
}