import { useForm } from '@inertiajs/react'
import React, { useState, useEffect, useRef } from 'react'

// Install: npm install sweetalert2
// SweetAlert2 + fonts loaded dynamically.

export default function EditBuilding({ building }: any) {
  const { data, setData, put, processing, errors } = useForm({
    name:        building.name        ?? '',
    code:        building.code        ?? '',
    description: building.description ?? '',
    supervisorId: building.supervisorId ?? '',
  })

  const [focused, setFocused]   = useState<string | null>(null)
  const cardRef                  = useRef<HTMLDivElement>(null)
  const particlesRef             = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const injectLink = (href: string) => {
      if (document.querySelector(`link[href="${href}"]`)) return
      const el = document.createElement('link')
      el.rel = 'stylesheet'; el.href = href
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
    for (let i = 0; i < 20; i++) {
      const p = document.createElement('div')
      p.className = 'cb-particle'
      const size = 4 + Math.random() * 7
      p.style.cssText = `
        left:${Math.random() * 100}%;
        top:${100 + Math.random() * 20}%;
        width:${size}px; height:${size}px;
        animation-delay:${Math.random() * 9}s;
        animation-duration:${8 + Math.random() * 10}s;
        opacity:${0.15 + Math.random() * 0.3};
        border-radius:${Math.random() > 0.5 ? '50%' : '2px 8px 2px 8px'};
      `
      container.appendChild(p)
    }
  }, [])

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current; if (!card) return
    const { left, top, width, height } = card.getBoundingClientRect()
    const x = ((e.clientX - left) / width  - 0.5) * 8
    const y = ((e.clientY - top)  / height - 0.5) * -8
    card.style.transform = `perspective(900px) rotateX(${y}deg) rotateY(${x}deg) translateY(-4px)`
  }
  const handleMouseLeave = () => {
    if (cardRef.current)
      cardRef.current.style.transform = 'perspective(900px) rotateX(0deg) rotateY(0deg) translateY(0)'
  }

  const swalBase = {
    background: '#ffffff',
    color: '#1a3a2a',
    customClass: {
      popup:         'cb-swal-popup',
      title:         'cb-swal-title',
      confirmButton: 'cb-swal-btn',
      cancelButton:  'cb-swal-btn-cancel',
    },
  }

  function submit(e: React.FormEvent) {
    e.preventDefault()
    const Swal = (window as any).Swal
    if (!Swal) { put(`/buildings/${building.id}`); return }

    if (!data.name.trim() || !data.code.trim()) {
      Swal.fire({ ...swalBase, icon: 'warning', iconColor: '#f59e0b',
        title: 'Missing Fields',
        text: 'Building Name and Code are required.',
        confirmButtonColor: '#16a34a',
      })
      return
    }

    Swal.fire({ ...swalBase,
      title: 'Updating…',
      html: '<span style="color:#4a7c59;font-size:.85rem">Saving your changes to Swachh Campus…</span>',
      allowOutsideClick: false,
      didOpen: () => Swal.showLoading(),
    })

    put(`/buildings/${building.id}`, {
      onSuccess: () => {
        Swal.fire({ ...swalBase,
          icon: 'success', iconColor: '#16a34a',
          title: '🌿 Building Updated!',
          html: `<span style="color:#4a7c59">
            <b style="color:#15803d">${data.name}</b> has been updated successfully.
          </span>`,
          confirmButtonText: 'View Building →',
          confirmButtonColor: '#16a34a',
          timer: 4000,
          timerProgressBar: true,
          showClass: { popup: 'cb-swal-in' },
          hideClass:  { popup: 'cb-swal-out' },
        })
      },
      onError: () => {
        Swal.fire({ ...swalBase,
          icon: 'error', iconColor: '#dc2626',
          title: 'Update Failed',
          text: 'Please check the form and try again.',
          confirmButtonColor: '#16a34a',
        })
      },
    })
  }

  function handleCancel() {
    const Swal = (window as any).Swal
    const originalName = building.name ?? ''
    const originalCode = building.code ?? ''
    const originalDesc = building.description ?? ''
    const isDirty = data.name !== originalName || data.code !== originalCode || data.description !== originalDesc
    if (!isDirty) { window.history.back(); return }
    Swal?.fire({ ...swalBase,
      icon: 'question', iconColor: '#0ea5e9',
      title: 'Discard Changes?',
      text: 'Your edits will be lost.',
      showCancelButton: true,
      confirmButtonText: 'Discard',
      cancelButtonText:  'Keep Editing',
      confirmButtonColor: '#dc2626',
      cancelButtonColor:  '#6b7280',
    }).then((r: any) => { if (r.isConfirmed) window.history.back() })
  }

  const fields = [
    {
      key: 'name', label: 'Building Name', placeholder: 'e.g. Science Block A',
      type: 'input', hint: 'Official name',
      icon: <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M3 21h18M5 21V7l7-4 7 4v14M9 21v-4h6v4"/></svg>,
    },
    {
      key: 'code', label: 'Building Code', placeholder: 'e.g. BLD-001',
      type: 'input', hint: 'Unique ID',
      icon: <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="M7 10l2 2-2 2M11 14h4"/></svg>,
    },
    {
      key: 'description', label: 'Description', placeholder: 'Brief overview of this building…',
      type: 'textarea', hint: '',
      icon: <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="8" y1="13" x2="16" y2="13"/><line x1="8" y1="17" x2="12" y2="17"/></svg>,
    },
  ]

  const filled   = [data.name, data.code, data.description].filter(v => v.trim()).length
  const progress = Math.round((filled / 3) * 100)

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
          --bg:          #f0fdf4;
          --surface:     #ffffff;
          --surface2:    #f8fffe;
          --surface3:    #f0fdf4;
          --border:      rgba(22,163,74,.14);
          --bfocus:      rgba(22,163,74,.55);
          --text:        #14532d;
          --text-body:   #1a3a2a;
          --dim:         #4a7c59;
          --muted:       #86a898;
          --red:         #dc2626;
          --amber:       #f59e0b;
          --check:       #0d9488;
        }
        .cb-root {
          font-family: 'Outfit', sans-serif;
          min-height: 100vh;
          background: var(--bg);
          display: flex; align-items: center; justify-content: center;
          padding: 2rem; position: relative; overflow: hidden;
        }
        .cb-mesh {
          position: fixed; inset: 0; z-index: 0; pointer-events: none;
          background:
            radial-gradient(ellipse 60% 55% at 10% 10%,  rgba(22,163,74,.1)  0%, transparent 65%),
            radial-gradient(ellipse 50% 60% at 90% 85%,  rgba(14,165,233,.08) 0%, transparent 65%),
            radial-gradient(ellipse 45% 45% at 55% 40%,  rgba(13,148,136,.06) 0%, transparent 70%),
            radial-gradient(ellipse 70% 40% at 30% 100%, rgba(34,197,94,.07)  0%, transparent 60%);
          animation: meshDrift 14s ease-in-out infinite alternate;
        }
        @keyframes meshDrift { from { transform: scale(1); } to { transform: scale(1.05); } }
        .cb-grid {
          position: fixed; inset: 0; z-index: 0; pointer-events: none;
          background-image: radial-gradient(circle, rgba(22,163,74,.18) 1px, transparent 1px);
          background-size: 36px 36px;
        }
        .cb-scan {
          position: fixed; left: 0; right: 0; height: 140px; z-index: 0; pointer-events: none;
          background: linear-gradient(180deg, transparent, rgba(22,163,74,.05), rgba(14,165,233,.04), transparent);
          animation: scanDown 11s linear infinite;
        }
        @keyframes scanDown { from { top: -140px; } to { top: 100vh; } }
        .cb-particles { position: fixed; inset: 0; z-index: 0; pointer-events: none; overflow: hidden; }
        .cb-particle {
          position: absolute; background: var(--green-lt);
          animation: particleRise linear infinite;
        }
        @keyframes particleRise {
          0%   { transform: translateY(0) rotate(0deg) scale(1); opacity: 0; }
          10%  { opacity: 1; }
          90%  { opacity: 1; }
          100% { transform: translateY(-100vh) rotate(180deg) scale(.2); opacity: 0; }
        }
        .cb-corner {
          position: fixed; width: 90px; height: 90px; z-index: 0; pointer-events: none;
          animation: cornerPulse 4s ease-in-out infinite alternate;
        }
        @keyframes cornerPulse { from { opacity: .35; } to { opacity: .85; } }
        .cb-corner--tl { top: 24px; left: 24px; border-top: 2px solid rgba(22,163,74,.35); border-left: 2px solid rgba(22,163,74,.35); border-radius: 4px 0 0 0; }
        .cb-corner--tr { top: 24px; right: 24px; border-top: 2px solid rgba(14,165,233,.3); border-right: 2px solid rgba(14,165,233,.3); border-radius: 0 4px 0 0; }
        .cb-corner--bl { bottom: 24px; left: 24px; border-bottom: 2px solid rgba(13,148,136,.3); border-left: 2px solid rgba(13,148,136,.3); border-radius: 0 0 0 4px; }
        .cb-corner--br { bottom: 24px; right: 24px; border-bottom: 2px solid rgba(22,163,74,.35); border-right: 2px solid rgba(22,163,74,.35); border-radius: 0 0 4px 0; }
        .cb-watermark {
          position: fixed; bottom: -60px; right: -60px;
          width: 280px; height: 280px;
          opacity: .04; z-index: 0; pointer-events: none;
          animation: leafSpin 30s linear infinite;
        }
        @keyframes leafSpin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }

        /* ── edit badge — amber tint to distinguish from create ── */
        .cb-edit-ribbon {
          position: absolute;
          top: 18px; right: -28px;
          background: linear-gradient(135deg, #f59e0b, #fbbf24);
          color: #7c2d12;
          font-family: 'JetBrains Mono', monospace;
          font-size: .6rem; font-weight: 500;
          letter-spacing: .1em; text-transform: uppercase;
          padding: 4px 40px;
          transform: rotate(45deg);
          box-shadow: 0 2px 8px rgba(245,158,11,.3);
          z-index: 2;
        }

        .cb-card {
          position: relative; z-index: 1;
          width: 100%; max-width: 540px;
          background: var(--surface);
          border: 1.5px solid rgba(22,163,74,.18);
          border-radius: 24px; overflow: hidden;
          box-shadow:
            0 0 0 1px rgba(22,163,74,.06),
            0 24px 80px rgba(22,163,74,.12),
            0 6px 24px rgba(0,0,0,.07),
            inset 0 1px 0 rgba(255,255,255,.9);
          animation: cardIn .7s cubic-bezier(.16,1,.3,1) both;
          transition: transform .18s cubic-bezier(.22,1,.36,1), box-shadow .18s ease;
          will-change: transform;
        }
        @keyframes cardIn {
          from { opacity: 0; transform: translateY(48px) scale(.93); }
          to   { opacity: 1; transform: translateY(0)   scale(1); }
        }
        .cb-top-bar {
          height: 4px;
          background: linear-gradient(90deg, var(--green-deep), var(--green), var(--teal), var(--sky), var(--green-lt), var(--green-deep));
          background-size: 200% 100%;
          animation: barSlide 3.5s linear infinite;
        }
        @keyframes barSlide { from { background-position: -200% 0; } to { background-position: 200% 0; } }
        .cb-body { padding: 2.2rem 2.4rem 2rem; }

        /* progress */
        .cb-progress { margin-bottom: 1.8rem; animation: fadeUp .5s .05s both; }
        .cb-progress-head { display: flex; justify-content: space-between; align-items: center; margin-bottom: 7px; }
        .cb-prog-label { font-family: 'JetBrains Mono', monospace; font-size: .62rem; letter-spacing: .1em; text-transform: uppercase; color: var(--muted); }
        .cb-prog-pct   { font-family: 'JetBrains Mono', monospace; font-size: .7rem; font-weight: 500; color: var(--green); transition: color .3s; }
        .cb-prog-track { height: 5px; background: var(--green-pale); border-radius: 100px; overflow: hidden; }
        .cb-prog-fill  {
          height: 100%; border-radius: 100px;
          background: linear-gradient(90deg, var(--green-deep), var(--green), var(--teal-lt));
          box-shadow: 0 0 10px var(--green-glow);
          transition: width .55s cubic-bezier(.22,1,.36,1);
        }

        /* header */
        .cb-header { margin-bottom: 1.6rem; animation: fadeUp .5s .12s both; }
        .cb-eyebrow {
          display: inline-flex; align-items: center; gap: 8px;
          font-family: 'JetBrains Mono', monospace;
          font-size: .62rem; letter-spacing: .13em; text-transform: uppercase;
          color: var(--green); margin-bottom: .85rem;
        }
        .cb-ey-line { width: 20px; height: 1.5px; background: var(--green); opacity: .5; border-radius: 2px; }
        .cb-title {
          font-family: 'Playfair Display', serif;
          font-size: 1.95rem; font-weight: 600; color: var(--text);
          letter-spacing: -.025em; line-height: 1.15; margin-bottom: .45rem;
        }
        .cb-title-accent {
          background: linear-gradient(135deg, #f59e0b 0%, var(--green) 50%, var(--teal) 100%);
          background-size: 200% auto;
          -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;
          animation: shimmer 4s linear infinite;
        }
        @keyframes shimmer { from { background-position: 0% center; } to { background-position: 200% center; } }
        .cb-sub { font-size: .84rem; color: var(--muted); font-weight: 300; line-height: 1.6; }
        .cb-badge {
          display: inline-flex; align-items: center; gap: 6px;
          background: #fffbeb; border: 1px solid rgba(245,158,11,.3);
          border-radius: 100px; padding: 3px 12px 3px 8px;
          margin-bottom: 1rem; font-size: .7rem; font-weight: 500; color: #92400e; letter-spacing: .02em;
        }
        .cb-badge-dot {
          width: 7px; height: 7px; border-radius: 50%;
          background: #f59e0b; box-shadow: 0 0 6px rgba(245,158,11,.4);
          animation: dotPulse 2s ease-in-out infinite;
        }
        @keyframes dotPulse { 0%,100% { transform: scale(1); opacity: 1; } 50% { transform: scale(.7); opacity: .5; } }
        .cb-building-id {
          display: inline-flex; align-items: center; gap: 5px;
          font-family: 'JetBrains Mono', monospace;
          font-size: .65rem; color: var(--muted);
          background: var(--green-pale); border: 1px solid rgba(22,163,74,.2);
          border-radius: 6px; padding: 2px 9px; margin-left: 8px;
        }
        .cb-divider {
          height: 1px; margin: 0 0 1.6rem;
          background: linear-gradient(90deg, transparent, rgba(22,163,74,.2), rgba(14,165,233,.15), rgba(22,163,74,.2), transparent);
        }

        /* fields */
        .cb-field { margin-bottom: 1.15rem; animation: fadeUp .55s cubic-bezier(.16,1,.3,1) both; }
        .cb-field:nth-child(1) { animation-delay: .2s; }
        .cb-field:nth-child(2) { animation-delay: .27s; }
        .cb-field:nth-child(3) { animation-delay: .34s; }
        @keyframes fadeUp { from { opacity: 0; transform: translateY(18px); } to { opacity: 1; transform: translateY(0); } }
        .cb-label-row { display: flex; justify-content: space-between; align-items: center; margin-bottom: .48rem; }
        .cb-label { display: flex; align-items: center; gap: 7px; font-size: .78rem; font-weight: 500; color: var(--dim); letter-spacing: .02em; transition: color .2s; }
        .cb-label.act { color: var(--green-deep); }
        .cb-licon { display: flex; align-items: center; color: var(--muted); transition: color .2s; }
        .cb-label.act .cb-licon { color: var(--green); }
        .cb-hint-tag { font-family: 'JetBrains Mono', monospace; font-size: .6rem; color: var(--muted); letter-spacing: .06em; }
        .cb-input-wrap { position: relative; }
        .cb-input, .cb-textarea {
          width: 100%; font-family: 'Outfit', sans-serif;
          font-size: .9rem; font-weight: 400; color: var(--text-body);
          background: var(--surface2); border: 1.5px solid rgba(22,163,74,.18);
          border-radius: 11px; padding: .78rem 1rem;
          outline: none; resize: none; caret-color: var(--green);
          transition: border-color .25s, background .25s, box-shadow .25s;
        }
        .cb-input::placeholder, .cb-textarea::placeholder { color: #a8c4b0; }
        .cb-input:hover, .cb-textarea:hover { border-color: rgba(22,163,74,.35); background: #f0fdf4; }
        .cb-input:focus, .cb-textarea:focus {
          border-color: var(--bfocus); background: #f0fdf4;
          box-shadow: 0 0 0 3.5px rgba(22,163,74,.1), 0 0 20px rgba(22,163,74,.08);
        }
        .cb-textarea { height: 100px; line-height: 1.65; padding-bottom: 1.8rem; }
        .cb-glow-line {
          position: absolute; bottom: 0; left: 12%; right: 12%;
          height: 2px; border-radius: 100px;
          background: linear-gradient(90deg, transparent, var(--green), var(--teal-lt), transparent);
          opacity: 0; transform: scaleX(0);
          transition: opacity .3s, transform .35s cubic-bezier(.22,1,.36,1); pointer-events: none;
        }
        .cb-input-wrap:has(input:focus) .cb-glow-line,
        .cb-input-wrap:has(textarea:focus) .cb-glow-line { opacity: 1; transform: scaleX(1); }
        .cb-check { position: absolute; right: 11px; top: 50%; transform: translateY(-50%); color: var(--check); opacity: 0; pointer-events: none; transition: opacity .3s, transform .3s; }
        .cb-check.vis { opacity: 1; transform: translateY(-50%) scale(1.15); }
        .cb-chars { position: absolute; bottom: 7px; right: 10px; font-family: 'JetBrains Mono', monospace; font-size: .58rem; color: var(--muted); pointer-events: none; transition: color .2s; }
        .cb-chars.warn { color: var(--amber); }
        .cb-err { display: flex; align-items: center; gap: 5px; font-size: .73rem; color: var(--red); margin-top: .35rem; padding-left: 2px; animation: shake .28s ease; }
        @keyframes shake { 0%,100% { transform: translateX(0); } 25% { transform: translateX(-5px); } 75% { transform: translateX(5px); } }

        /* footer */
        .cb-footer { display: flex; align-items: center; justify-content: space-between; margin-top: 1.7rem; animation: fadeUp .55s .4s both; }
        .cb-cancel {
          display: flex; align-items: center; gap: 6px;
          font-family: 'Outfit', sans-serif; font-size: .84rem; font-weight: 500; color: var(--muted);
          background: none; border: 1.5px solid transparent; border-radius: 10px; padding: .68rem 1rem;
          cursor: pointer; transition: all .2s;
        }
        .cb-cancel:hover { color: var(--dim); border-color: rgba(22,163,74,.2); background: var(--green-pale); }
        .cb-submit {
          position: relative; display: flex; align-items: center; gap: 9px;
          font-family: 'Outfit', sans-serif; font-size: .9rem; font-weight: 600; color: #fff;
          background: linear-gradient(135deg, #f59e0b 0%, var(--green) 50%, var(--teal) 100%);
          border: none; border-radius: 12px; padding: .8rem 1.8rem;
          cursor: pointer; overflow: hidden; background-size: 200% auto;
          animation: btnGradient 5s linear infinite;
          box-shadow: 0 3px 16px rgba(22,163,74,.4), 0 1px 4px rgba(0,0,0,.12), inset 0 1px 0 rgba(255,255,255,.18);
          transition: transform .22s cubic-bezier(.22,1,.36,1), box-shadow .22s;
        }
        @keyframes btnGradient { 0% { background-position: 0% center; } 50% { background-position: 100% center; } 100% { background-position: 0% center; } }
        .cb-submit::after { content: ''; position: absolute; top: 0; left: -110%; width: 100%; height: 100%; background: linear-gradient(90deg, transparent, rgba(255,255,255,.22), transparent); transition: left .5s ease; }
        .cb-submit:hover::after { left: 110%; }
        .cb-submit:hover { transform: translateY(-2px); box-shadow: 0 8px 28px rgba(22,163,74,.45), 0 2px 6px rgba(0,0,0,.12); }
        .cb-submit:active { transform: translateY(0); }
        .cb-submit:disabled { opacity: .55; cursor: not-allowed; transform: none; }
        .cb-arr { display: flex; align-items: center; transition: transform .2s; }
        .cb-submit:hover .cb-arr { transform: translateX(3px); }
        @keyframes spin { to { transform: rotate(360deg); } }
        .cb-spin { width: 16px; height: 16px; border: 2px solid rgba(255,255,255,.3); border-top-color: #fff; border-radius: 50%; animation: spin .65s linear infinite; }
        .cb-infobar { display: flex; align-items: center; justify-content: center; gap: 8px; margin-top: 1.4rem; padding-top: 1.15rem; border-top: 1px solid rgba(22,163,74,.12); font-family: 'JetBrains Mono', monospace; font-size: .6rem; color: var(--muted); letter-spacing: .09em; animation: fadeUp .55s .45s both; }
        .cb-dot { width: 3px; height: 3px; border-radius: 50%; background: var(--green); opacity: .5; }

        /* SweetAlert2 */
        .cb-swal-popup { border-radius: 20px !important; border: 1.5px solid rgba(22,163,74,.2) !important; box-shadow: 0 24px 80px rgba(22,163,74,.15), 0 4px 16px rgba(0,0,0,.08) !important; font-family: 'Outfit', sans-serif !important; }
        .cb-swal-title { font-family: 'Playfair Display', serif !important; color: #14532d !important; letter-spacing: -.02em !important; }
        .cb-swal-btn { border-radius: 10px !important; font-family: 'Outfit', sans-serif !important; font-weight: 600 !important; letter-spacing: .02em !important; padding: 10px 22px !important; transition: transform .18s !important; }
        .cb-swal-btn:hover { transform: translateY(-1px) !important; }
        .cb-swal-btn-cancel { border-radius: 10px !important; font-family: 'Outfit', sans-serif !important; font-weight: 500 !important; }
        .swal2-timer-progress-bar { background: var(--green) !important; }
        .swal2-loader { border-color: var(--green) transparent var(--green) transparent !important; }
        @keyframes swalIn  { from { opacity: 0; transform: scale(.88) translateY(20px); } to { opacity: 1; transform: scale(1) translateY(0); } }
        @keyframes swalOut { from { opacity: 1; transform: scale(1) translateY(0); } to { opacity: 0; transform: scale(.9) translateY(-16px); } }
        .cb-swal-in  { animation: swalIn  .4s cubic-bezier(.16,1,.3,1) both !important; }
        .cb-swal-out { animation: swalOut .28s ease both !important; }
      `}</style>

      <div className="cb-root">
        <div className="cb-mesh" /><div className="cb-grid" /><div className="cb-scan" />
        <div className="cb-particles" ref={particlesRef} />
        <div className="cb-corner cb-corner--tl" /><div className="cb-corner cb-corner--tr" />
        <div className="cb-corner cb-corner--bl" /><div className="cb-corner cb-corner--br" />
        <svg className="cb-watermark" viewBox="0 0 200 200" fill="none">
          <path d="M100 10 C140 10,190 50,190 100 C190 150,150 190,100 190 C50 190,10 150,10 100 C10 50,60 10,100 10Z" fill="#16a34a"/>
          <path d="M100 30 C100 30,60 80,60 120 C60 150,80 170,100 170 C120 170,140 150,140 120 C140 80,100 30,100 30Z" fill="#0d9488" opacity=".6"/>
          <line x1="100" y1="30" x2="100" y2="170" stroke="white" strokeWidth="2" opacity=".4"/>
          <line x1="100" y1="80" x2="70" y2="55" stroke="white" strokeWidth="1.5" opacity=".3"/>
          <line x1="100" y1="80" x2="130" y2="55" stroke="white" strokeWidth="1.5" opacity=".3"/>
        </svg>

        <div className="cb-card" ref={cardRef} onMouseMove={handleMouseMove} onMouseLeave={handleMouseLeave}>
          <div className="cb-top-bar" />
          <div className="cb-edit-ribbon">Edit Mode</div>
          <div className="cb-body">
            {/* Progress */}
            <div className="cb-progress">
              <div className="cb-progress-head">
                <span className="cb-prog-label">Form Completion</span>
                <span className="cb-prog-pct">{progress}%</span>
              </div>
              <div className="cb-prog-track">
                <div className="cb-prog-fill" style={{ width: `${progress}%` }} />
              </div>
            </div>
            {/* Header */}
            <div className="cb-header">
              <div className="cb-badge">
                <span className="cb-badge-dot" />
                Edit Mode
                <span className="cb-building-id">ID #{building.id}</span>
              </div>
              <div className="cb-eyebrow">
                <span className="cb-ey-line" />Campus Registry<span className="cb-ey-line" />
              </div>
              <h1 className="cb-title">Edit <span className="cb-title-accent">Building</span></h1>
              <p className="cb-sub">Update the details for <strong style={{color:'var(--green-deep)'}}>{building.name}</strong> in Swachh Campus.</p>
            </div>
            <div className="cb-divider" />
            {/* Form */}
            <form onSubmit={submit}>
              {fields.map((field) => {
                const val: string = (data as any)[field.key]
                const isActive = focused === field.key
                const isDone   = val.trim().length > 0
                return (
                  <div className="cb-field" key={field.key}>
                    <div className="cb-label-row">
                      <label className={`cb-label${isActive ? ' act' : ''}`}>
                        <span className="cb-licon">{field.icon}</span>{field.label}
                      </label>
                      {field.hint && <span className="cb-hint-tag">{field.hint}</span>}
                    </div>
                    <div className="cb-input-wrap">
                      {field.type === 'textarea' ? (
                        <>
                          <textarea className="cb-textarea" placeholder={field.placeholder} value={val}
                            onChange={(e) => setData(field.key as any, e.target.value)}
                            onFocus={() => setFocused(field.key)} onBlur={() => setFocused(null)} />
                          <span className={`cb-chars${val.length > 180 ? ' warn' : ''}`}>{val.length}/200</span>
                        </>
                      ) : (
                        <>
                          <input className="cb-input" placeholder={field.placeholder} value={val}
                            onChange={(e) => setData(field.key as any, e.target.value)}
                            onFocus={() => setFocused(field.key)} onBlur={() => setFocused(null)}
                            style={{ paddingRight: isDone ? '2.4rem' : undefined }} />
                          <span className={`cb-check${isDone ? ' vis' : ''}`}>
                            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.8"><polyline points="20 6 9 17 4 12" /></svg>
                          </span>
                        </>
                      )}
                      <div className="cb-glow-line" />
                    </div>
                    {(errors as any)[field.key] && (
                      <div className="cb-err">
                        <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
                        {(errors as any)[field.key]}
                      </div>
                    )}
                  </div>
                )
              })}
              <div className="cb-footer">
                <button type="button" className="cb-cancel" onClick={handleCancel}>
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2"><path d="M19 12H5M12 5l-7 7 7 7"/></svg>
                  Cancel
                </button>
                <button type="submit" className="cb-submit" disabled={processing}>
                  {processing ? <span className="cb-spin" /> : <>
                    Save Changes
                    <span className="cb-arr">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                    </span>
                  </>}
                </button>
              </div>
            </form>
            <div className="cb-infobar">
              <span>✏️ SWACHH CAMPUS</span><span className="cb-dot" />
              <span>EDIT BUILDING</span><span className="cb-dot" />
              <span>{new Date().getFullYear()}</span>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}