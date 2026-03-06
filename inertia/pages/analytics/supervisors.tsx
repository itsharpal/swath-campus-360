import Swal from 'sweetalert2'

interface Supervisor {
  id: number
  name: string
  completedJobs: number
}

interface Props {
  supervisors: Supervisor[]
}

const MEDALS = ['🥇', '🥈', '🥉']

function getRankStyle(i: number) {
  if (i === 0) return { bg: '#fef9c3', border: '#fde047', color: '#854d0e', glow: 'rgba(253,224,71,0.3)' }
  if (i === 1) return { bg: '#f1f5f9', border: '#cbd5e1', color: '#475569', glow: 'rgba(203,213,225,0.3)' }
  if (i === 2) return { bg: '#fff7ed', border: '#fdba74', color: '#9a3412', glow: 'rgba(253,186,116,0.3)' }
  return { bg: '#f8fafc', border: '#e2e8f0', color: '#64748b', glow: 'transparent' }
}

export default function SupervisorRanking({ supervisors }: Props) {
  const max = Math.max(...supervisors.map((s) => s.completedJobs), 1)
  const total = supervisors.reduce((sum, s) => sum + s.completedJobs, 0)
  const sorted = supervisors.slice().sort((a, b) => b.completedJobs - a.completedJobs)

  async function showDetail(s: Supervisor, rank: number) {
    await Swal.fire({
      title: `${MEDALS[rank] ?? '👤'} ${s.name}`,
      html: `
        <div style="font-family: 'DM Sans', sans-serif; text-align: left; padding: 0.5rem 0;">
          <div style="display:flex; justify-content:space-between; padding:10px 0; border-bottom:1px solid #f1f5f9;">
            <span style="color:#94a3b8;font-size:0.85rem;">Rank</span>
            <span style="font-weight:700;color:#0f172a;">#${rank + 1}</span>
          </div>
          <div style="display:flex; justify-content:space-between; padding:10px 0; border-bottom:1px solid #f1f5f9;">
            <span style="color:#94a3b8;font-size:0.85rem;">Completed Jobs</span>
            <span style="font-weight:800;color:#16a34a;font-size:1.1rem;">${s.completedJobs}</span>
          </div>
          <div style="display:flex; justify-content:space-between; padding:10px 0;">
            <span style="color:#94a3b8;font-size:0.85rem;">Share of Total</span>
            <span style="font-weight:700;color:#0f172a;">${total > 0 ? Math.round((s.completedJobs / total) * 100) : 0}%</span>
          </div>
        </div>
      `,
      confirmButtonColor: '#16a34a',
      confirmButtonText: 'Close',
      background: '#ffffff',
      customClass: { popup: 'swal-campus-popup', title: 'swal-campus-title' },
    })
  }

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

      <div style={{ maxWidth: '900px', margin: '0 auto' }}>
        {/* Header */}
        <div style={{ marginBottom: '2rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '6px' }}>
            <div style={{ width: '28px', height: '2px', background: '#16a34a' }} />
            <span style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '0.15em', color: '#16a34a', textTransform: 'uppercase' }}>Swachh Campus — Analytics</span>
            <div style={{ width: '28px', height: '2px', background: '#16a34a' }} />
          </div>
          <h1 style={{ fontSize: '2.4rem', fontWeight: 800, lineHeight: 1.1, color: '#0f172a', margin: 0 }}>
            Supervisor <span style={{ color: '#16a34a' }}>Ranking</span>
          </h1>
          <p style={{ color: '#64748b', fontSize: '0.95rem', marginTop: '6px' }}>Leaderboard ranked by completed job count. Click a row to view details.</p>
        </div>

        {/* Top 3 podium */}
        {sorted.length >= 3 && (
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1rem', marginBottom: '1.5rem' }}>
            {sorted.slice(0, 3).map((s, i) => {
              const rs = getRankStyle(i)
              const pct = Math.round((s.completedJobs / max) * 100)
              return (
                <div
                  key={s.id}
                  onClick={() => showDetail(s, i)}
                  style={{
                    background: rs.bg, borderRadius: '16px', padding: '1.4rem',
                    border: `2px solid ${rs.border}`, cursor: 'pointer',
                    boxShadow: `0 4px 20px ${rs.glow}`,
                    transition: 'transform 0.2s, box-shadow 0.2s',
                    textAlign: 'center',
                  }}
                  onMouseEnter={e => {
                    (e.currentTarget as HTMLElement).style.transform = 'translateY(-3px)'
                    ;(e.currentTarget as HTMLElement).style.boxShadow = `0 8px 28px ${rs.glow}`
                  }}
                  onMouseLeave={e => {
                    (e.currentTarget as HTMLElement).style.transform = 'translateY(0)'
                    ;(e.currentTarget as HTMLElement).style.boxShadow = `0 4px 20px ${rs.glow}`
                  }}
                >
                  <div style={{ fontSize: '2rem', marginBottom: '8px' }}>{MEDALS[i]}</div>
                  <div style={{
                    width: '44px', height: '44px', borderRadius: '50%',
                    background: 'linear-gradient(135deg, #16a34a, #4ade80)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    color: '#fff', fontWeight: 800, fontSize: '1rem',
                    margin: '0 auto 10px',
                  }}>
                    {s.name.charAt(0).toUpperCase()}
                  </div>
                  <p style={{ margin: 0, fontWeight: 700, color: '#0f172a', fontSize: '0.9rem' }}>{s.name}</p>
                  <p style={{ margin: '4px 0 10px', fontSize: '1.6rem', fontWeight: 900, color: rs.color }}>{s.completedJobs}</p>
                  <div style={{ height: '4px', background: 'rgba(0,0,0,0.08)', borderRadius: '2px', overflow: 'hidden' }}>
                    <div style={{ height: '100%', width: `${pct}%`, background: '#16a34a', borderRadius: '2px' }} />
                  </div>
                  <span style={{ fontSize: '0.7rem', color: '#94a3b8', marginTop: '4px', display: 'block' }}>jobs completed</span>
                </div>
              )
            })}
          </div>
        )}

        {/* Full table */}
        <div style={{ background: '#fff', borderRadius: '16px', boxShadow: '0 1px 8px rgba(0,0,0,0.06)', border: '1px solid rgba(22,163,74,0.1)', overflow: 'hidden' }}>
          <div style={{ padding: '1.25rem 1.5rem', borderBottom: '1px solid #f1f5f9', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div>
              <h2 style={{ fontSize: '1.05rem', fontWeight: 700, color: '#0f172a', margin: 0 }}>Full Leaderboard</h2>
              <p style={{ fontSize: '0.8rem', color: '#94a3b8', margin: '2px 0 0' }}>{supervisors.length} supervisors · {total} total completed jobs</p>
            </div>
            <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#16a34a', boxShadow: '0 0 0 3px rgba(22,163,74,0.2)' }} />
          </div>
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ background: '#f8fafc' }}>
                  {['Rank', 'Supervisor', 'Performance', 'Completed', 'Share'].map((h) => (
                    <th key={h} style={{ padding: '0.85rem 1.5rem', textAlign: 'left', fontSize: '0.75rem', fontWeight: 700, color: '#94a3b8', letterSpacing: '0.06em', textTransform: 'uppercase' }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {sorted.map((s, i) => {
                  const pct = Math.round((s.completedJobs / max) * 100)
                  const share = total > 0 ? Math.round((s.completedJobs / total) * 100) : 0
                  return (
                    <tr key={s.id}
                      onClick={() => showDetail(s, i)}
                      style={{ borderTop: '1px solid #f1f5f9', background: i % 2 === 0 ? '#fff' : '#fafcff', cursor: 'pointer', transition: 'background 0.15s' }}
                      onMouseEnter={e => (e.currentTarget as HTMLElement).style.background = '#f0fdf4'}
                      onMouseLeave={e => (e.currentTarget as HTMLElement).style.background = i % 2 === 0 ? '#fff' : '#fafcff'}
                    >
                      <td style={{ padding: '1rem 1.5rem' }}>
                        <span style={{ fontSize: '1rem' }}>{MEDALS[i] ?? `#${i + 1}`}</span>
                      </td>
                      <td style={{ padding: '1rem 1.5rem' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                          <div style={{
                            width: '32px', height: '32px', borderRadius: '50%',
                            background: 'linear-gradient(135deg, #16a34a, #4ade80)',
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                            color: '#fff', fontWeight: 700, fontSize: '0.82rem', flexShrink: 0,
                          }}>
                            {s.name.charAt(0).toUpperCase()}
                          </div>
                          <span style={{ fontWeight: 600, color: '#0f172a', fontSize: '0.88rem' }}>{s.name}</span>
                        </div>
                      </td>
                      <td style={{ padding: '1rem 1.5rem', minWidth: '160px' }}>
                        <div style={{ height: '6px', background: '#f1f5f9', borderRadius: '3px', overflow: 'hidden' }}>
                          <div style={{ height: '100%', width: `${pct}%`, background: 'linear-gradient(90deg, #16a34a, #4ade80)', borderRadius: '3px' }} />
                        </div>
                      </td>
                      <td style={{ padding: '1rem 1.5rem', fontWeight: 800, color: '#16a34a', fontSize: '1rem' }}>{s.completedJobs}</td>
                      <td style={{ padding: '1rem 1.5rem', fontSize: '0.82rem', fontWeight: 600, color: '#64748b' }}>{share}%</td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
            {supervisors.length === 0 && <div style={{ textAlign: 'center', padding: '3rem', color: '#94a3b8', fontSize: '0.9rem' }}>No supervisors found.</div>}
          </div>
        </div>
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700;800;900&display=swap');
        .swal-campus-popup { border-radius: 16px !important; font-family: 'DM Sans', sans-serif !important; }
        .swal-campus-title { font-weight: 800 !important; color: #0f172a !important; font-size: 1.2rem !important; }
      `}</style>
    </div>
  )
}
