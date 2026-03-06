interface Zone {
  id: number
  name: string
  complaints: number
}

interface Props {
  zones: Zone[]
}

function getHeatColor(value: number, max: number) {
  const ratio = max > 0 ? value / max : 0
  if (ratio >= 0.8) return { bg: '#fee2e2', border: '#fca5a5', text: '#b91c1c', intensity: 'Critical', dot: '#ef4444' }
  if (ratio >= 0.6) return { bg: '#fef3c7', border: '#fde68a', text: '#b45309', intensity: 'High', dot: '#f59e0b' }
  if (ratio >= 0.35) return { bg: '#dbeafe', border: '#bfdbfe', text: '#1d4ed8', intensity: 'Medium', dot: '#3b82f6' }
  if (ratio >= 0.1) return { bg: '#d1fae5', border: '#a7f3d0', text: '#047857', intensity: 'Low', dot: '#10b981' }
  return { bg: '#f8fafc', border: '#e2e8f0', text: '#64748b', intensity: 'Minimal', dot: '#94a3b8' }
}

export default function HeatmapAnalytics({ zones }: Props) {
  const max = Math.max(...zones.map((z) => z.complaints), 1)
  const total = zones.reduce((sum, z) => sum + z.complaints, 0)
  const hotZone = zones.reduce((prev, cur) => (cur.complaints > prev.complaints ? cur : prev), zones[0] ?? { name: '—', complaints: 0 })

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

      <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
        {/* Header */}
        <div style={{ marginBottom: '2rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '6px' }}>
            <div style={{ width: '28px', height: '2px', background: '#16a34a' }} />
            <span style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '0.15em', color: '#16a34a', textTransform: 'uppercase' }}>Swachh Campus — Analytics</span>
            <div style={{ width: '28px', height: '2px', background: '#16a34a' }} />
          </div>
          <h1 style={{ fontSize: '2.4rem', fontWeight: 800, lineHeight: 1.1, color: '#0f172a', margin: 0 }}>
            Zone Complaint <span style={{ color: '#16a34a' }}>Heatmap</span>
          </h1>
          <p style={{ color: '#64748b', fontSize: '0.95rem', marginTop: '6px' }}>Visual intensity map of complaints per campus zone.</p>
        </div>

        {/* Summary bar */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem', marginBottom: '1.5rem' }}>
          {[
            { label: 'Total Zones', value: zones.length, icon: '📍' },
            { label: 'Total Complaints', value: total, icon: '📋' },
            { label: 'Hottest Zone', value: hotZone?.name ?? '—', icon: '🔥', sub: `${hotZone?.complaints ?? 0} complaints` },
          ].map((s) => (
            <div key={s.label} style={{ background: '#fff', borderRadius: '14px', padding: '1.1rem 1.4rem', boxShadow: '0 1px 8px rgba(0,0,0,0.06)', border: '1px solid rgba(22,163,74,0.1)' }}>
              <p style={{ margin: 0, fontSize: '0.75rem', color: '#94a3b8', fontWeight: 500 }}>{s.label}</p>
              <p style={{ margin: '2px 0 0', fontSize: typeof s.value === 'string' ? '1.1rem' : '1.5rem', fontWeight: 800, color: '#0f172a' }}>{s.value}</p>
              {s.sub && <p style={{ margin: '2px 0 0', fontSize: '0.75rem', color: '#94a3b8' }}>{s.sub}</p>}
            </div>
          ))}
        </div>

        {/* Legend */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '1.5rem', flexWrap: 'wrap' }}>
          <span style={{ fontSize: '0.78rem', fontWeight: 600, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Intensity:</span>
          {[
            { label: 'Minimal', dot: '#94a3b8' },
            { label: 'Low', dot: '#10b981' },
            { label: 'Medium', dot: '#3b82f6' },
            { label: 'High', dot: '#f59e0b' },
            { label: 'Critical', dot: '#ef4444' },
          ].map((l) => (
            <div key={l.label} style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
              <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: l.dot }} />
              <span style={{ fontSize: '0.78rem', color: '#64748b', fontWeight: 500 }}>{l.label}</span>
            </div>
          ))}
        </div>

        {/* Heatmap grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem' }}>
          {zones
            .slice()
            .sort((a, b) => b.complaints - a.complaints)
            .map((z) => {
              const heat = getHeatColor(z.complaints, max)
              const pct = Math.round((z.complaints / max) * 100)
              return (
                <div
                  key={z.id}
                  style={{
                    background: '#fff', borderRadius: '16px',
                    padding: '1.4rem', boxShadow: '0 1px 8px rgba(0,0,0,0.06)',
                    border: `1.5px solid ${heat.border}`,
                    transition: 'transform 0.2s, box-shadow 0.2s',
                    position: 'relative', overflow: 'hidden',
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
                  {/* Background fill */}
                  <div style={{ position: 'absolute', inset: 0, background: heat.bg, opacity: 0.45 }} />

                  <div style={{ position: 'relative' }}>
                    <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '12px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: heat.dot, boxShadow: `0 0 0 3px ${heat.border}` }} />
                        <span style={{ fontWeight: 700, color: '#0f172a', fontSize: '0.92rem' }}>{z.name}</span>
                      </div>
                      <span style={{ fontSize: '0.7rem', fontWeight: 700, padding: '3px 8px', borderRadius: '10px', background: heat.bg, color: heat.text, border: `1px solid ${heat.border}` }}>
                        {heat.intensity}
                      </span>
                    </div>

                    <p style={{ margin: '0 0 10px', fontSize: '2.2rem', fontWeight: 900, color: heat.text, lineHeight: 1 }}>
                      {z.complaints}
                    </p>
                    <p style={{ margin: '0 0 10px', fontSize: '0.75rem', color: '#94a3b8' }}>complaints reported</p>

                    {/* Mini bar */}
                    <div style={{ height: '5px', background: 'rgba(0,0,0,0.06)', borderRadius: '3px', overflow: 'hidden' }}>
                      <div style={{ height: '100%', width: `${pct}%`, background: heat.dot, borderRadius: '3px' }} />
                    </div>
                    <span style={{ fontSize: '0.7rem', color: '#94a3b8', marginTop: '4px', display: 'block' }}>{pct}% of peak zone</span>
                  </div>
                </div>
              )
            })}
        </div>

        {zones.length === 0 && (
          <div style={{ textAlign: 'center', padding: '4rem', color: '#94a3b8', fontSize: '0.9rem' }}>No zone data available.</div>
        )}
      </div>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700;800;900&display=swap');`}</style>
    </div>
  )
}
