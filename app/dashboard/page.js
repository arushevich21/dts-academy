'use client'
import { useEffect, useState } from 'react'
import { createClient } from '@supabase/supabase-js'
import { useRouter } from 'next/navigation'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
)

const DISCORD_SERVER = 'https://discord.gg/cTSU8uhp9q'
const VENMO_HANDLE = '@arushevich'
const MEMBERSHIP_PRICE = '9'

export default function Dashboard() {
  const router = useRouter()
  const [user, setUser] = useState(null)
  const [isMember, setIsMember] = useState(null)
  const [showGreeting, setShowGreeting] = useState(false)
  const [showOptions, setShowOptions] = useState(false)

  useEffect(() => {
    supabase.auth.getUser().then(async ({ data }) => {
      if (!data.user) { router.push('/login'); return }
      setUser(data.user)
      const { data: member } = await supabase
        .from('members')
        .select('*')
        .eq('user_id', data.user.id)
        .eq('active', true)
        .single()
      setIsMember(!!member)
      setTimeout(() => setShowGreeting(true), 100)
      setTimeout(() => setShowOptions(true), 1600)
    })
  }, [])

  const firstName = user?.user_metadata?.full_name?.split(' ')[0]
    || user?.user_metadata?.name?.split(' ')[0]
    || null

  const memberOptions = [
    {
      label: 'Video Library',
      desc: 'Access your coaching videos and track guides',
      href: '/library',
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <polygon points="5,3 19,12 5,21" />
        </svg>
      ),
    },
    {
      label: 'Book a Session',
      desc: 'Schedule your next 1-on-1 coaching session',
      href: '/schedule',
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <rect x="3" y="4" width="18" height="18" rx="2" />
          <line x1="16" y1="2" x2="16" y2="6" />
          <line x1="8" y1="2" x2="8" y2="6" />
          <line x1="3" y1="10" x2="21" y2="10" />
        </svg>
      ),
    },
    {
      label: 'Upload Telemetry',
      desc: 'Send your .rpy lap files to your coach for review',
      href: '/telemetry',
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
          <polyline points="17 8 12 3 7 8" />
          <line x1="12" y1="3" x2="12" y2="15" />
        </svg>
      ),
    },
    {
      label: 'My Account',
      desc: 'Manage your subscription and settings',
      href: '/account',
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <circle cx="12" cy="8" r="4" />
          <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" />
        </svg>
      ),
    },
  ]

  if (!user || isMember === null) return null

  return (
    <div style={{
      minHeight: '100vh',
      background: 'var(--dark)',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '48px',
      position: 'relative',
    }}>
      <div style={{
        position: 'absolute', inset: 0, zIndex: 0,
        background: `
          repeating-linear-gradient(90deg, transparent, transparent 119px, rgba(255,255,255,0.02) 119px, rgba(255,255,255,0.02) 120px),
          repeating-linear-gradient(0deg, transparent, transparent 119px, rgba(255,255,255,0.02) 119px, rgba(255,255,255,0.02) 120px)
        `,
      }} />

      <div style={{ position: 'relative', zIndex: 1, width: '100%', maxWidth: '680px' }}>

        <div style={{
          textAlign: 'center',
          marginBottom: '64px',
          opacity: showGreeting ? 1 : 0,
          transform: showGreeting ? 'translateY(0)' : 'translateY(16px)',
          transition: 'opacity 0.8s ease, transform 0.8s ease',
        }}>
          <div style={{
            fontSize: '12px', fontWeight: 500, letterSpacing: '3px',
            textTransform: 'uppercase', color: 'var(--red)', marginBottom: '16px',
          }}>DTS Academy</div>

          <h1 style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(48px, 7vw, 80px)',
            letterSpacing: '4px', color: 'var(--off-white)',
            lineHeight: 1, marginBottom: '12px',
          }}>
            {firstName ? 'WELCOME BACK,' : 'WELCOME BACK'}
          </h1>

          {firstName && (
            <h1 style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(48px, 7vw, 80px)',
              letterSpacing: '4px', color: 'var(--red)',
              lineHeight: 1, marginBottom: '12px',
            }}>{firstName.toUpperCase()}.</h1>
          )}

          <p style={{
            fontSize: '14px', fontWeight: 300,
            color: 'var(--text-muted)', letterSpacing: '0.5px',
          }}>{user.email}</p>
        </div>

        {isMember ? (
          <div>
            <div style={{
              display: 'grid', gridTemplateColumns: '1fr 1fr',
              gap: '2px', marginBottom: '2px',
              opacity: showOptions ? 1 : 0,
              transform: showOptions ? 'translateY(0)' : 'translateY(20px)',
              transition: 'opacity 0.7s ease, transform 0.7s ease',
            }}>
              {memberOptions.map((opt, i) => (
                <button
                  key={i}
                  onClick={() => router.push(opt.href)}
                  style={{
                    background: 'var(--dark-3)',
                    border: '1px solid rgba(255,255,255,0.05)',
                    padding: '28px 32px', textAlign: 'left',
                    cursor: 'pointer', display: 'flex',
                    flexDirection: 'column', gap: '12px',
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.background = 'var(--dark-4)'
                    e.currentTarget.style.borderColor = 'rgba(232,25,44,0.3)'
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.background = 'var(--dark-3)'
                    e.currentTarget.style.borderColor = 'rgba(255,255,255,0.05)'
                  }}
                >
                  <div style={{ color: 'var(--red)' }}>{opt.icon}</div>
                  <div>
                    <div style={{
                      fontFamily: 'var(--font-display)', fontSize: '22px',
                      letterSpacing: '2px', color: 'var(--off-white)', marginBottom: '6px',
                    }}>{opt.label.toUpperCase()}</div>
                    <div style={{
                      fontSize: '13px', fontWeight: 300,
                      color: 'var(--text-muted)', lineHeight: 1.5,
                    }}>{opt.desc}</div>
                  </div>
                </button>
              ))}
            </div>

            <button
              onClick={() => router.push('/members')}
              style={{
                width: '100%', background: 'var(--dark-3)',
                border: '1px solid rgba(232,25,44,0.2)',
                borderTop: '2px solid var(--red)',
                padding: '32px 40px', textAlign: 'left', cursor: 'pointer',
                display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                opacity: showOptions ? 1 : 0,
                transform: showOptions ? 'translateY(0)' : 'translateY(20px)',
                transition: 'opacity 0.7s ease 0.1s, transform 0.7s ease 0.1s, background 0.2s',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.background = 'var(--dark-4)'
                e.currentTarget.style.borderColor = 'rgba(232,25,44,0.5)'
              }}
              onMouseLeave={e => {
                e.currentTarget.style.background = 'var(--dark-3)'
                e.currentTarget.style.borderColor = 'rgba(232,25,44,0.2)'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
                <div style={{ color: 'var(--red)' }}>
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <rect x="3" y="3" width="7" height="7" />
                    <rect x="14" y="3" width="7" height="7" />
                    <rect x="3" y="14" width="7" height="7" />
                    <rect x="14" y="14" width="7" height="7" />
                  </svg>
                </div>
                <div>
                  <div style={{
                    fontFamily: 'var(--font-display)', fontSize: '28px',
                    letterSpacing: '3px', color: 'var(--off-white)', marginBottom: '4px',
                  }}>MEMBER DASHBOARD</div>
                  <div style={{ fontSize: '13px', fontWeight: 300, color: 'var(--text-muted)' }}>
                    Your personalised hub — progress, notes, and more
                  </div>
                </div>
              </div>
              <div style={{
                display: 'flex', alignItems: 'center', gap: '8px',
                color: 'var(--red)', fontSize: '12px', fontWeight: 500,
                letterSpacing: '2px', textTransform: 'uppercase', flexShrink: 0,
              }}>
                Enter
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <line x1="5" y1="12" x2="19" y2="12" />
                  <polyline points="13,6 19,12 13,18" />
                </svg>
              </div>
            </button>
          </div>
        ) : (
          <div style={{
            opacity: showOptions ? 1 : 0,
            transform: showOptions ? 'translateY(0)' : 'translateY(20px)',
            transition: 'opacity 0.7s ease, transform 0.7s ease',
            display: 'flex', flexDirection: 'column', gap: '2px',
          }}>
            <div style={{
              background: 'var(--dark-3)',
              border: '1px solid rgba(255,255,255,0.05)',
              borderTop: '2px solid rgba(255,255,255,0.1)',
              padding: '28px 32px',
              display: 'flex', alignItems: 'center', gap: '16px',
            }}>
              <div style={{ color: 'var(--text-muted)', flexShrink: 0 }}>
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <rect x="3" y="11" width="18" height="11" rx="2" />
                  <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                </svg>
              </div>
              <div>
                <div style={{
                  fontFamily: 'var(--font-display)', fontSize: '18px',
                  letterSpacing: '2px', color: 'var(--off-white)', marginBottom: '4px',
                }}>NO ACTIVE MEMBERSHIP</div>
                <div style={{
                  fontSize: '13px', fontWeight: 300,
                  color: 'var(--text-muted)', lineHeight: 1.5,
                }}>
                  Get access to the video library, telemetry coaching, and session booking by becoming a member.
                </div>
              </div>
            </div>

            <div style={{
              background: 'var(--dark-3)',
              border: '1px solid rgba(232,25,44,0.2)',
              borderTop: '2px solid var(--red)',
              padding: '32px',
            }}>
              <div style={{
                fontFamily: 'var(--font-display)', fontSize: '24px',
                letterSpacing: '2px', color: 'var(--off-white)', marginBottom: '20px',
              }}>BECOME A MEMBER</div>

              <div style={{
                display: 'grid', gridTemplateColumns: '1fr 1fr',
                gap: '2px', marginBottom: '24px',
              }}>
                {[
                  'Full video library access',
                  '1-on-1 coaching sessions',
                  'Telemetry upload & review',
                  'Track & setup guides',
                ].map((f, i) => (
                  <div key={i} style={{
                    display: 'flex', alignItems: 'center', gap: '8px',
                    fontSize: '13px', fontWeight: 300, color: 'var(--cream)',
                    padding: '10px 0',
                    borderBottom: '1px solid rgba(255,255,255,0.04)',
                  }}>
                    <span style={{
                      width: '4px', height: '4px',
                      background: 'var(--red)', flexShrink: 0, display: 'block',
                    }} />
                    {f}
                  </div>
                ))}
              </div>

              <div style={{
                background: 'var(--dark-4)',
                border: '1px solid rgba(255,255,255,0.06)',
                padding: '20px 24px', marginBottom: '20px',
              }}>
                <div style={{
                  fontSize: '11px', fontWeight: 500, letterSpacing: '2px',
                  textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: '12px',
                }}>How to join</div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  {[
                    `Send $${MEMBERSHIP_PRICE}/mo to ${VENMO_HANDLE} on Venmo`,
                    'Include your Discord username in the payment note',
                    'You will be approved within 24 hours',
                  ].map((step, i) => (
                    <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
                      <div style={{
                        width: '20px', height: '20px', flexShrink: 0,
                        background: 'var(--red)',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        fontFamily: 'var(--font-display)', fontSize: '13px',
                        color: 'var(--off-white)', letterSpacing: '1px',
                      }}>{i + 1}</div>
                      <div style={{
                        fontSize: '13px', fontWeight: 300,
                        color: 'var(--cream)', lineHeight: 1.5, paddingTop: '2px',
                      }}>{step}</div>
                    </div>
                  ))}
                </div>
              </div>

              <div style={{ display: 'flex', gap: '8px' }}>
                <button
                  onClick={() => window.open(`https://venmo.com/${VENMO_HANDLE.replace('@', '')}`, '_blank')}
                  style={{
                    flex: 1, padding: '14px',
                    background: 'var(--red)', color: 'var(--off-white)',
                    border: 'none', fontSize: '13px', fontWeight: 500,
                    letterSpacing: '1.5px', textTransform: 'uppercase',
                    cursor: 'pointer', fontFamily: 'var(--font-body)',
                    display: 'flex', alignItems: 'center',
                    justifyContent: 'center', gap: '8px',
                  }}
                  onMouseEnter={e => e.currentTarget.style.background = 'var(--red-dim)'}
                  onMouseLeave={e => e.currentTarget.style.background = 'var(--red)'}
                >
                  Pay on Venmo
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <line x1="5" y1="12" x2="19" y2="12" />
                    <polyline points="13,6 19,12 13,18" />
                  </svg>
                </button>

                <button
                  onClick={() => window.open(DISCORD_SERVER, '_blank')}
                  style={{
                    flex: 1, padding: '14px',
                    background: 'none', color: 'var(--cream)',
                    border: '1px solid rgba(200,194,181,0.25)',
                    fontSize: '13px', fontWeight: 500,
                    letterSpacing: '1.5px', textTransform: 'uppercase',
                    cursor: 'pointer', fontFamily: 'var(--font-body)',
                    display: 'flex', alignItems: 'center',
                    justifyContent: 'center', gap: '8px',
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.borderColor = 'var(--cream)'
                    e.currentTarget.style.color = 'var(--off-white)'
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.borderColor = 'rgba(200,194,181,0.25)'
                    e.currentTarget.style.color = 'var(--cream)'
                  }}
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057c.002.022.015.043.032.054a19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03z" />
                  </svg>
                  Join Discord
                </button>
              </div>
            </div>
          </div>
        )}

        <div style={{ textAlign: 'center', marginTop: '32px' }}>
          <button
            onClick={async () => { await supabase.auth.signOut(); router.push('/login') }}
            style={{
              background: 'none', border: 'none', cursor: 'pointer',
              fontSize: '12px', color: 'var(--text-muted)',
              letterSpacing: '1.5px', textTransform: 'uppercase',
              fontFamily: 'var(--font-body)',
              opacity: showOptions ? 1 : 0,
              transition: 'opacity 0.7s ease 0.2s, color 0.2s',
            }}
            onMouseEnter={e => e.currentTarget.style.color = 'var(--cream)'}
            onMouseLeave={e => e.currentTarget.style.color = 'var(--text-muted)'}
          >
            Sign Out
          </button>
        </div>

      </div>
    </div>
  )
}