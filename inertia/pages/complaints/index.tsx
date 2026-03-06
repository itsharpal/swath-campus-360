import { Link } from '@adonisjs/inertia/react'

interface Complaint {
  id: number
  complaintCode: string
  status: string
  priority: string
  createdAt: string
  zone?: { name: string }
  category?: { name: string }
}

interface Props {
  complaints: Complaint[]
}

const statusStyle: Record<string, { bg: string; color: string; border: string }> = {
  open:        { bg: '#fef3c7', color: '#b45309', border: '#fde68a' },
  in_progress: { bg: '#dbeafe', color: '#1d4ed8', border: '#bfdbfe' },
  resolved:    { bg: '#d1fae5', color: '#047857', border: '#a7f3d0' },
  closed:      { bg: '#f1f5f9', color: '#64748b', border: '#e2e8f0' },
}

const priorityStyle: Record<string, { bg: string; color: string }> = {
  low:      { bg: 'rgba(22,163,74,0.08)',   color: '#15803d' },
  medium:   { bg: 'rgba(245,158,11,0.08)',  color: '#b45309' },
  high:     { bg: 'rgba(239,68,68,0.08)',   color: '#b91c1c' },
  critical: { bg: 'rgba(139,92,246,0.08)',  color: '#7c3aed' },
}

