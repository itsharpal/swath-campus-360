import { useEffect, useRef } from 'react'
import { Link } from '@adonisjs/inertia/react'

export default function ServerError() {
  const hasAlerted = useRef(false)

  useEffect(() => {
    if (hasAlerted.current) return
    hasAlerted.current = true

    const loadSwal = async () => {
      const Swal = (await import('sweetalert2')).default
      Swal.fire({
        toast: true,
        position: 'top-end',
        icon: 'error',
        title: 'Server Error',
        text: 'Something went wrong on our end.',
        showConfirmButton: false,
        timer: 4000,
        timerProgressBar: true,
        background: '#ffffff',
        color: '#0f172a',
        iconColor: '#ef4444',
        customClass: {
          popup: 'swal-campus-toast',
        },
      })
    }
    loadSwal()
  }, [])

  async function handleRetry() {
    const Swal = (await import('sweetalert2')).default

    Swal.fire({
      title: 'Retrying…',
      text: 'Attempting to reconnect to the server.',
      icon: 'info',
      showConfirmButton: false,
      timer: 1800,
      timerProgressBar: true,
      background: '#ffffff',
      iconColor: '#16a34a',
      customClass: { popup: 'swal-campus-popup' },
      willClose: () => {
        window.location.reload()
      },
    })
  }

  return (
    <div
      style={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #f0fdf4 0%, #dcfce7 50%, #f0fdf4 100%)',
        fontFamily: "'DM Sans', 'Segoe UI', sans-serif",
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '2rem',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Background rings */}
      <div style={{
        position: 'fixed', top: '-100px', left: '-100px',
        width: '400px', height: '400px', borderRadius: '50%',
        border: '2px solid rgba(22,163,74,0.08)', pointerEvents: 'none',
      }} />
      <div style={{
        position: 'fixed', top: '-60px', left: '-60px',
        width: '280px', height: '280px', borderRadius: '50%',
        border: '1.5px solid rgba(22,163,74,0.05)', pointerEvents: 'none',
      }} />
      <div style={{
        position: 'fixed', bottom: '-100px', right: '-100px',
        width: '420px', height: '420px', borderRadius: '50%',
        border: '2px solid rgba(22,163,74,0.07)', pointerEvents: 'none',
      }} />
      <div style={{
        position: 'fixed', bottom: '-50px', right: '-50px',
        width: '260px', height: '260px', borderRadius: '50%',
        border: '1.5px solid rgba(22,163,74,0.05)', pointerEvents: 'none',
      }} />

      {/* Floating dots */}
      {[
        { top: '12%', left: '7%', size: 5, opacity: 0.35, delay: 0 },
        { top: '22%', right: '10%', size: 4, opacity: 0.28, delay: 0.4 },
        { top: '65%', left: '4%', size: 6, opacity: 0.3, delay: 0.8 },
        { top: '78%', right: '7%', size: 5, opacity: 0.25, delay: 0.2 },
        { top: '40%', left: '93%', size: 4, opacity: 0.3, delay: 0.6 },
      ].map((dot, i) => (
        <div key={i} style={{
          position: 'fixed',
          top: dot.top,
          left: (dot as any).left,
          right: (dot as any).right,
          width: dot.size, height: dot.size,
          borderRadius: '50%', background: '#16a34a',
          opacity: dot.opacity, pointerEvents: 'none',
          animation: `float-dot ${3 + i * 0.5}s ease-in-out ${dot.delay}s infinite alternate`,
        }} />
      ))}

      {/* Main card */}
      <div
        style={{
          background: '#ffffff',
          borderRadius: '24px',
          boxShadow: '0 4px 40px rgba(0,0,0,0.08)',
          border: '1px solid rgba(22,163,74,0.12)',
          padding: '3.5rem 3rem',
          maxWidth: '540px',
          width: '100%',
          textAlign: 'center',
          animation: 'card-enter 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) both',
        }}
      >
        {/* Header badge */}
        <div style={{
          display: 'inline-flex', alignItems: 'center', gap: '8px',
          marginBottom: '1.5rem',
        }}>
          <div style={{ width: '24px', height: '2px', background: '#16a34a' }} />
          <span style={{
            fontSize: '10px', fontWeight: 700, letterSpacing: '0.18em',
            color: '#16a34a', textTransform: 'uppercase',
          }}>Swachh Campus</span>
          <div style={{ width: '24px', height: '2px', background: '#16a34a' }} />
        </div>

        {/* 500 number */}
        <div style={{ position: 'relative', marginBottom: '1rem' }}>
          <div style={{
            fontSize: '9rem', fontWeight: 900, lineHeight: 1,
            color: 'transparent',
            backgroundImage: 'linear-gradient(135deg, #bbf7d0 0%, #4ade80 40%, #16a34a 100%)',
            WebkitBackgroundClip: 'text',
            backgroundClip: 'text',
            userSelect: 'none',
            letterSpacing: '-4px',
            animation: 'number-shake 4s ease-in-out infinite',
          }}>
            500
          </div>

          {/* Error icon overlay */}
          <div style={{
            position: 'absolute', top: '50%', left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '64px', height: '64px', borderRadius: '16px',
            background: 'rgba(239,68,68,0.07)',
            border: '1.5px solid rgba(239,68,68,0.18)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            animation: 'icon-pulse 2s ease-in-out infinite',
          }}>
            <svg width="28" height="28" fill="none" stroke="#ef4444" strokeWidth="1.7" viewBox="0 0 24 24">
              <path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" strokeLinecap="round" strokeLinejoin="round"/>
              <line x1="12" y1="9" x2="12" y2="13" strokeLinecap="round"/>
              <circle cx="12" cy="17" r="0.5" fill="#ef4444"/>
            </svg>
          </div>
        </div>

        {/* Text */}
        <h1 style={{
          fontSize: '1.7rem', fontWeight: 800, color: '#0f172a',
          margin: '0 0 0.6rem', lineHeight: 1.2,
        }}>
          Something Went <span style={{ color: '#16a34a' }}>Wrong</span>
        </h1>
        <p style={{
          color: '#64748b', fontSize: '0.95rem', lineHeight: 1.6,
          margin: '0 0 1.2rem',
        }}>
          Our server encountered an unexpected error. Our team has been notified and is working on a fix.
        </p>

        {/* Error pill */}
        <div style={{
          display: 'inline-flex', alignItems: 'center', gap: '6px',
          padding: '6px 14px', borderRadius: '20px',
          background: 'rgba(239,68,68,0.07)', border: '1px solid rgba(239,68,68,0.18)',
          marginBottom: '2rem',
        }}>
          <div style={{
            width: '7px', height: '7px', borderRadius: '50%',
            background: '#ef4444', animation: 'blink 1.2s ease-in-out infinite',
          }} />
          <span style={{ fontSize: '0.75rem', fontWeight: 600, color: '#ef4444' }}>
            Error 500 — Internal Server Error
          </span>
        </div>

        {/* Divider */}
        <div style={{
          height: '1px', background: 'linear-gradient(90deg, transparent, #dcfce7, transparent)',
          margin: '0 0 2rem',
        }} />

        {/* Actions */}
        <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
          <button
            onClick={handleRetry}
            style={{
              display: 'inline-flex', alignItems: 'center', gap: '8px',
              padding: '0.8rem 1.75rem',
              background: 'linear-gradient(135deg, #16a34a, #15803d)',
              color: '#fff', borderRadius: '12px',
              fontWeight: 700, fontSize: '0.88rem',
              border: 'none', cursor: 'pointer',
              boxShadow: '0 4px 14px rgba(22,163,74,0.35)',
              transition: 'transform 0.2s, box-shadow 0.2s',
              fontFamily: "'DM Sans', sans-serif",
            }}
            onMouseEnter={e => {
              (e.currentTarget as HTMLElement).style.transform = 'translateY(-1px)'
              ;(e.currentTarget as HTMLElement).style.boxShadow = '0 6px 20px rgba(22,163,74,0.45)'
            }}
            onMouseLeave={e => {
              (e.currentTarget as HTMLElement).style.transform = 'translateY(0)'
              ;(e.currentTarget as HTMLElement).style.boxShadow = '0 4px 14px rgba(22,163,74,0.35)'
            }}
          >
            <svg width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
              <polyline points="23 4 23 10 17 10"/>
              <path d="M20.49 15a9 9 0 11-2.12-9.36L23 10" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            Retry
          </button>

          <Link
            href="/"
            style={{
              display: 'inline-flex', alignItems: 'center', gap: '8px',
              padding: '0.8rem 1.75rem',
              background: '#f0fdf4', color: '#16a34a',
              border: '1.5px solid #bbf7d0', borderRadius: '12px',
              fontWeight: 700, fontSize: '0.88rem',
              textDecoration: 'none',
              transition: 'transform 0.2s, background 0.2s',
            }}
            onMouseEnter={e => {
              (e.currentTarget as HTMLElement).style.transform = 'translateY(-1px)'
              ;(e.currentTarget as HTMLElement).style.background = '#dcfce7'
            }}
            onMouseLeave={e => {
              (e.currentTarget as HTMLElement).style.transform = 'translateY(0)'
              ;(e.currentTarget as HTMLElement).style.background = '#f0fdf4'
            }}
          >
            <svg width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
              <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" strokeLinecap="round" strokeLinejoin="round"/>
              <polyline points="9 22 9 12 15 12 15 22"/>
            </svg>
            Go to Dashboard
          </Link>
        </div>

        {/* Status info */}
        <div style={{
          marginTop: '2rem', padding: '1rem',
          background: '#f8fafc', borderRadius: '12px',
          border: '1px solid #f1f5f9',
        }}>
          <p style={{ margin: 0, fontSize: '0.78rem', color: '#94a3b8', lineHeight: 1.6 }}>
            If this error persists, please contact your system administrator or{' '}
            <span style={{ color: '#16a34a', fontWeight: 600 }}>raise a support ticket</span>.
          </p>
        </div>

        {/* Footer */}
        <p style={{
          marginTop: '1.5rem', fontSize: '0.75rem', color: '#94a3b8',
          letterSpacing: '0.06em',
        }}>
          ✕ SWACHH CAMPUS • CAMPUS REGISTRY • 2026
        </p>
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700;800;900&display=swap');

        @keyframes card-enter {
          from { opacity: 0; transform: translateY(24px) scale(0.97); }
          to   { opacity: 1; transform: translateY(0) scale(1); }
        }
        @keyframes number-shake {
          0%, 90%, 100% { transform: rotate(0deg); }
          92%  { transform: rotate(-1.5deg); }
          94%  { transform: rotate(1.5deg); }
          96%  { transform: rotate(-1deg); }
          98%  { transform: rotate(1deg); }
        }
        @keyframes icon-pulse {
          0%, 100% { transform: translate(-50%, -50%) scale(1); box-shadow: 0 0 0 0 rgba(239,68,68,0.15); }
          50% { transform: translate(-50%, -50%) scale(1.05); box-shadow: 0 0 0 8px rgba(239,68,68,0); }
        }
        @keyframes float-dot {
          from { transform: translateY(0px); }
          to   { transform: translateY(-8px); }
        }
        @keyframes blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.3; }
        }
        .swal-campus-toast {
          border-radius: 12px !important;
          font-family: 'DM Sans', sans-serif !important;
          box-shadow: 0 4px 20px rgba(0,0,0,0.1) !important;
        }
        .swal-campus-popup {
          border-radius: 16px !important;
          font-family: 'DM Sans', sans-serif !important;
        }
      `}</style>
    </div>
  )
}
