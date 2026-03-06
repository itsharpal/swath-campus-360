import { Link } from '@adonisjs/inertia/react'

type Complaint = {
  id: number
  complaintCode: string
  status: string
  priority: string
  createdAt: string
}

type Props = {
  complaints: Complaint[]
}

const statusStyle: Record<string, { bg: string; color: string; border: string; dot: string }> = {
  open:        { bg: '#fef3c7', color: '#b45309', border: '#fde68a',  dot: '#f59e0b' },
  in_progress: { bg: '#dbeafe', color: '#1d4ed8', border: '#bfdbfe',  dot: '#3b82f6' },
  resolved:    { bg: '#d1fae5', color: '#047857', border: '#a7f3d0',  dot: '#10b981' },
  closed:      { bg: '#f1f5f9', color: '#64748b', border: '#e2e8f0',  dot: '#94a3b8' },
}

const priorityStyle: Record<string, { bg: string; color: string }> = {
  low:      { bg: 'rgba(22,163,74,0.08)',  color: '#15803d' },
  medium:   { bg: 'rgba(245,158,11,0.08)', color: '#b45309' },
  high:     { bg: 'rgba(239,68,68,0.08)',  color: '#b91c1c' },
  critical: { bg: 'rgba(139,92,246,0.08)', color: '#7c3aed' },
}

