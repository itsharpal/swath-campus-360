import { Link } from '@adonisjs/inertia/react'

interface ZoneJob {
  id: number
  status: string
  type: string
  completedAt?: string
  supervisor?: {
    name: string
  }
}

interface Props {
  jobs: ZoneJob[]
  zoneName?: string
}

const statusStyle: Record<string, { bg: string; color: string; border: string }> = {
  pending: { bg: '#fef3c7', color: '#b45309', border: '#fde68a' },
  in_progress: { bg: '#dbeafe', color: '#1d4ed8', border: '#bfdbfe' },
  completed: { bg: '#d1fae5', color: '#047857', border: '#a7f3d0' },
}

const typeStyle: Record<string, { bg: string; color: string }> = {
  cleaning: { bg: 'rgba(22,163,74,0.1)', color: '#15803d' },
  maintenance: { bg: 'rgba(59,130,246,0.1)', color: '#1d4ed8' },
  inspection: { bg: 'rgba(139,92,246,0.1)', color: '#7c3aed' },
  repair: { bg: 'rgba(245,158,11,0.1)', color: '#b45309' },
}

function formatDate(dateStr?: string) {
  if (!dateStr) return '—'
  try {
    return new Date(dateStr).toLocaleDateString('en-IN', {
      day: '2-digit', month: 'short', year: 'numeric',
      hour: '2-digit', minute: '2-digit',
    })
  } catch {
    return dateStr
  }
}

