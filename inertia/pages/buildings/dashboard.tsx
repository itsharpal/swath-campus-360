import React, { useEffect, useRef, useState } from 'react'
import { router } from '@inertiajs/react'

// Install: npm install sweetalert2

function useCountUp(target: number, duration = 1800) {
  const [count, setCount] = useState(0)
  useEffect(() => {
    if (target === 0) return
    let start = 0
    const step = Math.ceil(target / (duration / 16))
    const timer = setInterval(() => {
      start += step
      if (start >= target) { setCount(target); clearInterval(timer) }
      else setCount(start)
    }, 16)
    return () => clearInterval(timer)
  }, [target])
  return count
}

function RadialProgress({ value, max, color, size = 88 }: { value: number; max: number; color: string; size?: number }) {
  const radius = (size - 12) / 2
  const circumference = 2 * Math.PI * radius
  const pct = max > 0 ? Math.min(value / max, 1) : 0
  const offset = circumference - pct * circumference
  return (
    <svg width={size} height={size} style={{ transform: 'rotate(-90deg)' }}>
      <circle cx={size/2} cy={size/2} r={radius} fill="none" stroke="rgba(22,163,74,.12)" strokeWidth="7" />
      <circle cx={size/2} cy={size/2} r={radius} fill="none" stroke={color} strokeWidth="7"
        strokeLinecap="round" strokeDasharray={circumference} strokeDashoffset={offset}
        style={{ transition: 'stroke-dashoffset 1.4s cubic-bezier(.22,1,.36,1)', filter: `drop-shadow(0 0 5px ${color}55)` }} />
    </svg>
  )
}

