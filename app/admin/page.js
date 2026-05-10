'use client'
import { useEffect, useState } from 'react'
import { createClient } from '@supabase/supabase-js'
import { useRouter } from 'next/navigation'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
)

const ADMIN_USER_ID = 'eb1671b9-ea44-4681-8b7b-632344e16381'

export default function Admin() {
  const router = useRouter()
  const [uploads, setUploads] = useState([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState('all')

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      if (!data.user || data.user.id !== ADMIN_USER_ID) {
        router.push('/')
      } else {
        fetchAllUploads()
      }
    })
  }, [])

  const fetchAllUploads = async () => {
    const { data } = await supabase
      .from('telemetry_uploads')
      .select('*')
      .order('created_at', { ascending: false })
    if (data) setUploads(data)
    setLoading(false)
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

  const formatDate = (ts) => new Date(ts).toLocaleDateString('en-GB', {
    day: 'numeric', month: 'short', year: 'numeric',
    hour: '2-digit', minute: '2-digit'
  })

  const filtered = uploads.filter(u => {
    if (filter === 'pending') return !u.reviewed
    if (filter === 'reviewed') return u.reviewed
    return true
  })

  const pendingCount = uploads.filter(u => !u.reviewed).length

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

        {/* header */}
        <div style={{
          display: 'flex', alignItems: 'flex-start',
          justifyContent: 'space-between', marginBottom: '48px',
        }}>
          <div>
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
            }}>TELEMETRY<br /><span style={{ color: 'var(--red)' }}>INBOX</span></h1>
          </div>

          {/* stats */}
          <div style={{ display: 'flex', gap: '2px' }}>
            <div style={{
              background: 'var(--dark-3)', border: '1px solid rgba(255,255,255,0.05)',
              padding: '20px 28px', textAlign: 'center',
            }}>
              <div style={{
                fontFamily: 'var(--font-display)', fontSize: '36px',
                letterSpacing: '2px', color: 'var(--off-white)', lineHeight: 1,
              }}>{uploads.length}</div>
              <div style={{
                fontSize: '10px', letterSpacing: '2px', textTransform: 'uppercase',
                color: 'var(--text-muted)', marginTop: '4px',
              }}>Total</div>
            </div>
            <div style={{
              background: 'var(--dark-3)', border: '1px solid rgba(255,255,255,0.05)',
              padding: '20px 28px', textAlign: 'center',
            }}>
              <div style={{
                fontFamily: 'var(--font-display)', fontSize: '36px',
                letterSpacing: '2px',
                color: pendingCount > 0 ? '#FFD700' : 'var(--off-white)',
                lineHeight: 1,
              }}>{pendingCount}</div>
              <div style={{
                fontSize: '10px', letterSpacing: '2px', textTransform: 'uppercase',
                color: 'var(--text-muted)', marginTop: '4px',
              }}>Pending</div>
            </div>
            <div style={{
              background: 'var(--dark-3)', border: '1px solid rgba(255,255,255,0.05)',
              padding: '20px 28px', textAlign: 'center',
            }}>
              <div style={{
                fontFamily: 'var(--font-display)', fontSize: '36px',
                letterSpacing: '2px', color: '#4ade80', lineHeight: 1,
              }}>{uploads.filter(u => u.reviewed).length}</div>
              <div style={{
                fontSize: '10px', letterSpacing: '2px', textTransform: 'uppercase',
                color: 'var(--text-muted)', marginTop: '4px',
              }}>Reviewed</div>
            </div>
          </div>
        </div>

        {/* filter tabs */}
        <div style={{
          display: 'flex', gap: '2px', marginBottom: '24px',
        }}>
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

                {/* file info */}
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

                {/* actions */}
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

      </div>
    </div>
  )
}