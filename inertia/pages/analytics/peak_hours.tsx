interface HourData {
  hour: number
  total: number
}

interface Props {
  hours: HourData[]
}

function formatHour(h: number) {
  if (h === 0) return '12 AM'
  if (h < 12) return `${h} AM`
  if (h === 12) return '12 PM'
  return `${h - 12} PM`
}

function getShift(h: number) {
  if (h >= 6 && h < 12) return { label: 'Morning', color: '#f59e0b', bg: 'rgba(245,158,11,0.1)' }
  if (h >= 12 && h < 17) return { label: 'Afternoon', color: '#3b82f6', bg: 'rgba(59,130,246,0.1)' }
  if (h >= 17 && h < 21) return { label: 'Evening', color: '#8b5cf6', bg: 'rgba(139,92,246,0.1)' }
  return { label: 'Night', color: '#64748b', bg: 'rgba(100,116,139,0.1)' }
}

export default function PeakHours({ hours }: Props) {
  const max = Math.max(...hours.map((h) => h.total), 1)
  const total = hours.reduce((sum, h) => sum + h.total, 0)
  const peak = hours.reduce((prev, cur) => (cur.total > prev.total ? cur : prev), hours[0] ?? { hour: 0, total: 0 })
  const sorted = hours.slice().sort((a, b) => a.hour - b.hour)

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
            Peak Complaint <span style={{ color: '#16a34a' }}>Hours</span>
          </h1>
          <p style={{ color: '#64748b', fontSize: '0.95rem', marginTop: '6px' }}>When are complaints most frequently submitted throughout the day.</p>
        </div>

        {/* Summary */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem', marginBottom: '1.5rem' }}>
          {[
            { label: 'Total Complaints', value: total, accent: '#16a34a' },
            { label: 'Peak Hour', value: formatHour(peak?.hour ?? 0), accent: '#f59e0b', sub: `${peak?.total ?? 0} complaints` },
            { label: 'Hours Tracked', value: hours.length, accent: '#3b82f6' },
          ].map((s) => (
            <div key={s.label} style={{ background: '#fff', borderRadius: '14px', padding: '1.1rem 1.4rem', boxShadow: '0 1px 8px rgba(0,0,0,0.06)', border: '1px solid rgba(22,163,74,0.1)' }}>
              <p style={{ margin: 0, fontSize: '0.75rem', color: '#94a3b8', fontWeight: 500 }}>{s.label}</p>
              <p style={{ margin: '2px 0 0', fontSize: '1.5rem', fontWeight: 800, color: s.accent }}>{s.value}</p>
              {s.sub && <p style={{ margin: '2px 0 0', fontSize: '0.75rem', color: '#94a3b8' }}>{s.sub}</p>}
            </div>
          ))}
        </div>

        {/* Bar chart */}
        <div style={{ background: '#fff', borderRadius: '16px', padding: '1.5rem', boxShadow: '0 1px 8px rgba(0,0,0,0.06)', border: '1px solid rgba(22,163,74,0.1)', marginBottom: '1.5rem' }}>
          <p style={{ margin: '0 0 1.2rem', fontSize: '0.75rem', color: '#94a3b8', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em' }}>24-Hour Activity Chart</p>
          <div style={{ display: 'flex', alignItems: 'flex-end', gap: '4px', height: '100px' }}>
            {sorted.map((h) => {
              const pct = (h.total / max) * 100
              const shift = getShift(h.hour)
              const isPeak = h.hour === peak?.hour
              return (
                <div key={h.hour} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px', position: 'relative' }} title={`${formatHour(h.hour)}: ${h.total}`}>
                  <div style={{
                    width: '100%', height: `${Math.max(pct, 4)}%`,
                    background: isPeak ? 'linear-gradient(180deg, #16a34a, #4ade80)' : shift.color,
                    borderRadius: '3px 3px 0 0',
                    opacity: isPeak ? 1 : 0.55,
                    transition: 'opacity 0.2s',
                    minHeight: '4px',
                  }} />
                </div>
              )
            })}
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '6px' }}>
            <span style={{ fontSize: '0.68rem', color: '#94a3b8' }}>12 AM</span>
            <span style={{ fontSize: '0.68rem', color: '#94a3b8' }}>6 AM</span>
            <span style={{ fontSize: '0.68rem', color: '#94a3b8' }}>12 PM</span>
            <span style={{ fontSize: '0.68rem', color: '#94a3b8' }}>6 PM</span>
            <span style={{ fontSize: '0.68rem', color: '#94a3b8' }}>11 PM</span>
          </div>
          {/* Shift legend */}
          <div style={{ display: 'flex', gap: '14px', marginTop: '12px', flexWrap: 'wrap' }}>
            {[
              { label: 'Morning', color: '#f59e0b' },
              { label: 'Afternoon', color: '#3b82f6' },
              { label: 'Evening', color: '#8b5cf6' },
              { label: 'Night', color: '#64748b' },
              { label: 'Peak', color: '#16a34a' },
            ].map((l) => (
              <div key={l.label} style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                <div style={{ width: '10px', height: '10px', borderRadius: '2px', background: l.color }} />
                <span style={{ fontSize: '0.72rem', color: '#64748b', fontWeight: 500 }}>{l.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Table */}
        <div style={{ background: '#fff', borderRadius: '16px', boxShadow: '0 1px 8px rgba(0,0,0,0.06)', border: '1px solid rgba(22,163,74,0.1)', overflow: 'hidden' }}>
          <div style={{ padding: '1.25rem 1.5rem', borderBottom: '1px solid #f1f5f9', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div>
              <h2 style={{ fontSize: '1.05rem', fontWeight: 700, color: '#0f172a', margin: 0 }}>Hourly Breakdown</h2>
              <p style={{ fontSize: '0.8rem', color: '#94a3b8', margin: '2px 0 0' }}>All {hours.length} hours tracked</p>
            </div>
            <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#16a34a', boxShadow: '0 0 0 3px rgba(22,163,74,0.2)' }} />
          </div>
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ background: '#f8fafc' }}>
                  {['Hour', 'Shift', 'Complaints', 'Activity', 'Share'].map((h) => (
                    <th key={h} style={{ padding: '0.85rem 1.5rem', textAlign: 'left', fontSize: '0.75rem', fontWeight: 700, color: '#94a3b8', letterSpacing: '0.06em', textTransform: 'uppercase' }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {sorted.map((h, i) => {
                  const shift = getShift(h.hour)
                  const pct = Math.round((h.total / max) * 100)
                  const share = total > 0 ? Math.round((h.total / total) * 100) : 0
                  const isPeak = h.hour === peak?.hour
                  return (
                    <tr key={h.hour}
                      style={{ borderTop: '1px solid #f1f5f9', background: isPeak ? '#f0fdf4' : i % 2 === 0 ? '#fff' : '#fafcff', transition: 'background 0.15s' }}
                      onMouseEnter={e => (e.currentTarget as HTMLElement).style.background = '#f0fdf4'}
                      onMouseLeave={e => (e.currentTarget as HTMLElement).style.background = isPeak ? '#f0fdf4' : i % 2 === 0 ? '#fff' : '#fafcff'}
                    >
                      <td style={{ padding: '0.9rem 1.5rem' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                          <span style={{ fontFamily: 'monospace', fontWeight: 700, color: '#0f172a', fontSize: '0.88rem' }}>{formatHour(h.hour)}</span>
                          {isPeak && <span style={{ fontSize: '0.65rem', fontWeight: 700, padding: '2px 6px', borderRadius: '8px', background: 'rgba(22,163,74,0.1)', color: '#15803d' }}>PEAK</span>}
                        </div>
                      </td>
                      <td style={{ padding: '0.9rem 1.5rem' }}>
                        <span style={{ fontSize: '0.72rem', fontWeight: 600, padding: '3px 8px', borderRadius: '10px', background: shift.bg, color: shift.color }}>{shift.label}</span>
                      </td>
                      <td style={{ padding: '0.9rem 1.5rem', fontWeight: 800, color: '#0f172a', fontSize: '0.95rem' }}>{h.total}</td>
                      <td style={{ padding: '0.9rem 1.5rem', minWidth: '140px' }}>
                        <div style={{ height: '5px', background: '#f1f5f9', borderRadius: '3px', overflow: 'hidden' }}>
                          <div style={{ height: '100%', width: `${pct}%`, background: isPeak ? '#16a34a' : shift.color, borderRadius: '3px' }} />
                        </div>
                      </td>
                      <td style={{ padding: '0.9rem 1.5rem', fontSize: '0.82rem', fontWeight: 600, color: '#64748b' }}>{share}%</td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
            {hours.length === 0 && <div style={{ textAlign: 'center', padding: '3rem', color: '#94a3b8', fontSize: '0.9rem' }}>No hourly data available.</div>}
          </div>
        </div>
      </div>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700;800;900&display=swap');`}</style>
    </div>
  )
}
