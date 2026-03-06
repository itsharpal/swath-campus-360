import { router } from '@inertiajs/react'
import React, { useState, useEffect, useRef } from 'react'

// Install: npm install sweetalert2

export default function Buildings({ buildings }: any) {
  const [search, setSearch]     = useState('')
  const [hoveredId, setHoveredId] = useState<number | null>(null)
  const particlesRef             = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const injectLink = (href: string) => {
      if (document.querySelector(`link[href="${href}"]`)) return
      const el = document.createElement('link'); el.rel = 'stylesheet'; el.href = href
      document.head.appendChild(el)
    }
    injectLink('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@500;600;700&family=Outfit:wght@300;400;500;600&family=JetBrains+Mono:wght@400;500&display=swap')
    injectLink('https://cdn.jsdelivr.net/npm/sweetalert2@11/dist/sweetalert2.min.css')
    if (!(window as any).Swal) {
      const s = document.createElement('script')
      s.src = 'https://cdn.jsdelivr.net/npm/sweetalert2@11'
      document.head.appendChild(s)
    }

    const container = particlesRef.current
    if (!container) return
    for (let i = 0; i < 18; i++) {
      const p = document.createElement('div')
      p.className = 'idx-particle'
      const size = 3 + Math.random() * 6
      p.style.cssText = `
        left:${Math.random() * 100}%; top:${100 + Math.random() * 20}%;
        width:${size}px; height:${size}px;
        animation-delay:${Math.random() * 9}s;
        animation-duration:${8 + Math.random() * 10}s;
        opacity:${0.12 + Math.random() * 0.25};
        border-radius:${Math.random() > 0.5 ? '50%' : '2px 8px 2px 8px'};
      `
      container.appendChild(p)
    }
  }, [])

  const swalBase = {
    background: '#ffffff', color: '#1a3a2a',
    customClass: {
      popup:         'cb-swal-popup',
      title:         'cb-swal-title',
      confirmButton: 'cb-swal-btn',
      cancelButton:  'cb-swal-btn-cancel',
    },
  }

  function handleDeactivate(building: any) {
    const Swal = (window as any).Swal
    if (!Swal) {
      if (confirm(`Deactivate ${building.name}?`)) router.delete(`/buildings/${building.id}`)
      return
    }
    Swal.fire({ ...swalBase,
      icon: 'warning', iconColor: '#f59e0b',
      title: 'Deactivate Building?',
      html: `<span style="color:#4a7c59">
        Are you sure you want to deactivate<br>
        <b style="color:#15803d">${building.name}</b> (${building.code})?<br>
        <span style="font-size:.82rem;color:#86a898">This building will be hidden from the campus registry.</span>
      </span>`,
      showCancelButton: true,
      confirmButtonText: '⚠️ Yes, Deactivate',
      cancelButtonText:  'Cancel',
      confirmButtonColor: '#dc2626',
      cancelButtonColor:  '#6b7280',
      showClass: { popup: 'cb-swal-in' },
      hideClass:  { popup: 'cb-swal-out' },
    }).then((result: any) => {
      if (!result.isConfirmed) return
      Swal.fire({ ...swalBase,
        title: 'Deactivating…',
        html: '<span style="color:#4a7c59;font-size:.85rem">Removing from campus registry…</span>',
        allowOutsideClick: false,
        didOpen: () => Swal.showLoading(),
      })
      router.delete(`/buildings/${building.id}`, {
        onSuccess: () => {
          Swal.fire({ ...swalBase,
            icon: 'success', iconColor: '#16a34a',
            title: 'Building Deactivated',
            html: `<span style="color:#4a7c59"><b style="color:#15803d">${building.name}</b> has been removed.</span>`,
            confirmButtonColor: '#16a34a',
            timer: 3000, timerProgressBar: true,
            showClass: { popup: 'cb-swal-in' },
          })
        },
      })
    })
  }

  const allBuildings: any[] = buildings?.data ?? []
  const filtered = allBuildings.filter((b: any) =>
    b.name?.toLowerCase().includes(search.toLowerCase()) ||
    b.code?.toLowerCase().includes(search.toLowerCase())
  )
  const totalBuildings = allBuildings.length
  const activePct = totalBuildings > 0 ? 100 : 0

  return (
    <>
      <style>{`
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        :root {
          --green:       #16a34a;
          --green-lt:    #22c55e;
          --green-deep:  #15803d;
          --green-pale:  #dcfce7;
          --green-glow:  rgba(22,163,74,.15);
          --teal:        #0d9488;
          --teal-lt:     #14b8a6;
          --sky:         #0ea5e9;
          --sky-pale:    #e0f2fe;
          --bg:          #f0fdf4;
          --surface:     #ffffff;
          --surface2:    #f8fffe;
          --border:      rgba(22,163,74,.14);
          --text:        #14532d;
          --text-body:   #1a3a2a;
          --dim:         #4a7c59;
          --muted:       #86a898;
          --red:         #dc2626;
          --amber:       #f59e0b;
        }

        .idx-root {
          font-family: 'Outfit', sans-serif;
          min-height: 100vh;
          background: var(--bg);
          position: relative; overflow-x: hidden;
        }

        /* bg layers */
        .idx-mesh {
          position: fixed; inset: 0; z-index: 0; pointer-events: none;
          background:
            radial-gradient(ellipse 55% 50% at 5%  5%,  rgba(22,163,74,.09) 0%, transparent 60%),
            radial-gradient(ellipse 45% 55% at 95% 90%,  rgba(14,165,233,.07) 0%, transparent 60%),
            radial-gradient(ellipse 40% 40% at 50% 50%,  rgba(13,148,136,.05) 0%, transparent 65%);
          animation: meshDrift 14s ease-in-out infinite alternate;
        }
        @keyframes meshDrift { from { transform: scale(1); } to { transform: scale(1.04); } }
        .idx-grid {
          position: fixed; inset: 0; z-index: 0; pointer-events: none;
          background-image: radial-gradient(circle, rgba(22,163,74,.15) 1px, transparent 1px);
          background-size: 40px 40px;
        }
        .idx-scan {
          position: fixed; left: 0; right: 0; height: 120px; z-index: 0; pointer-events: none;
          background: linear-gradient(180deg, transparent, rgba(22,163,74,.04), transparent);
          animation: scanDown 12s linear infinite;
        }
        @keyframes scanDown { from { top: -120px; } to { top: 100vh; } }
        .idx-particles { position: fixed; inset: 0; z-index: 0; pointer-events: none; overflow: hidden; }
        .idx-particle { position: absolute; background: var(--green-lt); animation: particleRise linear infinite; }
        @keyframes particleRise {
          0%   { transform: translateY(0) rotate(0deg) scale(1); opacity: 0; }
          10%  { opacity: 1; } 90% { opacity: 1; }
          100% { transform: translateY(-100vh) rotate(180deg) scale(.2); opacity: 0; }
        }
        .idx-corner {
          position: fixed; width: 80px; height: 80px; z-index: 0; pointer-events: none;
          animation: cornerPulse 4s ease-in-out infinite alternate;
        }
        @keyframes cornerPulse { from { opacity: .3; } to { opacity: .75; } }
        .idx-corner--tl { top: 20px; left: 20px; border-top: 2px solid rgba(22,163,74,.3); border-left: 2px solid rgba(22,163,74,.3); border-radius: 4px 0 0 0; }
        .idx-corner--tr { top: 20px; right: 20px; border-top: 2px solid rgba(14,165,233,.25); border-right: 2px solid rgba(14,165,233,.25); border-radius: 0 4px 0 0; }
        .idx-corner--bl { bottom: 20px; left: 20px; border-bottom: 2px solid rgba(13,148,136,.25); border-left: 2px solid rgba(13,148,136,.25); border-radius: 0 0 0 4px; }
        .idx-corner--br { bottom: 20px; right: 20px; border-bottom: 2px solid rgba(22,163,74,.3); border-right: 2px solid rgba(22,163,74,.3); border-radius: 0 0 4px 0; }

        /* ── main layout ── */
        .idx-wrap { position: relative; z-index: 1; max-width: 1200px; margin: 0 auto; padding: 2.5rem 2rem 4rem; }

        /* ── top bar ── */
        .idx-topbar {
          display: flex; align-items: flex-start; justify-content: space-between;
          flex-wrap: wrap; gap: 1.5rem;
          margin-bottom: 2.5rem;
          animation: fadeUp .6s cubic-bezier(.16,1,.3,1) both;
        }
        @keyframes fadeUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }

        .idx-title-group {}
        .idx-eyebrow {
          display: inline-flex; align-items: center; gap: 7px;
          font-family: 'JetBrains Mono', monospace;
          font-size: .62rem; letter-spacing: .13em; text-transform: uppercase;
          color: var(--green); margin-bottom: .6rem;
        }
        .idx-ey-line { width: 18px; height: 1.5px; background: var(--green); opacity: .5; border-radius: 2px; }
        .idx-title {
          font-family: 'Playfair Display', serif;
          font-size: 2.4rem; font-weight: 600; color: var(--text);
          letter-spacing: -.03em; line-height: 1.1;
        }
        .idx-title-accent {
          background: linear-gradient(135deg, var(--green-deep) 0%, var(--green) 40%, var(--teal) 100%);
          background-size: 200% auto;
          -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;
          animation: shimmer 4s linear infinite;
        }
        @keyframes shimmer { from { background-position: 0% center; } to { background-position: 200% center; } }
        .idx-sub { font-size: .85rem; color: var(--muted); font-weight: 300; margin-top: .35rem; }

        .idx-add-btn {
          display: flex; align-items: center; gap: 8px;
          font-family: 'Outfit', sans-serif; font-size: .9rem; font-weight: 600; color: #fff;
          background: linear-gradient(135deg, var(--green-deep), var(--green), var(--teal));
          background-size: 200% auto; animation: btnGradient 5s linear infinite;
          border: none; border-radius: 14px; padding: .85rem 1.7rem;
          cursor: pointer; overflow: hidden; position: relative;
          box-shadow: 0 4px 18px rgba(22,163,74,.4), 0 1px 4px rgba(0,0,0,.1), inset 0 1px 0 rgba(255,255,255,.18);
          transition: transform .22s cubic-bezier(.22,1,.36,1), box-shadow .22s;
        }
        @keyframes btnGradient { 0% { background-position: 0% center; } 50% { background-position: 100% center; } 100% { background-position: 0% center; } }
        .idx-add-btn::after { content: ''; position: absolute; top: 0; left: -110%; width: 100%; height: 100%; background: linear-gradient(90deg, transparent, rgba(255,255,255,.2), transparent); transition: left .5s; }
        .idx-add-btn:hover::after { left: 110%; }
        .idx-add-btn:hover { transform: translateY(-2px); box-shadow: 0 8px 28px rgba(22,163,74,.45), 0 2px 6px rgba(0,0,0,.1); }
        .idx-add-btn:active { transform: translateY(0); }

        /* ── stats row ── */
        .idx-stats {
          display: grid; grid-template-columns: repeat(3, 1fr); gap: 1rem;
          margin-bottom: 2rem;
          animation: fadeUp .6s .1s cubic-bezier(.16,1,.3,1) both;
        }
        .idx-stat {
          background: var(--surface);
          border: 1.5px solid var(--border);
          border-radius: 16px; padding: 1.1rem 1.3rem;
          display: flex; align-items: center; gap: 1rem;
          box-shadow: 0 2px 12px rgba(22,163,74,.07), inset 0 1px 0 rgba(255,255,255,.8);
          transition: transform .2s, box-shadow .2s;
        }
        .idx-stat:hover { transform: translateY(-2px); box-shadow: 0 6px 20px rgba(22,163,74,.12); }
        .idx-stat-icon {
          width: 42px; height: 42px; border-radius: 11px;
          display: flex; align-items: center; justify-content: center;
          flex-shrink: 0;
        }
        .idx-stat-icon.green  { background: var(--green-pale); color: var(--green); }
        .idx-stat-icon.teal   { background: #ccfbf1;           color: var(--teal); }
        .idx-stat-icon.sky    { background: var(--sky-pale);    color: var(--sky); }
        .idx-stat-val { font-family: 'Playfair Display', serif; font-size: 1.6rem; font-weight: 600; color: var(--text); line-height: 1; }
        .idx-stat-label { font-size: .75rem; color: var(--muted); margin-top: 2px; }

        /* ── search ── */
        .idx-search-wrap {
          position: relative; margin-bottom: 2rem;
          animation: fadeUp .6s .18s cubic-bezier(.16,1,.3,1) both;
        }
        .idx-search-icon {
          position: absolute; left: 14px; top: 50%; transform: translateY(-50%);
          color: var(--muted); pointer-events: none; display: flex; align-items: center;
        }
        .idx-search {
          width: 100%; font-family: 'Outfit', sans-serif;
          font-size: .9rem; color: var(--text-body);
          background: var(--surface); border: 1.5px solid var(--border);
          border-radius: 13px; padding: .8rem 1rem .8rem 2.8rem;
          outline: none; caret-color: var(--green);
          box-shadow: 0 2px 8px rgba(22,163,74,.06);
          transition: border-color .25s, box-shadow .25s;
        }
        .idx-search::placeholder { color: var(--muted); }
        .idx-search:focus {
          border-color: rgba(22,163,74,.5);
          box-shadow: 0 0 0 3px rgba(22,163,74,.1), 0 2px 8px rgba(22,163,74,.08);
        }

        /* ── grid ── */
        .idx-grid-cards {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(310px, 1fr));
          gap: 1.4rem;
        }

        .idx-card {
          background: var(--surface);
          border: 1.5px solid var(--border);
          border-radius: 20px; overflow: hidden;
          box-shadow: 0 2px 12px rgba(22,163,74,.07), inset 0 1px 0 rgba(255,255,255,.8);
          transition: transform .25s cubic-bezier(.22,1,.36,1), box-shadow .25s, border-color .25s;
          animation: cardIn .6s cubic-bezier(.16,1,.3,1) both;
          cursor: default;
        }
        .idx-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 12px 36px rgba(22,163,74,.15), 0 4px 12px rgba(0,0,0,.06);
          border-color: rgba(22,163,74,.3);
        }
        @keyframes cardIn { from { opacity: 0; transform: translateY(24px) scale(.97); } to { opacity: 1; transform: translateY(0) scale(1); } }

        /* stagger cards */
        .idx-card:nth-child(1) { animation-delay: .1s; }
        .idx-card:nth-child(2) { animation-delay: .17s; }
        .idx-card:nth-child(3) { animation-delay: .24s; }
        .idx-card:nth-child(4) { animation-delay: .31s; }
        .idx-card:nth-child(5) { animation-delay: .38s; }
        .idx-card:nth-child(6) { animation-delay: .45s; }

        /* card accent bar */
        .idx-card-bar {
          height: 3px;
          background: linear-gradient(90deg, var(--green-deep), var(--green), var(--teal-lt));
          background-size: 200% 100%;
          animation: barSlide 3.5s linear infinite;
        }
        @keyframes barSlide { from { background-position: -200% 0; } to { background-position: 200% 0; } }

        .idx-card-body { padding: 1.4rem; }

        /* card header */
        .idx-card-head { display: flex; align-items: flex-start; justify-content: space-between; gap: .75rem; margin-bottom: .75rem; }
        .idx-card-icon {
          width: 42px; height: 42px; border-radius: 11px;
          background: var(--green-pale);
          display: flex; align-items: center; justify-content: center;
          color: var(--green); flex-shrink: 0;
          transition: background .2s, color .2s;
        }
        .idx-card:hover .idx-card-icon { background: var(--green); color: #fff; }
        .idx-card-code {
          font-family: 'JetBrains Mono', monospace;
          font-size: .65rem; font-weight: 500; letter-spacing: .08em;
          color: var(--green-deep); background: var(--green-pale);
          border: 1px solid rgba(22,163,74,.2);
          border-radius: 7px; padding: 3px 9px;
        }
        .idx-card-name {
          font-family: 'Playfair Display', serif;
          font-size: 1.15rem; font-weight: 600; color: var(--text);
          letter-spacing: -.02em; line-height: 1.25; margin-bottom: .35rem;
        }
        .idx-card-desc {
          font-size: .82rem; color: var(--muted); line-height: 1.55;
          display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden;
          min-height: 2.5em;
        }
        .idx-card-divider { height: 1px; background: linear-gradient(90deg, transparent, rgba(22,163,74,.15), transparent); margin: 1rem 0; }

        /* action buttons */
        .idx-actions { display: flex; gap: .6rem; flex-wrap: wrap; }
        .idx-btn {
          display: flex; align-items: center; gap: 5px;
          font-family: 'Outfit', sans-serif; font-size: .78rem; font-weight: 500;
          border: 1.5px solid; border-radius: 9px; padding: .5rem .9rem;
          cursor: pointer; transition: all .2s; white-space: nowrap;
        }
        .idx-btn-view {
          color: var(--teal); border-color: rgba(13,148,136,.3); background: #f0fdfa;
        }
        .idx-btn-view:hover { background: #ccfbf1; border-color: var(--teal); transform: translateY(-1px); }
        .idx-btn-edit {
          color: var(--green-deep); border-color: rgba(22,163,74,.3); background: var(--green-pale);
        }
        .idx-btn-edit:hover { background: #bbf7d0; border-color: var(--green); transform: translateY(-1px); }
        .idx-btn-deact {
          color: var(--red); border-color: rgba(220,38,38,.25); background: #fef2f2;
        }
        .idx-btn-deact:hover { background: #fee2e2; border-color: var(--red); transform: translateY(-1px); }

        /* empty state */
        .idx-empty {
          grid-column: 1/-1;
          display: flex; flex-direction: column; align-items: center; justify-content: center;
          padding: 5rem 2rem; text-align: center;
          background: var(--surface); border: 1.5px dashed rgba(22,163,74,.2);
          border-radius: 20px; animation: fadeUp .5s both;
        }
        .idx-empty-icon { font-size: 3rem; margin-bottom: 1rem; }
        .idx-empty-title { font-family: 'Playfair Display', serif; font-size: 1.3rem; color: var(--text); margin-bottom: .4rem; }
        .idx-empty-sub { font-size: .85rem; color: var(--muted); }

        /* pagination */
        .idx-pagination {
          display: flex; align-items: center; justify-content: center; gap: .6rem;
          margin-top: 2.5rem; animation: fadeUp .6s .5s both;
        }
        .idx-page-btn {
          font-family: 'JetBrains Mono', monospace; font-size: .75rem;
          color: var(--dim); background: var(--surface); border: 1.5px solid var(--border);
          border-radius: 9px; padding: .5rem 1rem; cursor: pointer;
          transition: all .2s;
        }
        .idx-page-btn:hover { border-color: var(--green); color: var(--green); background: var(--green-pale); }
        .idx-page-btn.active { background: var(--green); color: #fff; border-color: var(--green); }
        .idx-page-btn:disabled { opacity: .4; cursor: not-allowed; }

        /* SweetAlert2 */
        .cb-swal-popup { border-radius: 20px !important; border: 1.5px solid rgba(22,163,74,.2) !important; box-shadow: 0 24px 80px rgba(22,163,74,.15), 0 4px 16px rgba(0,0,0,.08) !important; font-family: 'Outfit', sans-serif !important; }
        .cb-swal-title { font-family: 'Playfair Display', serif !important; color: #14532d !important; letter-spacing: -.02em !important; }
        .cb-swal-btn { border-radius: 10px !important; font-family: 'Outfit', sans-serif !important; font-weight: 600 !important; letter-spacing: .02em !important; padding: 10px 22px !important; transition: transform .18s !important; }
        .cb-swal-btn:hover { transform: translateY(-1px) !important; }
        .cb-swal-btn-cancel { border-radius: 10px !important; font-family: 'Outfit', sans-serif !important; font-weight: 500 !important; }
        .swal2-timer-progress-bar { background: var(--green) !important; }
        .swal2-loader { border-color: var(--green) transparent var(--green) transparent !important; }
        @keyframes swalIn  { from { opacity: 0; transform: scale(.88) translateY(20px); } to { opacity: 1; transform: scale(1) translateY(0); } }
        @keyframes swalOut { from { opacity: 1; } to { opacity: 0; transform: scale(.9) translateY(-16px); } }
        .cb-swal-in  { animation: swalIn  .4s cubic-bezier(.16,1,.3,1) both !important; }
        .cb-swal-out { animation: swalOut .28s ease both !important; }

        @media (max-width: 640px) {
          .idx-stats { grid-template-columns: 1fr; }
          .idx-topbar { flex-direction: column; }
          .idx-title { font-size: 1.8rem; }
        }
      `}</style>

      <div className="idx-root">
        <div className="idx-mesh" /><div className="idx-grid" /><div className="idx-scan" />
        <div className="idx-particles" ref={particlesRef} />
        <div className="idx-corner idx-corner--tl" /><div className="idx-corner idx-corner--tr" />
        <div className="idx-corner idx-corner--bl" /><div className="idx-corner idx-corner--br" />

        <div className="idx-wrap">

          {/* Top bar */}
          <div className="idx-topbar">
            <div className="idx-title-group">
              <div className="idx-eyebrow">
                <span className="idx-ey-line" />🌿 Swachh Campus<span className="idx-ey-line" />
              </div>
              <h1 className="idx-title">
                Campus <span className="idx-title-accent">Buildings</span>
              </h1>
              <p className="idx-sub">Manage all registered buildings in the campus registry.</p>
            </div>
            <button className="idx-add-btn" onClick={() => router.visit('/buildings/create')}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>
              </svg>
              Add Building
            </button>
          </div>

          {/* Stats */}
          <div className="idx-stats">
            <div className="idx-stat">
              <div className="idx-stat-icon green">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                  <path d="M3 21h18M5 21V7l7-4 7 4v14M9 21v-4h6v4"/>
                </svg>
              </div>
              <div>
                <div className="idx-stat-val">{totalBuildings}</div>
                <div className="idx-stat-label">Total Buildings</div>
              </div>
            </div>
            <div className="idx-stat">
              <div className="idx-stat-icon teal">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                </svg>
              </div>
              <div>
                <div className="idx-stat-val">{totalBuildings}</div>
                <div className="idx-stat-label">Active Buildings</div>
              </div>
            </div>
            <div className="idx-stat">
              <div className="idx-stat-icon sky">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                  <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
                </svg>
              </div>
              <div>
                <div className="idx-stat-val">{filtered.length}</div>
                <div className="idx-stat-label">Showing Results</div>
              </div>
            </div>
          </div>

          {/* Search */}
          <div className="idx-search-wrap">
            <span className="idx-search-icon">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
              </svg>
            </span>
            <input
              className="idx-search"
              placeholder="Search by name or code…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          {/* Cards grid */}
          <div className="idx-grid-cards">
            {filtered.length === 0 ? (
              <div className="idx-empty">
                <div className="idx-empty-icon">🏗️</div>
                <div className="idx-empty-title">No buildings found</div>
                <div className="idx-empty-sub">
                  {search ? `No results for "${search}" — try a different search.` : 'Add your first building to get started.'}
                </div>
              </div>
            ) : filtered.map((building: any) => (
              <div
                className="idx-card"
                key={building.id}
                onMouseEnter={() => setHoveredId(building.id)}
                onMouseLeave={() => setHoveredId(null)}
              >
                <div className="idx-card-bar" />
                <div className="idx-card-body">
                  <div className="idx-card-head">
                    <div className="idx-card-icon">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                        <path d="M3 21h18M5 21V7l7-4 7 4v14M9 21v-4h6v4"/>
                      </svg>
                    </div>
                    <span className="idx-card-code">{building.code}</span>
                  </div>
                  <div className="idx-card-name">{building.name}</div>
                  <div className="idx-card-desc">
                    {building.description || <span style={{color:'#b8cec4',fontStyle:'italic'}}>No description provided.</span>}
                  </div>
                  <div className="idx-card-divider" />
                  <div className="idx-actions">
                    <button className="idx-btn idx-btn-view" onClick={() => router.visit(`/buildings/${building.id}`)}>
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/>
                      </svg>
                      View
                    </button>
                    <button className="idx-btn idx-btn-edit" onClick={() => router.visit(`/buildings/${building.id}/edit`)}>
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                        <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
                        <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
                      </svg>
                      Edit
                    </button>
                    <button className="idx-btn idx-btn-deact" onClick={() => handleDeactivate(building)}>
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                        <circle cx="12" cy="12" r="10"/><line x1="4.93" y1="4.93" x2="19.07" y2="19.07"/>
                      </svg>
                      Deactivate
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Pagination */}
          {buildings?.meta && (
            <div className="idx-pagination">
              {buildings.meta.current_page > 1 && (
                <button className="idx-page-btn"
                  onClick={() => router.visit(`/buildings?page=${buildings.meta.current_page - 1}`)}>
                  ← Prev
                </button>
              )}
              {Array.from({ length: buildings.meta.last_page }, (_, i) => i + 1).map(p => (
                <button key={p}
                  className={`idx-page-btn${p === buildings.meta.current_page ? ' active' : ''}`}
                  onClick={() => router.visit(`/buildings?page=${p}`)}>
                  {p}
                </button>
              ))}
              {buildings.meta.current_page < buildings.meta.last_page && (
                <button className="idx-page-btn"
                  onClick={() => router.visit(`/buildings?page=${buildings.meta.current_page + 1}`)}>
                  Next →
                </button>
              )}
            </div>
          )}

        </div>
      </div>
    </>
  )
}