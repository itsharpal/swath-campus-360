interface Building {
  id: number
  name: string
  totalComplaints: number
}

interface Props {
  buildings: Building[]
}

export default function BuildingsAnalytics({ buildings }: Props) {
  const max = Math.max(...buildings.map((b) => b.totalComplaints), 1)

  const getRiskStyle = (count: number) => {
    const ratio = count / max
    if (ratio >= 0.75) return { bg: '#fee2e2', color: '#b91c1c', border: '#fca5a5', label: 'High' }
    if (ratio >= 0.4) return { bg: '#fef3c7', color: '#b45309', border: '#fde68a', label: 'Medium' }
    return { bg: '#d1fae5', color: '#047857', border: '#a7f3d0', label: 'Low' }
  }

  const total = buildings.reduce((sum, b) => sum + b.totalComplaints, 0)
  const avg = buildings.length ? Math.round(total / buildings.length) : 0

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
      <div style={{ position: 'fixed', top: '-80px', left: '-80px', width: '300px', height: '300px', borderRadius: '50%', border: '2px solid rgba(22,163,74,0.08)', pointerEvents: 'none' }} />
      <div style={{ position: 'fixed', bottom: '-60px', right: '-60px', width: '250px', height: '250px', borderRadius: '50%', border: '2px solid rgba(22,163,74,0.06)', pointerEvents: 'none' }} />

      <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
        {/* Header */}
        <div style={{ marginBottom: '2rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '6px' }}>
            <div style={{ width: '28px', height: '2px', background: '#16a34a' }} />
            <span style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '0.15em', color: '#16a34a', textTransform: 'uppercase' }}>Swachh Campus — Analytics</span>
            <div style={{ width: '28px', height: '2px', background: '#16a34a' }} />
          </div>
          <h1 style={{ fontSize: '2.4rem', fontWeight: 800, lineHeight: 1.1, color: '#0f172a', margin: 0 }}>
            Building <span style={{ color: '#16a34a' }}>Performance</span>
          </h1>
          <p style={{ color: '#64748b', fontSize: '0.95rem', marginTop: '6px' }}>Complaint load across all registered campus buildings.</p>
        </div>

        {/* Summary cards */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem', marginBottom: '1.5rem' }}>
          {[
            { label: 'Total Buildings', value: buildings.length, accent: '#16a34a', bg: 'rgba(22,163,74,0.08)' },
            { label: 'Total Complaints', value: total, accent: '#f59e0b', bg: 'rgba(245,158,11,0.08)' },
            { label: 'Avg per Building', value: avg, accent: '#3b82f6', bg: 'rgba(59,130,246,0.08)' },
          ].map((c) => (
            <div key={c.label} style={{
              background: '#fff', borderRadius: '14px', padding: '1.1rem 1.4rem',
              boxShadow: '0 1px 8px rgba(0,0,0,0.06)', border: '1px solid rgba(22,163,74,0.1)',
              display: 'flex', alignItems: 'center', gap: '14px',
            }}>
              <div style={{ width: '40px', height: '40px', borderRadius: '10px', background: c.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', color: c.accent, flexShrink: 0 }}>
                <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.7" viewBox="0 0 24 24">
                  <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" strokeLinecap="round" strokeLinejoin="round"/><polyline points="9 22 9 12 15 12 15 22"/>
                </svg>
              </div>
              <div>
                <p style={{ margin: 0, fontSize: '0.75rem', color: '#94a3b8', fontWeight: 500 }}>{c.label}</p>
                <p style={{ margin: '2px 0 0', fontSize: '1.5rem', fontWeight: 800, color: '#0f172a' }}>{c.value}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Table */}
        <div style={{ background: '#fff', borderRadius: '16px', boxShadow: '0 1px 8px rgba(0,0,0,0.06)', border: '1px solid rgba(22,163,74,0.1)', overflow: 'hidden' }}>
          <div style={{ padding: '1.25rem 1.5rem', borderBottom: '1px solid #f1f5f9', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div>
              <h2 style={{ fontSize: '1.05rem', fontWeight: 700, color: '#0f172a', margin: 0 }}>All Buildings</h2>
              <p style={{ fontSize: '0.8rem', color: '#94a3b8', margin: '2px 0 0' }}>{buildings.length} buildings registered</p>
            </div>
            <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#16a34a', boxShadow: '0 0 0 3px rgba(22,163,74,0.2)' }} />
          </div>
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ background: '#f8fafc' }}>
                  {['#', 'Building', 'Complaint Load', 'Total', 'Risk'].map((h) => (
                    <th key={h} style={{ padding: '0.85rem 1.5rem', textAlign: 'left', fontSize: '0.75rem', fontWeight: 700, color: '#94a3b8', letterSpacing: '0.06em', textTransform: 'uppercase' }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {buildings
                  .slice()
                  .sort((a, b) => b.totalComplaints - a.totalComplaints)
                  .map((b, i) => {
                    const risk = getRiskStyle(b.totalComplaints)
                    const pct = Math.round((b.totalComplaints / max) * 100)
                    return (
                      <tr key={b.id}
                        style={{ borderTop: '1px solid #f1f5f9', background: i % 2 === 0 ? '#fff' : '#fafcff', transition: 'background 0.15s' }}
                        onMouseEnter={e => (e.currentTarget as HTMLElement).style.background = '#f0fdf4'}
                        onMouseLeave={e => (e.currentTarget as HTMLElement).style.background = i % 2 === 0 ? '#fff' : '#fafcff'}
                      >
                        <td style={{ padding: '1rem 1.5rem', fontSize: '0.8rem', fontWeight: 700, color: '#94a3b8' }}>{i + 1}</td>
                        <td style={{ padding: '1rem 1.5rem' }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                            <div style={{ width: '32px', height: '32px', borderRadius: '8px', background: 'rgba(22,163,74,0.08)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#16a34a', flexShrink: 0 }}>
                              <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" strokeLinecap="round" strokeLinejoin="round"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
                            </div>
                            <span style={{ fontWeight: 600, color: '#0f172a', fontSize: '0.88rem' }}>{b.name}</span>
                          </div>
                        </td>
                        <td style={{ padding: '1rem 1.5rem', minWidth: '180px' }}>
                          <div style={{ height: '6px', background: '#f1f5f9', borderRadius: '3px', overflow: 'hidden' }}>
                            <div style={{ height: '100%', width: `${pct}%`, background: `linear-gradient(90deg, #16a34a, #4ade80)`, borderRadius: '3px', transition: 'width 0.6s ease' }} />
                          </div>
                          <span style={{ fontSize: '0.72rem', color: '#94a3b8', marginTop: '3px', display: 'block' }}>{pct}% of max</span>
                        </td>
                        <td style={{ padding: '1rem 1.5rem', fontWeight: 700, color: '#0f172a', fontSize: '0.95rem' }}>{b.totalComplaints}</td>
                        <td style={{ padding: '1rem 1.5rem' }}>
                          <span style={{ fontSize: '0.72rem', fontWeight: 700, padding: '3px 10px', borderRadius: '20px', background: risk.bg, color: risk.color, border: `1px solid ${risk.border}` }}>{risk.label}</span>
                        </td>
                      </tr>
                    )
                  })}
              </tbody>
            </table>
            {buildings.length === 0 && <div style={{ textAlign: 'center', padding: '3rem', color: '#94a3b8', fontSize: '0.9rem' }}>No buildings found.</div>}
          </div>
        </div>
      </div>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700;800&display=swap');`}</style>
    </div>
  )
}
