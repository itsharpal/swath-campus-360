interface Category {
  categoryId: number
  categoryName?: string
  total: number
}

interface Props {
  categories: Category[]
}

const CATEGORY_COLORS = [
  { bg: 'rgba(22,163,74,0.1)', color: '#15803d', bar: '#16a34a' },
  { bg: 'rgba(59,130,246,0.1)', color: '#1d4ed8', bar: '#3b82f6' },
  { bg: 'rgba(245,158,11,0.1)', color: '#b45309', bar: '#f59e0b' },
  { bg: 'rgba(139,92,246,0.1)', color: '#7c3aed', bar: '#8b5cf6' },
  { bg: 'rgba(236,72,153,0.1)', color: '#be185d', bar: '#ec4899' },
  { bg: 'rgba(239,68,68,0.1)', color: '#b91c1c', bar: '#ef4444' },
]

export default function CategoryAnalytics({ categories }: Props) {
  const max = Math.max(...categories.map((c) => c.total), 1)
  const total = categories.reduce((sum, c) => sum + c.total, 0)

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
            Complaint <span style={{ color: '#16a34a' }}>Categories</span>
          </h1>
          <p style={{ color: '#64748b', fontSize: '0.95rem', marginTop: '6px' }}>Distribution of complaints by category type.</p>
        </div>

        {/* Donut-style summary + cards */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '1.5rem', marginBottom: '1.5rem' }}>
          {/* Summary */}
          <div style={{ background: '#fff', borderRadius: '16px', padding: '1.5rem', boxShadow: '0 1px 8px rgba(0,0,0,0.06)', border: '1px solid rgba(22,163,74,0.1)', display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: '12px' }}>
            <p style={{ margin: 0, fontSize: '0.75rem', color: '#94a3b8', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.06em' }}>Overview</p>
            <div>
              <p style={{ margin: 0, fontSize: '3rem', fontWeight: 900, color: '#16a34a', lineHeight: 1 }}>{total}</p>
              <p style={{ margin: '4px 0 0', fontSize: '0.85rem', color: '#64748b' }}>Total complaints filed</p>
            </div>
            <div style={{ height: '1px', background: '#f1f5f9' }} />
            <div>
              <p style={{ margin: 0, fontSize: '2rem', fontWeight: 800, color: '#0f172a', lineHeight: 1 }}>{categories.length}</p>
              <p style={{ margin: '4px 0 0', fontSize: '0.85rem', color: '#64748b' }}>Active categories</p>
            </div>
          </div>

          {/* Bar chart visual */}
          <div style={{ background: '#fff', borderRadius: '16px', padding: '1.5rem', boxShadow: '0 1px 8px rgba(0,0,0,0.06)', border: '1px solid rgba(22,163,74,0.1)' }}>
            <p style={{ margin: '0 0 1rem', fontSize: '0.75rem', color: '#94a3b8', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.06em' }}>Distribution</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {categories.slice(0, 5).map((c, i) => {
                const palette = CATEGORY_COLORS[i % CATEGORY_COLORS.length]
                const pct = Math.round((c.total / total) * 100)
                const name = c.categoryName ?? `Category ${c.categoryId}`
                return (
                  <div key={c.categoryId}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                      <span style={{ fontSize: '0.82rem', fontWeight: 600, color: '#374151' }}>{name}</span>
                      <span style={{ fontSize: '0.78rem', color: '#94a3b8', fontWeight: 600 }}>{pct}%</span>
                    </div>
                    <div style={{ height: '6px', background: '#f1f5f9', borderRadius: '3px', overflow: 'hidden' }}>
                      <div style={{ height: '100%', width: `${pct}%`, background: palette.bar, borderRadius: '3px' }} />
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>

        {/* Table */}
        <div style={{ background: '#fff', borderRadius: '16px', boxShadow: '0 1px 8px rgba(0,0,0,0.06)', border: '1px solid rgba(22,163,74,0.1)', overflow: 'hidden' }}>
          <div style={{ padding: '1.25rem 1.5rem', borderBottom: '1px solid #f1f5f9', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div>
              <h2 style={{ fontSize: '1.05rem', fontWeight: 700, color: '#0f172a', margin: 0 }}>All Categories</h2>
              <p style={{ fontSize: '0.8rem', color: '#94a3b8', margin: '2px 0 0' }}>{categories.length} categories tracked</p>
            </div>
            <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#16a34a', boxShadow: '0 0 0 3px rgba(22,163,74,0.2)' }} />
          </div>
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ background: '#f8fafc' }}>
                  {['#', 'Category', 'Complaints', 'Share', 'Bar'].map((h) => (
                    <th key={h} style={{ padding: '0.85rem 1.5rem', textAlign: 'left', fontSize: '0.75rem', fontWeight: 700, color: '#94a3b8', letterSpacing: '0.06em', textTransform: 'uppercase' }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {categories
                  .slice()
                  .sort((a, b) => b.total - a.total)
                  .map((c, i) => {
                    const palette = CATEGORY_COLORS[i % CATEGORY_COLORS.length]
                    const pct = total > 0 ? Math.round((c.total / total) * 100) : 0
                    const barPct = Math.round((c.total / max) * 100)
                    const name = c.categoryName ?? `Category ${c.categoryId}`
                    return (
                      <tr key={c.categoryId}
                        style={{ borderTop: '1px solid #f1f5f9', background: i % 2 === 0 ? '#fff' : '#fafcff', transition: 'background 0.15s' }}
                        onMouseEnter={e => (e.currentTarget as HTMLElement).style.background = '#f0fdf4'}
                        onMouseLeave={e => (e.currentTarget as HTMLElement).style.background = i % 2 === 0 ? '#fff' : '#fafcff'}
                      >
                        <td style={{ padding: '1rem 1.5rem', fontSize: '0.8rem', fontWeight: 700, color: '#94a3b8' }}>{i + 1}</td>
                        <td style={{ padding: '1rem 1.5rem' }}>
                          <span style={{ fontSize: '0.75rem', fontWeight: 700, padding: '4px 10px', borderRadius: '20px', background: palette.bg, color: palette.color }}>{name}</span>
                        </td>
                        <td style={{ padding: '1rem 1.5rem', fontWeight: 800, fontSize: '1rem', color: '#0f172a' }}>{c.total}</td>
                        <td style={{ padding: '1rem 1.5rem', fontSize: '0.82rem', fontWeight: 600, color: '#64748b' }}>{pct}%</td>
                        <td style={{ padding: '1rem 1.5rem', minWidth: '150px' }}>
                          <div style={{ height: '6px', background: '#f1f5f9', borderRadius: '3px', overflow: 'hidden' }}>
                            <div style={{ height: '100%', width: `${barPct}%`, background: palette.bar, borderRadius: '3px' }} />
                          </div>
                        </td>
                      </tr>
                    )
                  })}
              </tbody>
            </table>
            {categories.length === 0 && <div style={{ textAlign: 'center', padding: '3rem', color: '#94a3b8', fontSize: '0.9rem' }}>No categories found.</div>}
          </div>
        </div>
      </div>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700;800;900&display=swap');`}</style>
    </div>
  )
}