function formatDate(d: string) {
  try { return new Date(d).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' }) }
  catch { return d }
}

export default function My({ complaints }: Props) {
  const open     = complaints.filter((c) => c.status === 'open').length
  const resolved = complaints.filter((c) => c.status === 'resolved').length

  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #f0fdf4 0%, #dcfce7 50%, #f0fdf4 100%)', fontFamily: "'DM Sans','Segoe UI',sans-serif", padding: '2.5rem 2rem', position: 'relative', overflow: 'hidden' }}>
      <div style={{ position: 'fixed', top: '-80px', left: '-80px', width: '300px', height: '300px', borderRadius: '50%', border: '2px solid rgba(22,163,74,0.08)', pointerEvents: 'none' }} />
      <div style={{ position: 'fixed', bottom: '-60px', right: '-60px', width: '250px', height: '250px', borderRadius: '50%', border: '2px solid rgba(22,163,74,0.06)', pointerEvents: 'none' }} />

      <div style={{ maxWidth: '820px', margin: '0 auto' }}>
        {/* Header */}
        <div style={{ marginBottom: '2rem', display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '6px' }}>
              <div style={{ width: '28px', height: '2px', background: '#16a34a' }} />
              <span style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '0.15em', color: '#16a34a', textTransform: 'uppercase' }}>Swachh Campus</span>
              <div style={{ width: '28px', height: '2px', background: '#16a34a' }} />
            </div>
            <h1 style={{ fontSize: '2.4rem', fontWeight: 800, lineHeight: 1.1, color: '#0f172a', margin: 0 }}>
              My <span style={{ color: '#16a34a' }}>Complaints</span>
            </h1>
            <p style={{ color: '#64748b', fontSize: '0.95rem', marginTop: '6px' }}>Track all complaints you have submitted.</p>
          </div>
          <Link href="/complaints/create" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '0.75rem 1.4rem', background: 'linear-gradient(135deg, #16a34a, #15803d)', color: '#fff', borderRadius: '12px', fontWeight: 700, fontSize: '0.85rem', textDecoration: 'none', boxShadow: '0 4px 14px rgba(22,163,74,0.35)' }}>
            <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
            New Complaint
          </Link>
        </div>

        {/* Mini stats */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem', marginBottom: '1.5rem' }}>
          {[
            { label: 'Total Filed', value: complaints.length, accent: '#16a34a' },
            { label: 'Open',        value: open,             accent: '#f59e0b' },
            { label: 'Resolved',    value: resolved,         accent: '#10b981' },
          ].map((s) => (
            <div key={s.label} style={{ background: '#fff', borderRadius: '14px', padding: '1rem 1.4rem', boxShadow: '0 1px 8px rgba(0,0,0,0.06)', border: '1px solid rgba(22,163,74,0.1)' }}>
              <p style={{ margin: 0, fontSize: '0.73rem', color: '#94a3b8', fontWeight: 500 }}>{s.label}</p>
              <p style={{ margin: '2px 0 0', fontSize: '1.5rem', fontWeight: 800, color: s.accent }}>{s.value}</p>
            </div>
          ))}
        </div>

        {/* Cards */}
        {complaints.length === 0 ? (
          <div style={{ background: '#fff', borderRadius: '16px', padding: '3.5rem', textAlign: 'center', boxShadow: '0 1px 8px rgba(0,0,0,0.06)', border: '1px solid rgba(22,163,74,0.1)' }}>
            <div style={{ width: '56px', height: '56px', borderRadius: '14px', background: 'rgba(22,163,74,0.08)', margin: '0 auto 12px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <svg width="24" height="24" fill="none" stroke="#16a34a" strokeWidth="1.7" viewBox="0 0 24 24"><path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </div>
            <p style={{ color: '#64748b', fontSize: '0.9rem', margin: '0 0 1rem' }}>No complaints filed yet.</p>
            <Link href="/complaints/create" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', fontSize: '0.85rem', fontWeight: 700, color: '#16a34a', textDecoration: 'none', padding: '8px 16px', borderRadius: '10px', border: '1px solid #bbf7d0', background: '#f0fdf4' }}>
              File your first complaint
            </Link>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {complaints.map((c) => {
              const ss = statusStyle[c.status]   ?? { bg: '#f1f5f9', color: '#64748b', border: '#e2e8f0', dot: '#94a3b8' }
              const ps = priorityStyle[c.priority] ?? { bg: 'rgba(100,116,139,0.08)', color: '#64748b' }
              return (
                <div key={c.id}
                  style={{ background: '#fff', borderRadius: '14px', padding: '1.25rem 1.5rem', boxShadow: '0 1px 8px rgba(0,0,0,0.06)', border: '1px solid rgba(22,163,74,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '1rem', flexWrap: 'wrap', transition: 'box-shadow 0.2s, transform 0.2s' }}
                  onMouseEnter={e => { (e.currentTarget as HTMLElement).style.boxShadow = '0 4px 20px rgba(0,0,0,0.1)'; (e.currentTarget as HTMLElement).style.transform = 'translateY(-1px)' }}
                  onMouseLeave={e => { (e.currentTarget as HTMLElement).style.boxShadow = '0 1px 8px rgba(0,0,0,0.06)'; (e.currentTarget as HTMLElement).style.transform = 'translateY(0)' }}
                >
                  {/* Left: code + meta */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: '14px', minWidth: 0 }}>
                    <div style={{ width: '40px', height: '40px', borderRadius: '10px', background: ss.bg, border: `1px solid ${ss.border}`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                      <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: ss.dot }} />
                    </div>
                    <div>
                      <span style={{ fontFamily: 'monospace', fontSize: '0.88rem', background: '#f0fdf4', color: '#16a34a', padding: '3px 8px', borderRadius: '6px', fontWeight: 700, border: '1px solid #bbf7d0', display: 'inline-block', marginBottom: '5px' }}>{c.complaintCode}</span>
                      <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                        <span style={{ fontSize: '0.72rem', fontWeight: 700, padding: '3px 8px', borderRadius: '10px', textTransform: 'capitalize', background: ss.bg, color: ss.color, border: `1px solid ${ss.border}` }}>{c.status.replace('_', ' ')}</span>
                        <span style={{ fontSize: '0.72rem', fontWeight: 700, padding: '3px 8px', borderRadius: '10px', textTransform: 'capitalize', background: ps.bg, color: ps.color }}>{c.priority}</span>
                        <span style={{ fontSize: '0.72rem', color: '#94a3b8', padding: '3px 0' }}>{formatDate(c.createdAt)}</span>
                      </div>
                    </div>
                  </div>

                  {/* Right: action */}
                  <Link href={`/complaints/${c.id}`} style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', fontSize: '0.82rem', fontWeight: 600, color: '#16a34a', textDecoration: 'none', padding: '7px 14px', borderRadius: '9px', border: '1px solid #bbf7d0', background: '#f0fdf4', flexShrink: 0 }}>
                    <svg width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
                    View
                  </Link>
                </div>
              )
            })}
          </div>
        )}
      </div>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700;800&display=swap');`}</style>
    </div>
  )
}
