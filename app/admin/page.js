'use client'
import { useEffect, useState } from 'react'
import { createClient } from '@supabase/supabase-js'
import { useRouter } from 'next/navigation'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
)

const ADMIN_USER_ID = 'eb1671b9-ea44-4681-8b7b-632344e16381'
const TIERS = ['pending', 'student', 'driver', 'elite']

export default function Admin() {
  const router = useRouter()
  const [tab, setTab] = useState('telemetry')
  const [uploads, setUploads] = useState([])
  const [members, setMembers] = useState([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState('all')

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      if (!data.user || data.user.id !== ADMIN_USER_ID) {
        router.push('/')
      } else {
        Promise.all([fetchAllUploads(), fetchAllMembers()]).then(() => setLoading(false))
      }
    })
  }, [])

  const fetchAllUploads = async () => {
    const { data } = await supabase
      .from('telemetry_uploads')
      .select('*')
      .order('created_at', { ascending: false })
    if (data) setUploads(data)
  }

  const fetchAllMembers = async () => {
    const { data } = await supabase
      .from('members')
      .select('*')
      .order('created_at', { ascending: false })
    if (data) setMembers(data)
  }

  const markReviewed = async (id, current) => {
    await supabase
      .from('telemetry_uploads')
      .update({ reviewed: !current })
      .eq('id', id)
    fetchAllUploads()
  }

  const downloadFile = async (storagePath, filename) => {
    const { data, error } = await supabase.storage
      .from('telemetry')
      .createSignedUrl(storagePath, 60)
    if (error) { alert('Download failed: ' + error.message); return }
    const a = document.createElement('a')
    a.href = data.signedUrl
    a.download = filename
    a.click()
  }

  const toggleActive = async (id, current) => {
    await supabase
      .from('members')
      .update({ active: !current })
      .eq('id', id)
    fetchAllMembers()
  }

  const updateTier = async (id, tier) => {
    await supabase
      .from('members')
      .update({ tier })
      .eq('id', id)
    fetchAllMembers()
  }

  const formatDate = (ts) => new Date(ts).toLocaleDateString('en-GB', {
    day: 'numeric', month: 'short', year: 'numeric',
    hour: '2-digit', minute: '2-digit'
  })

  const pendingCount = uploads.filter(u => !u.reviewed).length
  const inactiveCount = members.filter(m => !m.active).length

  const filtered = uploads.filter(u => {
    if (filter === 'pending') return !u.reviewed
    if (filter === 'reviewed') return u.reviewed
    return true
  })

  if (loading) return null

  return (
    <div style={{
      minHeight: '100vh', background: 'var(--dark)',
      padding: '80px 48px', position: 'relative',
    }}>
      <div style={{
        position: 'absolute', inset: 0, zIndex: 0,
        background: `
          repeating-linear-gradient(90deg, transparent, transparent 119px, rgba(255,255,255,0.02) 119px, rgba(255,255,255,0.02) 120px),
          repeating-linear-gradient(0deg, transparent, transparent 119px, rgba(255,255,255,0.02) 119px, rgba(255,255,255,0.02) 120px)
        `,
      }} />

      <div style={{ position: 'relative', zIndex: 1, maxWidth: '900px', margin: '0 auto' }}>

        {/* page header */}
        <div style={{ marginBottom: '40px' }}>
          <div style={{
            fontSize: '11px', fontWeight: 500, letterSpacing: '3px',
            textTransform: 'uppercase', color: 'var(--red)',
            marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '10px',
          }}>
            <span style={{ width: '24px', height: '1px', background: 'var(--red)', display: 'block' }} />
            Admin Panel
          </div>
          <h1 style={{
            fontFamily: 'var(--font-display)', fontSize: 'clamp(40px, 5vw, 64px)',
            letterSpacing: '3px', color: 'var(--off-white)', lineHeight: 0.95,
          }}>
            DTS <span style={{ color: 'var(--red)' }}>ADMIN</span>
          </h1>
        </div>

        {/* tab switcher */}
        <div style={{ display: 'flex', gap: '2px', marginBottom: '48px' }}>
          {[
            { key: 'telemetry', label: 'Telemetry', badge: pendingCount },
            { key: 'members', label: 'Members', badge: inactiveCount },
          ].map(({ key, label, badge }) => (
            <button
              key={key}
              onClick={() => setTab(key)}
              style={{
                background: tab === key ? 'var(--dark-3)' : 'none',
                border: `1px solid ${tab === key ? 'rgba(232,25,44,0.4)' : 'rgba(255,255,255,0.06)'}`,
                color: tab === key ? 'var(--off-white)' : 'var(--text-muted)',
                padding: '10px 28px', cursor: 'pointer',
                fontFamily: 'var(--font-display)', fontSize: '20px',
                letterSpacing: '2px', textTransform: 'uppercase',
                display: 'flex', alignItems: 'center', gap: '10px',
                transition: 'all 0.2s',
              }}
              onMouseEnter={e => { if (tab !== key) e.currentTarget.style.color = 'var(--cream)' }}
              onMouseLeave={e => { if (tab !== key) e.currentTarget.style.color = 'var(--text-muted)' }}
            >
              {label}
              {badge > 0 && (
                <span style={{
                  background: 'var(--red)', color: '#fff',
                  fontFamily: 'var(--font-body)', fontSize: '11px',
                  fontWeight: 600, letterSpacing: 0,
                  minWidth: '20px', height: '20px', borderRadius: '10px',
                  display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                  padding: '0 5px',
                }}>
                  {badge}
                </span>
              )}
            </button>
          ))}
        </div>

        {/* ── TELEMETRY TAB ── */}
        {tab === 'telemetry' && (
          <>
            <div style={{
              display: 'flex', alignItems: 'flex-start',
              justifyContent: 'space-between', marginBottom: '48px',
            }}>
              <h2 style={{
                fontFamily: 'var(--font-display)', fontSize: 'clamp(32px, 4vw, 52px)',
                letterSpacing: '3px', color: 'var(--off-white)', lineHeight: 0.95,
              }}>TELEMETRY<br /><span style={{ color: 'var(--red)' }}>INBOX</span></h2>

              <div style={{ display: 'flex', gap: '2px' }}>
                {[
                  { value: uploads.length, label: 'Total', color: 'var(--off-white)' },
                  { value: pendingCount, label: 'Pending', color: pendingCount > 0 ? '#FFD700' : 'var(--off-white)' },
                  { value: uploads.filter(u => u.reviewed).length, label: 'Reviewed', color: '#4ade80' },
                ].map(({ value, label, color }) => (
                  <div key={label} style={{
                    background: 'var(--dark-3)', border: '1px solid rgba(255,255,255,0.05)',
                    padding: '20px 28px', textAlign: 'center',
                  }}>
                    <div style={{
                      fontFamily: 'var(--font-display)', fontSize: '36px',
                      letterSpacing: '2px', color, lineHeight: 1,
                    }}>{value}</div>
                    <div style={{
                      fontSize: '10px', letterSpacing: '2px', textTransform: 'uppercase',
                      color: 'var(--text-muted)', marginTop: '4px',
                    }}>{label}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* filter tabs */}
            <div style={{ display: 'flex', gap: '2px', marginBottom: '24px' }}>
              {['all', 'pending', 'reviewed'].map(f => (
                <button
                  key={f}
                  onClick={() => setFilter(f)}
                  style={{
                    background: filter === f ? 'var(--dark-3)' : 'none',
                    border: `1px solid ${filter === f ? 'rgba(232,25,44,0.3)' : 'rgba(255,255,255,0.05)'}`,
                    color: filter === f ? 'var(--off-white)' : 'var(--text-muted)',
                    padding: '8px 20px', cursor: 'pointer',
                    fontSize: '11px', fontWeight: 500, letterSpacing: '2px',
                    textTransform: 'uppercase', fontFamily: 'var(--font-body)',
                    transition: 'all 0.2s',
                  }}
                >
                  {f}
                </button>
              ))}
            </div>

            {/* uploads list */}
            {filtered.length === 0 ? (
              <div style={{
                background: 'var(--dark-3)', border: '1px solid rgba(255,255,255,0.05)',
                padding: '48px', textAlign: 'center',
                color: 'var(--text-muted)', fontSize: '14px', fontWeight: 300,
              }}>
                No uploads found
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                {filtered.map((u) => (
                  <div key={u.id} style={{
                    background: 'var(--dark-3)',
                    border: `1px solid ${!u.reviewed ? 'rgba(255,215,0,0.15)' : 'rgba(255,255,255,0.05)'}`,
                    borderLeft: `3px solid ${!u.reviewed ? '#FFD700' : '#4ade80'}`,
                    padding: '24px 28px',
                    display: 'flex', alignItems: 'center',
                    justifyContent: 'space-between', gap: '24px',
                  }}>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{
                        fontSize: '13px', fontWeight: 400,
                        color: 'var(--off-white)', marginBottom: '4px',
                        overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
                      }}>{u.filename}</div>
                      <div style={{
                        fontSize: '12px', color: 'var(--text-muted)',
                        fontWeight: 300, marginBottom: '6px',
                      }}>{u.email}</div>
                      {u.note && (
                        <div style={{
                          fontSize: '13px', color: 'var(--cream)',
                          fontWeight: 300, fontStyle: 'italic',
                          marginBottom: '6px', lineHeight: 1.5,
                        }}>"{u.note}"</div>
                      )}
                      <div style={{
                        fontSize: '11px', color: 'var(--text-muted)', opacity: 0.6,
                      }}>{formatDate(u.created_at)}</div>
                    </div>

                    <div style={{ display: 'flex', gap: '8px', flexShrink: 0 }}>
                      <button
                        onClick={() => downloadFile(u.storage_path, u.filename)}
                        style={{
                          background: 'none',
                          border: '1px solid rgba(255,255,255,0.1)',
                          color: 'var(--cream)', padding: '8px 16px',
                          cursor: 'pointer', fontSize: '11px',
                          fontWeight: 500, letterSpacing: '1.5px',
                          textTransform: 'uppercase', fontFamily: 'var(--font-body)',
                          display: 'flex', alignItems: 'center', gap: '6px',
                          transition: 'all 0.2s',
                        }}
                        onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--cream)'; e.currentTarget.style.color = 'var(--off-white)' }}
                        onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)'; e.currentTarget.style.color = 'var(--cream)' }}
                      >
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                          <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                          <polyline points="7 10 12 15 17 10" />
                          <line x1="12" y1="15" x2="12" y2="3" />
                        </svg>
                        Download
                      </button>

                      <button
                        onClick={() => markReviewed(u.id, u.reviewed)}
                        style={{
                          background: u.reviewed ? 'rgba(74,222,128,0.1)' : 'rgba(255,215,0,0.1)',
                          border: `1px solid ${u.reviewed ? 'rgba(74,222,128,0.3)' : 'rgba(255,215,0,0.3)'}`,
                          color: u.reviewed ? '#4ade80' : '#FFD700',
                          padding: '8px 16px', cursor: 'pointer',
                          fontSize: '11px', fontWeight: 500,
                          letterSpacing: '1.5px', textTransform: 'uppercase',
                          fontFamily: 'var(--font-body)', transition: 'all 0.2s',
                        }}
                        onMouseEnter={e => e.currentTarget.style.opacity = '0.7'}
                        onMouseLeave={e => e.currentTarget.style.opacity = '1'}
                      >
                        {u.reviewed ? 'Reviewed ✓' : 'Mark Reviewed'}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </>
        )}

        {/* ── MEMBERS TAB ── */}
        {tab === 'members' && (
          <>
            <div style={{
              display: 'flex', alignItems: 'flex-start',
              justifyContent: 'space-between', marginBottom: '48px',
            }}>
              <h2 style={{
                fontFamily: 'var(--font-display)', fontSize: 'clamp(32px, 4vw, 52px)',
                letterSpacing: '3px', color: 'var(--off-white)', lineHeight: 0.95,
              }}>MEMBER<br /><span style={{ color: 'var(--red)' }}>ROSTER</span></h2>

              <div style={{ display: 'flex', gap: '2px' }}>
                {[
                  { value: members.length, label: 'Total', color: 'var(--off-white)' },
                  { value: inactiveCount, label: 'Awaiting', color: inactiveCount > 0 ? '#FFD700' : 'var(--off-white)' },
                  { value: members.filter(m => m.active).length, label: 'Active', color: '#4ade80' },
                ].map(({ value, label, color }) => (
                  <div key={label} style={{
                    background: 'var(--dark-3)', border: '1px solid rgba(255,255,255,0.05)',
                    padding: '20px 28px', textAlign: 'center',
                  }}>
                    <div style={{
                      fontFamily: 'var(--font-display)', fontSize: '36px',
                      letterSpacing: '2px', color, lineHeight: 1,
                    }}>{value}</div>
                    <div style={{
                      fontSize: '10px', letterSpacing: '2px', textTransform: 'uppercase',
                      color: 'var(--text-muted)', marginTop: '4px',
                    }}>{label}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* members list */}
            {members.length === 0 ? (
              <div style={{
                background: 'var(--dark-3)', border: '1px solid rgba(255,255,255,0.05)',
                padding: '48px', textAlign: 'center',
                color: 'var(--text-muted)', fontSize: '14px', fontWeight: 300,
              }}>
                No members yet
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                {members.map((m) => (
                  <div key={m.id} style={{
                    background: 'var(--dark-3)',
                    border: `1px solid ${m.active ? 'rgba(74,222,128,0.12)' : 'rgba(255,215,0,0.15)'}`,
                    borderLeft: `3px solid ${m.active ? '#4ade80' : '#FFD700'}`,
                    padding: '20px 28px',
                    display: 'flex', alignItems: 'center',
                    justifyContent: 'space-between', gap: '24px',
                  }}>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{
                        fontSize: '13px', fontWeight: 400,
                        color: 'var(--off-white)', marginBottom: '4px',
                        overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
                      }}>{m.email || m.user_id}</div>
                      <div style={{
                        fontSize: '11px', color: 'var(--text-muted)', opacity: 0.6,
                      }}>Joined {formatDate(m.created_at)}</div>
                    </div>

                    <div style={{ display: 'flex', gap: '8px', flexShrink: 0, alignItems: 'center' }}>
                      <select
                        value={m.tier || 'pending'}
                        onChange={e => updateTier(m.id, e.target.value)}
                        style={{
                          background: 'var(--dark-4)', color: 'var(--cream)',
                          border: '1px solid rgba(255,255,255,0.1)',
                          padding: '8px 28px 8px 12px', cursor: 'pointer',
                          fontSize: '11px', fontWeight: 500,
                          letterSpacing: '1.5px', textTransform: 'uppercase',
                          fontFamily: 'var(--font-body)', outline: 'none',
                          appearance: 'none', WebkitAppearance: 'none', MozAppearance: 'none',
                          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='10' height='6' viewBox='0 0 10 6'%3E%3Cpath d='M1 1l4 4 4-4' stroke='%237A756D' stroke-width='1.5' fill='none' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E")`,
                          backgroundRepeat: 'no-repeat',
                          backgroundPosition: 'right 10px center',
                        }}
                      >
                        {TIERS.map(t => (
                          <option key={t} value={t}>{t.toUpperCase()}</option>
                        ))}
                      </select>

                      <button
                        onClick={() => toggleActive(m.id, m.active)}
                        style={{
                          background: m.active ? 'rgba(74,222,128,0.1)' : 'rgba(255,215,0,0.1)',
                          border: `1px solid ${m.active ? 'rgba(74,222,128,0.3)' : 'rgba(255,215,0,0.3)'}`,
                          color: m.active ? '#4ade80' : '#FFD700',
                          padding: '8px 16px', cursor: 'pointer',
                          fontSize: '11px', fontWeight: 500,
                          letterSpacing: '1.5px', textTransform: 'uppercase',
                          fontFamily: 'var(--font-body)', transition: 'all 0.2s',
                        }}
                        onMouseEnter={e => e.currentTarget.style.opacity = '0.7'}
                        onMouseLeave={e => e.currentTarget.style.opacity = '1'}
                      >
                        {m.active ? 'Active ✓' : 'Approve'}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </>
        )}

      </div>
    </div>
  )
}