export default function Dashboard({ building, stats }: any) {
  const particlesRef = useRef<HTMLDivElement>(null)
  const [ready, setReady] = useState(false)

  const zones         = useCountUp(stats?.zones         ?? 0, 1600)
  const complaints    = useCountUp(stats?.complaints    ?? 0, 1900)
  const openComplaints = useCountUp(stats?.openComplaints ?? 0, 2100)

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
    if (container) {
      for (let i = 0; i < 18; i++) {
        const p = document.createElement('div')
        p.className = 'db-particle'
        const size = 3 + Math.random() * 6
        p.style.cssText = `left:${Math.random()*100}%;top:${100+Math.random()*20}%;width:${size}px;height:${size}px;animation-delay:${Math.random()*9}s;animation-duration:${8+Math.random()*10}s;opacity:${0.12+Math.random()*0.25};border-radius:${Math.random()>.5?'50%':'2px 8px 2px 8px'};`
        container.appendChild(p)
      }
    }
    setTimeout(() => setReady(true), 100)
  }, [])

  const swalBase = {
    background: '#ffffff', color: '#1a3a2a',
    customClass: { popup: 'cb-swal-popup', title: 'cb-swal-title', confirmButton: 'cb-swal-btn', cancelButton: 'cb-swal-btn-cancel' },
  }

  function showZoneInfo() {
    ;(window as any).Swal?.fire({ ...swalBase,
      icon: 'info', iconColor: '#0d9488',
      title: '🗺️ Zones Overview',
      html: `<span style="color:#4a7c59">This building has <b style="color:#15803d;font-size:1.2rem">${stats?.zones ?? 0}</b> registered zones.<br><span style="font-size:.82rem;color:#86a898">Navigate to zones section to manage them.</span></span>`,
      confirmButtonColor: '#16a34a', confirmButtonText: 'Got it',
    })
  }

  function showComplaintInfo() {
    const open = stats?.openComplaints ?? 0
    const total = stats?.complaints ?? 0
    const resolved = total - open
    ;(window as any).Swal?.fire({ ...swalBase,
      icon: open > 0 ? 'warning' : 'success',
      iconColor: open > 0 ? '#f59e0b' : '#16a34a',
      title: open > 0 ? '⚠️ Open Complaints' : '✅ All Clear!',
      html: `<div style="color:#4a7c59;line-height:1.8">
        <div style="display:flex;justify-content:space-around;margin:1rem 0;gap:1rem">
          <div style="text-align:center">
            <div style="font-size:1.8rem;font-weight:700;color:#f59e0b">${open}</div>
            <div style="font-size:.75rem;color:#86a898">Open</div>
          </div>
          <div style="text-align:center">
            <div style="font-size:1.8rem;font-weight:700;color:#16a34a">${resolved}</div>
            <div style="font-size:.75rem;color:#86a898">Resolved</div>
          </div>
          <div style="text-align:center">
            <div style="font-size:1.8rem;font-weight:700;color:#0d9488">${total}</div>
            <div style="font-size:.75rem;color:#86a898">Total</div>
          </div>
        </div>
      </div>`,
      confirmButtonColor: '#16a34a', confirmButtonText: 'View Details',
      showClass: { popup: 'cb-swal-in' },
    })
  }

  const resolvedCount  = (stats?.complaints ?? 0) - (stats?.openComplaints ?? 0)
  const resolvedPct    = stats?.complaints > 0 ? Math.round((resolvedCount / stats.complaints) * 100) : 0
  const openPct        = stats?.complaints > 0 ? Math.round((stats.openComplaints / stats.complaints) * 100) : 0

  const statCards = [
    {
      label: 'Total Zones',
      value: zones,
      raw: stats?.zones ?? 0,
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7">
          <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
          <polyline points="9 22 9 12 15 12 15 22"/>
        </svg>
      ),
      iconBg: '#dcfce7', iconColor: '#16a34a',
      radialColor: '#16a34a',
      max: Math.max(stats?.zones ?? 0, 10),
      sublabel: 'Registered zones',
      badge: 'Active',
      badgeColor: '#16a34a',
      badgeBg: '#dcfce7',
      onClick: showZoneInfo,
      delay: '0.1s',
    },
    {
      label: 'Total Complaints',
      value: complaints,
      raw: stats?.complaints ?? 0,
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7">
          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
        </svg>
      ),
      iconBg: '#e0f2fe', iconColor: '#0ea5e9',
      radialColor: '#0ea5e9',
      max: Math.max(stats?.complaints ?? 0, 10),
      sublabel: `${resolvedPct}% resolved`,
      badge: `${resolvedPct}%`,
      badgeColor: '#0369a1',
      badgeBg: '#e0f2fe',
      onClick: showComplaintInfo,
      delay: '0.2s',
    },
    {
      label: 'Open Complaints',
      value: openComplaints,
      raw: stats?.openComplaints ?? 0,
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7">
          <circle cx="12" cy="12" r="10"/>
          <line x1="12" y1="8" x2="12" y2="12"/>
          <line x1="12" y1="16" x2="12.01" y2="16"/>
        </svg>
      ),
      iconBg: openPct > 50 ? '#fef2f2' : '#fffbeb',
      iconColor: openPct > 50 ? '#dc2626' : '#f59e0b',
      radialColor: openPct > 50 ? '#dc2626' : '#f59e0b',
      max: Math.max(stats?.complaints ?? 0, 10),
      sublabel: openPct > 0 ? `${openPct}% unresolved` : 'All clear!',
      badge: openPct > 50 ? 'Urgent' : openPct > 0 ? 'Pending' : 'Clear',
      badgeColor: openPct > 50 ? '#991b1b' : openPct > 0 ? '#92400e' : '#15803d',
      badgeBg: openPct > 50 ? '#fef2f2' : openPct > 0 ? '#fffbeb' : '#dcfce7',
      onClick: showComplaintInfo,
      delay: '0.3s',
    },
  ]

  return (
    <>
      <style>{`
        *,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
        :root{
          --green:#16a34a;--green-lt:#22c55e;--green-deep:#15803d;
          --green-pale:#dcfce7;--green-glow:rgba(22,163,74,.15);
          --teal:#0d9488;--teal-lt:#14b8a6;--sky:#0ea5e9;--sky-pale:#e0f2fe;
          --bg:#f0fdf4;--surface:#ffffff;--surface2:#f8fffe;
          --border:rgba(22,163,74,.14);--text:#14532d;--text-body:#1a3a2a;
          --dim:#4a7c59;--muted:#86a898;--red:#dc2626;--amber:#f59e0b;
        }
        .db-root{font-family:'Outfit',sans-serif;min-height:100vh;background:var(--bg);position:relative;overflow-x:hidden}
        .db-mesh{position:fixed;inset:0;z-index:0;pointer-events:none;
          background:
            radial-gradient(ellipse 55% 50% at 5% 5%,rgba(22,163,74,.09) 0%,transparent 60%),
            radial-gradient(ellipse 45% 55% at 95% 90%,rgba(14,165,233,.07) 0%,transparent 60%),
            radial-gradient(ellipse 40% 40% at 50% 50%,rgba(13,148,136,.05) 0%,transparent 65%);
          animation:meshDrift 14s ease-in-out infinite alternate}
        @keyframes meshDrift{from{transform:scale(1)}to{transform:scale(1.04)}}
        .db-grid{position:fixed;inset:0;z-index:0;pointer-events:none;
          background-image:radial-gradient(circle,rgba(22,163,74,.15) 1px,transparent 1px);
          background-size:40px 40px}
        .db-scan{position:fixed;left:0;right:0;height:120px;z-index:0;pointer-events:none;
          background:linear-gradient(180deg,transparent,rgba(22,163,74,.04),transparent);
          animation:scanDown 12s linear infinite}
        @keyframes scanDown{from{top:-120px}to{top:100vh}}
        .db-particles{position:fixed;inset:0;z-index:0;pointer-events:none;overflow:hidden}
        .db-particle{position:absolute;background:var(--green-lt);animation:particleRise linear infinite}
        @keyframes particleRise{0%{transform:translateY(0) rotate(0deg) scale(1);opacity:0}10%{opacity:1}90%{opacity:1}100%{transform:translateY(-100vh) rotate(180deg) scale(.2);opacity:0}}
        .db-corner{position:fixed;width:80px;height:80px;z-index:0;pointer-events:none;animation:cornerPulse 4s ease-in-out infinite alternate}
        @keyframes cornerPulse{from{opacity:.3}to{opacity:.75}}
        .db-corner--tl{top:20px;left:20px;border-top:2px solid rgba(22,163,74,.3);border-left:2px solid rgba(22,163,74,.3);border-radius:4px 0 0 0}
        .db-corner--tr{top:20px;right:20px;border-top:2px solid rgba(14,165,233,.25);border-right:2px solid rgba(14,165,233,.25);border-radius:0 4px 0 0}
        .db-corner--bl{bottom:20px;left:20px;border-bottom:2px solid rgba(13,148,136,.25);border-left:2px solid rgba(13,148,136,.25);border-radius:0 0 0 4px}
        .db-corner--br{bottom:20px;right:20px;border-bottom:2px solid rgba(22,163,74,.3);border-right:2px solid rgba(22,163,74,.3);border-radius:0 0 4px 0}

        .db-wrap{position:relative;z-index:1;max-width:1100px;margin:0 auto;padding:2.5rem 2rem 4rem}

        /* top nav bar */
        .db-nav{
          display:flex;align-items:center;justify-content:space-between;
          flex-wrap:wrap;gap:1rem;margin-bottom:2.5rem;
          animation:fadeUp .6s cubic-bezier(.16,1,.3,1) both
        }
        @keyframes fadeUp{from{opacity:0;transform:translateY(20px)}to{opacity:1;transform:translateY(0)}}
        .db-breadcrumb{display:flex;align-items:center;gap:8px;font-family:'JetBrains Mono',monospace;font-size:.68rem;letter-spacing:.08em;color:var(--muted)}
        .db-breadcrumb a{color:var(--green);text-decoration:none;cursor:pointer}
        .db-breadcrumb a:hover{text-decoration:underline}
        .db-breadcrumb-sep{opacity:.4}
        .db-nav-actions{display:flex;gap:.65rem}
        .db-action-btn{
          display:flex;align-items:center;gap:6px;
          font-family:'Outfit',sans-serif;font-size:.82rem;font-weight:500;
          border:1.5px solid;border-radius:10px;padding:.55rem 1rem;
          cursor:pointer;transition:all .2s;white-space:nowrap
        }
        .db-btn-edit{color:var(--green-deep);border-color:rgba(22,163,74,.3);background:var(--green-pale)}
        .db-btn-edit:hover{background:#bbf7d0;border-color:var(--green);transform:translateY(-1px)}
        .db-btn-view{color:var(--teal);border-color:rgba(13,148,136,.3);background:#f0fdfa}
        .db-btn-view:hover{background:#ccfbf1;border-color:var(--teal);transform:translateY(-1px)}

        /* hero header */
        .db-hero{
          background:var(--surface);border:1.5px solid var(--border);border-radius:22px;
          padding:2rem 2.2rem;margin-bottom:2rem;overflow:hidden;position:relative;
          box-shadow:0 4px 20px rgba(22,163,74,.08),inset 0 1px 0 rgba(255,255,255,.9);
          animation:fadeUp .6s .08s cubic-bezier(.16,1,.3,1) both
        }
        .db-hero-bar{
          position:absolute;top:0;left:0;right:0;height:4px;
          background:linear-gradient(90deg,var(--green-deep),var(--green),var(--teal),var(--sky),var(--green-lt),var(--green-deep));
          background-size:200% 100%;animation:barSlide 3.5s linear infinite
        }
        @keyframes barSlide{from{background-position:-200% 0}to{background-position:200% 0}}
        .db-hero-inner{display:flex;align-items:flex-start;justify-content:space-between;flex-wrap:wrap;gap:1.2rem;margin-top:.3rem}
        .db-eyebrow{display:inline-flex;align-items:center;gap:7px;font-family:'JetBrains Mono',monospace;font-size:.62rem;letter-spacing:.13em;text-transform:uppercase;color:var(--green);margin-bottom:.7rem}
        .db-ey-line{width:18px;height:1.5px;background:var(--green);opacity:.5;border-radius:2px}
        .db-hero-title{font-family:'Playfair Display',serif;font-size:2rem;font-weight:600;color:var(--text);letter-spacing:-.025em;line-height:1.15;margin-bottom:.4rem}
        .db-hero-accent{background:linear-gradient(135deg,var(--green-deep) 0%,var(--green) 40%,var(--teal) 100%);background-size:200% auto;-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;animation:shimmer 4s linear infinite}
        @keyframes shimmer{from{background-position:0% center}to{background-position:200% center}}
        .db-hero-sub{font-size:.85rem;color:var(--muted);font-weight:300;line-height:1.6}
        .db-hero-code{display:inline-flex;align-items:center;gap:5px;font-family:'JetBrains Mono',monospace;font-size:.7rem;color:var(--green-deep);background:var(--green-pale);border:1px solid rgba(22,163,74,.2);border-radius:8px;padding:4px 11px;margin-top:.6rem}
        .db-hero-badge{display:inline-flex;align-items:center;gap:6px;background:var(--green-pale);border:1px solid rgba(22,163,74,.25);border-radius:100px;padding:4px 14px 4px 9px;font-size:.72rem;font-weight:500;color:var(--green-deep);flex-shrink:0}
        .db-hero-dot{width:7px;height:7px;border-radius:50%;background:var(--green);box-shadow:0 0 6px var(--green-glow);animation:dotPulse 2s ease-in-out infinite}
        @keyframes dotPulse{0%,100%{transform:scale(1);opacity:1}50%{transform:scale(.7);opacity:.5}}

        /* stat cards */
        .db-stats{display:grid;grid-template-columns:repeat(3,1fr);gap:1.2rem;margin-bottom:2rem}
        .db-stat-card{
          background:var(--surface);border:1.5px solid var(--border);border-radius:20px;
          padding:1.5rem;cursor:pointer;position:relative;overflow:hidden;
          box-shadow:0 2px 12px rgba(22,163,74,.07),inset 0 1px 0 rgba(255,255,255,.9);
          transition:transform .25s cubic-bezier(.22,1,.36,1),box-shadow .25s,border-color .25s;
          animation:fadeUp .6s cubic-bezier(.16,1,.3,1) both
        }
        .db-stat-card:hover{transform:translateY(-4px);box-shadow:0 12px 32px rgba(22,163,74,.14),0 4px 12px rgba(0,0,0,.06);border-color:rgba(22,163,74,.28)}
        .db-stat-card::after{content:'';position:absolute;inset:0;background:linear-gradient(135deg,rgba(255,255,255,.5) 0%,transparent 60%);pointer-events:none}
        .db-stat-top{display:flex;align-items:flex-start;justify-content:space-between;margin-bottom:1.1rem}
        .db-stat-icon{width:46px;height:46px;border-radius:13px;display:flex;align-items:center;justify-content:center;flex-shrink:0}
        .db-stat-badge{font-size:.65rem;font-weight:600;letter-spacing:.05em;border-radius:100px;padding:3px 9px;font-family:'JetBrains Mono',monospace}
        .db-stat-body{display:flex;align-items:flex-end;justify-content:space-between;gap:.8rem}
        .db-stat-num{font-family:'Playfair Display',serif;font-size:2.4rem;font-weight:700;color:var(--text);line-height:1;letter-spacing:-.03em}
        .db-stat-label{font-size:.8rem;font-weight:500;color:var(--dim);margin-top:4px}
        .db-stat-sub{font-size:.72rem;color:var(--muted);margin-top:3px;font-family:'JetBrains Mono',monospace}
        .db-stat-click-hint{position:absolute;bottom:10px;right:12px;font-size:.6rem;color:var(--muted);font-family:'JetBrains Mono',monospace;letter-spacing:.06em;opacity:0;transition:opacity .2s}
        .db-stat-card:hover .db-stat-click-hint{opacity:1}

        /* health bar */
        .db-health{background:var(--surface);border:1.5px solid var(--border);border-radius:20px;padding:1.6rem 2rem;margin-bottom:2rem;box-shadow:0 2px 12px rgba(22,163,74,.07);animation:fadeUp .6s .35s cubic-bezier(.16,1,.3,1) both}
        .db-health-title{font-family:'Playfair Display',serif;font-size:1.1rem;font-weight:600;color:var(--text);letter-spacing:-.02em;margin-bottom:1.2rem;display:flex;align-items:center;gap:8px}
        .db-health-grid{display:grid;grid-template-columns:repeat(2,1fr);gap:1rem}
        .db-health-item{}
        .db-health-row{display:flex;justify-content:space-between;align-items:center;margin-bottom:6px}
        .db-health-lbl{font-size:.78rem;font-weight:500;color:var(--dim)}
        .db-health-val{font-family:'JetBrains Mono',monospace;font-size:.75rem;font-weight:500;color:var(--text)}
        .db-health-track{height:7px;background:rgba(22,163,74,.1);border-radius:100px;overflow:hidden}
        .db-health-fill{height:100%;border-radius:100px;transition:width 1.4s cubic-bezier(.22,1,.36,1)}

        /* quick actions */
        .db-actions-section{animation:fadeUp .6s .42s cubic-bezier(.16,1,.3,1) both}
        .db-section-title{font-family:'Playfair Display',serif;font-size:1.1rem;font-weight:600;color:var(--text);letter-spacing:-.02em;margin-bottom:1rem;display:flex;align-items:center;gap:8px}
        .db-quick-actions{display:grid;grid-template-columns:repeat(auto-fill,minmax(200px,1fr));gap:.9rem}
        .db-qa-btn{
          display:flex;align-items:center;gap:10px;
          font-family:'Outfit',sans-serif;font-size:.85rem;font-weight:500;
          background:var(--surface);border:1.5px solid var(--border);
          border-radius:14px;padding:1rem 1.2rem;cursor:pointer;
          transition:all .22s cubic-bezier(.22,1,.36,1);
          box-shadow:0 2px 8px rgba(22,163,74,.06);text-align:left
        }
        .db-qa-btn:hover{transform:translateY(-2px);box-shadow:0 6px 20px rgba(22,163,74,.12);border-color:rgba(22,163,74,.3)}
        .db-qa-icon{width:36px;height:36px;border-radius:9px;display:flex;align-items:center;justify-content:center;flex-shrink:0}
        .db-qa-text-main{font-size:.84rem;font-weight:500;color:var(--text-body)}
        .db-qa-text-sub{font-size:.7rem;color:var(--muted);margin-top:1px}

        /* infobar */
        .db-infobar{display:flex;align-items:center;justify-content:center;gap:8px;margin-top:2.5rem;font-family:'JetBrains Mono',monospace;font-size:.6rem;color:var(--muted);letter-spacing:.09em;animation:fadeUp .6s .5s both}
        .db-dot{width:3px;height:3px;border-radius:50%;background:var(--green);opacity:.5}

        /* SweetAlert2 */
        .cb-swal-popup{border-radius:20px!important;border:1.5px solid rgba(22,163,74,.2)!important;box-shadow:0 24px 80px rgba(22,163,74,.15),0 4px 16px rgba(0,0,0,.08)!important;font-family:'Outfit',sans-serif!important}
        .cb-swal-title{font-family:'Playfair Display',serif!important;color:#14532d!important;letter-spacing:-.02em!important}
        .cb-swal-btn{border-radius:10px!important;font-family:'Outfit',sans-serif!important;font-weight:600!important;letter-spacing:.02em!important;padding:10px 22px!important;transition:transform .18s!important}
        .cb-swal-btn:hover{transform:translateY(-1px)!important}
        .cb-swal-btn-cancel{border-radius:10px!important;font-family:'Outfit',sans-serif!important;font-weight:500!important}
        .swal2-timer-progress-bar{background:var(--green)!important}
        .swal2-loader{border-color:var(--green) transparent var(--green) transparent!important}
        @keyframes swalIn{from{opacity:0;transform:scale(.88) translateY(20px)}to{opacity:1;transform:scale(1) translateY(0)}}
        @keyframes swalOut{from{opacity:1}to{opacity:0;transform:scale(.9) translateY(-16px)}}
        .cb-swal-in{animation:swalIn .4s cubic-bezier(.16,1,.3,1) both!important}
        .cb-swal-out{animation:swalOut .28s ease both!important}

        @media(max-width:720px){
          .db-stats{grid-template-columns:1fr}
          .db-health-grid{grid-template-columns:1fr}
          .db-hero-title{font-size:1.5rem}
        }
      `}</style>

      <div className="db-root">
        <div className="db-mesh"/><div className="db-grid"/><div className="db-scan"/>
        <div className="db-particles" ref={particlesRef}/>
        <div className="db-corner db-corner--tl"/><div className="db-corner db-corner--tr"/>
        <div className="db-corner db-corner--bl"/><div className="db-corner db-corner--br"/>

        <div className="db-wrap">

          {/* Breadcrumb nav */}
          <div className="db-nav">
            <div className="db-breadcrumb">
              <a onClick={() => router.visit('/buildings')}>🌿 Buildings</a>
              <span className="db-breadcrumb-sep">›</span>
              <a onClick={() => router.visit(`/buildings/${building.id}`)}>{building.name}</a>
              <span className="db-breadcrumb-sep">›</span>
              <span>Dashboard</span>
            </div>
            <div className="db-nav-actions">
              <button className="db-action-btn db-btn-view" onClick={() => router.visit(`/buildings/${building.id}`)}>
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
                View Details
              </button>
              <button className="db-action-btn db-btn-edit" onClick={() => router.visit(`/buildings/${building.id}/edit`)}>
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
                Edit Building
              </button>
            </div>
          </div>

          {/* Hero */}
          <div className="db-hero">
            <div className="db-hero-bar"/>
            <div className="db-hero-inner">
              <div>
                <div className="db-eyebrow"><span className="db-ey-line"/>Campus Dashboard<span className="db-ey-line"/></div>
                <h1 className="db-hero-title">
                  <span className="db-hero-accent">{building.name}</span>
                </h1>
                <p className="db-hero-sub">{building.description || 'Building overview and live statistics.'}</p>
                <div className="db-hero-code">
                  <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="M7 10l2 2-2 2M11 14h4"/></svg>
                  {building.code}
                </div>
              </div>
              <div className="db-hero-badge">
                <span className="db-hero-dot"/>
                Live Dashboard
              </div>
            </div>
          </div>

          {/* Stat cards */}
          <div className="db-stats">
            {statCards.map((card, i) => (
              <div
                key={i}
                className="db-stat-card"
                style={{ animationDelay: card.delay }}
                onClick={card.onClick}
              >
                <div className="db-stat-top">
                  <div className="db-stat-icon" style={{ background: card.iconBg, color: card.iconColor }}>
                    {card.icon}
                  </div>
                  <span className="db-stat-badge" style={{ background: card.badgeBg, color: card.badgeColor }}>
                    {card.badge}
                  </span>
                </div>
                <div className="db-stat-body">
                  <div>
                    <div className="db-stat-num">{card.value}</div>
                    <div className="db-stat-label">{card.label}</div>
                    <div className="db-stat-sub">{card.sublabel}</div>
                  </div>
                  {ready && (
                    <RadialProgress value={card.raw} max={card.max} color={card.radialColor} />
                  )}
                </div>
                <span className="db-stat-click-hint">CLICK FOR DETAILS</span>
              </div>
            ))}
          </div>

          {/* Health bars */}
          <div className="db-health">
            <div className="db-health-title">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--green)" strokeWidth="1.8"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>
              Campus Health Overview
            </div>
            <div className="db-health-grid">
              <div className="db-health-item">
                <div className="db-health-row">
                  <span className="db-health-lbl">Zone Coverage</span>
                  <span className="db-health-val">{stats?.zones ?? 0} zones</span>
                </div>
                <div className="db-health-track">
                  <div className="db-health-fill" style={{ width: `${Math.min((stats?.zones ?? 0) * 10, 100)}%`, background: 'linear-gradient(90deg,#16a34a,#22c55e)' }}/>
                </div>
              </div>
              <div className="db-health-item">
                <div className="db-health-row">
                  <span className="db-health-lbl">Complaint Resolution</span>
                  <span className="db-health-val">{resolvedPct}%</span>
                </div>
                <div className="db-health-track">
                  <div className="db-health-fill" style={{ width: `${resolvedPct}%`, background: `linear-gradient(90deg,${resolvedPct > 60 ? '#16a34a,#22c55e' : '#f59e0b,#fbbf24'})` }}/>
                </div>
              </div>
              <div className="db-health-item">
                <div className="db-health-row">
                  <span className="db-health-lbl">Open Issues</span>
                  <span className="db-health-val">{stats?.openComplaints ?? 0} pending</span>
                </div>
                <div className="db-health-track">
                  <div className="db-health-fill" style={{ width: `${openPct}%`, background: `linear-gradient(90deg,${openPct > 50 ? '#dc2626,#ef4444' : '#f59e0b,#fbbf24'})` }}/>
                </div>
              </div>
              <div className="db-health-item">
                <div className="db-health-row">
                  <span className="db-health-lbl">Overall Status</span>
                  <span className="db-health-val" style={{ color: openPct < 30 ? '#16a34a' : '#f59e0b' }}>
                    {openPct < 30 ? 'Healthy ✓' : 'Needs Attention'}
                  </span>
                </div>
                <div className="db-health-track">
                  <div className="db-health-fill" style={{ width: `${100 - openPct}%`, background: 'linear-gradient(90deg,#0d9488,#14b8a6)' }}/>
                </div>
              </div>
            </div>
          </div>

          {/* Quick actions */}
          <div className="db-actions-section">
            <div className="db-section-title">
              <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="var(--green)" strokeWidth="1.8"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>
              Quick Actions
            </div>
            <div className="db-quick-actions">
              {[
                { icon: '🏢', label: 'View Details', sub: 'Full building info', iconBg: '#dcfce7', action: () => router.visit(`/buildings/${building.id}`) },
                { icon: '✏️', label: 'Edit Building', sub: 'Update information', iconBg: '#fffbeb', action: () => router.visit(`/buildings/${building.id}/edit`) },
                { icon: '🗺️', label: 'Manage Zones', sub: `${stats?.zones ?? 0} zones active`, iconBg: '#e0f2fe', action: () => router.visit(`/buildings/${building.id}/zones`) },
                { icon: '📋', label: 'View Complaints', sub: `${stats?.openComplaints ?? 0} open`, iconBg: '#fef9c3', action: showComplaintInfo },
              ].map((qa, i) => (
                <button key={i} className="db-qa-btn" onClick={qa.action}>
                  <div className="db-qa-icon" style={{ background: qa.iconBg, fontSize: '1.2rem' }}>{qa.icon}</div>
                  <div>
                    <div className="db-qa-text-main">{qa.label}</div>
                    <div className="db-qa-text-sub">{qa.sub}</div>
                  </div>
                </button>
              ))}
            </div>
          </div>

          <div className="db-infobar">
            <span>🌿 SWACHH CAMPUS</span><span className="db-dot"/>
            <span>BUILDING DASHBOARD</span><span className="db-dot"/>
            <span>{new Date().getFullYear()}</span>
          </div>
        </div>
      </div>
    </>
  )
}