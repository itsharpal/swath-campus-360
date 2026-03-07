import { Data } from '@generated/data'
import { toast, Toaster } from 'sonner'
import { usePage } from '@inertiajs/react'
import { ReactElement, useEffect } from 'react'
import { Form, Link } from '@adonisjs/inertia/react'

export default function Layout({ children }: { children: ReactElement<Data.SharedProps> }) {
  const roleId = Number((children.props.user as any)?.roleId ?? 0)
  const isAdmin = roleId === 1
  const canSeeSupervisorDashboard = roleId !== 1 && roleId !== 4 && roleId !== 5
  const currentZoneId = Number((children.props as any)?.zone?.id ?? 0)

  async function handleAdminGenerateZoneQr() {
    if (!currentZoneId) return

    try {
      const res = await fetch(`/zones/${currentZoneId}/qr`, { credentials: 'same-origin' })
      if (!res.ok) return

      const json = await res.json()
      const qr = json?.qr
      if (!qr) return

      const targetUrl = `${window.location.origin}/zones/by-qr/${encodeURIComponent(qr)}`
      const qrImg = `https://api.qrserver.com/v1/create-qr-code/?size=360x360&data=${encodeURIComponent(targetUrl)}`

      window.open(qrImg, '_blank', 'noopener,noreferrer')
    } catch {
      // Keep navbar action fail-safe without breaking page rendering.
    }
  }

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

        .sc-nav-button {
          border: none;
          background: transparent;
          cursor: pointer;
          font-family: 'DM Sans', sans-serif;
        }

        .sc-admin-menu {
          position: relative;
        }

        .sc-admin-trigger {
          display: inline-flex;
          align-items: center;
          gap: 7px;
        }

        .sc-admin-caret {
          font-size: 10px;
          color: #64748b;
        }

        .sc-admin-popover {
          position: absolute;
          top: calc(100% + 8px);
          right: 0;
          min-width: 240px;
          background: #ffffff;
          border: 1px solid #d1fae5;
          border-radius: 12px;
          box-shadow: 0 12px 28px rgba(15, 23, 42, 0.12);
          padding: 8px;
          display: none;
          z-index: 60;
        }

        .sc-admin-menu:hover .sc-admin-popover {
          display: block;
        }

        .sc-admin-section {
          padding: 5px 8px;
          font-size: 10px;
          font-weight: 700;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: #94a3b8;
        }

        .sc-admin-item {
          display: block;
          padding: 8px 10px;
          border-radius: 8px;
          color: #334155;
          text-decoration: none;
          font-size: 12.5px;
          font-weight: 500;
          white-space: nowrap;
          transition: background 0.15s, color 0.15s;
        }

        .sc-admin-item:hover {
          background: #f0fdf4;
          color: #15803d;
        }

        .sc-admin-divider {
          height: 1px;
          margin: 6px 0;
          background: #ecfeff;
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
                {!isAdmin && (
                  <Link route="complaints.create" className="sc-nav-link">File Complaint</Link>
                )}
                <Link route="complaints.index" className="sc-nav-link">Public Complaints</Link>
                {!isAdmin && (
                  <Link route="complaints.my" className="sc-nav-link">My Complaints</Link>
                )}
                {isAdmin && (
                  <div className="sc-admin-menu">
                    <span className="sc-nav-link sc-admin-trigger">
                      Admin Tools <span className="sc-admin-caret">▼</span>
                    </span>
                    <div className="sc-admin-popover">
                      <div className="sc-admin-section">Overview</div>
                      <Link href="/admin/dashboard" className="sc-admin-item">Admin Dashboard</Link>
                      <Link href="/admin/users" className="sc-admin-item">Admin Users</Link>

                      <div className="sc-admin-divider" />
                      <div className="sc-admin-section">Buildings</div>
                      <Link href="/buildings" className="sc-admin-item">Manage Buildings</Link>
                      <Link href="/buildings/create" className="sc-admin-item">Create Building</Link>

                      <div className="sc-admin-divider" />
                      <div className="sc-admin-section">Analytics</div>
                      <Link href="/analytics/buildings" className="sc-admin-item">Buildings Analytics</Link>
                      <Link href="/analytics/supervisors" className="sc-admin-item">Supervisor Analytics</Link>
                      <Link href="/analytics/categories" className="sc-admin-item">Category Analytics</Link>
                      <Link href="/analytics/heatmap" className="sc-admin-item">Heatmap Analytics</Link>
                      <Link href="/analytics/trends" className="sc-admin-item">Trends Analytics</Link>
                      <Link href="/analytics/peak-hours" className="sc-admin-item">Peak Hours Analytics</Link>
                    </div>
                  </div>
                )}
                {isAdmin && currentZoneId > 0 && (
                  <>
                    <Link href={`/zones/${currentZoneId}/edit`} className="sc-nav-link">Edit Zone</Link>
                    <button
                      type="button"
                      className="sc-nav-link sc-nav-button"
                      onClick={handleAdminGenerateZoneQr}
                    >
                      Generate QR
                    </button>
                  </>
                )}
                {canSeeSupervisorDashboard && (
                  <Link href="/supervisor/dashboard" className="sc-nav-link">Supervisor Dashboard</Link>
                )}
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
