import { Link } from '@adonisjs/inertia/react'

type Complaint = {
  id: number
  complaintCode: string
  status: string
  priority: string
  description: string | null
  createdAt: string
  zone?: { name: string }
  category?: { name: string }
}

type Props = {
  complaint: Complaint
}

const STATUS_STEPS = ['open', 'in_progress', 'resolved']

const statusStyle: Record<string, { bg: string; color: string; border: string; dot: string; label: string }> = {
  open:        { bg: '#fef3c7', color: '#b45309', border: '#fde68a', dot: '#f59e0b', label: 'Open' },
  in_progress: { bg: '#dbeafe', color: '#1d4ed8', border: '#bfdbfe', dot: '#3b82f6', label: 'In Progress' },
  resolved:    { bg: '#d1fae5', color: '#047857', border: '#a7f3d0', dot: '#10b981', label: 'Resolved' },
  closed:      { bg: '#f1f5f9', color: '#64748b', border: '#e2e8f0', dot: '#94a3b8', label: 'Closed' },
}

const priorityStyle: Record<string, { bg: string; color: string }> = {
  low:      { bg: 'rgba(22,163,74,0.08)',  color: '#15803d' },
  medium:   { bg: 'rgba(245,158,11,0.08)', color: '#b45309' },
  high:     { bg: 'rgba(239,68,68,0.08)',  color: '#b91c1c' },
  critical: { bg: 'rgba(139,92,246,0.08)', color: '#7c3aed' },
}

function formatDate(d: string) {
  try { return new Date(d).toLocaleDateString('en-IN', { day: '2-digit', month: 'long', year: 'numeric' }) }
  catch { return d }
}

