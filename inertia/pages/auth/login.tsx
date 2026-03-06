import { Form } from '@adonisjs/inertia/react'
import { usePage } from '@inertiajs/react'
import { Data } from '@generated/data'
import { useEffect } from 'react'

declare const Swal: any

export default function Login() {
  const page = usePage<Data.SharedProps>()
  const flashError = page.props.flash?.error as string | undefined
  const flashSuccess = page.props.flash?.success as string | undefined
  const verificationLink = page.props.flash?.verificationLink as string | undefined

  useEffect(() => {
    if (flashError) {
      Swal.fire({
        icon: 'error',
        title: 'Login Failed',
        text: flashError,
        confirmButtonColor: '#16a34a',
        background: '#f0fdf4',
        color: '#14532d',
        iconColor: '#dc2626',
      })
    }
    if (flashSuccess) {
      Swal.fire({
        icon: 'success',
        title: 'Success',
        text: flashSuccess,
        confirmButtonColor: '#16a34a',
        background: '#f0fdf4',
        color: '#14532d',
        iconColor: '#16a34a',
      })
    }
  }, [flashError, flashSuccess])

  return (
    <>
      {/* SweetAlert2 CDN */}
      <link
        rel="stylesheet"
        href="https://cdn.jsdelivr.net/npm/sweetalert2@11/dist/sweetalert2.min.css"
      />
      <script src="https://cdn.jsdelivr.net/npm/sweetalert2@11" defer />

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=DM+Sans:wght@300;400;500;600&display=swap');

        * { box-sizing: border-box; margin: 0; padding: 0; }

        body {
          font-family: 'DM Sans', sans-serif;
          background: #edfbf3;
          min-height: 100vh;
        }

        .sc-page {
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          background:
            radial-gradient(ellipse at 10% 20%, rgba(134,239,172,0.35) 0%, transparent 55%),
            radial-gradient(ellipse at 90% 80%, rgba(74,222,128,0.2) 0%, transparent 55%),
            #edfbf3;
          position: relative;
          overflow: hidden;
          padding: 24px;
        }

        /* Corner decorators */
        .sc-page::before {
          content: '';
          position: absolute;
          top: 16px; left: 16px;
          width: 60px; height: 60px;
          border-top: 1.5px solid rgba(22,163,74,0.35);
          border-left: 1.5px solid rgba(22,163,74,0.35);
        }
        .sc-page::after {
          content: '';
          position: absolute;
          bottom: 16px; right: 16px;
          width: 60px; height: 60px;
          border-bottom: 1.5px solid rgba(22,163,74,0.35);
          border-right: 1.5px solid rgba(22,163,74,0.35);
        }

        /* Floating dots */
        .dot {
          position: absolute;
          border-radius: 50%;
          background: #16a34a;
          opacity: 0.5;
        }
        .dot-1 { width: 6px; height: 6px; bottom: 25%; left: 18%; }
        .dot-2 { width: 4px; height: 4px; top: 30%; right: 22%; }
        .dot-3 { width: 5px; height: 5px; bottom: 40%; right: 10%; }
        .dot-4 { width: 3px; height: 3px; top: 55%; left: 8%; }

        .sc-card {
          background: white;
          border-radius: 20px;
          padding: 44px 48px;
          width: 100%;
          max-width: 460px;
          box-shadow: 0 8px 40px rgba(22,163,74,0.1), 0 2px 8px rgba(0,0,0,0.05);
          position: relative;
          animation: cardIn 0.5s cubic-bezier(0.22,1,0.36,1) both;
        }

        @keyframes cardIn {
          from { opacity: 0; transform: translateY(24px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        /* Top accent bar */
        .sc-card::before {
          content: '';
          position: absolute;
          top: 0; left: 48px; right: 48px;
          height: 3px;
          background: linear-gradient(90deg, #16a34a, #4ade80);
          border-radius: 0 0 4px 4px;
        }

        .sc-breadcrumb {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 10px;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: #6b7280;
          margin-bottom: 20px;
        }
        .sc-breadcrumb .chip {
          background: #16a34a;
          color: white;
          padding: 3px 10px;
          border-radius: 20px;
          font-weight: 600;
        }
        .sc-breadcrumb .line {
          flex: 1;
          height: 1px;
          background: rgba(22,163,74,0.25);
          max-width: 40px;
        }

        .sc-title {
          font-family: 'DM Serif Display', serif;
          font-size: 32px;
          color: #0f2d1a;
          margin-bottom: 6px;
          line-height: 1.15;
        }
        .sc-title span { color: #16a34a; font-style: italic; }

        .sc-subtitle {
          font-size: 13.5px;
          color: #6b7280;
          margin-bottom: 30px;
          line-height: 1.5;
        }

        .sc-field {
          margin-bottom: 18px;
        }

        .sc-label-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 6px;
        }

        .sc-label {
          font-size: 12.5px;
          font-weight: 600;
          color: #374151;
          display: flex;
          align-items: center;
          gap: 6px;
        }

        .sc-label svg {
          width: 13px; height: 13px;
          stroke: #16a34a;
          fill: none;
          stroke-width: 2;
        }

        .sc-hint {
          font-size: 11px;
          color: #9ca3af;
          letter-spacing: 0.04em;
        }

        .sc-input {
          width: 100%;
          border: 1.5px solid #d1fae5;
          border-radius: 10px;
          padding: 11px 14px;
          font-size: 14px;
          font-family: 'DM Sans', sans-serif;
          color: #111827;
          background: #f9fefb;
          outline: none;
          transition: border-color 0.2s, box-shadow 0.2s;
        }
        .sc-input::placeholder { color: #9ca3af; }
        .sc-input:focus {
          border-color: #16a34a;
          box-shadow: 0 0 0 3px rgba(22,163,74,0.12);
          background: white;
        }
        .sc-input[data-invalid="true"] {
          border-color: #fca5a5;
          background: #fff5f5;
        }

        .sc-error {
          font-size: 12px;
          color: #dc2626;
          margin-top: 5px;
          display: flex;
          align-items: center;
          gap: 4px;
        }

        .sc-verify-link {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          font-size: 13px;
          color: #16a34a;
          text-decoration: none;
          font-weight: 500;
          padding: 8px 0;
        }
        .sc-verify-link:hover { text-decoration: underline; }

        .sc-btn {
          width: 100%;
          background: #16a34a;
          color: white;
          border: none;
          border-radius: 10px;
          padding: 13px;
          font-size: 14.5px;
          font-weight: 600;
          font-family: 'DM Sans', sans-serif;
          cursor: pointer;
          letter-spacing: 0.02em;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          transition: background 0.2s, transform 0.15s, box-shadow 0.2s;
          margin-top: 8px;
        }
        .sc-btn:hover {
          background: #15803d;
          transform: translateY(-1px);
          box-shadow: 0 6px 20px rgba(22,163,74,0.35);
        }
        .sc-btn:active { transform: translateY(0); }

        .sc-footer {
          text-align: center;
          font-size: 12px;
          color: #9ca3af;
          margin-top: 28px;
          letter-spacing: 0.06em;
          text-transform: uppercase;
        }
      `}</style>

      <div className="sc-page">
        <div className="dot dot-1" />
        <div className="dot dot-2" />
        <div className="dot dot-3" />
        <div className="dot dot-4" />

        <div className="sc-card">
          <div className="sc-breadcrumb">
            <span className="chip">Swachh Campus</span>
            <span className="line" />
            <span>Auth Portal</span>
            <span className="line" />
          </div>

          <h1 className="sc-title">
            Welcome <span>Back</span>
          </h1>
          <p className="sc-subtitle">Sign in to your campus account to continue</p>

          <Form route="auth.login">
            {({ errors }) => (
              <>
                {verificationLink && (
                  <a className="sc-verify-link" href={verificationLink}>
                    <svg viewBox="0 0 24 24" style={{ width: 14, height: 14, stroke: 'currentColor', fill: 'none', strokeWidth: 2 }}>
                      <path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
                    </svg>
                    Verify your email address
                  </a>
                )}

                <div className="sc-field">
                  <div className="sc-label-row">
                    <label className="sc-label" htmlFor="email">
                      <svg viewBox="0 0 24 24"><path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg>
                      Email Address
                    </label>
                    <span className="sc-hint">Official email</span>
                  </div>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    autoComplete="username"
                    placeholder="e.g. john@campus.edu"
                    className="sc-input"
                    data-invalid={errors.email ? 'true' : undefined}
                  />
                  {errors.email && <p className="sc-error">⚠ {errors.email}</p>}
                </div>

                <div className="sc-field">
                  <div className="sc-label-row">
                    <label className="sc-label" htmlFor="password">
                      <svg viewBox="0 0 24 24"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0110 0v4"/></svg>
                      Password
                    </label>
                    <span className="sc-hint">Keep it secret</span>
                  </div>
                  <input
                    type="password"
                    name="password"
                    id="password"
                    autoComplete="current-password"
                    placeholder="Your password"
                    className="sc-input"
                  />
                  {errors.password && <p className="sc-error">⚠ {errors.password}</p>}
                </div>

                <button type="submit" className="sc-btn">
                  Sign In
                  <svg style={{ width: 16, height: 16, stroke: 'white', fill: 'none', strokeWidth: 2.5 }} viewBox="0 0 24 24">
                    <path d="M5 12h14M12 5l7 7-7 7"/>
                  </svg>
                </button>
              </>
            )}
          </Form>

          <div className="sc-footer">✦ Swachh Campus • Auth Portal • 2026</div>
        </div>
      </div>
    </>
  )
}
