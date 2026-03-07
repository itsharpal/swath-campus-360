import React, { useEffect, useRef } from 'react'
import { router } from '@inertiajs/react'

// Install: npm install sweetalert2

export default function ShowBuilding({ building }: any) {
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
      const s = document.createElement('script')
      s.src = 'https://cdn.jsdelivr.net/npm/sweetalert2@11'
      document.head.appendChild(s)
    }
    const container = particlesRef.current
    if (container) {
      for (let i = 0; i < 16; i++) {
        const p = document.createElement('div')
        p.className = 'sh-particle'
        const size = 3 + Math.random() * 6
        p.style.cssText = `left:${Math.random()*100}%;top:${100+Math.random()*20}%;width:${size}px;height:${size}px;animation-delay:${Math.random()*9}s;animation-duration:${8+Math.random()*10}s;opacity:${0.12+Math.random()*0.22};border-radius:${Math.random()>.5?'50%':'2px 8px 2px 8px'};`
        container.appendChild(p)
      }
    }
  }, [])

  if (!building) return (
    <div style={{ fontFamily: 'Outfit,sans-serif', minHeight: '100vh', background: '#f0fdf4', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#86a898', fontSize: '1rem' }}>
      Loading building…
    </div>
  )

  const swalBase = {
    background: '#ffffff', color: '#1a3a2a',
    customClass: { popup: 'cb-swal-popup', title: 'cb-swal-title', confirmButton: 'cb-swal-btn', cancelButton: 'cb-swal-btn-cancel' },
  }

  function handleDeactivate() {
    const Swal = (window as any).Swal
    if (!Swal) { if (confirm(`Deactivate ${building.name}?`)) router.delete(`/buildings/${building.id}`); return }
    Swal.fire({ ...swalBase,
      icon: 'warning', iconColor: '#f59e0b',
      title: 'Deactivate Building?',
      html: `<span style="color:#4a7c59">Are you sure you want to deactivate<br><b style="color:#15803d">${building.name}</b>?<br><span style="font-size:.82rem;color:#86a898">It will be removed from the campus registry.</span></span>`,
      showCancelButton: true,
      confirmButtonText: '⚠️ Yes, Deactivate',
      cancelButtonText: 'Cancel',
      confirmButtonColor: '#dc2626',
      cancelButtonColor: '#6b7280',
      showClass: { popup: 'cb-swal-in' },
    }).then((r: any) => {
      if (!r.isConfirmed) return
      Swal.fire({ ...swalBase, title: 'Deactivating…', html: '<span style="color:#4a7c59;font-size:.85rem">Removing from campus registry…</span>', allowOutsideClick: false, didOpen: () => Swal.showLoading() })
      router.delete(`/buildings/${building.id}`, {
        onSuccess: () => Swal.fire({ ...swalBase, icon: 'success', iconColor: '#16a34a', title: 'Deactivated', html: `<span style="color:#4a7c59"><b style="color:#15803d">${building.name}</b> removed.</span>`, confirmButtonColor: '#16a34a', timer: 3000, timerProgressBar: true }),
      })
    })
  }

  function showFloorDetail(floor: any) {
    const Swal = (window as any).Swal
    Swal?.fire({ ...swalBase,
      icon: 'info', iconColor: '#0d9488',
      title: `Floor ${floor.floorNumber}`,
      html: `<div style="color:#4a7c59;line-height:1.8">
        <div style="font-size:1.1rem;font-weight:600;color:#15803d;margin-bottom:.5rem">${floor.name || 'Unnamed Floor'}</div>
        <div style="font-size:.82rem;color:#86a898;font-family:monospace">Floor Number: ${floor.floorNumber}</div>
        ${floor.description ? `<div style="margin-top:.5rem;font-size:.85rem">${floor.description}</div>` : ''}
      </div>`,
      confirmButtonColor: '#16a34a', confirmButtonText: 'Close',
      showClass: { popup: 'cb-swal-in' },
    })
  }

  function handleCreateZone() {
    if (!floors.length) {
      const Swal = (window as any).Swal
      if (!Swal) {
        alert('Please create a floor first before adding a zone.')
        return
      }
      Swal.fire({
        ...swalBase,
        icon: 'info',
        iconColor: '#0d9488',
        title: 'Add a Floor First',
        html: '<span style="color:#4a7c59">Please create at least one floor before adding a zone.</span>',
        confirmButtonColor: '#16a34a',
        confirmButtonText: 'Create Floor',
      }).then((r: any) => {
        if (r.isConfirmed) router.visit(`/buildings/${building.id}/floors/create`)
      })
      return
    }

    router.visit(`/floors/${floors[0].id}/zones/create`)
  }

  function showZoneActions(zone: any) {
    const Swal = (window as any).Swal
    if (!Swal) {
      if (confirm(`Generate QR for ${zone.name || `Zone ${zone.id}`}?`)) {
        router.visit(`/zones/${zone.id}/qr`)
      }
      return
    }

    Swal.fire({
      ...swalBase,
      icon: 'question',
      iconColor: '#0d9488',
      title: zone.name || `Zone ${zone.id}`,
      html: '<span style="color:#4a7c59">Choose an action for this zone.</span>',
      showCancelButton: true,
      confirmButtonText: 'Generate QR',
      cancelButtonText: 'Close',
      confirmButtonColor: '#16a34a',
      cancelButtonColor: '#6b7280',
      showClass: { popup: 'cb-swal-in' },
    }).then((r: any) => {
      if (!r.isConfirmed) return
      router.visit(`/zones/${zone.id}/qr`)
    })
  }

  const floors: any[]  = building.floors  ?? []
  const zones:  any[]  = building.zones   ?? []

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
        .sh-root{font-family:'Outfit',sans-serif;min-height:100vh;background:var(--bg);position:relative;overflow-x:hidden}
        .sh-mesh{position:fixed;inset:0;z-index:0;pointer-events:none;
          background:
            radial-gradient(ellipse 55% 50% at 5% 5%,rgba(22,163,74,.09) 0%,transparent 60%),
            radial-gradient(ellipse 45% 55% at 95% 90%,rgba(14,165,233,.07) 0%,transparent 60%),
            radial-gradient(ellipse 40% 40% at 50% 50%,rgba(13,148,136,.05) 0%,transparent 65%);
          animation:meshDrift 14s ease-in-out infinite alternate}
        @keyframes meshDrift{from{transform:scale(1)}to{transform:scale(1.04)}}
        .sh-grid{position:fixed;inset:0;z-index:0;pointer-events:none;background-image:radial-gradient(circle,rgba(22,163,74,.15) 1px,transparent 1px);background-size:40px 40px}
        .sh-scan{position:fixed;left:0;right:0;height:120px;z-index:0;pointer-events:none;background:linear-gradient(180deg,transparent,rgba(22,163,74,.04),transparent);animation:scanDown 12s linear infinite}
        @keyframes scanDown{from{top:-120px}to{top:100vh}}
        .sh-particles{position:fixed;inset:0;z-index:0;pointer-events:none;overflow:hidden}
        .sh-particle{position:absolute;background:var(--green-lt);animation:particleRise linear infinite}
        @keyframes particleRise{0%{transform:translateY(0) rotate(0deg) scale(1);opacity:0}10%{opacity:1}90%{opacity:1}100%{transform:translateY(-100vh) rotate(180deg) scale(.2);opacity:0}}
        .sh-corner{position:fixed;width:80px;height:80px;z-index:0;pointer-events:none;animation:cornerPulse 4s ease-in-out infinite alternate}
        @keyframes cornerPulse{from{opacity:.3}to{opacity:.75}}
        .sh-corner--tl{top:20px;left:20px;border-top:2px solid rgba(22,163,74,.3);border-left:2px solid rgba(22,163,74,.3);border-radius:4px 0 0 0}
        .sh-corner--tr{top:20px;right:20px;border-top:2px solid rgba(14,165,233,.25);border-right:2px solid rgba(14,165,233,.25);border-radius:0 4px 0 0}
        .sh-corner--bl{bottom:20px;left:20px;border-bottom:2px solid rgba(13,148,136,.25);border-left:2px solid rgba(13,148,136,.25);border-radius:0 0 0 4px}
        .sh-corner--br{bottom:20px;right:20px;border-bottom:2px solid rgba(22,163,74,.3);border-right:2px solid rgba(22,163,74,.3);border-radius:0 0 4px 0}

        .sh-wrap{position:relative;z-index:1;max-width:900px;margin:0 auto;padding:2.5rem 2rem 4rem}

        /* nav */
        .sh-nav{display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:1rem;margin-bottom:2.5rem;animation:fadeUp .6s cubic-bezier(.16,1,.3,1) both}
        @keyframes fadeUp{from{opacity:0;transform:translateY(20px)}to{opacity:1;transform:translateY(0)}}
        .sh-breadcrumb{display:flex;align-items:center;gap:8px;font-family:'JetBrains Mono',monospace;font-size:.68rem;letter-spacing:.08em;color:var(--muted)}
        .sh-breadcrumb a{color:var(--green);text-decoration:none;cursor:pointer}
        .sh-breadcrumb a:hover{text-decoration:underline}
        .sh-breadcrumb-sep{opacity:.4}
        .sh-nav-btns{display:flex;gap:.65rem;flex-wrap:wrap}
        .sh-nbtn{display:flex;align-items:center;gap:6px;font-family:'Outfit',sans-serif;font-size:.82rem;font-weight:500;border:1.5px solid;border-radius:10px;padding:.55rem 1rem;cursor:pointer;transition:all .2s;white-space:nowrap}
        .sh-nbtn-dash{color:var(--teal);border-color:rgba(13,148,136,.3);background:#f0fdfa}
        .sh-nbtn-dash:hover{background:#ccfbf1;border-color:var(--teal);transform:translateY(-1px)}
        .sh-nbtn-edit{color:var(--green-deep);border-color:rgba(22,163,74,.3);background:var(--green-pale)}
        .sh-nbtn-edit:hover{background:#bbf7d0;border-color:var(--green);transform:translateY(-1px)}
        .sh-nbtn-deact{color:var(--red);border-color:rgba(220,38,38,.25);background:#fef2f2}
        .sh-nbtn-deact:hover{background:#fee2e2;border-color:var(--red);transform:translateY(-1px)}

        /* hero card */
        .sh-hero{background:var(--surface);border:1.5px solid var(--border);border-radius:22px;overflow:hidden;margin-bottom:1.8rem;box-shadow:0 4px 20px rgba(22,163,74,.08),inset 0 1px 0 rgba(255,255,255,.9);animation:fadeUp .6s .08s cubic-bezier(.16,1,.3,1) both}
        .sh-hero-bar{height:4px;background:linear-gradient(90deg,var(--green-deep),var(--green),var(--teal),var(--sky),var(--green-lt),var(--green-deep));background-size:200% 100%;animation:barSlide 3.5s linear infinite}
        @keyframes barSlide{from{background-position:-200% 0}to{background-position:200% 0}}
        .sh-hero-body{padding:2rem 2.2rem}
        .sh-eyebrow{display:inline-flex;align-items:center;gap:7px;font-family:'JetBrains Mono',monospace;font-size:.62rem;letter-spacing:.13em;text-transform:uppercase;color:var(--green);margin-bottom:.7rem}
        .sh-ey-line{width:18px;height:1.5px;background:var(--green);opacity:.5;border-radius:2px}
        .sh-hero-row{display:flex;align-items:flex-start;justify-content:space-between;flex-wrap:wrap;gap:1.2rem}
        .sh-title{font-family:'Playfair Display',serif;font-size:2.1rem;font-weight:600;color:var(--text);letter-spacing:-.025em;line-height:1.15;margin-bottom:.4rem}
        .sh-title-accent{background:linear-gradient(135deg,var(--green-deep) 0%,var(--green) 40%,var(--teal) 100%);background-size:200% auto;-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;animation:shimmer 4s linear infinite}
        @keyframes shimmer{from{background-position:0% center}to{background-position:200% center}}
        .sh-desc{font-size:.87rem;color:var(--muted);line-height:1.65;max-width:520px;margin-top:.3rem}
        .sh-meta{display:flex;flex-direction:column;gap:.5rem;align-items:flex-end;flex-shrink:0}
        .sh-code-chip{display:inline-flex;align-items:center;gap:6px;font-family:'JetBrains Mono',monospace;font-size:.72rem;color:var(--green-deep);background:var(--green-pale);border:1px solid rgba(22,163,74,.22);border-radius:9px;padding:5px 12px}
        .sh-active-badge{display:inline-flex;align-items:center;gap:6px;background:var(--green-pale);border:1px solid rgba(22,163,74,.25);border-radius:100px;padding:4px 13px 4px 9px;font-size:.7rem;font-weight:500;color:var(--green-deep)}
        .sh-active-dot{width:7px;height:7px;border-radius:50%;background:var(--green);box-shadow:0 0 6px var(--green-glow);animation:dotPulse 2s ease-in-out infinite}
        @keyframes dotPulse{0%,100%{transform:scale(1);opacity:1}50%{transform:scale(.7);opacity:.5}}
        .sh-divider{height:1px;background:linear-gradient(90deg,transparent,rgba(22,163,74,.18),transparent);margin:1.2rem 0}
        .sh-info-row{display:grid;grid-template-columns:repeat(auto-fill,minmax(140px,1fr));gap:.75rem}
        .sh-info-pill{background:var(--surface2);border:1px solid var(--border);border-radius:11px;padding:.65rem 1rem}
        .sh-info-pill-lbl{font-family:'JetBrains Mono',monospace;font-size:.6rem;letter-spacing:.09em;text-transform:uppercase;color:var(--muted);margin-bottom:4px}
        .sh-info-pill-val{font-size:.87rem;font-weight:500;color:var(--text-body)}

        /* section */
        .sh-section{margin-bottom:1.6rem;animation:fadeUp .6s cubic-bezier(.16,1,.3,1) both}
        .sh-section:nth-child(3){animation-delay:.15s}
        .sh-section:nth-child(4){animation-delay:.22s}
        .sh-section:nth-child(5){animation-delay:.29s}
        .sh-section-card{background:var(--surface);border:1.5px solid var(--border);border-radius:20px;overflow:hidden;box-shadow:0 2px 12px rgba(22,163,74,.07),inset 0 1px 0 rgba(255,255,255,.9)}
        .sh-section-head{display:flex;align-items:center;justify-content:space-between;padding:1.2rem 1.5rem;border-bottom:1px solid rgba(22,163,74,.08)}
        .sh-section-title{display:flex;align-items:center;gap:9px;font-family:'Playfair Display',serif;font-size:1.05rem;font-weight:600;color:var(--text);letter-spacing:-.02em}
        .sh-section-icon{width:34px;height:34px;border-radius:9px;display:flex;align-items:center;justify-content:center}
        .sh-section-actions{display:flex;align-items:center;gap:.55rem;flex-wrap:wrap}
        .sh-count-badge{font-family:'JetBrains Mono',monospace;font-size:.65rem;font-weight:600;background:var(--green-pale);color:var(--green-deep);border:1px solid rgba(22,163,74,.2);border-radius:100px;padding:2px 10px}
        .sh-mini-btn{display:inline-flex;align-items:center;gap:6px;font-family:'Outfit',sans-serif;font-size:.75rem;font-weight:600;border:1.5px solid;border-radius:9px;padding:.4rem .75rem;cursor:pointer;transition:all .2s;white-space:nowrap}
        .sh-mini-btn-floor{color:var(--green-deep);border-color:rgba(22,163,74,.28);background:var(--green-pale)}
        .sh-mini-btn-floor:hover{background:#bbf7d0;border-color:var(--green);transform:translateY(-1px)}
        .sh-mini-btn-zone{color:var(--teal);border-color:rgba(13,148,136,.3);background:#f0fdfa}
        .sh-mini-btn-zone:hover{background:#ccfbf1;border-color:var(--teal);transform:translateY(-1px)}

        /* floors list */
        .sh-floors-list{padding:.6rem}
        .sh-floor-item{
          display:flex;align-items:center;justify-content:space-between;
          padding:.85rem 1rem;border-radius:12px;
          transition:background .18s;cursor:pointer;gap:1rem;
          animation:fadeUp .45s cubic-bezier(.16,1,.3,1) both
        }
        .sh-floor-item:hover{background:var(--green-pale)}
        .sh-floor-left{display:flex;align-items:center;gap:.85rem}
        .sh-floor-num{
          width:40px;height:40px;border-radius:10px;
          background:linear-gradient(135deg,var(--green-deep),var(--green));
          color:#fff;font-family:'Playfair Display',serif;
          font-size:1rem;font-weight:600;
          display:flex;align-items:center;justify-content:center;
          flex-shrink:0;box-shadow:0 2px 8px rgba(22,163,74,.3)
        }
        .sh-floor-name{font-size:.9rem;font-weight:500;color:var(--text-body)}
        .sh-floor-sub{font-size:.75rem;color:var(--muted);margin-top:2px;font-family:'JetBrains Mono',monospace}
        .sh-floor-arrow{color:var(--muted);transition:transform .2s,color .2s}
        .sh-floor-item:hover .sh-floor-arrow{transform:translateX(3px);color:var(--green)}

        /* zones grid */
        .sh-zones-grid{padding:.9rem;display:grid;grid-template-columns:repeat(auto-fill,minmax(160px,1fr));gap:.7rem}
        .sh-zone-chip{
          display:flex;align-items:center;gap:.6rem;
          background:var(--surface2);border:1.5px solid var(--border);
          border-radius:11px;padding:.7rem .9rem;
          transition:all .2s;cursor:pointer
        }
        .sh-zone-chip:hover{border-color:rgba(22,163,74,.3);background:var(--green-pale);transform:translateY(-1px)}
        .sh-zone-dot{width:8px;height:8px;border-radius:50%;background:var(--teal);flex-shrink:0;box-shadow:0 0 5px rgba(13,148,136,.4)}
        .sh-zone-name{font-size:.82rem;font-weight:500;color:var(--text-body);white-space:nowrap;overflow:hidden;text-overflow:ellipsis}

        /* empty */
        .sh-empty{padding:2.5rem;text-align:center;color:var(--muted)}
        .sh-empty-icon{font-size:2.2rem;margin-bottom:.6rem}
        .sh-empty-text{font-size:.84rem}

        /* infobar */
        .sh-infobar{display:flex;align-items:center;justify-content:center;gap:8px;margin-top:2.5rem;font-family:'JetBrains Mono',monospace;font-size:.6rem;color:var(--muted);letter-spacing:.09em;animation:fadeUp .6s .5s both}
        .sh-dot{width:3px;height:3px;border-radius:50%;background:var(--green);opacity:.5}

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

        @media(max-width:640px){.sh-hero-row{flex-direction:column}.sh-meta{align-items:flex-start}.sh-title{font-size:1.6rem}}
      `}</style>

      <div className="sh-root">
        <div className="sh-mesh"/><div className="sh-grid"/><div className="sh-scan"/>
        <div className="sh-particles" ref={particlesRef}/>
        <div className="sh-corner sh-corner--tl"/><div className="sh-corner sh-corner--tr"/>
        <div className="sh-corner sh-corner--bl"/><div className="sh-corner sh-corner--br"/>

        <div className="sh-wrap">

          {/* Nav */}
          <div className="sh-nav">
            <div className="sh-breadcrumb">
              <a onClick={() => router.visit('/buildings')}>🌿 Buildings</a>
              <span className="sh-breadcrumb-sep">›</span>
              <span>{building.name}</span>
            </div>
            <div className="sh-nav-btns">
              <button className="sh-nbtn sh-nbtn-dash" onClick={() => router.visit(`/buildings/${building.id}/dashboard`)}>
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/></svg>
                Dashboard
              </button>
              <button className="sh-nbtn sh-nbtn-edit" onClick={() => router.visit(`/buildings/${building.id}/edit`)}>
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
                Edit
              </button>
              <button className="sh-nbtn sh-nbtn-deact" onClick={handleDeactivate}>
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2"><circle cx="12" cy="12" r="10"/><line x1="4.93" y1="4.93" x2="19.07" y2="19.07"/></svg>
                Deactivate
              </button>
            </div>
          </div>

          {/* Hero */}
          <div className="sh-hero">
            <div className="sh-hero-bar"/>
            <div className="sh-hero-body">
              <div className="sh-eyebrow"><span className="sh-ey-line"/>Building Details<span className="sh-ey-line"/></div>
              <div className="sh-hero-row">
                <div>
                  <h1 className="sh-title"><span className="sh-title-accent">{building.name}</span></h1>
                  <p className="sh-desc">{building.description || <span style={{fontStyle:'italic',opacity:.6}}>No description provided.</span>}</p>
                </div>
                <div className="sh-meta">
                  <div className="sh-code-chip">
                    <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="M7 10l2 2-2 2M11 14h4"/></svg>
                    {building.code}
                  </div>
                  <div className="sh-active-badge">
                    <span className="sh-active-dot"/>Active
                  </div>
                </div>
              </div>
              <div className="sh-divider"/>
              <div className="sh-info-row">
                <div className="sh-info-pill">
                  <div className="sh-info-pill-lbl">Building ID</div>
                  <div className="sh-info-pill-val">#{building.id}</div>
                </div>
                <div className="sh-info-pill">
                  <div className="sh-info-pill-lbl">Total Floors</div>
                  <div className="sh-info-pill-val">{floors.length}</div>
                </div>
                <div className="sh-info-pill">
                  <div className="sh-info-pill-lbl">Total Zones</div>
                  <div className="sh-info-pill-val">{zones.length}</div>
                </div>
                <div className="sh-info-pill">
                  <div className="sh-info-pill-lbl">Status</div>
                  <div className="sh-info-pill-val" style={{color:'var(--green)'}}>Active ✓</div>
                </div>
              </div>
            </div>
          </div>

          {/* Floors */}
          <div className="sh-section">
            <div className="sh-section-card">
              <div className="sh-section-head">
                <div className="sh-section-title">
                  <div className="sh-section-icon" style={{background:'var(--green-pale)',color:'var(--green)'}}>
                    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M3 21h18M3 7h18M3 14h18M4 3h16a1 1 0 0 1 1 1v17H3V4a1 1 0 0 1 1-1z"/></svg>
                  </div>
                  Floors
                </div>
                <div className="sh-section-actions">
                  <button
                    className="sh-mini-btn sh-mini-btn-floor"
                    onClick={() => router.visit(`/buildings/${building.id}/floors/create`)}
                  >
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
                    Create Floor
                  </button>
                  <span className="sh-count-badge">{floors.length} total</span>
                </div>
              </div>

              {floors.length === 0 ? (
                <div className="sh-empty">
                  <div className="sh-empty-icon">🏗️</div>
                  <div className="sh-empty-text">No floors registered yet.</div>
                </div>
              ) : (
                <div className="sh-floors-list">
                  {floors.map((floor: any, i: number) => (
                    <div
                      key={floor.id}
                      className="sh-floor-item"
                      style={{ animationDelay: `${0.05 * i}s` }}
                      onClick={() => showFloorDetail(floor)}
                    >
                      <div className="sh-floor-left">
                        <div className="sh-floor-num">{floor.floorNumber}</div>
                        <div>
                          <div className="sh-floor-name">{floor.name || `Floor ${floor.floorNumber}`}</div>
                          <div className="sh-floor-sub">Floor #{floor.floorNumber} · click for details</div>
                        </div>
                      </div>
                      <svg className="sh-floor-arrow" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M9 18l6-6-6-6"/>
                      </svg>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Zones */}
          <div className="sh-section">
            <div className="sh-section-card">
              <div className="sh-section-head">
                <div className="sh-section-title">
                  <div className="sh-section-icon" style={{background:'#ccfbf1',color:'var(--teal)'}}>
                    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
                  </div>
                  Zones
                </div>
                <div className="sh-section-actions">
                  <button className="sh-mini-btn sh-mini-btn-zone" onClick={handleCreateZone}>
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
                    Create Zone
                  </button>
                  <span className="sh-count-badge">{zones.length} zones</span>
                </div>
              </div>

              {zones.length === 0 ? (
                <div className="sh-empty">
                  <div className="sh-empty-icon">🧭</div>
                  <div className="sh-empty-text">No zones created yet.</div>
                </div>
              ) : (
                <div className="sh-zones-grid">
                  {zones.map((zone: any) => (
                    <div key={zone.id} className="sh-zone-chip" onClick={() => showZoneActions(zone)}>
                      <span className="sh-zone-dot"/>
                      <span className="sh-zone-name">{zone.name || `Zone ${zone.id}`}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className="sh-infobar">
            <span>🌿 SWACHH CAMPUS</span><span className="sh-dot"/>
            <span>BUILDING DETAILS</span><span className="sh-dot"/>
            <span>{new Date().getFullYear()}</span>
          </div>
        </div>
      </div>
    </>
  )
}