export default function TrackComplaint({ complaint }: Props) {
  const ss = statusStyle[complaint.status]   ?? statusStyle.closed
  const ps = priorityStyle[complaint.priority] ?? { bg: 'rgba(100,116,139,0.08)', color: '#64748b' }
  const currentStep = STATUS_STEPS.indexOf(complaint.status)

  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #f0fdf4 0%, #dcfce7 50%, #f0fdf4 100%)', fontFamily: "'DM Sans','Segoe UI',sans-serif", padding: '2.5rem 2rem', position: 'relative', overflow: 'hidden' }}>
      <div style={{ position: 'fixed', top: '-80px', left: '-80px', width: '300px', height: '300px', borderRadius: '50%', border: '2px solid rgba(22,163,74,0.08)', pointerEvents: 'none' }} />
      <div style={{ position: 'fixed', bottom: '-60px', right: '-60px', width: '250px', height: '250px', borderRadius: '50%', border: '2px solid rgba(22,163,74,0.06)', pointerEvents: 'none' }} />

      <div style={{ maxWidth: '720px', margin: '0 auto' }}>
        {/* Back */}
        <Link href="/complaints/my" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', fontSize: '0.82rem', fontWeight: 600, color: '#16a34a', textDecoration: 'none', marginBottom: '1.5rem', padding: '6px 14px', borderRadius: '8px', border: '1px solid #bbf7d0', background: '#f0fdf4' }}>
          <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path d="M19 12H5M12 19l-7-7 7-7" strokeLinecap="round" strokeLinejoin="round"/></svg>
          My Complaints
        </Link>

        {/* Header */}
        <div style={{ marginBottom: '1.75rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '6px' }}>
            <div style={{ width: '28px', height: '2px', background: '#16a34a' }} />
            <span style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '0.15em', color: '#16a34a', textTransform: 'uppercase' }}>Swachh Campus — Complaint Registry</span>
            <div style={{ width: '28px', height: '2px', background: '#16a34a' }} />
          </div>
          <h1 style={{ fontSize: '2.2rem', fontWeight: 800, lineHeight: 1.1, color: '#0f172a', margin: 0 }}>
            Track <span style={{ color: '#16a34a' }}>Complaint</span>
          </h1>
          <p style={{ color: '#64748b', fontSize: '0.95rem', marginTop: '6px' }}>Live status and details for your submitted complaint.</p>
        </div>

        {/* Code + badges */}
        <div style={{ background: '#fff', borderRadius: '16px', padding: '1.5rem', boxShadow: '0 1px 8px rgba(0,0,0,0.06)', border: '1px solid rgba(22,163,74,0.1)', marginBottom: '1.25rem', display: 'flex', alignItems: 'center', gap: '16px', flexWrap: 'wrap' }}>
          <div style={{ width: '52px', height: '52px', borderRadius: '14px', background: ss.bg, border: `1.5px solid ${ss.border}`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
            <div style={{ width: '14px', height: '14px', borderRadius: '50%', background: ss.dot, boxShadow: `0 0 0 4px ${ss.border}` }} />
          </div>
          <div style={{ flex: 1, minWidth: '180px' }}>
            <span style={{ fontFamily: 'monospace', fontSize: '1rem', background: '#f0fdf4', color: '#16a34a', padding: '4px 12px', borderRadius: '8px', fontWeight: 700, border: '1px solid #bbf7d0', display: 'inline-block', marginBottom: '8px' }}>{complaint.complaintCode}</span>
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
              <span style={{ fontSize: '0.72rem', fontWeight: 700, padding: '4px 10px', borderRadius: '20px', background: ss.bg, color: ss.color, border: `1px solid ${ss.border}` }}>{ss.label}</span>
              <span style={{ fontSize: '0.72rem', fontWeight: 700, padding: '4px 10px', borderRadius: '20px', textTransform: 'capitalize', background: ps.bg, color: ps.color }}>{complaint.priority} priority</span>
              <span style={{ fontSize: '0.72rem', color: '#94a3b8', padding: '4px 0' }}>Filed {formatDate(complaint.createdAt)}</span>
            </div>
          </div>
        </div>

        {/* Progress tracker */}
        <div style={{ background: '#fff', borderRadius: '16px', padding: '1.5rem', boxShadow: '0 1px 8px rgba(0,0,0,0.06)', border: '1px solid rgba(22,163,74,0.1)', marginBottom: '1.25rem' }}>
          <p style={{ margin: '0 0 1.2rem', fontSize: '0.78rem', fontWeight: 700, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.06em' }}>Progress</p>
          <div style={{ display: 'flex', alignItems: 'center', gap: 0 }}>
            {STATUS_STEPS.map((step, i) => {
              const isDone    = i <= currentStep
              const isCurrent = i === currentStep
              const stepInfo  = statusStyle[step]
              return (
                <div key={step} style={{ display: 'flex', alignItems: 'center', flex: i < STATUS_STEPS.length - 1 ? 1 : 'none' }}>
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
                    <div style={{
                      width: '36px', height: '36px', borderRadius: '50%',
                      background: isDone ? (isCurrent ? ss.bg : '#d1fae5') : '#f1f5f9',
                      border: `2px solid ${isDone ? (isCurrent ? ss.border : '#a7f3d0') : '#e2e8f0'}`,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      boxShadow: isCurrent ? `0 0 0 4px ${ss.border}` : 'none',
                    }}>
                      {isDone && !isCurrent
                        ? <svg width="14" height="14" fill="none" stroke="#16a34a" strokeWidth="2.5" viewBox="0 0 24 24"><path d="M20 6L9 17l-5-5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                        : <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: isDone ? ss.dot : '#cbd5e1' }} />
                      }
                    </div>
                    <span style={{ fontSize: '0.7rem', fontWeight: isCurrent ? 700 : 500, color: isDone ? '#0f172a' : '#94a3b8', whiteSpace: 'nowrap' }}>{stepInfo?.label ?? step}</span>
                  </div>
                  {i < STATUS_STEPS.length - 1 && (
                    <div style={{ flex: 1, height: '2px', background: i < currentStep ? '#16a34a' : '#e2e8f0', margin: '0 4px', marginBottom: '22px', transition: 'background 0.3s' }} />
                  )}
                </div>
              )
            })}
          </div>
        </div>

        {/* Details */}
        <div style={{ background: '#fff', borderRadius: '16px', boxShadow: '0 1px 8px rgba(0,0,0,0.06)', border: '1px solid rgba(22,163,74,0.1)', overflow: 'hidden', marginBottom: '1.25rem' }}>
          <div style={{ padding: '1rem 1.5rem', background: '#f8fafc', borderBottom: '1px solid #f1f5f9' }}>
            <h3 style={{ margin: 0, fontSize: '0.78rem', fontWeight: 700, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.06em' }}>Complaint Information</h3>
          </div>
          {[
            { label: 'Zone',     value: complaint.zone?.name     ?? '—', icon: <svg width="14" height="14" fill="none" stroke="#16a34a" strokeWidth="2" viewBox="0 0 24 24"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg> },
            { label: 'Category', value: complaint.category?.name ?? '—', icon: <svg width="14" height="14" fill="none" stroke="#16a34a" strokeWidth="2" viewBox="0 0 24 24"><path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" strokeLinecap="round" strokeLinejoin="round"/></svg> },
          ].map((d, i, arr) => (
            <div key={d.label} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0.9rem 1.5rem', borderBottom: i < arr.length - 1 ? '1px solid #f8fafc' : 'none' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#64748b', fontSize: '0.85rem', fontWeight: 500 }}>{d.icon}{d.label}</div>
              <span style={{ fontWeight: 600, color: '#374151', fontSize: '0.88rem' }}>{d.value}</span>
            </div>
          ))}
        </div>

        {/* Description */}
        {complaint.description && (
          <div style={{ background: '#fff', borderRadius: '16px', padding: '1.25rem 1.5rem', boxShadow: '0 1px 8px rgba(0,0,0,0.06)', border: '1px solid rgba(22,163,74,0.1)' }}>
            <p style={{ margin: '0 0 8px', fontSize: '0.78rem', fontWeight: 700, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.06em' }}>Description</p>
            <p style={{ margin: 0, color: '#374151', fontSize: '0.9rem', lineHeight: 1.65 }}>{complaint.description}</p>
          </div>
        )}

        <div style={{ textAlign: 'center', marginTop: '2rem', fontSize: '0.72rem', color: '#94a3b8', letterSpacing: '0.08em' }}>✕ SWACHH CAMPUS • COMPLAINT REGISTRY • 2026</div>
      </div>

      <style>{`@import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700;800&display=swap');`}</style>
    </div>
  )
}
