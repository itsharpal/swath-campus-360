import { Link } from '@adonisjs/inertia/react'
import { router } from '@inertiajs/react'
import Swal from 'sweetalert2'

interface Complaint {
  id: number
  complaintCode: string
  description: string | null
  status: string
  priority: string
  createdAt?: string
  resolutionRemark?: string | null
  zone?: { name: string }
  building?: { name: string }
  floor?: { name: string }
  category?: { name: string }
}

interface Props {
  complaint: Complaint
}

const statusStyle: Record<string, { bg: string; color: string; border: string; dot: string }> = {
  open:        { bg: '#fef3c7', color: '#b45309', border: '#fde68a', dot: '#f59e0b' },
  in_progress: { bg: '#dbeafe', color: '#1d4ed8', border: '#bfdbfe', dot: '#3b82f6' },
  resolved:    { bg: '#d1fae5', color: '#047857', border: '#a7f3d0', dot: '#10b981' },
  closed:      { bg: '#f1f5f9', color: '#64748b', border: '#e2e8f0', dot: '#94a3b8' },
}

const priorityStyle: Record<string, { bg: string; color: string }> = {
  low:      { bg: 'rgba(22,163,74,0.08)',  color: '#15803d' },
  medium:   { bg: 'rgba(245,158,11,0.08)', color: '#b45309' },
  high:     { bg: 'rgba(239,68,68,0.08)',  color: '#b91c1c' },
  critical: { bg: 'rgba(139,92,246,0.08)', color: '#7c3aed' },
}

