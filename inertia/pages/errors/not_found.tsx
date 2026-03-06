import { useEffect, useRef } from 'react'
import { Link } from '@adonisjs/inertia/react'

export default function NotFound() {
  const hasAnimated = useRef(false)

  useEffect(() => {
    if (hasAnimated.current) return
    hasAnimated.current = true

    // Subtle entrance toast using SweetAlert2
    const loadSwal = async () => {
      const Swal = (await import('sweetalert2')).default
      Swal.fire({
        toast: true,
        position: 'top-end',
        icon: 'warning',
        title: 'Page not found',
        text: 'The page you\'re looking for doesn\'t exist.',
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        background: '#ffffff',
        color: '#0f172a',
        iconColor: '#f59e0b',
        customClass: {
          popup: 'swal-campus-toast',
        },
      })
    }
    loadSwal()
  }, [])

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
        { top: '15%', left: '8%', size: 6, opacity: 0.4 },
        { top: '25%', right: '12%', size: 4, opacity: 0.3 },
        { top: '70%', left: '5%', size: 5, opacity: 0.35 },
        { top: '80%', right: '8%', size: 7, opacity: 0.25 },
        { top: '45%', left: '92%', size: 4, opacity: 0.3 },
      ].map((dot, i) => (
        <div key={i} style={{
          position: 'fixed',
          top: dot.top, left: (dot as any).left, right: (dot as any).right,
          width: dot.size, height: dot.size,
          borderRadius: '50%', background: '#16a34a',
          opacity: dot.opacity, pointerEvents: 'none',
          animation: `float-dot ${3 + i * 0.4}s ease-in-out infinite alternate`,
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
          maxWidth: '520px',
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

        {/* 404 number */}
        <div style={{ position: 'relative', marginBottom: '1rem' }}>
          <div style={{
            fontSize: '9rem', fontWeight: 900, lineHeight: 1,
            color: 'transparent',
            backgroundImage: 'linear-gradient(135deg, #bbf7d0 0%, #4ade80 40%, #16a34a 100%)',
            WebkitBackgroundClip: 'text',
            backgroundClip: 'text',
            userSelect: 'none',
            letterSpacing: '-4px',
            animation: 'number-pulse 3s ease-in-out infinite',
          }}>
            404
          </div>

          {/* Icon overlay */}
          <div style={{
            position: 'absolute', top: '50%', left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '64px', height: '64px', borderRadius: '16px',
            background: 'rgba(22,163,74,0.08)',
            border: '1.5px solid rgba(22,163,74,0.2)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            animation: 'icon-float 2.5s ease-in-out infinite alternate',
          }}>
            <svg width="28" height="28" fill="none" stroke="#16a34a" strokeWidth="1.7" viewBox="0 0 24 24">
              <circle cx="11" cy="11" r="8"/>
              <path d="M21 21l-4.35-4.35" strokeLinecap="round" strokeLinejoin="round"/>
              <line x1="11" y1="8" x2="11" y2="14" strokeLinecap="round"/>
              <circle cx="11" cy="16.5" r="0.5" fill="#16a34a"/>
            </svg>
          </div>
        </div>

        {/* Text */}
        <h1 style={{
          fontSize: '1.7rem', fontWeight: 800, color: '#0f172a',
          margin: '0 0 0.6rem', lineHeight: 1.2,
        }}>
          Page Not <span style={{ color: '#16a34a' }}>Found</span>
        </h1>
        <p style={{
          color: '#64748b', fontSize: '0.95rem', lineHeight: 1.6,
          margin: '0 0 2rem',
        }}>
          The page you're looking for doesn't exist or has been moved.
          Let's get you back on track.
        </p>

        {/* Divider */}
        <div style={{
          height: '1px', background: 'linear-gradient(90deg, transparent, #dcfce7, transparent)',
          margin: '0 0 2rem',
        }} />

        {/* Actions */}
        <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
          <Link
            href="/"
            style={{
              display: 'inline-flex', alignItems: 'center', gap: '8px',
              padding: '0.8rem 1.75rem',
              background: 'linear-gradient(135deg, #16a34a, #15803d)',
              color: '#fff', borderRadius: '12px',
              fontWeight: 700, fontSize: '0.88rem',
              textDecoration: 'none',
              boxShadow: '0 4px 14px rgba(22,163,74,0.35)',
              transition: 'transform 0.2s, box-shadow 0.2s',
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
              <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" strokeLinecap="round" strokeLinejoin="round"/>
              <polyline points="9 22 9 12 15 12 15 22"/>
            </svg>
            Go to Dashboard
          </Link>

          <button
            onClick={() => window.history.back()}
            style={{
              display: 'inline-flex', alignItems: 'center', gap: '8px',
              padding: '0.8rem 1.75rem',
              background: '#f0fdf4', color: '#16a34a',
              border: '1.5px solid #bbf7d0', borderRadius: '12px',
              fontWeight: 700, fontSize: '0.88rem',
              cursor: 'pointer', transition: 'transform 0.2s, background 0.2s',
              fontFamily: "'DM Sans', sans-serif",
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
              <path d="M19 12H5M12 19l-7-7 7-7" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            Go Back
          </button>
        </div>

        {/* Footer note */}
        <p style={{
          marginTop: '2rem', fontSize: '0.75rem', color: '#94a3b8',
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
        @keyframes number-pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.75; }
        }
        @keyframes icon-float {
          from { transform: translate(-50%, -50%) translateY(0px); }
          to   { transform: translate(-50%, -50%) translateY(-6px); }
        }
        @keyframes float-dot {
          from { transform: translateY(0px); }
          to   { transform: translateY(-8px); }
        }
        .swal-campus-toast {
          border-radius: 12px !important;
          font-family: 'DM Sans', sans-serif !important;
          box-shadow: 0 4px 20px rgba(0,0,0,0.1) !important;
        }
      `}</style>
    </div>
  )
}
