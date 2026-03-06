import { usePage, router } from '@inertiajs/react'
import React, { useEffect, useRef, useState } from 'react'

// Install: npm install sweetalert2

export default function FloorsPage() {
  const page: any  = usePage()
  const building   = page.props.building
  const floors: any[] = page.props.floors ?? []

  const [hoveredId, setHoveredId] = useState<number | null>(null)
  const [search, setSearch]       = useState('')
  const particlesRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const injectLink = (href: string) => {
      if (document.querySelector(`link[href="${href}"]`)) return
      const el = document.createElement('link'); el.rel = 'stylesheet'; el.href = href
      document.head.appendChild(el)
    }
    injectLink('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@500;600;700&family=Outfit:wght@300;400;500;600&family=JetBrains+Mono:wght@400;500&display=swap')
    injectLink('https://cdn.jsdelivr.net/npm/sweetalert2@11/dist/sweetalert2.min.css')
    if (!(window as any).Swal) {
      const s = document.createElement('script'); s.src = 'https://cdn.jsdelivr.net/npm/sweetalert2@11'
      document.head.appendChild(s)
    }
    const container = particlesRef.current
    if (!container) return
    for (let i = 0; i < 18; i++) {
      const p = document.createElement('div'); p.className = 'fl-particle'
      const size = 3 + Math.random() * 6
      p.style.cssText = `left:${Math.random()*100}%;top:${100+Math.random()*20}%;width:${size}px;height:${size}px;animation-delay:${Math.random()*9}s;animation-duration:${8+Math.random()*10}s;opacity:${0.12+Math.random()*0.25};border-radius:${Math.random()>.5?'50%':'2px 8px 2px 8px'};`
      container.appendChild(p)
    }
  }, [])

  const swalBase = {
    background: '#ffffff', color: '#1a3a2a',
    customClass: { popup: 'cb-swal-popup', title: 'cb-swal-title', confirmButton: 'cb-swal-btn', cancelButton: 'cb-swal-btn-cancel' },
  }

  function handleDelete(floor: any) {
    const Swal = (window as any).Swal
    if (!Swal) { if (confirm(`Delete floor ${floor.name || floor.floorNumber}?`)) router.delete(`/floors/${floor.id}`); return }
    Swal.fire({ ...swalBase,
      icon: 'warning', iconColor: '#dc2626',
      title: 'Delete Floor?',
      html: `<span style="color:#4a7c59">
        Are you sure you want to delete<br>
        <b style="color:#15803d">Floor ${floor.floorNumber}${floor.name ? ` — ${floor.name}` : ''}</b>?<br>
        <span style="font-size:.8rem;color:#dc2626">⚠️ This will also delete all zones on this floor.</span>
      </span>`,
      showCancelButton: true,
      confirmButtonText: '🗑️ Delete',
      cancelButtonText: 'Cancel',
      confirmButtonColor: '#dc2626',
      cancelButtonColor: '#6b7280',
      showClass: { popup: 'cb-swal-in' },
    }).then((r: any) => {
      if (!r.isConfirmed) return
      Swal.fire({ ...swalBase, title: 'Deleting…', html: '<span style="color:#4a7c59;font-size:.85rem">Removing floor from registry…</span>', allowOutsideClick: false, didOpen: () => Swal.showLoading() })
      router.delete(`/floors/${floor.id}`, {
        onSuccess: () => Swal.fire({ ...swalBase, icon: 'success', iconColor: '#16a34a', title: 'Floor Deleted',
          html: `<span style="color:#4a7c59">Floor <b style="color:#15803d">${floor.name || floor.floorNumber}</b> removed.</span>`,
          confirmButtonColor: '#16a34a', timer: 3000, timerProgressBar: true,
          showClass: { popup: 'cb-swal-in' },
        }),
      })
    })
  }

  function handleFloorDetail(floor: any) {
    const Swal = (window as any).Swal
    Swal?.fire({ ...swalBase,
      icon: 'info', iconColor: '#0d9488',
      title: `Floor ${floor.floorNumber}`,
      html: `<div style="color:#4a7c59;line-height:1.9">
        <div style="font-size:1.1rem;font-weight:600;color:#15803d;margin-bottom:.4rem">${floor.name || 'Unnamed Floor'}</div>
        <div style="display:flex;justify-content:space-around;margin:.8rem 0;gap:1rem">
          <div style="text-align:center">
            <div style="font-size:1.5rem;font-weight:700;color:#0d9488">${floor.zones?.length ?? 0}</div>
            <div style="font-size:.72rem;color:#86a898">Zones</div>
          </div>
          <div style="text-align:center">
            <div style="font-size:1.5rem;font-weight:700;color:#16a34a">${floor.floorNumber}</div>
            <div style="font-size:.72rem;color:#86a898">Floor No.</div>
          </div>
        </div>
      </div>`,
      confirmButtonColor: '#16a34a', confirmButtonText: 'Close',
      showClass: { popup: 'cb-swal-in' },
    })
  }

  const filtered = floors.filter((f: any) =>
    String(f.floorNumber).includes(search) ||
    (f.name || '').toLowerCase().includes(search.toLowerCase())
  )

  const totalZones = floors.reduce((acc: number, f: any) => acc + (f.zones?.length ?? 0), 0)

  return (
    <>
      <style>{`
        *,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
        :root{--green:#16a34a;--green-lt:#22c55e;--green-deep:#15803d;--green-pale:#dcfce7;--green-glow:rgba(22,163,74,.15);--teal:#0d9488;--teal-lt:#14b8a6;--sky:#0ea5e9;--sky-pale:#e0f2fe;--bg:#f0fdf4;--surface:#ffffff;--surface2:#f8fffe;--border:rgba(22,163,74,.14);--text:#14532d;--text-body:#1a3a2a;--dim:#4a7c59;--muted:#86a898;--red:#dc2626;--amber:#f59e0b;}
        .fl-root{font-family:'Outfit',sans-serif;min-height:100vh;background:var(--bg);position:relative;overflow-x:hidden}
        .fl-mesh{position:fixed;inset:0;z-index:0;pointer-events:none;background:radial-gradient(ellipse 55% 50% at 5% 5%,rgba(22,163,74,.09) 0%,transparent 60%),radial-gradient(ellipse 45% 55% at 95% 90%,rgba(14,165,233,.07) 0%,transparent 60%),radial-gradient(ellipse 40% 40% at 50% 50%,rgba(13,148,136,.05) 0%,transparent 65%);animation:meshDrift 14s ease-in-out infinite alternate}
        @keyframes meshDrift{from{transform:scale(1)}to{transform:scale(1.04)}}
        .fl-grid{position:fixed;inset:0;z-index:0;pointer-events:none;background-image:radial-gradient(circle,rgba(22,163,74,.15) 1px,transparent 1px);background-size:40px 40px}
        .fl-scan{position:fixed;left:0;right:0;height:120px;z-index:0;pointer-events:none;background:linear-gradient(180deg,transparent,rgba(22,163,74,.04),transparent);animation:scanDown 12s linear infinite}
        @keyframes scanDown{from{top:-120px}to{top:100vh}}
        .fl-particles{position:fixed;inset:0;z-index:0;pointer-events:none;overflow:hidden}
        .fl-particle{position:absolute;background:var(--green-lt);animation:particleRise linear infinite}
        @keyframes particleRise{0%{transform:translateY(0) rotate(0deg) scale(1);opacity:0}10%{opacity:1}90%{opacity:1}100%{transform:translateY(-100vh) rotate(180deg) scale(.2);opacity:0}}
        .fl-corner{position:fixed;width:80px;height:80px;z-index:0;pointer-events:none;animation:cornerPulse 4s ease-in-out infinite alternate}
        @keyframes cornerPulse{from{opacity:.3}to{opacity:.75}}
        .fl-corner--tl{top:20px;left:20px;border-top:2px solid rgba(22,163,74,.3);border-left:2px solid rgba(22,163,74,.3);border-radius:4px 0 0 0}
        .fl-corner--tr{top:20px;right:20px;border-top:2px solid rgba(14,165,233,.25);border-right:2px solid rgba(14,165,233,.25);border-radius:0 4px 0 0}
        .fl-corner--bl{bottom:20px;left:20px;border-bottom:2px solid rgba(13,148,136,.25);border-left:2px solid rgba(13,148,136,.25);border-radius:0 0 0 4px}
        .fl-corner--br{bottom:20px;right:20px;border-bottom:2px solid rgba(22,163,74,.3);border-right:2px solid rgba(22,163,74,.3);border-radius:0 0 4px 0}

        .fl-wrap{position:relative;z-index:1;max-width:1100px;margin:0 auto;padding:2.5rem 2rem 4rem}

        /* topbar */
        .fl-topbar{display:flex;align-items:flex-start;justify-content:space-between;flex-wrap:wrap;gap:1.5rem;margin-bottom:2.5rem;animation:fadeUp .6s cubic-bezier(.16,1,.3,1) both}
        @keyframes fadeUp{from{opacity:0;transform:translateY(20px)}to{opacity:1;transform:translateY(0)}}
        .fl-breadcrumb{display:flex;align-items:center;gap:8px;font-family:'JetBrains Mono',monospace;font-size:.68rem;letter-spacing:.08em;color:var(--muted);margin-bottom:.7rem}
        .fl-breadcrumb a{color:var(--green);text-decoration:none;cursor:pointer}.fl-breadcrumb a:hover{text-decoration:underline}
        .fl-breadcrumb-sep{opacity:.4}
        .fl-eyebrow{display:inline-flex;align-items:center;gap:7px;font-family:'JetBrains Mono',monospace;font-size:.62rem;letter-spacing:.13em;text-transform:uppercase;color:var(--green);margin-bottom:.6rem}
        .fl-ey-line{width:18px;height:1.5px;background:var(--green);opacity:.5;border-radius:2px}
        .fl-title{font-family:'Playfair Display',serif;font-size:2.2rem;font-weight:600;color:var(--text);letter-spacing:-.03em;line-height:1.1}
        .fl-title-accent{background:linear-gradient(135deg,var(--green-deep) 0%,var(--green) 40%,var(--teal) 100%);background-size:200% auto;-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;animation:shimmer 4s linear infinite}
        @keyframes shimmer{from{background-position:0% center}to{background-position:200% center}}
        .fl-sub{font-size:.85rem;color:var(--muted);font-weight:300;margin-top:.35rem}
        .fl-add-btn{display:flex;align-items:center;gap:8px;font-family:'Outfit',sans-serif;font-size:.9rem;font-weight:600;color:#fff;background:linear-gradient(135deg,var(--green-deep),var(--green),var(--teal));background-size:200% auto;animation:btnGradient 5s linear infinite;border:none;border-radius:14px;padding:.85rem 1.7rem;cursor:pointer;overflow:hidden;position:relative;box-shadow:0 4px 18px rgba(22,163,74,.4),inset 0 1px 0 rgba(255,255,255,.18);transition:transform .22s cubic-bezier(.22,1,.36,1),box-shadow .22s}
        @keyframes btnGradient{0%{background-position:0% center}50%{background-position:100% center}100%{background-position:0% center}}
        .fl-add-btn::after{content:'';position:absolute;top:0;left:-110%;width:100%;height:100%;background:linear-gradient(90deg,transparent,rgba(255,255,255,.2),transparent);transition:left .5s}
        .fl-add-btn:hover::after{left:110%}.fl-add-btn:hover{transform:translateY(-2px);box-shadow:0 8px 28px rgba(22,163,74,.45)}.fl-add-btn:active{transform:translateY(0)}

        /* stats */
        .fl-stats{display:grid;grid-template-columns:repeat(3,1fr);gap:1rem;margin-bottom:2rem;animation:fadeUp .6s .1s cubic-bezier(.16,1,.3,1) both}
        .fl-stat{background:var(--surface);border:1.5px solid var(--border);border-radius:16px;padding:1.1rem 1.3rem;display:flex;align-items:center;gap:1rem;box-shadow:0 2px 12px rgba(22,163,74,.07),inset 0 1px 0 rgba(255,255,255,.8);transition:transform .2s,box-shadow .2s}
        .fl-stat:hover{transform:translateY(-2px);box-shadow:0 6px 20px rgba(22,163,74,.12)}
        .fl-stat-icon{width:42px;height:42px;border-radius:11px;display:flex;align-items:center;justify-content:center;flex-shrink:0}
        .fl-stat-val{font-family:'Playfair Display',serif;font-size:1.55rem;font-weight:600;color:var(--text);line-height:1}
        .fl-stat-label{font-size:.75rem;color:var(--muted);margin-top:2px}

        /* search */
        .fl-search-wrap{position:relative;margin-bottom:2rem;animation:fadeUp .6s .18s cubic-bezier(.16,1,.3,1) both}
        .fl-search-icon{position:absolute;left:14px;top:50%;transform:translateY(-50%);color:var(--muted);pointer-events:none;display:flex;align-items:center}
        .fl-search{width:100%;font-family:'Outfit',sans-serif;font-size:.9rem;color:var(--text-body);background:var(--surface);border:1.5px solid var(--border);border-radius:13px;padding:.8rem 1rem .8rem 2.8rem;outline:none;caret-color:var(--green);box-shadow:0 2px 8px rgba(22,163,74,.06);transition:border-color .25s,box-shadow .25s}
        .fl-search::placeholder{color:var(--muted)}
        .fl-search:focus{border-color:rgba(22,163,74,.5);box-shadow:0 0 0 3px rgba(22,163,74,.1)}

        /* grid */
        .fl-grid-cards{display:grid;grid-template-columns:repeat(auto-fill,minmax(290px,1fr));gap:1.4rem}

        /* card */
        .fl-card{background:var(--surface);border:1.5px solid var(--border);border-radius:20px;overflow:hidden;box-shadow:0 2px 12px rgba(22,163,74,.07),inset 0 1px 0 rgba(255,255,255,.8);transition:transform .25s cubic-bezier(.22,1,.36,1),box-shadow .25s,border-color .25s;animation:cardIn .6s cubic-bezier(.16,1,.3,1) both}
        .fl-card:hover{transform:translateY(-4px);box-shadow:0 12px 36px rgba(22,163,74,.15),0 4px 12px rgba(0,0,0,.06);border-color:rgba(22,163,74,.3)}
        @keyframes cardIn{from{opacity:0;transform:translateY(24px) scale(.97)}to{opacity:1;transform:translateY(0) scale(1)}}
        .fl-card:nth-child(1){animation-delay:.1s}.fl-card:nth-child(2){animation-delay:.17s}.fl-card:nth-child(3){animation-delay:.24s}.fl-card:nth-child(4){animation-delay:.31s}.fl-card:nth-child(5){animation-delay:.38s}.fl-card:nth-child(6){animation-delay:.45s}

        /* card top bar */
        .fl-card-bar{height:3px;background:linear-gradient(90deg,var(--green-deep),var(--green),var(--teal-lt));background-size:200% 100%;animation:barSlide 3.5s linear infinite}
        @keyframes barSlide{from{background-position:-200% 0}to{background-position:200% 0}}
        .fl-card-body{padding:1.4rem}

        /* card header */
        .fl-card-head{display:flex;align-items:flex-start;justify-content:space-between;gap:.75rem;margin-bottom:.8rem}
        .fl-floor-avatar{width:52px;height:52px;border-radius:14px;background:linear-gradient(135deg,var(--green-deep),var(--green));color:#fff;font-family:'Playfair Display',serif;font-size:1.3rem;font-weight:700;display:flex;align-items:center;justify-content:center;flex-shrink:0;box-shadow:0 3px 10px rgba(22,163,74,.3);transition:transform .2s}
        .fl-card:hover .fl-floor-avatar{transform:scale(1.05) rotate(-3deg)}
        .fl-card-right{display:flex;flex-direction:column;align-items:flex-end;gap:5px}
        .fl-zones-badge{font-family:'JetBrains Mono',monospace;font-size:.65rem;font-weight:600;background:#ccfbf1;color:var(--teal);border:1px solid rgba(13,148,136,.25);border-radius:100px;padding:3px 9px;display:flex;align-items:center;gap:4px}
        .fl-floor-num-chip{font-family:'JetBrains Mono',monospace;font-size:.63rem;color:var(--green-deep);background:var(--green-pale);border:1px solid rgba(22,163,74,.2);border-radius:7px;padding:2px 8px}
        .fl-card-name{font-family:'Playfair Display',serif;font-size:1.15rem;font-weight:600;color:var(--text);letter-spacing:-.02em;line-height:1.25;margin-bottom:.25rem}
        .fl-card-sub{font-size:.78rem;color:var(--muted);font-family:'JetBrains Mono',monospace}

        /* zones mini */
        .fl-zones-row{display:flex;flex-wrap:wrap;gap:5px;margin:.75rem 0 0}
        .fl-zone-chip{font-size:.7rem;color:var(--teal);background:#f0fdfa;border:1px solid rgba(13,148,136,.2);border-radius:7px;padding:2px 8px;font-weight:500}
        .fl-zone-more{font-size:.7rem;color:var(--muted);background:var(--surface2);border:1px solid var(--border);border-radius:7px;padding:2px 8px}

        .fl-card-divider{height:1px;background:linear-gradient(90deg,transparent,rgba(22,163,74,.15),transparent);margin:1rem 0}

        /* actions */
        .fl-actions{display:flex;gap:.6rem}
        .fl-btn{display:flex;align-items:center;gap:5px;font-family:'Outfit',sans-serif;font-size:.78rem;font-weight:500;border:1.5px solid;border-radius:9px;padding:.5rem .9rem;cursor:pointer;transition:all .2s;white-space:nowrap}
        .fl-btn-detail{color:var(--teal);border-color:rgba(13,148,136,.3);background:#f0fdfa}.fl-btn-detail:hover{background:#ccfbf1;border-color:var(--teal);transform:translateY(-1px)}
        .fl-btn-edit{color:var(--green-deep);border-color:rgba(22,163,74,.3);background:var(--green-pale)}.fl-btn-edit:hover{background:#bbf7d0;border-color:var(--green);transform:translateY(-1px)}
        .fl-btn-del{color:var(--red);border-color:rgba(220,38,38,.25);background:#fef2f2}.fl-btn-del:hover{background:#fee2e2;border-color:var(--red);transform:translateY(-1px)}

        /* empty */
        .fl-empty{grid-column:1/-1;display:flex;flex-direction:column;align-items:center;justify-content:center;padding:5rem 2rem;text-align:center;background:var(--surface);border:1.5px dashed rgba(22,163,74,.2);border-radius:20px;animation:fadeUp .5s both}
        .fl-empty-icon{font-size:3rem;margin-bottom:1rem}
        .fl-empty-title{font-family:'Playfair Display',serif;font-size:1.3rem;color:var(--text);margin-bottom:.4rem}
        .fl-empty-sub{font-size:.85rem;color:var(--muted);margin-bottom:1.5rem}
        .fl-empty-btn{display:inline-flex;align-items:center;gap:7px;font-family:'Outfit',sans-serif;font-size:.87rem;font-weight:600;color:#fff;background:linear-gradient(135deg,var(--green-deep),var(--green));border:none;border-radius:11px;padding:.7rem 1.4rem;cursor:pointer;box-shadow:0 3px 12px rgba(22,163,74,.35);transition:transform .2s}
        .fl-empty-btn:hover{transform:translateY(-2px)}

        /* infobar */
        .fl-infobar{display:flex;align-items:center;justify-content:center;gap:8px;margin-top:2.5rem;font-family:'JetBrains Mono',monospace;font-size:.6rem;color:var(--muted);letter-spacing:.09em;animation:fadeUp .6s .5s both}
        .fl-dot{width:3px;height:3px;border-radius:50%;background:var(--green);opacity:.5}

        /* SweetAlert2 */
        .cb-swal-popup{border-radius:20px!important;border:1.5px solid rgba(22,163,74,.2)!important;box-shadow:0 24px 80px rgba(22,163,74,.15),0 4px 16px rgba(0,0,0,.08)!important;font-family:'Outfit',sans-serif!important}
        .cb-swal-title{font-family:'Playfair Display',serif!important;color:#14532d!important;letter-spacing:-.02em!important}
        .cb-swal-btn{border-radius:10px!important;font-family:'Outfit',sans-serif!important;font-weight:600!important;padding:10px 22px!important;transition:transform .18s!important}
        .cb-swal-btn:hover{transform:translateY(-1px)!important}
        .cb-swal-btn-cancel{border-radius:10px!important;font-family:'Outfit',sans-serif!important;font-weight:500!important}
        .swal2-timer-progress-bar{background:var(--green)!important}
        .swal2-loader{border-color:var(--green) transparent var(--green) transparent!important}
        @keyframes swalIn{from{opacity:0;transform:scale(.88) translateY(20px)}to{opacity:1;transform:scale(1) translateY(0)}}
        @keyframes swalOut{from{opacity:1}to{opacity:0;transform:scale(.9) translateY(-16px)}}
        .cb-swal-in{animation:swalIn .4s cubic-bezier(.16,1,.3,1) both!important}
        .cb-swal-out{animation:swalOut .28s ease both!important}

        @media(max-width:640px){.fl-stats{grid-template-columns:1fr}.fl-topbar{flex-direction:column}.fl-title{font-size:1.7rem}}
      `}</style>

      <div className="fl-root">
        <div className="fl-mesh"/><div className="fl-grid"/><div className="fl-scan"/>
        <div className="fl-particles" ref={particlesRef}/>
        <div className="fl-corner fl-corner--tl"/><div className="fl-corner fl-corner--tr"/>
        <div className="fl-corner fl-corner--bl"/><div className="fl-corner fl-corner--br"/>

        <div className="fl-wrap">

          {/* Topbar */}
          <div className="fl-topbar">
            <div>
              <div className="fl-breadcrumb">
                <a onClick={() => router.visit('/buildings')}>🌿 Buildings</a>
                <span className="fl-breadcrumb-sep">›</span>
                <a onClick={() => router.visit(`/buildings/${building?.id}`)}>{building?.name}</a>
                <span className="fl-breadcrumb-sep">›</span>
                <span>Floors</span>
              </div>
              <div className="fl-eyebrow"><span className="fl-ey-line"/>Swachh Campus<span className="fl-ey-line"/></div>
              <h1 className="fl-title">
                <span className="fl-title-accent">{building?.name}</span>
              </h1>
              <p className="fl-sub">{floors.length} floor{floors.length !== 1 ? 's' : ''} registered · {totalZones} zones total</p>
            </div>
            <button className="fl-add-btn" onClick={() => router.visit(`/buildings/${building?.id}/floors/create`)}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
              Add Floor
            </button>
          </div>

          {/* Stats */}
          <div className="fl-stats">
            <div className="fl-stat">
              <div className="fl-stat-icon" style={{background:'var(--green-pale)',color:'var(--green)'}}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M3 21h18M3 7h18M3 14h18M4 3h16a1 1 0 0 1 1 1v17H3V4a1 1 0 0 1 1-1z"/></svg>
              </div>
              <div><div className="fl-stat-val">{floors.length}</div><div className="fl-stat-label">Total Floors</div></div>
            </div>
            <div className="fl-stat">
              <div className="fl-stat-icon" style={{background:'#ccfbf1',color:'var(--teal)'}}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
              </div>
              <div><div className="fl-stat-val">{totalZones}</div><div className="fl-stat-label">Total Zones</div></div>
            </div>
            <div className="fl-stat">
              <div className="fl-stat-icon" style={{background:'var(--sky-pale)',color:'var(--sky)'}}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
              </div>
              <div><div className="fl-stat-val">{filtered.length}</div><div className="fl-stat-label">Showing</div></div>
            </div>
          </div>

          {/* Search */}
          <div className="fl-search-wrap">
            <span className="fl-search-icon"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg></span>
            <input className="fl-search" placeholder="Search by floor number or name…" value={search} onChange={e => setSearch(e.target.value)}/>
          </div>

          {/* Cards */}
          <div className="fl-grid-cards">
            {filtered.length === 0 ? (
              <div className="fl-empty">
                <div className="fl-empty-icon">🏗️</div>
                <div className="fl-empty-title">{search ? 'No results found' : 'No floors yet'}</div>
                <div className="fl-empty-sub">{search ? `No floors match "${search}"` : 'Add your first floor to this building.'}</div>
                {!search && (
                  <button className="fl-empty-btn" onClick={() => router.visit(`/buildings/${building?.id}/floors/create`)}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
                    Add First Floor
                  </button>
                )}
              </div>
            ) : filtered.map((floor: any) => {
              const zones: any[] = floor.zones ?? []
              const previewZones = zones.slice(0, 3)
              const extraZones   = zones.length - previewZones.length
              return (
                <div
                  key={floor.id}
                  className="fl-card"
                  onMouseEnter={() => setHoveredId(floor.id)}
                  onMouseLeave={() => setHoveredId(null)}
                >
                  <div className="fl-card-bar"/>
                  <div className="fl-card-body">
                    <div className="fl-card-head">
                      <div className="fl-floor-avatar">{floor.floorNumber}</div>
                      <div className="fl-card-right">
                        <span className="fl-zones-badge">
                          <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/></svg>
                          {zones.length} zones
                        </span>
                        <span className="fl-floor-num-chip">#{floor.floorNumber}</span>
                      </div>
                    </div>

                    <div className="fl-card-name">{floor.name || `Floor ${floor.floorNumber}`}</div>
                    <div className="fl-card-sub">Floor {floor.floorNumber} · {zones.length} zone{zones.length !== 1 ? 's' : ''}</div>

                    {zones.length > 0 && (
                      <div className="fl-zones-row">
                        {previewZones.map((z: any) => (
                          <span key={z.id} className="fl-zone-chip">{z.name || `Zone ${z.id}`}</span>
                        ))}
                        {extraZones > 0 && <span className="fl-zone-more">+{extraZones} more</span>}
                      </div>
                    )}

                    <div className="fl-card-divider"/>
                    <div className="fl-actions">
                      <button className="fl-btn fl-btn-detail" onClick={() => handleFloorDetail(floor)}>
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
                        Details
                      </button>
                      <button className="fl-btn fl-btn-edit" onClick={() => router.visit(`/floors/${floor.id}/edit`)}>
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
                        Edit
                      </button>
                      <button className="fl-btn fl-btn-del" onClick={() => handleDelete(floor)}>
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14H6L5 6"/><path d="M10 11v6M14 11v6"/><path d="M9 6V4h6v2"/></svg>
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>

          <div className="fl-infobar">
            <span>🌿 SWACHH CAMPUS</span><span className="fl-dot"/><span>FLOOR REGISTRY</span><span className="fl-dot"/><span>{new Date().getFullYear()}</span>
          </div>
        </div>
      </div>
    </>
  )
}