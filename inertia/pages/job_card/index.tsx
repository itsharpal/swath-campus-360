import { Link } from '@adonisjs/inertia/react'
import { router } from '@inertiajs/react'
import Swal from 'sweetalert2'

interface Zone {
  id: number
  name: string
}

interface Complaint {
  complaintCode: string
}

interface Job {
  id: number
  status: string
  type: string
  zone?: Zone
  complaint?: Complaint
  createdAt: string
}

interface Props {
  jobs: Job[]
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

export default function JobQueue({ jobs }: Props) {
  async function startJob(id: number) {
    const result = await Swal.fire({
      title: 'Start this job?',
      text: 'The job status will be updated to In Progress.',
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#16a34a',
      cancelButtonColor: '#94a3b8',
      confirmButtonText: 'Yes, start it!',
      cancelButtonText: 'Cancel',
      background: '#ffffff',
      customClass: {
        popup: 'swal-campus-popup',
        title: 'swal-campus-title',
      },
    })

    if (result.isConfirmed) {
      router.put(`/job-cards/${id}/start`, { status: 'in_progress' }, {
        onSuccess: () => {
          Swal.fire({
            title: 'Job Started!',
            text: 'The job is now in progress.',
            icon: 'success',
            confirmButtonColor: '#16a34a',
            timer: 2000,
            timerProgressBar: true,
            showConfirmButton: false,
            background: '#ffffff',
          })
        },
        onError: () => {
          Swal.fire({
            title: 'Error',
            text: 'Something went wrong. Please try again.',
            icon: 'error',
            confirmButtonColor: '#16a34a',
            background: '#ffffff',
          })
        },
      })
    }
  }

  const pending = jobs.filter(j => j.status === 'pending').length
  const inProgress = jobs.filter(j => j.status === 'in_progress').length
  const completed = jobs.filter(j => j.status === 'completed').length

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
      {/* Dots decoration */}
      <div style={{ position: 'fixed', top: '-80px', left: '-80px', width: '300px', height: '300px', borderRadius: '50%', border: '2px solid rgba(22,163,74,0.08)', pointerEvents: 'none' }} />
      <div style={{ position: 'fixed', bottom: '-60px', right: '-60px', width: '250px', height: '250px', borderRadius: '50%', border: '2px solid rgba(22,163,74,0.06)', pointerEvents: 'none' }} />

      <div style={{ maxWidth: '1150px', margin: '0 auto' }}>
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
              Job{' '}<span style={{ color: '#16a34a' }}>Queue</span>
            </h1>
            <p style={{ color: '#64748b', fontSize: '0.95rem', marginTop: '6px' }}>
              Supervisor work order management centre.
            </p>
          </div>
        </div>

        {/* Mini stats bar */}
        <div style={{
          display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '1rem', marginBottom: '1.5rem',
        }}>
          {[
            { label: 'Pending', value: pending, bg: '#fef3c7', color: '#b45309', border: '#fde68a' },
            { label: 'In Progress', value: inProgress, bg: '#dbeafe', color: '#1d4ed8', border: '#bfdbfe' },
            { label: 'Completed', value: completed, bg: '#d1fae5', color: '#047857', border: '#a7f3d0' },
          ].map((s) => (
            <div key={s.label} style={{
              background: '#fff', borderRadius: '14px', padding: '1.1rem 1.4rem',
              boxShadow: '0 1px 8px rgba(0,0,0,0.06)', border: '1px solid rgba(22,163,74,0.1)',
              display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            }}>
              <div>
                <p style={{ margin: 0, fontSize: '0.78rem', color: '#94a3b8', fontWeight: 500 }}>{s.label}</p>
                <p style={{ margin: '2px 0 0', fontSize: '1.5rem', fontWeight: 800, color: '#0f172a' }}>{s.value}</p>
              </div>
              <span style={{
                padding: '5px 12px', borderRadius: '20px', fontSize: '0.7rem', fontWeight: 700,
                background: s.bg, color: s.color, border: `1px solid ${s.border}`,
              }}>{s.label}</span>
            </div>
          ))}
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
              <h2 style={{ fontSize: '1.05rem', fontWeight: 700, color: '#0f172a', margin: 0 }}>All Jobs</h2>
              <p style={{ fontSize: '0.8rem', color: '#94a3b8', margin: '2px 0 0' }}>{jobs.length} total work orders</p>
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
                  {['Job', 'Zone', 'Complaint', 'Type', 'Status', 'Actions'].map((h) => (
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
                      <td style={{ padding: '1rem 1.5rem', color: '#374151', fontSize: '0.88rem' }}>{job.zone?.name ?? '—'}</td>
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
                          background: t.bg, color: t.color,
                        }}>{job.type}</span>
                      </td>
                      <td style={{ padding: '1rem 1.5rem' }}>
                        <span style={{
                          fontSize: '0.75rem', fontWeight: 600, padding: '4px 10px',
                          borderRadius: '20px', textTransform: 'capitalize',
                          background: s.bg, color: s.color, border: `1px solid ${s.border}`,
                        }}>{job.status.replace('_', ' ')}</span>
                      </td>
                      <td style={{ padding: '1rem 1.5rem' }}>
                        <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                          <Link href={`/job-cards/${job.id}`} style={{
                            display: 'inline-flex', alignItems: 'center', gap: '4px',
                            fontSize: '0.8rem', fontWeight: 600, color: '#16a34a',
                            textDecoration: 'none', padding: '5px 12px', borderRadius: '8px',
                            border: '1px solid #bbf7d0', background: '#f0fdf4',
                          }}>
                            <svg width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                              <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/>
                            </svg>
                            View
                          </Link>
                          {job.status === 'pending' && (
                            <button
                              onClick={() => startJob(job.id)}
                              style={{
                                display: 'inline-flex', alignItems: 'center', gap: '4px',
                                fontSize: '0.8rem', fontWeight: 600, color: '#fff',
                                background: 'linear-gradient(135deg, #16a34a, #15803d)',
                                border: 'none', padding: '5px 12px', borderRadius: '8px',
                                cursor: 'pointer', boxShadow: '0 2px 8px rgba(22,163,74,0.3)',
                              }}
                            >
                              <svg width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                                <polygon points="5 3 19 12 5 21 5 3"/>
                              </svg>
                              Start
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
            {jobs.length === 0 && (
              <div style={{ textAlign: 'center', padding: '3rem', color: '#94a3b8', fontSize: '0.9rem' }}>
                No jobs in queue.
              </div>
            )}
          </div>
        </div>
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700;800&display=swap');
        .swal-campus-popup { border-radius: 16px !important; font-family: 'DM Sans', sans-serif !important; }
        .swal-campus-title { font-weight: 700 !important; color: #0f172a !important; }
      `}</style>
    </div>
  )
}
