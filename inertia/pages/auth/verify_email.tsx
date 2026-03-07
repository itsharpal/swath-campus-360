import { Link } from '@adonisjs/inertia/react'

interface Props {
  status: 'success' | 'error' | 'info'
  title: string
  message: string
}

const statusStyles = {
  success: {
    badgeBg: '#dcfce7',
    badgeColor: '#166534',
    iconBg: '#22c55e',
    ring: 'rgba(34,197,94,0.25)',
    buttonBg: '#16a34a',
  },
  error: {
    badgeBg: '#fee2e2',
    badgeColor: '#991b1b',
    iconBg: '#ef4444',
    ring: 'rgba(239,68,68,0.25)',
    buttonBg: '#dc2626',
  },
  info: {
    badgeBg: '#dbeafe',
    badgeColor: '#1e3a8a',
    iconBg: '#3b82f6',
    ring: 'rgba(59,130,246,0.25)',
    buttonBg: '#2563eb',
  },
} as const

export default function VerifyEmail({ status, title, message }: Props) {
  const style = statusStyles[status]

  return (
    <div
      style={{
        minHeight: '100vh',
        background:
          'radial-gradient(ellipse at 10% 20%, rgba(134,239,172,0.30) 0%, transparent 55%), radial-gradient(ellipse at 90% 80%, rgba(74,222,128,0.20) 0%, transparent 55%), #edfbf3',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '24px',
        fontFamily: "'DM Sans', 'Segoe UI', sans-serif",
      }}
    >
      <div
        style={{
          width: '100%',
          maxWidth: '560px',
          background: '#ffffff',
          borderRadius: '18px',
          border: '1px solid #d1fae5',
          boxShadow: '0 8px 34px rgba(22,163,74,0.14)',
          padding: '2rem 2rem 1.8rem',
          textAlign: 'center',
        }}
      >
        <div
          style={{
            width: '62px',
            height: '62px',
            borderRadius: '999px',
            margin: '0 auto 0.9rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: style.iconBg,
            boxShadow: `0 0 0 8px ${style.ring}`,
          }}
        >
          {status === 'success' && (
            <svg width="28" height="28" fill="none" stroke="#ffffff" strokeWidth="2.5" viewBox="0 0 24 24">
              <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          )}
          {status === 'error' && (
            <svg width="28" height="28" fill="none" stroke="#ffffff" strokeWidth="2.5" viewBox="0 0 24 24">
              <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          )}
          {status === 'info' && (
            <svg width="28" height="28" fill="none" stroke="#ffffff" strokeWidth="2.5" viewBox="0 0 24 24">
              <path d="M12 8h.01M11 12h1v4h1" strokeLinecap="round" strokeLinejoin="round" />
              <circle cx="12" cy="12" r="10" />
            </svg>
          )}
        </div>

        <span
          style={{
            display: 'inline-block',
            fontSize: '0.74rem',
            fontWeight: 700,
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
            borderRadius: '999px',
            padding: '5px 10px',
            background: style.badgeBg,
            color: style.badgeColor,
            marginBottom: '0.9rem',
          }}
        >
          Email Verification
        </span>

        <h1 style={{ margin: 0, color: '#0f172a', fontSize: '1.55rem', fontWeight: 800 }}>{title}</h1>
        <p style={{ margin: '0.75rem 0 1.4rem', color: '#475569', fontSize: '0.95rem', lineHeight: 1.6 }}>
          {message}
        </p>

        <div style={{ display: 'flex', justifyContent: 'center', gap: '0.7rem', flexWrap: 'wrap' }}>
          <Link
            href="/login"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              minWidth: '150px',
              textDecoration: 'none',
              color: '#ffffff',
              background: style.buttonBg,
              fontWeight: 700,
              borderRadius: '10px',
              padding: '0.72rem 1rem',
            }}
          >
            Go to Login
          </Link>

          <Link
            href="/"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              minWidth: '120px',
              textDecoration: 'none',
              color: '#166534',
              background: '#f0fdf4',
              border: '1px solid #bbf7d0',
              fontWeight: 700,
              borderRadius: '10px',
              padding: '0.72rem 1rem',
            }}
          >
            Home
          </Link>
        </div>
      </div>

      <style>{`@import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700;800&display=swap');`}</style>
    </div>
  )
}
