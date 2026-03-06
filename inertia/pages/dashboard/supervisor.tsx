import { Link } from '@adonisjs/inertia/react'

interface Stats {
  totalJobs: number
  pendingJobs: number
  activeJobs: number
  completedJobs: number
}

interface Job {
  id: number
  status: string
  zone?: { name: string }
  complaint?: { complaintCode: string }
}

interface Props {
  stats: Stats
  recentJobs: Job[]
}

const statusStyle: Record<string, { bg: string; color: string; border: string }> = {
  pending: { bg: '#fef3c7', color: '#b45309', border: '#fde68a' },
  in_progress: { bg: '#dbeafe', color: '#1d4ed8', border: '#bfdbfe' },
  completed: { bg: '#d1fae5', color: '#047857', border: '#a7f3d0' },
}

export default function SupervisorDashboard({ stats, recentJobs }: Props) {
  const statCards = [
    {
      label: 'Total Jobs',
      value: stats.totalJobs,
      icon: (
        <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.7" viewBox="0 0 24 24">
          <path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      ),
      accent: '#16a34a',
      bg: 'rgba(22,163,74,0.08)',
    },
    {
      label: 'Pending',
      value: stats.pendingJobs,
      icon: (
        <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.7" viewBox="0 0 24 24">
          <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
        </svg>
      ),
      accent: '#f59e0b',
      bg: 'rgba(245,158,11,0.08)',
    },
    {
      label: 'In Progress',
      value: stats.activeJobs,
      icon: (
        <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.7" viewBox="0 0 24 24">
          <path d="M13 10V3L4 14h7v7l9-11h-7z" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      ),
      accent: '#3b82f6',
      bg: 'rgba(59,130,246,0.08)',
    },
    {
      label: 'Completed',
      value: stats.completedJobs,
      icon: (
        <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.7" viewBox="0 0 24 24">
          <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      ),
      accent: '#10b981',
      bg: 'rgba(16,185,129,0.08)',
    },
  ]

  return (
    <div
      style={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #f0fdf4 0%, #dcfce7 50%, #f0fdf4 100%)',
        fontFamily: "'DM Sans', 'Segoe UI', sans-serif",
        padding: '2.5rem 2rem',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Background decoration */}
      <div style={{
        position: 'fixed', top: '-80px', left: '-80px', width: '300px', height: '300px',
        borderRadius: '50%', border: '2px solid rgba(22,163,74,0.08)', pointerEvents: 'none',
      }} />
      <div style={{
        position: 'fixed', bottom: '-60px', right: '-60px', width: '250px', height: '250px',
        borderRadius: '50%', border: '2px solid rgba(22,163,74,0.06)', pointerEvents: 'none',
      }} />

      <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
        {/* Header */}
        <div style={{ marginBottom: '2rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '6px' }}>
            <div style={{ width: '28px', height: '2px', background: '#16a34a' }} />
            <span style={{
              fontSize: '11px', fontWeight: 700, letterSpacing: '0.15em',
              color: '#16a34a', textTransform: 'uppercase',
            }}>
              Swachh Campus
            </span>
            <div style={{ width: '28px', height: '2px', background: '#16a34a' }} />
          </div>
          <h1 style={{
            fontSize: '2.4rem', fontWeight: 800, lineHeight: 1.1,
            color: '#0f172a', margin: 0,
          }}>
            Supervisor{' '}
            <span style={{ color: '#16a34a' }}>Dashboard</span>
          </h1>
          <p style={{ color: '#64748b', fontSize: '0.95rem', marginTop: '6px' }}>
            Track and manage your assigned jobs across all zones.
          </p>
        </div>

        {/* Stat Cards */}
        <div style={{
          display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)',
          gap: '1rem', marginBottom: '2rem',
        }}>
          {statCards.map((card) => (
            <div
              key={card.label}
              style={{
                background: '#ffffff', borderRadius: '14px',
                padding: '1.25rem', boxShadow: '0 1px 8px rgba(0,0,0,0.06)',
                border: '1px solid rgba(22,163,74,0.1)',
                transition: 'transform 0.2s, box-shadow 0.2s',
                cursor: 'default',
              }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLElement).style.transform = 'translateY(-2px)'
                ;(e.currentTarget as HTMLElement).style.boxShadow = '0 4px 20px rgba(0,0,0,0.1)'
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLElement).style.transform = 'translateY(0)'
                ;(e.currentTarget as HTMLElement).style.boxShadow = '0 1px 8px rgba(0,0,0,0.06)'
              }}
            >
              <div style={{
                width: '40px', height: '40px', borderRadius: '10px',
                background: card.bg, display: 'flex', alignItems: 'center',
                justifyContent: 'center', color: card.accent, marginBottom: '10px',
              }}>
                {card.icon}
              </div>
              <p style={{ fontSize: '0.78rem', color: '#94a3b8', fontWeight: 500, margin: 0 }}>
                {card.label}
              </p>
              <p style={{ fontSize: '1.7rem', fontWeight: 800, color: '#0f172a', margin: '2px 0 0 0' }}>
                {card.value}
              </p>
            </div>
          ))}
        </div>

        {/* Recent Jobs Table */}
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
              <h2 style={{ fontSize: '1.05rem', fontWeight: 700, color: '#0f172a', margin: 0 }}>
                Recent Jobs
              </h2>
              <p style={{ fontSize: '0.8rem', color: '#94a3b8', margin: '2px 0 0 0' }}>
                Your latest assigned work orders
              </p>
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
                  {['Job', 'Zone', 'Complaint', 'Status', ''].map((h, i) => (
                    <th key={i} style={{
                      padding: '0.85rem 1.5rem', textAlign: 'left',
                      fontSize: '0.75rem', fontWeight: 700, color: '#94a3b8',
                      letterSpacing: '0.06em', textTransform: 'uppercase',
                    }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {recentJobs.map((job, i) => {
                  const s = statusStyle[job.status] ?? { bg: '#f1f5f9', color: '#64748b', border: '#e2e8f0' }
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
                        <span style={{
                          fontFamily: 'monospace', fontWeight: 700,
                          color: '#16a34a', fontSize: '0.88rem',
                        }}>#{job.id}</span>
                      </td>
                      <td style={{ padding: '1rem 1.5rem', color: '#374151', fontSize: '0.88rem' }}>
                        {job.zone?.name ?? '—'}
                      </td>
                      <td style={{ padding: '1rem 1.5rem' }}>
                        {job.complaint?.complaintCode
                          ? <span style={{
                              fontFamily: 'monospace', fontSize: '0.82rem',
                              background: '#f0fdf4', color: '#16a34a',
                              padding: '3px 8px', borderRadius: '6px',
                              fontWeight: 700, border: '1px solid #bbf7d0',
                            }}>{job.complaint.complaintCode}</span>
                          : <span style={{ color: '#94a3b8' }}>—</span>
                        }
                      </td>
                      <td style={{ padding: '1rem 1.5rem' }}>
                        <span style={{
                          fontSize: '0.75rem', fontWeight: 600, padding: '4px 10px',
                          borderRadius: '20px', textTransform: 'capitalize',
                          background: s.bg, color: s.color,
                          border: `1px solid ${s.border}`,
                        }}>
                          {job.status.replace('_', ' ')}
                        </span>
                      </td>
                      <td style={{ padding: '1rem 1.5rem' }}>
                        <Link
                          href={`/job-cards/${job.id}`}
                          style={{
                            display: 'inline-flex', alignItems: 'center', gap: '4px',
                            fontSize: '0.82rem', fontWeight: 600,
                            color: '#16a34a', textDecoration: 'none',
                            padding: '5px 12px', borderRadius: '8px',
                            border: '1px solid #bbf7d0', background: '#f0fdf4',
                            transition: 'background 0.15s',
                          }}
                        >
                          <svg width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                            <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/>
                          </svg>
                          View
                        </Link>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
            {recentJobs.length === 0 && (
              <div style={{ textAlign: 'center', padding: '3rem', color: '#94a3b8', fontSize: '0.9rem' }}>
                No jobs assigned yet.
              </div>
            )}
          </div>
        </div>
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700;800&display=swap');
      `}</style>
    </div>
  )
}
