interface Trend {
  date: string
  total: number
}

interface Props {
  trends: Trend[]
}

function formatDate(d: string) {
  try {
    return new Date(d).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })
  } catch {
    return d
  }
}

function getTrend(current: number, prev: number) {
  if (prev === 0) return null
  const diff = current - prev
  const pct = Math.round(Math.abs(diff / prev) * 100)
  return { up: diff > 0, pct, diff }
}

export default function ComplaintTrends({ trends }: Props) {
  const max = Math.max(...trends.map((t) => t.total), 1)
  const total = trends.reduce((sum, t) => sum + t.total, 0)
  const avg = trends.length ? Math.round(total / trends.length) : 0
  const sorted = trends.slice().sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
  const peak = sorted.reduce((prev, cur) => (cur.total > prev.total ? cur : prev), sorted[0] ?? { date: '', total: 0 })

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
            Complaint <span style={{ color: '#16a34a' }}>Trends</span>
          </h1>
          <p style={{ color: '#64748b', fontSize: '0.95rem', marginTop: '6px' }}>Complaint volume over time — spot patterns and spikes.</p>
        </div>

        {/* Summary */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1rem', marginBottom: '1.5rem' }}>
          {[
            { label: 'Days Tracked', value: trends.length, accent: '#16a34a' },
            { label: 'Total Complaints', value: total, accent: '#f59e0b' },
            { label: 'Daily Average', value: avg, accent: '#3b82f6' },
            { label: 'Peak Day', value: formatDate(peak?.date ?? ''), accent: '#8b5cf6', sub: `${peak?.total ?? 0} complaints` },
          ].map((s) => (
            <div key={s.label} style={{ background: '#fff', borderRadius: '14px', padding: '1.1rem 1.4rem', boxShadow: '0 1px 8px rgba(0,0,0,0.06)', border: '1px solid rgba(22,163,74,0.1)' }}>
              <p style={{ margin: 0, fontSize: '0.75rem', color: '#94a3b8', fontWeight: 500 }}>{s.label}</p>
              <p style={{ margin: '2px 0 0', fontSize: typeof s.value === 'number' ? '1.5rem' : '0.95rem', fontWeight: 800, color: s.accent, lineHeight: 1.2 }}>{s.value}</p>
              {s.sub && <p style={{ margin: '2px 0 0', fontSize: '0.72rem', color: '#94a3b8' }}>{s.sub}</p>}
            </div>
          ))}
        </div>

        {/* Sparkline chart */}
        <div style={{ background: '#fff', borderRadius: '16px', padding: '1.5rem', boxShadow: '0 1px 8px rgba(0,0,0,0.06)', border: '1px solid rgba(22,163,74,0.1)', marginBottom: '1.5rem', overflow: 'hidden' }}>
          <p style={{ margin: '0 0 1.2rem', fontSize: '0.75rem', color: '#94a3b8', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em' }}>Trend Sparkline</p>

          {/* SVG sparkline */}
          {sorted.length > 1 && (() => {
            const W = 900, H = 80, PAD = 10
            const points = sorted.map((t, i) => {
              const x = PAD + (i / (sorted.length - 1)) * (W - PAD * 2)
              const y = PAD + (1 - t.total / max) * (H - PAD * 2)
              return `${x},${y}`
            }).join(' ')
            const fillPoints = `${PAD},${H} ${points} ${W - PAD},${H}`
            return (
              <svg viewBox={`0 0 ${W} ${H}`} style={{ width: '100%', height: '80px' }} preserveAspectRatio="none">
                <defs>
                  <linearGradient id="trendFill" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#16a34a" stopOpacity="0.3" />
                    <stop offset="100%" stopColor="#16a34a" stopOpacity="0.03" />
                  </linearGradient>
                </defs>
                <polygon points={fillPoints} fill="url(#trendFill)" />
                <polyline points={points} fill="none" stroke="#16a34a" strokeWidth="2.5" strokeLinejoin="round" strokeLinecap="round" />
                {sorted.map((t, i) => {
                  const x = PAD + (i / (sorted.length - 1)) * (W - PAD * 2)
                  const y = PAD + (1 - t.total / max) * (H - PAD * 2)
                  return <circle key={i} cx={x} cy={y} r="3.5" fill="#fff" stroke="#16a34a" strokeWidth="2" />
                })}
              </svg>
            )
          })()}

          {sorted.length > 0 && (
            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '4px' }}>
              <span style={{ fontSize: '0.68rem', color: '#94a3b8' }}>{formatDate(sorted[0].date)}</span>
              <span style={{ fontSize: '0.68rem', color: '#94a3b8' }}>{formatDate(sorted[sorted.length - 1].date)}</span>
            </div>
          )}
        </div>

        {/* Table */}
        <div style={{ background: '#fff', borderRadius: '16px', boxShadow: '0 1px 8px rgba(0,0,0,0.06)', border: '1px solid rgba(22,163,74,0.1)', overflow: 'hidden' }}>
          <div style={{ padding: '1.25rem 1.5rem', borderBottom: '1px solid #f1f5f9', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div>
              <h2 style={{ fontSize: '1.05rem', fontWeight: 700, color: '#0f172a', margin: 0 }}>Daily Breakdown</h2>
              <p style={{ fontSize: '0.8rem', color: '#94a3b8', margin: '2px 0 0' }}>{trends.length} days of data</p>
            </div>
            <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#16a34a', boxShadow: '0 0 0 3px rgba(22,163,74,0.2)' }} />
          </div>
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ background: '#f8fafc' }}>
                  {['Date', 'Complaints', 'vs Previous', 'Activity', 'vs Avg'].map((h) => (
                    <th key={h} style={{ padding: '0.85rem 1.5rem', textAlign: 'left', fontSize: '0.75rem', fontWeight: 700, color: '#94a3b8', letterSpacing: '0.06em', textTransform: 'uppercase' }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {sorted.map((t, i) => {
                  const pct = Math.round((t.total / max) * 100)
                  const trend = i > 0 ? getTrend(t.total, sorted[i - 1].total) : null
                  const vsAvg = t.total - avg
                  const isPeak = t.date === peak?.date
                  return (
                    <tr key={i}
                      style={{ borderTop: '1px solid #f1f5f9', background: isPeak ? '#f0fdf4' : i % 2 === 0 ? '#fff' : '#fafcff', transition: 'background 0.15s' }}
                      onMouseEnter={e => (e.currentTarget as HTMLElement).style.background = '#f0fdf4'}
                      onMouseLeave={e => (e.currentTarget as HTMLElement).style.background = isPeak ? '#f0fdf4' : i % 2 === 0 ? '#fff' : '#fafcff'}
                    >
                      <td style={{ padding: '0.9rem 1.5rem' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                          <span style={{ fontWeight: 600, color: '#0f172a', fontSize: '0.88rem' }}>{formatDate(t.date)}</span>
                          {isPeak && <span style={{ fontSize: '0.65rem', fontWeight: 700, padding: '2px 6px', borderRadius: '8px', background: 'rgba(22,163,74,0.1)', color: '#15803d' }}>PEAK</span>}
                        </div>
                      </td>
                      <td style={{ padding: '0.9rem 1.5rem', fontWeight: 800, color: '#0f172a', fontSize: '0.95rem' }}>{t.total}</td>
                      <td style={{ padding: '0.9rem 1.5rem' }}>
                        {trend ? (
                          <span style={{
                            display: 'inline-flex', alignItems: 'center', gap: '4px',
                            fontSize: '0.75rem', fontWeight: 700, padding: '3px 8px', borderRadius: '10px',
                            background: trend.up ? 'rgba(239,68,68,0.08)' : 'rgba(22,163,74,0.08)',
                            color: trend.up ? '#b91c1c' : '#15803d',
                          }}>
                            {trend.up ? '↑' : '↓'} {trend.pct}%
                          </span>
                        ) : (
                          <span style={{ color: '#94a3b8', fontSize: '0.8rem' }}>—</span>
                        )}
                      </td>
                      <td style={{ padding: '0.9rem 1.5rem', minWidth: '140px' }}>
                        <div style={{ height: '5px', background: '#f1f5f9', borderRadius: '3px', overflow: 'hidden' }}>
                          <div style={{ height: '100%', width: `${pct}%`, background: isPeak ? '#16a34a' : 'linear-gradient(90deg, #16a34a, #4ade80)', borderRadius: '3px' }} />
                        </div>
                      </td>
                      <td style={{ padding: '0.9rem 1.5rem' }}>
                        <span style={{
                          fontSize: '0.75rem', fontWeight: 600, padding: '3px 8px', borderRadius: '10px',
                          background: vsAvg > 0 ? 'rgba(239,68,68,0.08)' : vsAvg < 0 ? 'rgba(22,163,74,0.08)' : '#f8fafc',
                          color: vsAvg > 0 ? '#b91c1c' : vsAvg < 0 ? '#15803d' : '#94a3b8',
                        }}>
                          {vsAvg > 0 ? `+${vsAvg}` : vsAvg < 0 ? `${vsAvg}` : '±0'}
                        </span>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
            {trends.length === 0 && <div style={{ textAlign: 'center', padding: '3rem', color: '#94a3b8', fontSize: '0.9rem' }}>No trend data available.</div>}
          </div>
        </div>
      </div>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700;800;900&display=swap');`}</style>
    </div>
  )
}
