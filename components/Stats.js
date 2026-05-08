'use client'

export default function Stats() {
  const stats = [
    { number: '10+', label: 'Students Coached' },
    { number: '8+', label: 'Video Lessons' },
    { number: '3yr', label: 'Teaching Experience' },
  ]

  return (
    <div style={{
      background: 'var(--dark-3)',
      borderTop: '1px solid rgba(255,255,255,0.06)',
      borderBottom: '1px solid rgba(255,255,255,0.06)',
      padding: '28px 48px',
      display: 'grid',
      gridTemplateColumns: 'repeat(3, 1fr)',
    }}>
      {stats.map((stat, i) => (
        <div key={i} style={{
          textAlign: 'center',
          borderRight: i < stats.length - 1 ? '1px solid rgba(255,255,255,0.06)' : 'none',
          padding: '0 20px',
        }}>
          <div style={{
            fontFamily: 'var(--font-display)',
            fontSize: '42px',
            letterSpacing: '2px',
            color: 'var(--off-white)',
            lineHeight: 1,
            marginBottom: '4px',
          }}>{stat.number}</div>
          <div style={{
            fontSize: '11px', fontWeight: 400,
            letterSpacing: '2px', textTransform: 'uppercase',
            color: 'var(--text-muted)',
          }}>{stat.label}</div>
        </div>
      ))}
    </div>
  )
}