export default function ComplaintShow({ complaint }: Props) {
  const ss = statusStyle[complaint.status]   ?? { bg: '#f1f5f9', color: '#64748b', border: '#e2e8f0', dot: '#94a3b8' }
  const ps = priorityStyle[complaint.priority] ?? { bg: 'rgba(100,116,139,0.08)', color: '#64748b' }

  async function markInProgress() {
    const result = await Swal.fire({
      title: 'Mark as In Progress?',
      text: 'The complaint status will be updated to In Progress.',
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3b82f6',
      cancelButtonColor: '#94a3b8',
      confirmButtonText: 'Yes, update!',
      background: '#ffffff',
      customClass: { popup: 'swal-campus-popup', title: 'swal-campus-title' },
    })
    if (result.isConfirmed) {
      router.put(`/complaints/${complaint.id}/status`, { status: 'in_progress' }, {
        onSuccess: () => Swal.fire({ title: 'Status Updated!', icon: 'success', confirmButtonColor: '#16a34a', timer: 2000, timerProgressBar: true, showConfirmButton: false, background: '#ffffff', customClass: { popup: 'swal-campus-popup' } }),
      })
    }
  }

  const details = [
    { label: 'Zone',     value: complaint.zone?.name     ?? '—', icon: <svg width="14" height="14" fill="none" stroke="#16a34a" strokeWidth="2" viewBox="0 0 24 24"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg> },
    { label: 'Category', value: complaint.category?.name ?? '—', icon: <svg width="14" height="14" fill="none" stroke="#16a34a" strokeWidth="2" viewBox="0 0 24 24"><path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" strokeLinecap="round" strokeLinejoin="round"/></svg> },
    { label: 'Building', value: complaint.building?.name ?? '—', icon: <svg width="14" height="14" fill="none" stroke="#16a34a" strokeWidth="2" viewBox="0 0 24 24"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" strokeLinecap="round" strokeLinejoin="round"/><polyline points="9 22 9 12 15 12 15 22"/></svg> },
    { label: 'Floor',    value: complaint.floor?.name    ?? '—', icon: <svg width="14" height="14" fill="none" stroke="#16a34a" strokeWidth="2" viewBox="0 0 24 24"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18M3 15h18"/></svg> },
  ]

  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #f0fdf4 0%, #dcfce7 50%, #f0fdf4 100%)', fontFamily: "'DM Sans','Segoe UI',sans-serif", padding: '2.5rem 2rem', position: 'relative', overflow: 'hidden' }}>
      <div style={{ position: 'fixed', top: '-80px', left: '-80px', width: '300px', height: '300px', borderRadius: '50%', border: '2px solid rgba(22,163,74,0.08)', pointerEvents: 'none' }} />
      <div style={{ position: 'fixed', bottom: '-60px', right: '-60px', width: '250px', height: '250px', borderRadius: '50%', border: '2px solid rgba(22,163,74,0.06)', pointerEvents: 'none' }} />

      <div style={{ maxWidth: '700px', margin: '0 auto' }}>
        {/* Back */}
        <Link href="/complaints" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', fontSize: '0.82rem', fontWeight: 600, color: '#16a34a', textDecoration: 'none', marginBottom: '1.5rem', padding: '6px 14px', borderRadius: '8px', border: '1px solid #bbf7d0', background: '#f0fdf4' }}>
          <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path d="M19 12H5M12 19l-7-7 7-7" strokeLinecap="round" strokeLinejoin="round"/></svg>
          Back to Complaints
        </Link>

        {/* Header */}
        <div style={{ marginBottom: '1.75rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '6px' }}>
            <div style={{ width: '28px', height: '2px', background: '#16a34a' }} />
            <span style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '0.15em', color: '#16a34a', textTransform: 'uppercase' }}>Swachh Campus — Complaint Registry</span>
            <div style={{ width: '28px', height: '2px', background: '#16a34a' }} />
          </div>
          <h1 style={{ fontSize: '2.2rem', fontWeight: 800, lineHeight: 1.1, color: '#0f172a', margin: 0 }}>
            Complaint <span style={{ color: '#16a34a', fontFamily: 'monospace' }}>{complaint.complaintCode}</span>
          </h1>
        </div>

        {/* Status hero */}
        <div style={{ background: '#fff', borderRadius: '16px', padding: '1.5rem', boxShadow: '0 1px 8px rgba(0,0,0,0.06)', border: '1px solid rgba(22,163,74,0.1)', marginBottom: '1.25rem', display: 'flex', alignItems: 'center', gap: '16px', flexWrap: 'wrap' }}>
          <div style={{ width: '52px', height: '52px', borderRadius: '14px', background: ss.bg, border: `1.5px solid ${ss.border}`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
            <div style={{ width: '14px', height: '14px', borderRadius: '50%', background: ss.dot, boxShadow: `0 0 0 4px ${ss.border}` }} />
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
              <span style={{ fontSize: '0.78rem', fontWeight: 700, padding: '5px 12px', borderRadius: '20px', textTransform: 'capitalize', background: ss.bg, color: ss.color, border: `1px solid ${ss.border}` }}>{complaint.status.replace('_', ' ')}</span>
              <span style={{ fontSize: '0.78rem', fontWeight: 700, padding: '5px 12px', borderRadius: '20px', textTransform: 'capitalize', background: ps.bg, color: ps.color }}>{complaint.priority} priority</span>
            </div>
          </div>
        </div>

        {/* Details card */}
        <div style={{ background: '#fff', borderRadius: '16px', boxShadow: '0 1px 8px rgba(0,0,0,0.06)', border: '1px solid rgba(22,163,74,0.1)', overflow: 'hidden', marginBottom: '1.25rem' }}>
          <div style={{ padding: '1rem 1.5rem', background: '#f8fafc', borderBottom: '1px solid #f1f5f9' }}>
            <h3 style={{ margin: 0, fontSize: '0.78rem', fontWeight: 700, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.06em' }}>Location & Details</h3>
          </div>
          {details.map((d, i) => (
            <div key={d.label} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0.9rem 1.5rem', borderBottom: i < details.length - 1 ? '1px solid #f8fafc' : 'none' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#64748b', fontSize: '0.85rem', fontWeight: 500 }}>{d.icon}{d.label}</div>
              <span style={{ fontWeight: 600, color: '#374151', fontSize: '0.88rem' }}>{d.value}</span>
            </div>
          ))}
        </div>

        {/* Description */}
        {complaint.description && (
          <div style={{ background: '#fff', borderRadius: '16px', padding: '1.25rem 1.5rem', boxShadow: '0 1px 8px rgba(0,0,0,0.06)', border: '1px solid rgba(22,163,74,0.1)', marginBottom: '1.25rem' }}>
            <p style={{ margin: '0 0 8px', fontSize: '0.78rem', fontWeight: 700, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.06em' }}>Description</p>
            <p style={{ margin: 0, color: '#374151', fontSize: '0.9rem', lineHeight: 1.65 }}>{complaint.description}</p>
          </div>
        )}

        {/* Resolution remark */}
        {complaint.resolutionRemark && (
          <div style={{ background: '#f0fdf4', borderRadius: '16px', padding: '1.25rem 1.5rem', border: '1.5px solid #bbf7d0', marginBottom: '1.25rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '8px' }}>
              <svg width="14" height="14" fill="none" stroke="#16a34a" strokeWidth="2" viewBox="0 0 24 24"><path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" strokeLinecap="round" strokeLinejoin="round"/></svg>
              <p style={{ margin: 0, fontSize: '0.78rem', fontWeight: 700, color: '#16a34a', textTransform: 'uppercase', letterSpacing: '0.06em' }}>Resolution Remark</p>
            </div>
            <p style={{ margin: 0, color: '#374151', fontSize: '0.9rem', lineHeight: 1.65 }}>{complaint.resolutionRemark}</p>
          </div>
        )}

        {/* Action buttons */}
        <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
          {complaint.status === 'open' && (
            <button onClick={markInProgress}
              style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '0.8rem 1.5rem', background: 'linear-gradient(135deg, #3b82f6, #1d4ed8)', color: '#fff', border: 'none', borderRadius: '12px', fontWeight: 700, fontSize: '0.88rem', cursor: 'pointer', boxShadow: '0 4px 14px rgba(59,130,246,0.35)', fontFamily: "'DM Sans',sans-serif" }}>
              <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><polygon points="5 3 19 12 5 21 5 3"/></svg>
              Mark In Progress
            </button>
          )}
          {complaint.status !== 'resolved' && (
            <Link href={`/complaints/${complaint.id}/resolve`}
              style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '0.8rem 1.5rem', background: 'linear-gradient(135deg, #16a34a, #15803d)', color: '#fff', borderRadius: '12px', fontWeight: 700, fontSize: '0.88rem', textDecoration: 'none', boxShadow: '0 4px 14px rgba(22,163,74,0.35)' }}>
              <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" strokeLinecap="round" strokeLinejoin="round"/></svg>
              Resolve Complaint
            </Link>
          )}
        </div>

        <div style={{ textAlign: 'center', marginTop: '2rem', fontSize: '0.72rem', color: '#94a3b8', letterSpacing: '0.08em' }}>✕ SWACHH CAMPUS • COMPLAINT REGISTRY • 2026</div>
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700;800&display=swap');
        .swal-campus-popup { border-radius: 16px !important; font-family: 'DM Sans', sans-serif !important; }
        .swal-campus-title { font-weight: 700 !important; color: #0f172a !important; }
      `}</style>
    </div>
  )
}
