import { useForm } from '@inertiajs/react'
import { Link } from '@adonisjs/inertia/react'
import Swal from 'sweetalert2'

interface Zone {
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
}

interface Props {
  job: Job
}

const statusStyle: Record<string, { bg: string; color: string; border: string; label: string }> = {
  pending: { bg: '#fef3c7', color: '#b45309', border: '#fde68a', label: 'Pending' },
  in_progress: { bg: '#dbeafe', color: '#1d4ed8', border: '#bfdbfe', label: 'In Progress' },
  completed: { bg: '#d1fae5', color: '#047857', border: '#a7f3d0', label: 'Completed' },
}

export default function JobDetails({ job }: Props) {
  const { data, setData, put, processing, errors } = useForm({
    proofPhotoUrl: '',
    remark: '',
  })

  async function submit(e: React.FormEvent) {
    e.preventDefault()

    if (!data.remark.trim()) {
      Swal.fire({
        title: 'Remark required',
        text: 'Please provide a remark before completing the job.',
        icon: 'warning',
        confirmButtonColor: '#16a34a',
        background: '#ffffff',
        customClass: { popup: 'swal-campus-popup' },
      })
      return
    }

    const result = await Swal.fire({
      title: 'Complete this job?',
      text: 'This action cannot be undone. The job will be marked as completed.',
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#16a34a',
      cancelButtonColor: '#94a3b8',
      confirmButtonText: 'Yes, complete it!',
      cancelButtonText: 'Cancel',
      background: '#ffffff',
      customClass: { popup: 'swal-campus-popup', title: 'swal-campus-title' },
    })

    if (result.isConfirmed) {
      put(`/job-cards/${job.id}/complete`, {
        onSuccess: () => {
          Swal.fire({
            title: 'Job Completed!',
            text: 'The job has been successfully marked as complete.',
            icon: 'success',
            confirmButtonColor: '#16a34a',
            timer: 2500,
            timerProgressBar: true,
            showConfirmButton: false,
            background: '#ffffff',
            customClass: { popup: 'swal-campus-popup' },
          })
        },
        onError: () => {
          Swal.fire({
            title: 'Error',
            text: 'Something went wrong. Please try again.',
            icon: 'error',
            confirmButtonColor: '#16a34a',
            background: '#ffffff',
            customClass: { popup: 'swal-campus-popup' },
          })
        },
      })
    }
  }

  const s = statusStyle[job.status] ?? { bg: '#f1f5f9', color: '#64748b', border: '#e2e8f0', label: job.status }

  const infoItems = [
    {
      label: 'Status',
      value: (
        <span style={{
          fontSize: '0.78rem', fontWeight: 600, padding: '4px 12px',
          borderRadius: '20px', background: s.bg, color: s.color, border: `1px solid ${s.border}`,
        }}>{s.label}</span>
      ),
      icon: (
        <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
          <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
        </svg>
      ),
    },
    {
      label: 'Type',
      value: <span style={{ textTransform: 'capitalize', fontWeight: 600, color: '#374151' }}>{job.type}</span>,
      icon: (
        <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
          <path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      ),
    },
    {
      label: 'Zone',
      value: <span style={{ fontWeight: 600, color: '#374151' }}>{job.zone?.name ?? '—'}</span>,
      icon: (
        <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
          <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" strokeLinecap="round" strokeLinejoin="round"/>
          <circle cx="12" cy="10" r="3"/>
        </svg>
      ),
    },
    {
      label: 'Complaint',
      value: job.complaint?.complaintCode
        ? <span style={{
            fontFamily: 'monospace', fontSize: '0.85rem',
            background: '#f0fdf4', color: '#16a34a',
            padding: '3px 10px', borderRadius: '6px',
            fontWeight: 700, border: '1px solid #bbf7d0',
          }}>{job.complaint.complaintCode}</span>
        : <span style={{ color: '#94a3b8' }}>—</span>,
      icon: (
        <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      ),
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
      }}
    >
      <div style={{ position: 'fixed', top: '-80px', left: '-80px', width: '300px', height: '300px', borderRadius: '50%', border: '2px solid rgba(22,163,74,0.08)', pointerEvents: 'none' }} />
      <div style={{ position: 'fixed', bottom: '-60px', right: '-60px', width: '250px', height: '250px', borderRadius: '50%', border: '2px solid rgba(22,163,74,0.06)', pointerEvents: 'none' }} />

      <div style={{ maxWidth: '680px', margin: '0 auto' }}>
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
          Back to Queue
        </Link>

        {/* Header */}
        <div style={{ marginBottom: '1.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '6px' }}>
            <div style={{ width: '28px', height: '2px', background: '#16a34a' }} />
            <span style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '0.15em', color: '#16a34a', textTransform: 'uppercase' }}>
              Swachh Campus
            </span>
            <div style={{ width: '28px', height: '2px', background: '#16a34a' }} />
          </div>
          <h1 style={{ fontSize: '2.4rem', fontWeight: 800, lineHeight: 1.1, color: '#0f172a', margin: 0 }}>
            Job <span style={{ color: '#16a34a' }}>#{job.id}</span>
          </h1>
          <p style={{ color: '#64748b', fontSize: '0.95rem', marginTop: '6px' }}>Work order details and completion form.</p>
        </div>

        {/* Job Details Card */}
        <div style={{
          background: '#ffffff', borderRadius: '16px',
          boxShadow: '0 1px 8px rgba(0,0,0,0.06)',
          border: '1px solid rgba(22,163,74,0.1)',
          overflow: 'hidden', marginBottom: '1.5rem',
        }}>
          <div style={{
            padding: '1rem 1.5rem', borderBottom: '1px solid #f1f5f9',
            background: '#f8fafc',
          }}>
            <h2 style={{ fontSize: '0.85rem', fontWeight: 700, color: '#94a3b8', margin: 0, letterSpacing: '0.06em', textTransform: 'uppercase' }}>
              Job Details
            </h2>
          </div>
          <div style={{ padding: '0.5rem 0' }}>
            {infoItems.map((item) => (
              <div key={item.label} style={{
                display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                padding: '0.9rem 1.5rem', borderBottom: '1px solid #f8fafc',
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#64748b', fontSize: '0.88rem', fontWeight: 500 }}>
                  <span style={{ color: '#16a34a' }}>{item.icon}</span>
                  {item.label}
                </div>
                {item.value}
              </div>
            ))}
          </div>
        </div>

        {/* Complete Job Form */}
        {job.status === 'in_progress' && (
          <div style={{
            background: '#ffffff', borderRadius: '16px',
            boxShadow: '0 1px 8px rgba(0,0,0,0.06)',
            border: '1px solid rgba(22,163,74,0.1)', overflow: 'hidden',
          }}>
            <div style={{ padding: '1rem 1.5rem', borderBottom: '1px solid #f1f5f9', background: '#f8fafc' }}>
              <h2 style={{ fontSize: '0.85rem', fontWeight: 700, color: '#94a3b8', margin: 0, letterSpacing: '0.06em', textTransform: 'uppercase' }}>
                Complete Job
              </h2>
            </div>

            <form onSubmit={submit} style={{ padding: '1.5rem' }}>
              {/* Proof Photo URL */}
              <div style={{ marginBottom: '1.2rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                  <label style={{ fontSize: '0.85rem', fontWeight: 600, color: '#374151', display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <svg width="14" height="14" fill="none" stroke="#16a34a" strokeWidth="2" viewBox="0 0 24 24">
                      <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><circle cx="8.5" cy="8.5" r="1.5"/>
                      <polyline points="21 15 16 10 5 21"/>
                    </svg>
                    Proof Photo URL
                  </label>
                  <span style={{ fontSize: '0.75rem', color: '#94a3b8' }}>Optional</span>
                </div>
                <input
                  type="text"
                  placeholder="https://example.com/photo.jpg"
                  value={data.proofPhotoUrl}
                  onChange={(e) => setData('proofPhotoUrl', e.target.value)}
                  style={{
                    width: '100%', padding: '0.75rem 1rem',
                    border: '1.5px solid #e2e8f0', borderRadius: '10px',
                    fontSize: '0.88rem', color: '#374151', outline: 'none',
                    transition: 'border-color 0.2s', boxSizing: 'border-box',
                    fontFamily: "'DM Sans', sans-serif",
                  }}
                  onFocus={e => (e.target as HTMLElement).style.borderColor = '#16a34a'}
                  onBlur={e => (e.target as HTMLElement).style.borderColor = '#e2e8f0'}
                />
              </div>

              {/* Remark */}
              <div style={{ marginBottom: '1.5rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                  <label style={{ fontSize: '0.85rem', fontWeight: 600, color: '#374151', display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <svg width="14" height="14" fill="none" stroke="#16a34a" strokeWidth="2" viewBox="0 0 24 24">
                      <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/>
                    </svg>
                    Remark
                  </label>
                  <span style={{ fontSize: '0.75rem', color: '#94a3b8' }}>{data.remark.length}/200</span>
                </div>
                <textarea
                  placeholder="Brief overview of the work done..."
                  value={data.remark}
                  maxLength={200}
                  rows={4}
                  onChange={(e) => setData('remark', e.target.value)}
                  style={{
                    width: '100%', padding: '0.75rem 1rem',
                    border: '1.5px solid #e2e8f0', borderRadius: '10px',
                    fontSize: '0.88rem', color: '#374151', outline: 'none',
                    resize: 'vertical', transition: 'border-color 0.2s',
                    boxSizing: 'border-box', fontFamily: "'DM Sans', sans-serif",
                  }}
                  onFocus={e => (e.target as HTMLElement).style.borderColor = '#16a34a'}
                  onBlur={e => (e.target as HTMLElement).style.borderColor = '#e2e8f0'}
                />
                {errors.remark && (
                  <p style={{ color: '#ef4444', fontSize: '0.78rem', marginTop: '4px' }}>{errors.remark}</p>
                )}
              </div>

              {/* Actions */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Link href="/job-cards" style={{
                  display: 'inline-flex', alignItems: 'center', gap: '6px',
                  fontSize: '0.85rem', fontWeight: 600, color: '#64748b',
                  textDecoration: 'none',
                }}>
                  ← Cancel
                </Link>
                <button
                  type="submit"
                  disabled={processing}
                  style={{
                    display: 'inline-flex', alignItems: 'center', gap: '8px',
                    padding: '0.75rem 1.75rem',
                    background: processing ? '#86efac' : 'linear-gradient(135deg, #16a34a, #15803d)',
                    color: '#fff', border: 'none', borderRadius: '10px',
                    fontWeight: 700, fontSize: '0.9rem', cursor: processing ? 'not-allowed' : 'pointer',
                    boxShadow: '0 4px 14px rgba(22,163,74,0.35)',
                    transition: 'all 0.2s', fontFamily: "'DM Sans', sans-serif",
                  }}
                >
                  {processing ? 'Completing…' : (
                    <>
                      Complete Job
                      <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                        <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Footer */}
        <div style={{ textAlign: 'center', marginTop: '2rem', color: '#94a3b8', fontSize: '0.75rem', letterSpacing: '0.08em' }}>
          ✕ SWACHH CAMPUS • JOB MANAGEMENT • 2026
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