export default function ComplaintsIndex({ complaints }: Props) {
  const open       = complaints.filter((c) => c.status === 'open').length
  const inProgress = complaints.filter((c) => c.status === 'in_progress').length
  const resolved   = complaints.filter((c) => c.status === 'resolved').length

  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #f0fdf4 0%, #dcfce7 50%, #f0fdf4 100%)', fontFamily: "'DM Sans','Segoe UI',sans-serif", padding: '2.5rem 2rem', position: 'relative', overflow: 'hidden' }}>
      <div style={{ position: 'fixed', top: '-80px', left: '-80px', width: '300px', height: '300px', borderRadius: '50%', border: '2px solid rgba(22,163,74,0.08)', pointerEvents: 'none' }} />
      <div style={{ position: 'fixed', bottom: '-60px', right: '-60px', width: '250px', height: '250px', borderRadius: '50%', border: '2px solid rgba(22,163,74,0.06)', pointerEvents: 'none' }} />

      <div style={{ maxWidth: '1150px', margin: '0 auto' }}>
        {/* Header */}
        <div style={{ marginBottom: '2rem', display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '6px' }}>
              <div style={{ width: '28px', height: '2px', background: '#16a34a' }} />
              <span style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '0.15em', color: '#16a34a', textTransform: 'uppercase' }}>Swachh Campus</span>
              <div style={{ width: '28px', height: '2px', background: '#16a34a' }} />
            </div>
            <h1 style={{ fontSize: '2.4rem', fontWeight: 800, lineHeight: 1.1, color: '#0f172a', margin: 0 }}>
              All <span style={{ color: '#16a34a' }}>Complaints</span>
            </h1>
            <p style={{ color: '#64748b', fontSize: '0.95rem', marginTop: '6px' }}>Manage and track all campus complaints.</p>
          </div>
          <Link href="/complaints/create" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '0.75rem 1.5rem', background: 'linear-gradient(135deg, #16a34a, #15803d)', color: '#fff', borderRadius: '12px', fontWeight: 700, fontSize: '0.88rem', textDecoration: 'none', boxShadow: '0 4px 14px rgba(22,163,74,0.35)' }}>
            <svg width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
            New Complaint
          </Link>
        </div>

        {/* Stats */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1rem', marginBottom: '1.5rem' }}>
          {[
            { label: 'Total', value: complaints.length, accent: '#16a34a', bg: 'rgba(22,163,74,0.08)' },
            { label: 'Open', value: open, accent: '#f59e0b', bg: 'rgba(245,158,11,0.08)' },
            { label: 'In Progress', value: inProgress, accent: '#3b82f6', bg: 'rgba(59,130,246,0.08)' },
            { label: 'Resolved', value: resolved, accent: '#10b981', bg: 'rgba(16,185,129,0.08)' },
          ].map((s) => (
            <div key={s.label} style={{ background: '#fff', borderRadius: '14px', padding: '1.1rem 1.4rem', boxShadow: '0 1px 8px rgba(0,0,0,0.06)', border: '1px solid rgba(22,163,74,0.1)', display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div style={{ width: '38px', height: '38px', borderRadius: '10px', background: s.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', color: s.accent, flexShrink: 0 }}>
                <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24"><path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </div>
              <div>
                <p style={{ margin: 0, fontSize: '0.73rem', color: '#94a3b8', fontWeight: 500 }}>{s.label}</p>
                <p style={{ margin: '2px 0 0', fontSize: '1.5rem', fontWeight: 800, color: '#0f172a' }}>{s.value}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Table */}
        <div style={{ background: '#fff', borderRadius: '16px', boxShadow: '0 1px 8px rgba(0,0,0,0.06)', border: '1px solid rgba(22,163,74,0.1)', overflow: 'hidden' }}>
          <div style={{ padding: '1.25rem 1.5rem', borderBottom: '1px solid #f1f5f9', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div>
              <h2 style={{ fontSize: '1.05rem', fontWeight: 700, color: '#0f172a', margin: 0 }}>Complaint Registry</h2>
              <p style={{ fontSize: '0.8rem', color: '#94a3b8', margin: '2px 0 0' }}>{complaints.length} total entries</p>
            </div>
            <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#16a34a', boxShadow: '0 0 0 3px rgba(22,163,74,0.2)' }} />
          </div>
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ background: '#f8fafc' }}>
                  {['Code', 'Zone', 'Category', 'Status', 'Priority', ''].map((h) => (
                    <th key={h} style={{ padding: '0.85rem 1.5rem', textAlign: 'left', fontSize: '0.75rem', fontWeight: 700, color: '#94a3b8', letterSpacing: '0.06em', textTransform: 'uppercase' }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {complaints.map((c, i) => {
                  const ss = statusStyle[c.status]   ?? { bg: '#f1f5f9', color: '#64748b', border: '#e2e8f0' }
                  const ps = priorityStyle[c.priority] ?? { bg: 'rgba(100,116,139,0.08)', color: '#64748b' }
                  return (
                    <tr key={c.id}
                      style={{ borderTop: '1px solid #f1f5f9', background: i % 2 === 0 ? '#fff' : '#fafcff', transition: 'background 0.15s' }}
                      onMouseEnter={e => (e.currentTarget as HTMLElement).style.background = '#f0fdf4'}
                      onMouseLeave={e => (e.currentTarget as HTMLElement).style.background = i % 2 === 0 ? '#fff' : '#fafcff'}
                    >
                      <td style={{ padding: '1rem 1.5rem' }}>
                        <span style={{ fontFamily: 'monospace', fontSize: '0.82rem', background: '#f0fdf4', color: '#16a34a', padding: '3px 8px', borderRadius: '6px', fontWeight: 700, border: '1px solid #bbf7d0' }}>{c.complaintCode}</span>
                      </td>
                      <td style={{ padding: '1rem 1.5rem', fontSize: '0.88rem', color: '#374151' }}>{c.zone?.name ?? '—'}</td>
                      <td style={{ padding: '1rem 1.5rem', fontSize: '0.88rem', color: '#374151' }}>{c.category?.name ?? '—'}</td>
                      <td style={{ padding: '1rem 1.5rem' }}>
                        <span style={{ fontSize: '0.72rem', fontWeight: 700, padding: '4px 10px', borderRadius: '20px', textTransform: 'capitalize', background: ss.bg, color: ss.color, border: `1px solid ${ss.border}` }}>{c.status.replace('_', ' ')}</span>
                      </td>
                      <td style={{ padding: '1rem 1.5rem' }}>
                        <span style={{ fontSize: '0.72rem', fontWeight: 700, padding: '4px 10px', borderRadius: '20px', textTransform: 'capitalize', background: ps.bg, color: ps.color }}>{c.priority}</span>
                      </td>
                      <td style={{ padding: '1rem 1.5rem' }}>
                        <Link href={`/complaints/${c.id}`} style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', fontSize: '0.78rem', fontWeight: 600, color: '#16a34a', textDecoration: 'none', padding: '5px 10px', borderRadius: '7px', border: '1px solid #bbf7d0', background: '#f0fdf4' }}>
                          <svg width="11" height="11" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
                          View
                        </Link>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
            {complaints.length === 0 && <div style={{ textAlign: 'center', padding: '3rem', color: '#94a3b8', fontSize: '0.9rem' }}>No complaints found.</div>}
          </div>
        </div>
      </div>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700;800&display=swap');`}</style>
    </div>
  )
}
