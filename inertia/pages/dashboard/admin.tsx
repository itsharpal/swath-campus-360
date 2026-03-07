import React, { useState, useMemo } from 'react'
import { Link } from '@adonisjs/inertia/react'
import CampusHeatmap from '~/components/dashboard/campus_heatmap'
import type { ComplaintHeatmap } from '~/components/dashboard/campus_heatmap'

interface Stats {
  totalComplaints: number
  openComplaints: number
  resolvedComplaints: number
  activeJobs: number
  buildings: number
}

interface Complaint {
  id: number
  complaintCode: string
  status: string
  zone?: { name: string }
  category?: { name: string }
}

interface Props {
  stats: Stats
  recentComplaints: Complaint[]
  complaintHeatmap?: ComplaintHeatmap
}

const statusColor: Record<string, string> = {
  open: 'bg-amber-100 text-amber-700 border border-amber-200',
  resolved: 'bg-emerald-100 text-emerald-700 border border-emerald-200',
  in_progress: 'bg-blue-100 text-blue-700 border border-blue-200',
  closed: 'bg-gray-100 text-gray-600 border border-gray-200',
}

export default function AdminDashboard({ stats, recentComplaints, complaintHeatmap }: Props) {
  const [range, setRange] = useState<'all' | 'today' | 'weekly' | 'monthly' | 'yearly'>('all')
  const [fromDate, setFromDate] = useState<string>('')
  const [toDate, setToDate] = useState<string>('')

  // For now we only have recentComplaints without timestamps available on the client.
  // Exports will operate on the currently displayed rows. For full dataset/date
  // filtering and server-generated PDF/CSV, implement server endpoints like
  // GET /admin/complaints?from=YYYY-MM-DD&to=YYYY-MM-DD and
  // GET /admin/complaints/export?format=csv|pdf&from=...&to=...

  const filtered = useMemo(() => {
    // No createdAt on complaint in the provided dataset; client-side filtering
    // by date/range requires timestamps. For now we return recentComplaints.
    // If server date filtering is available, the UI will call the server endpoint.
    return recentComplaints
  }, [recentComplaints, range, fromDate, toDate])

  function exportCsv(rows: Complaint[]) {
    const headers = ['Code', 'Zone', 'Category', 'Status']
    const csv = [headers.join(',')].concat(rows.map(r => [
      `"${r.complaintCode}"`,
      `"${r.zone?.name ?? ''}"`,
      `"${r.category?.name ?? ''}"`,
      `"${r.status.replace('_', ' ')}"`,
    ].join(','))).join('\n')

    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `complaints_export_${new Date().toISOString().slice(0,10)}.csv`
    document.body.appendChild(a)
    a.click()
    a.remove()
    URL.revokeObjectURL(url)
  }

  function exportPdf(rows: Complaint[]) {
    // Simple printable HTML window as PDF fallback. Better: implement server PDF.
    const html = `<!doctype html><html><head><meta charset="utf-8"><title>Complaints Export</title><style>table{width:100%;border-collapse:collapse}th,td{border:1px solid #ddd;padding:8px;text-align:left}</style></head><body><h2>Complaints Export</h2><table><thead><tr><th>Code</th><th>Zone</th><th>Category</th><th>Status</th></tr></thead><tbody>${rows.map(r => `<tr><td>${r.complaintCode}</td><td>${r.zone?.name ?? ''}</td><td>${r.category?.name ?? ''}</td><td>${r.status.replace('_',' ')}</td></tr>`).join('')}</tbody></table></body></html>`
    const w = window.open('', '_blank')
    if (!w) return
    w.document.write(html)
    w.document.close()
    // Give the new window a moment to render then open print dialog
    setTimeout(() => w.print(), 500)
  }
  async function tryServerExport(format: 'csv' | 'pdf', from?: string, to?: string) {
    try {
      const qs = new URLSearchParams()
      qs.set('format', format)
      if (from) qs.set('from', from)
      if (to) qs.set('to', to)
      const url = `/admin/complaints/export?${qs.toString()}`
      const resp = await fetch(url, { credentials: 'same-origin' })
      if (!resp.ok) throw new Error(`Server returned ${resp.status}`)
      const blob = await resp.blob()
      const disposition = resp.headers.get('content-disposition') || ''
      let filename = `complaints_export_${new Date().toISOString().slice(0,10)}.${format}`
      const m = disposition.match(/filename="?([^";]+)"?/)
      if (m) filename = m[1]
      const link = document.createElement('a')
      const href = URL.createObjectURL(blob)
      link.href = href
      link.download = filename
      document.body.appendChild(link)
      link.click()
      link.remove()
      URL.revokeObjectURL(href)
      return true
    } catch (err) {
      return false
    }
  }
  const statCards = [
    {
      label: 'Total Complaints',
      value: stats.totalComplaints,
      icon: (
        <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.7" viewBox="0 0 24 24">
          <path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      ),
      accent: '#16a34a',
      bg: 'rgba(22,163,74,0.08)',
    },
    {
      label: 'Open',
      value: stats.openComplaints,
      icon: (
        <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.7" viewBox="0 0 24 24">
          <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
        </svg>
      ),
      accent: '#f59e0b',
      bg: 'rgba(245,158,11,0.08)',
    },
    {
      label: 'Resolved',
      value: stats.resolvedComplaints,
      icon: (
        <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.7" viewBox="0 0 24 24">
          <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      ),
      accent: '#10b981',
      bg: 'rgba(16,185,129,0.08)',
    },
    {
      label: 'Active Jobs',
      value: stats.activeJobs,
      icon: (
        <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.7" viewBox="0 0 24 24">
          <path d="M13 10V3L4 14h7v7l9-11h-7z" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      ),
      accent: '#3b82f6',
      bg: 'rgba(59,130,246,0.08)',
    },
    {
      label: 'Buildings',
      value: stats.buildings,
      icon: (
        <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.7" viewBox="0 0 24 24">
          <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" strokeLinecap="round" strokeLinejoin="round"/>
          <polyline points="9 22 9 12 15 12 15 22"/>
        </svg>
      ),
      accent: '#8b5cf6',
      bg: 'rgba(139,92,246,0.08)',
    },
  ]

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
      {/* Background decoration */}
      <div style={{
        position: 'fixed', top: '-80px', left: '-80px', width: '300px', height: '300px',
        borderRadius: '50%', border: '2px solid rgba(22,163,74,0.08)', pointerEvents: 'none',
      }} />
      <div style={{
        position: 'fixed', bottom: '-60px', right: '-60px', width: '250px', height: '250px',
        borderRadius: '50%', border: '2px solid rgba(22,163,74,0.06)', pointerEvents: 'none',
      }} />

      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        {/* Header */}
        <div style={{ marginBottom: '2rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '6px' }}>
            <div style={{
              width: '28px', height: '2px', background: '#16a34a',
            }} />
            <span style={{
              fontSize: '11px', fontWeight: 700, letterSpacing: '0.15em',
              color: '#16a34a', textTransform: 'uppercase',
            }}>
              Swachh Campus
            </span>
            <div style={{ width: '28px', height: '2px', background: '#16a34a' }} />
          </div>
          <h1 style={{
            fontSize: '2.4rem', fontWeight: 800, lineHeight: 1.1,
            color: '#0f172a', margin: 0,
          }}>
            Admin{' '}
            <span style={{ color: '#16a34a' }}>Dashboard</span>
          </h1>
          <p style={{ color: '#64748b', fontSize: '0.95rem', marginTop: '6px' }}>
            Monitor all complaints, jobs, and campus activity.
          </p>
        </div>

        {/* Stat Cards */}
        <div style={{
          display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)',
          gap: '1rem', marginBottom: '2rem',
        }}>
          {statCards.map((card) => (
            <div
              key={card.label}
              style={{
                background: '#ffffff',
                borderRadius: '14px',
                padding: '1.25rem',
                boxShadow: '0 1px 8px rgba(0,0,0,0.06)',
                border: '1px solid rgba(22,163,74,0.1)',
                display: 'flex',
                flexDirection: 'column',
                gap: '10px',
                transition: 'transform 0.2s, box-shadow 0.2s',
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
              <div style={{
                width: '40px', height: '40px', borderRadius: '10px',
                background: card.bg, display: 'flex', alignItems: 'center',
                justifyContent: 'center', color: card.accent,
              }}>
                {card.icon}
              </div>
              <div>
                <p style={{ fontSize: '0.78rem', color: '#94a3b8', fontWeight: 500, margin: 0 }}>
                  {card.label}
                </p>
                <p style={{ fontSize: '1.7rem', fontWeight: 800, color: '#0f172a', margin: '2px 0 0 0' }}>
                  {card.value}
                </p>
              </div>
            </div>
          ))}
        </div>

        <CampusHeatmap complaintHeatmap={complaintHeatmap} />

        {/* Recent Complaints Table */}
        <div style={{
          background: '#ffffff',
          borderRadius: '16px',
          boxShadow: '0 1px 8px rgba(0,0,0,0.06)',
          border: '1px solid rgba(22,163,74,0.1)',
          overflow: 'hidden',
        }}>
          <div style={{
            padding: '1.25rem 1.5rem',
            borderBottom: '1px solid #f1f5f9',
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          }}>
            <div>
              <h2 style={{ fontSize: '1.05rem', fontWeight: 700, color: '#0f172a', margin: 0 }}>
                Recent Complaints
              </h2>
              <p style={{ fontSize: '0.8rem', color: '#94a3b8', margin: '2px 0 0 0' }}>
                Latest activity across zones
              </p>
            </div>
            <div style={{
              width: '8px', height: '8px', borderRadius: '50%',
              background: '#16a34a',
              boxShadow: '0 0 0 3px rgba(22,163,74,0.2)',
            }} />
          </div>

            <div style={{ padding: '0.9rem 1.5rem', display: 'flex', gap: 12, alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap' }}>
              {/* Left: range buttons */}
              <div style={{ display: 'flex', gap: 8, alignItems: 'center', flexWrap: 'wrap' }}>
                <button type="button" onClick={() => { setRange('today') }} style={{ padding: '7px 12px', borderRadius: 10, background: range === 'today' ? '#16a34a' : '#fff', color: range === 'today' ? '#fff' : '#374151', border: '1px solid #e6eef3', fontWeight: 600 }}>Today</button>
                <button type="button" onClick={() => { setRange('weekly') }} style={{ padding: '7px 12px', borderRadius: 10, background: range === 'weekly' ? '#16a34a' : '#fff', color: range === 'weekly' ? '#fff' : '#374151', border: '1px solid #e6eef3', fontWeight: 600 }}>Weekly</button>
                <button type="button" onClick={() => { setRange('monthly') }} style={{ padding: '7px 12px', borderRadius: 10, background: range === 'monthly' ? '#16a34a' : '#fff', color: range === 'monthly' ? '#fff' : '#374151', border: '1px solid #e6eef3', fontWeight: 600 }}>Monthly</button>
                <button type="button" onClick={() => { setRange('yearly') }} style={{ padding: '7px 12px', borderRadius: 10, background: range === 'yearly' ? '#16a34a' : '#fff', color: range === 'yearly' ? '#fff' : '#374151', border: '1px solid #e6eef3', fontWeight: 600 }}>Yearly</button>
              </div>

              {/* Center: compact date filter */}
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginLeft: 6, marginRight: 6 }}>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
                  <span style={{ fontSize: '0.85rem', color: '#94a3b8', marginBottom: 6, fontWeight: 600 }}>Or filter by date</span>
                  <div style={{ display: 'flex', gap: 8 }}>
                    <input aria-label="from date" type="date" value={fromDate} onChange={(e) => setFromDate(e.target.value)} style={{ padding: '6px 8px', borderRadius: 8, border: '1px solid #e2e8f0', fontSize: '0.9rem' }} />
                    <input aria-label="to date" type="date" value={toDate} onChange={(e) => setToDate(e.target.value)} style={{ padding: '6px 8px', borderRadius: 8, border: '1px solid #e2e8f0', fontSize: '0.9rem' }} />
                  </div>
                </div>
              </div>

              {/* Right: export actions */}
              <div style={{ display: 'flex', gap: 8, marginLeft: 'auto' }}>
                <button type="button" onClick={async () => {
                  const ok = await tryServerExport('csv', fromDate || undefined, toDate || undefined)
                  if (!ok) exportCsv(filtered)
                }} style={{ padding: '8px 14px', borderRadius: 10, background: '#fff', color: '#16a34a', border: '1px solid #bbf7d0', fontWeight: 700 }}>Export CSV</button>
                <button type="button" onClick={async () => {
                  const ok = await tryServerExport('pdf', fromDate || undefined, toDate || undefined)
                  if (!ok) exportPdf(filtered)
                }} style={{ padding: '8px 14px', borderRadius: 10, background: '#fff', color: '#16a34a', border: '1px solid #bbf7d0', fontWeight: 700 }}>Export PDF</button>
              </div>
            </div>

          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ background: '#f8fafc' }}>
                  {['Code', 'Zone', 'Category', 'Status'].map((h) => (
                    <th key={h} style={{
                      padding: '0.85rem 1.5rem', textAlign: 'left',
                      fontSize: '0.75rem', fontWeight: 700, color: '#94a3b8',
                      letterSpacing: '0.06em', textTransform: 'uppercase',
                    }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filtered.map((c, i) => (
                  <tr
                    key={c.id}
                    style={{
                      borderTop: '1px solid #f1f5f9',
                      transition: 'background 0.15s',
                      background: i % 2 === 0 ? '#fff' : '#fafcff',
                    }}
                    onMouseEnter={e => (e.currentTarget as HTMLElement).style.background = '#f0fdf4'}
                    onMouseLeave={e => (e.currentTarget as HTMLElement).style.background = i % 2 === 0 ? '#fff' : '#fafcff'}
                  >
                    <td style={{ padding: '1rem 1.5rem' }}>
                      <span style={{
                        fontFamily: 'monospace', fontSize: '0.82rem',
                        background: '#f0fdf4', color: '#16a34a',
                        padding: '3px 8px', borderRadius: '6px',
                        fontWeight: 700, border: '1px solid #bbf7d0',
                      }}>
                        {c.complaintCode}
                      </span>
                    </td>
                    <td style={{ padding: '1rem 1.5rem', color: '#374151', fontSize: '0.88rem' }}>
                      {c.zone?.name ?? '—'}
                    </td>
                    <td style={{ padding: '1rem 1.5rem', color: '#374151', fontSize: '0.88rem' }}>
                      {c.category?.name ?? '—'}
                    </td>
                    <td style={{ padding: '1rem 1.5rem' }}>
                      <span style={{
                        fontSize: '0.75rem', fontWeight: 600, padding: '4px 10px',
                        borderRadius: '20px', textTransform: 'capitalize',
                        ...(statusColor[c.status]
                          ? {}
                          : { background: '#f1f5f9', color: '#64748b', border: '1px solid #e2e8f0' }),
                      }}
                        className={statusColor[c.status] ?? ''}
                      >
                        {c.status.replace('_', ' ')}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {recentComplaints.length === 0 && (
              <div style={{ textAlign: 'center', padding: '3rem', color: '#94a3b8', fontSize: '0.9rem' }}>
                No complaints found.
              </div>
            )}
          </div>
        </div>
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700;800&display=swap');
        .bg-amber-100 { background: #fef3c7 !important; }
        .text-amber-700 { color: #b45309 !important; }
        .border-amber-200 { border-color: #fde68a !important; }
        .bg-emerald-100 { background: #d1fae5 !important; }
        .text-emerald-700 { color: #047857 !important; }
        .border-emerald-200 { border-color: #a7f3d0 !important; }
        .bg-blue-100 { background: #dbeafe !important; }
        .text-blue-700 { color: #1d4ed8 !important; }
        .border-blue-200 { border-color: #bfdbfe !important; }
        .bg-gray-100 { background: #f3f4f6 !important; }
        .text-gray-600 { color: #4b5563 !important; }
        .border-gray-200 { border-color: #e5e7eb !important; }
      `}</style>
    </div>
  )
}