export default function ZoneHistory({ jobs, zoneName }: Props) {
  const completed = jobs.filter(j => j.status === 'completed').length
  const total = jobs.length
  const completionRate = total > 0 ? Math.round((completed / total) * 100) : 0

  const typeBreakdown = jobs.reduce<Record<string, number>>((acc, j) => {
    acc[j.type] = (acc[j.type] || 0) + 1
    return acc
  }, {})

  return (
    <div
      style={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #f0fdf4 0%, #dcfce7 50%, #f0fdf4 100%)',
        fontFamily: "'DM Sans', 'Segoe UI', sans-serif",
        padding: '2.5rem 2rem',
        position: 'relative',
      }}
    >
      <div style={{ position: 'fixed', top: '-80px', left: '-80px', width: '300px', height: '300px', borderRadius: '50%', border: '2px solid rgba(22,163,74,0.08)', pointerEvents: 'none' }} />
      <div style={{ position: 'fixed', bottom: '-60px', right: '-60px', width: '250px', height: '250px', borderRadius: '50%', border: '2px solid rgba(22,163,74,0.06)', pointerEvents: 'none' }} />

      <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
        {/* Back */}
        <Link href="/job-cards" style={{
          display: 'inline-flex', alignItems: 'center', gap: '6px',
          fontSize: '0.82rem', fontWeight: 600, color: '#16a34a',
          textDecoration: 'none', marginBottom: '1.5rem',
          padding: '6px 14px', borderRadius: '8px',
          border: '1px solid #bbf7d0', background: '#f0fdf4',
        }}>
          <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
            <path d="M19 12H5M12 19l-7-7 7-7" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          Back
        </Link>

        {/* Header */}
        <div style={{ marginBottom: '2rem', display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '6px' }}>
              <div style={{ width: '28px', height: '2px', background: '#16a34a' }} />
              <span style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '0.15em', color: '#16a34a', textTransform: 'uppercase' }}>
                Swachh Campus
              </span>
              <div style={{ width: '28px', height: '2px', background: '#16a34a' }} />
            </div>
            <h1 style={{ fontSize: '2.4rem', fontWeight: 800, lineHeight: 1.1, color: '#0f172a', margin: 0 }}>
              Zone{' '}<span style={{ color: '#16a34a' }}>History</span>
            </h1>
            {zoneName && (
              <p style={{ color: '#64748b', fontSize: '0.95rem', marginTop: '6px' }}>
                Job records for <strong style={{ color: '#374151' }}>{zoneName}</strong>
              </p>
            )}
          </div>

          {/* Completion badge */}
          <div style={{
            background: '#ffffff', borderRadius: '14px', padding: '1rem 1.4rem',
            boxShadow: '0 1px 8px rgba(0,0,0,0.06)', border: '1px solid rgba(22,163,74,0.1)',
            textAlign: 'center', minWidth: '120px',
          }}>
            <p style={{ margin: 0, fontSize: '0.75rem', color: '#94a3b8', fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Completion</p>
            <p style={{ margin: '4px 0 0', fontSize: '2rem', fontWeight: 800, color: '#16a34a' }}>{completionRate}%</p>
            <div style={{
              height: '4px', background: '#f1f5f9', borderRadius: '2px', marginTop: '8px', overflow: 'hidden',
            }}>
              <div style={{
                height: '100%', width: `${completionRate}%`,
                background: 'linear-gradient(90deg, #16a34a, #4ade80)',
                borderRadius: '2px', transition: 'width 0.6s ease',
              }} />
            </div>
          </div>
        </div>

        {/* Summary Cards */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: `repeat(${Math.min(Object.keys(typeBreakdown).length + 1, 5)}, 1fr)`,
          gap: '1rem', marginBottom: '1.5rem',
        }}>
          <div style={{
            background: '#ffffff', borderRadius: '14px', padding: '1.1rem 1.4rem',
            boxShadow: '0 1px 8px rgba(0,0,0,0.06)', border: '1px solid rgba(22,163,74,0.1)',
          }}>
            <p style={{ margin: 0, fontSize: '0.75rem', color: '#94a3b8', fontWeight: 500 }}>Total Jobs</p>
            <p style={{ margin: '2px 0 0', fontSize: '1.5rem', fontWeight: 800, color: '#0f172a' }}>{total}</p>
          </div>
          {Object.entries(typeBreakdown).map(([type, count]) => {
            const t = typeStyle[type] ?? { bg: 'rgba(22,163,74,0.1)', color: '#15803d' }
            return (
              <div key={type} style={{
                background: '#ffffff', borderRadius: '14px', padding: '1.1rem 1.4rem',
                boxShadow: '0 1px 8px rgba(0,0,0,0.06)', border: '1px solid rgba(22,163,74,0.1)',
              }}>
                <span style={{
                  fontSize: '0.68rem', fontWeight: 700, padding: '2px 8px',
                  borderRadius: '10px', textTransform: 'capitalize',
                  background: t.bg, color: t.color,
                }}>{type}</span>
                <p style={{ margin: '4px 0 0', fontSize: '1.5rem', fontWeight: 800, color: '#0f172a' }}>{count}</p>
              </div>
            )
          })}
        </div>

        {/* Table */}
        <div style={{
          background: '#ffffff', borderRadius: '16px',
          boxShadow: '0 1px 8px rgba(0,0,0,0.06)',
          border: '1px solid rgba(22,163,74,0.1)', overflow: 'hidden',
        }}>
          <div style={{
            padding: '1.25rem 1.5rem', borderBottom: '1px solid #f1f5f9',
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          }}>
            <div>
              <h2 style={{ fontSize: '1.05rem', fontWeight: 700, color: '#0f172a', margin: 0 }}>Job Records</h2>
              <p style={{ fontSize: '0.8rem', color: '#94a3b8', margin: '2px 0 0' }}>{total} entries in history</p>
            </div>
            <div style={{
              width: '8px', height: '8px', borderRadius: '50%',
              background: '#16a34a', boxShadow: '0 0 0 3px rgba(22,163,74,0.2)',
            }} />
          </div>

          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ background: '#f8fafc' }}>
                  {['Job', 'Type', 'Supervisor', 'Status', 'Completed At'].map((h) => (
                    <th key={h} style={{
                      padding: '0.85rem 1.5rem', textAlign: 'left',
                      fontSize: '0.75rem', fontWeight: 700, color: '#94a3b8',
                      letterSpacing: '0.06em', textTransform: 'uppercase',
                    }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {jobs.map((job, i) => {
                  const s = statusStyle[job.status] ?? { bg: '#f1f5f9', color: '#64748b', border: '#e2e8f0' }
                  const t = typeStyle[job.type] ?? { bg: 'rgba(22,163,74,0.1)', color: '#15803d' }
                  return (
                    <tr
                      key={job.id}
                      style={{
                        borderTop: '1px solid #f1f5f9',
                        background: i % 2 === 0 ? '#fff' : '#fafcff',
                        transition: 'background 0.15s',
                      }}
                      onMouseEnter={e => (e.currentTarget as HTMLElement).style.background = '#f0fdf4'}
                      onMouseLeave={e => (e.currentTarget as HTMLElement).style.background = i % 2 === 0 ? '#fff' : '#fafcff'}
                    >
                      <td style={{ padding: '1rem 1.5rem' }}>
                        <span style={{ fontFamily: 'monospace', fontWeight: 700, color: '#16a34a', fontSize: '0.88rem' }}>#{job.id}</span>
                      </td>
                      <td style={{ padding: '1rem 1.5rem' }}>
                        <span style={{
                          fontSize: '0.75rem', fontWeight: 600, padding: '4px 10px',
                          borderRadius: '20px', textTransform: 'capitalize',
                          background: t.bg, color: t.color,
                        }}>{job.type}</span>
                      </td>
                      <td style={{ padding: '1rem 1.5rem' }}>
                        {job.supervisor?.name
                          ? (
                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                              <div style={{
                                width: '28px', height: '28px', borderRadius: '50%',
                                background: 'linear-gradient(135deg, #16a34a, #4ade80)',
                                display: 'flex', alignItems: 'center', justifyContent: 'center',
                                color: '#fff', fontSize: '0.7rem', fontWeight: 700,
                                flexShrink: 0,
                              }}>
                                {job.supervisor.name.charAt(0).toUpperCase()}
                              </div>
                              <span style={{ fontSize: '0.88rem', color: '#374151', fontWeight: 500 }}>
                                {job.supervisor.name}
                              </span>
                            </div>
                          )
                          : <span style={{ color: '#94a3b8', fontSize: '0.88rem' }}>—</span>
                        }
                      </td>
                      <td style={{ padding: '1rem 1.5rem' }}>
                        <span style={{
                          fontSize: '0.75rem', fontWeight: 600, padding: '4px 10px',
                          borderRadius: '20px', textTransform: 'capitalize',
                          background: s.bg, color: s.color, border: `1px solid ${s.border}`,
                        }}>{job.status.replace('_', ' ')}</span>
                      </td>
                      <td style={{ padding: '1rem 1.5rem', fontSize: '0.85rem', color: '#64748b' }}>
                        {formatDate(job.completedAt)}
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
            {jobs.length === 0 && (
              <div style={{ textAlign: 'center', padding: '3rem' }}>
                <div style={{
                  width: '56px', height: '56px', borderRadius: '14px',
                  background: 'rgba(22,163,74,0.08)', margin: '0 auto 12px',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>
                  <svg width="24" height="24" fill="none" stroke="#16a34a" strokeWidth="1.7" viewBox="0 0 24 24">
                    <path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <p style={{ color: '#94a3b8', fontSize: '0.9rem', margin: 0 }}>No job history for this zone.</p>
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div style={{ textAlign: 'center', marginTop: '2rem', color: '#94a3b8', fontSize: '0.75rem', letterSpacing: '0.08em' }}>
          ✕ SWACHH CAMPUS • ZONE HISTORY • 2026
        </div>
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700;800&display=swap');
      `}</style>
    </div>
  )
}
