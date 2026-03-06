import { Data } from '@generated/data'
import { toast, Toaster } from 'sonner'
import { usePage } from '@inertiajs/react'
import { ReactElement, useEffect } from 'react'
import { Form, Link } from '@adonisjs/inertia/react'

export default function Layout({ children }: { children: ReactElement<Data.SharedProps> }) {
  useEffect(() => {
    toast.dismiss()
  }, [usePage().url])

  if (children.props.flash.error) {
    toast.error(children.props.flash.error)
  }

  if (children.props.flash.success) {
    toast.success(children.props.flash.success)
  }

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=DM+Sans:wght@300;400;500;600&display=swap');

        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        body {
          font-family: 'DM Sans', sans-serif;
          background: #edfbf3;
          min-height: 100vh;
          color: #111827;
        }

        /* ── HEADER ── */
        .sc-header {
          position: sticky;
          top: 0;
          z-index: 50;
          background: rgba(255, 255, 255, 0.92);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          border-bottom: 1px solid rgba(22, 163, 74, 0.12);
          box-shadow: 0 1px 0 rgba(22, 163, 74, 0.06);
        }

        .sc-header-inner {
          max-width: 1280px;
          margin: 0 auto;
          padding: 0 32px;
          height: 60px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 24px;
        }

        /* Logo */
        .sc-logo-link {
          display: flex;
          align-items: center;
          color: #0f2d1a;
          text-decoration: none;
          flex-shrink: 0;
          transition: opacity 0.15s;
        }
        .sc-logo-link:hover { opacity: 0.8; }

        /* Nav */
        .sc-nav {
          display: flex;
          align-items: center;
          gap: 4px;
        }

        .sc-nav-link {
          display: inline-flex;
          align-items: center;
          padding: 7px 14px;
          border-radius: 8px;
          font-size: 13.5px;
          font-weight: 500;
          color: #374151;
          text-decoration: none;
          transition: background 0.15s, color 0.15s;
          white-space: nowrap;
        }
        .sc-nav-link:hover {
          background: #f0fdf4;
          color: #15803d;
        }

        /* User initials badge */
        .sc-user-badge {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 34px;
          height: 34px;
          border-radius: 50%;
          background: linear-gradient(135deg, #16a34a, #4ade80);
          color: white;
          font-size: 12px;
          font-weight: 700;
          letter-spacing: 0.03em;
          margin-right: 4px;
          flex-shrink: 0;
          box-shadow: 0 2px 8px rgba(22, 163, 74, 0.3);
        }

        /* Logout button */
        .sc-logout-btn {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          padding: 8px 18px;
          background: #0f2d1a;
          color: white;
          border: none;
          border-radius: 8px;
          font-size: 13.5px;
          font-weight: 600;
          font-family: 'DM Sans', sans-serif;
          cursor: pointer;
          letter-spacing: 0.02em;
          transition: background 0.15s, transform 0.12s;
          white-space: nowrap;
        }
        .sc-logout-btn:hover {
          background: #16a34a;
          transform: translateY(-1px);
        }
        .sc-logout-btn:active { transform: translateY(0); }

        /* Auth links (login/signup) */
        .sc-auth-signup {
          display: inline-flex;
          align-items: center;
          padding: 7px 14px;
          border-radius: 8px;
          font-size: 13.5px;
          font-weight: 500;
          color: #374151;
          text-decoration: none;
          transition: background 0.15s, color 0.15s;
        }
        .sc-auth-signup:hover { background: #f0fdf4; color: #15803d; }

        .sc-auth-login {
          display: inline-flex;
          align-items: center;
          padding: 8px 18px;
          background: #16a34a;
          color: white;
          border-radius: 8px;
          font-size: 13.5px;
          font-weight: 600;
          text-decoration: none;
          margin-left: 4px;
          transition: background 0.15s, transform 0.12s;
        }
        .sc-auth-login:hover { background: #15803d; transform: translateY(-1px); }

        /* ── MAIN ── */
        .sc-main {
          min-height: calc(100vh - 60px - 52px);
        }

        /* ── FOOTER ── */
        .sc-footer {
          border-top: 1px solid rgba(22, 163, 74, 0.1);
          background: rgba(255,255,255,0.6);
          padding: 0 32px;
        }

        .sc-footer-inner {
          max-width: 1280px;
          margin: 0 auto;
          height: 52px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .sc-footer-text {
          font-size: 11px;
          color: #9ca3af;
          letter-spacing: 0.08em;
          text-transform: uppercase;
        }

        /* ── SONNER OVERRIDES (match green theme) ── */
        [data-sonner-toast][data-type="success"] {
          background: #f0fdf4 !important;
          border-color: #bbf7d0 !important;
          color: #14532d !important;
        }
        [data-sonner-toast][data-type="error"] {
          background: #fef2f2 !important;
          border-color: #fecaca !important;
          color: #7f1d1d !important;
        }
      `}</style>

      {/* ── Header ── */}
      <header className="sc-header">
        <div className="sc-header-inner">

          {/* Logo */}
          <Link route="home" className="sc-logo-link">
  <span style={{
    fontFamily: "'DM Serif Display', serif",
    fontSize: "20px",
    fontWeight: 600,
    letterSpacing: "0.04em",
    color: "#0f2d1a"
  }}>
    Swachh Campus
  </span>
</Link>

          {/* Nav */}
          <nav className="sc-nav">
            {children.props.user ? (
              <>
                <Link route="complaints.create" className="sc-nav-link">File Complaint</Link>
                <Link route="complaints.index" className="sc-nav-link">Public Complaints</Link>
                <Link route="complaints.my" className="sc-nav-link">My Complaints</Link>
                <Link route="profile.show" className="sc-nav-link">My Profile</Link>

                <span className="sc-user-badge">{children.props.user.initials}</span>

                <Form route="auth.logout">
                  <button type="submit" className="sc-logout-btn">
                    Logout
                  </button>
                </Form>
              </>
            ) : (
              <>
                <Link route="auth.show_register" className="sc-auth-signup">Signup</Link>
                <Link route="auth.show_login" className="sc-auth-login">Login</Link>
              </>
            )}
          </nav>

        </div>
      </header>

      {/* ── Main Content ── */}
      <main className="sc-main">{children}</main>

      {/* ── Footer ── */}
      <footer className="sc-footer">
        <div className="sc-footer-inner">
          <p className="sc-footer-text">✦ Swachh Campus • Campus Registry • 2026</p>
        </div>
      </footer>

      <Toaster position="top-center" richColors />
    </>
  )
}
