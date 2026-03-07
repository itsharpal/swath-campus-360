import { useForm, usePage } from '@inertiajs/react'
import { Data } from '@generated/data'
import { useEffect } from 'react'

declare const Swal: any

type Role = { id: number; name: string }
type Props = { roles: Role[] }

export default function Register({ roles }: Props) {
  const page = usePage<Data.SharedProps>()
  const flashError = page.props.flash?.error as string | undefined
  const { data, setData, post, processing, errors } = useForm({
    name: '',
    email: '',
    password: '',
    passwordConfirmation: '',
    phone: '',
    roleId: '',
  })

  useEffect(() => {
    if (flashError) {
        if (typeof Swal !== 'undefined' && typeof Swal.fire === 'function') {
          Swal.fire({
            icon: 'error',
            title: 'Registration Failed',
            text: flashError,
            confirmButtonColor: '#16a34a',
            background: '#f0fdf4',
            color: '#14532d',
            iconColor: '#dc2626',
          })
        }
    }
  }, [flashError])

  function submit(e: React.FormEvent) {
    e.preventDefault()
    post('/register', {
      onSuccess: () => {
        if (typeof Swal !== 'undefined' && typeof Swal.fire === 'function') {
          Swal.fire({
            icon: 'success',
            title: 'Registration Successful',
            text: 'We sent a verification link to your email. Please verify your email before logging in.',
            confirmButtonColor: '#16a34a',
            background: '#f0fdf4',
            color: '#14532d',
            iconColor: '#16a34a',
          })
        }
      },
    })
  }

  return (
    <>
      <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/sweetalert2@11/dist/sweetalert2.min.css" />
      <script src="https://cdn.jsdelivr.net/npm/sweetalert2@11" defer />

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=DM+Sans:wght@300;400;500;600&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body { font-family: 'DM Sans', sans-serif; background: #edfbf3; }

        .sc-page {
          min-height: 100vh;
          display: flex; align-items: center; justify-content: center;
          background:
            radial-gradient(ellipse at 10% 20%, rgba(134,239,172,0.35) 0%, transparent 55%),
            radial-gradient(ellipse at 90% 80%, rgba(74,222,128,0.2) 0%, transparent 55%),
            #edfbf3;
          position: relative; overflow: hidden; padding: 32px 24px;
        }
        .sc-page::before {
          content: ''; position: absolute; top: 16px; left: 16px;
          width: 60px; height: 60px;
          border-top: 1.5px solid rgba(22,163,74,0.35);
          border-left: 1.5px solid rgba(22,163,74,0.35);
        }
        .sc-page::after {
          content: ''; position: absolute; bottom: 16px; right: 16px;
          width: 60px; height: 60px;
          border-bottom: 1.5px solid rgba(22,163,74,0.35);
          border-right: 1.5px solid rgba(22,163,74,0.35);
        }
        .dot { position: absolute; border-radius: 50%; background: #16a34a; opacity: 0.5; }
        .dot-1 { width: 6px; height: 6px; bottom: 15%; left: 10%; }
        .dot-2 { width: 4px; height: 4px; top: 20%; right: 12%; }
        .dot-3 { width: 5px; height: 5px; top: 60%; right: 8%; }

        .sc-card {
          background: white; border-radius: 20px;
          padding: 44px 48px; width: 100%; max-width: 560px;
          box-shadow: 0 8px 40px rgba(22,163,74,0.1), 0 2px 8px rgba(0,0,0,0.05);
          position: relative;
          animation: cardIn 0.5s cubic-bezier(0.22,1,0.36,1) both;
        }
        @keyframes cardIn {
          from { opacity: 0; transform: translateY(24px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .sc-card::before {
          content: ''; position: absolute; top: 0; left: 48px; right: 48px;
          height: 3px;
          background: linear-gradient(90deg, #16a34a, #4ade80);
          border-radius: 0 0 4px 4px;
        }

        .sc-breadcrumb {
          display: flex; align-items: center; gap: 8px;
          font-size: 10px; letter-spacing: 0.12em; text-transform: uppercase;
          color: #6b7280; margin-bottom: 20px;
        }
        .sc-breadcrumb .chip { background: #16a34a; color: white; padding: 3px 10px; border-radius: 20px; font-weight: 600; }
        .sc-breadcrumb .line { flex: 1; height: 1px; background: rgba(22,163,74,0.25); max-width: 40px; }

        .sc-title { font-family: 'DM Serif Display', serif; font-size: 32px; color: #0f2d1a; margin-bottom: 6px; line-height: 1.15; }
        .sc-title span { color: #16a34a; font-style: italic; }
        .sc-subtitle { font-size: 13.5px; color: #6b7280; margin-bottom: 28px; }

        .sc-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 0 20px; }
        .sc-grid .sc-field:nth-child(odd):last-child { grid-column: 1 / -1; }

        .sc-field { margin-bottom: 16px; }
        .sc-label-row { display: flex; justify-content: space-between; align-items: center; margin-bottom: 6px; }
        .sc-label { font-size: 12.5px; font-weight: 600; color: #374151; display: flex; align-items: center; gap: 6px; }
        .sc-label svg { width: 13px; height: 13px; stroke: #16a34a; fill: none; stroke-width: 2; }
        .sc-hint { font-size: 11px; color: #9ca3af; letter-spacing: 0.04em; }

        .sc-input, .sc-select {
          width: 100%; border: 1.5px solid #d1fae5; border-radius: 10px;
          padding: 11px 14px; font-size: 14px; font-family: 'DM Sans', sans-serif;
          color: #111827; background: #f9fefb; outline: none;
          transition: border-color 0.2s, box-shadow 0.2s;
        }
        .sc-input::placeholder { color: #9ca3af; }
        .sc-input:focus, .sc-select:focus {
          border-color: #16a34a; box-shadow: 0 0 0 3px rgba(22,163,74,0.12); background: white;
        }
        .sc-input[data-invalid="true"] { border-color: #fca5a5; background: #fff5f5; }
        .sc-select { appearance: none; cursor: pointer; }

        .sc-error { font-size: 12px; color: #dc2626; margin-top: 4px; }

        .sc-btn {
          width: 100%; background: #16a34a; color: white; border: none;
          border-radius: 10px; padding: 13px; font-size: 14.5px; font-weight: 600;
          font-family: 'DM Sans', sans-serif; cursor: pointer; letter-spacing: 0.02em;
          display: flex; align-items: center; justify-content: center; gap: 8px;
          transition: background 0.2s, transform 0.15s, box-shadow 0.2s;
          margin-top: 8px;
        }
        .sc-btn:hover:not(:disabled) { background: #15803d; transform: translateY(-1px); box-shadow: 0 6px 20px rgba(22,163,74,0.35); }
        .sc-btn:disabled { opacity: 0.6; cursor: not-allowed; }

        .sc-footer { text-align: center; font-size: 12px; color: #9ca3af; margin-top: 28px; letter-spacing: 0.06em; text-transform: uppercase; }
      `}</style>

      <div className="sc-page">
        <div className="dot dot-1" /><div className="dot dot-2" /><div className="dot dot-3" />

        <div className="sc-card">
          <div className="sc-breadcrumb">
            <span className="chip">Swachh Campus</span>
            <span className="line" />
            <span>Campus Registry</span>
            <span className="line" />
          </div>

          <h1 className="sc-title">New <span>Account</span></h1>
          <p className="sc-subtitle">Register to join the Swachh Campus management system</p>

          <form onSubmit={submit}>
            <div className="sc-grid">
              <div className="sc-field">
                <div className="sc-label-row">
                  <label className="sc-label" htmlFor="name">
                    <svg viewBox="0 0 24 24"><path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
                    Full Name
                  </label>
                  <span className="sc-hint">Legal name</span>
                </div>
                <input className="sc-input" type="text" id="name" placeholder="John Doe"
                  value={data.name} onChange={(e) => setData('name', e.target.value)}
                  data-invalid={errors.name ? 'true' : undefined} />
                {errors.name && <p className="sc-error">⚠ {errors.name}</p>}
              </div>

              <div className="sc-field">
                <div className="sc-label-row">
                  <label className="sc-label" htmlFor="email">
                    <svg viewBox="0 0 24 24"><path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg>
                    Email
                  </label>
                  <span className="sc-hint">Official email</span>
                </div>
                <input className="sc-input" type="email" id="email" placeholder="john@campus.edu"
                  value={data.email} onChange={(e) => setData('email', e.target.value)}
                  data-invalid={errors.email ? 'true' : undefined} />
                {errors.email && <p className="sc-error">⚠ {errors.email}</p>}
              </div>

              <div className="sc-field">
                <div className="sc-label-row">
                  <label className="sc-label" htmlFor="password">
                    <svg viewBox="0 0 24 24"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0110 0v4"/></svg>
                    Password
                  </label>
                </div>
                <input className="sc-input" type="password" id="password" placeholder="Min. 8 characters"
                  value={data.password} onChange={(e) => setData('password', e.target.value)}
                  data-invalid={errors.password ? 'true' : undefined} />
                {errors.password && <p className="sc-error">⚠ {errors.password}</p>}
              </div>

              <div className="sc-field">
                <div className="sc-label-row">
                  <label className="sc-label" htmlFor="passwordConfirmation">
                    <svg viewBox="0 0 24 24"><path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
                    Confirm Password
                  </label>
                </div>
                <input className="sc-input" type="password" id="passwordConfirmation" placeholder="Repeat password"
                  value={data.passwordConfirmation} onChange={(e) => setData('passwordConfirmation', e.target.value)}
                  data-invalid={errors.passwordConfirmation ? 'true' : undefined} />
                {errors.passwordConfirmation && <p className="sc-error">⚠ {errors.passwordConfirmation}</p>}
              </div>

              <div className="sc-field">
                <div className="sc-label-row">
                  <label className="sc-label" htmlFor="phone">
                    <svg viewBox="0 0 24 24"><path d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498A1 1 0 0121 16.72V19a2 2 0 01-2 2H5a2 2 0 01-2-2V5z"/></svg>
                    Phone
                  </label>
                  <span className="sc-hint">Optional</span>
                </div>
                <input className="sc-input" type="text" id="phone" placeholder="+91 98765 43210"
                  value={data.phone} onChange={(e) => setData('phone', e.target.value)}
                  data-invalid={errors.phone ? 'true' : undefined} />
                {errors.phone && <p className="sc-error">⚠ {errors.phone}</p>}
              </div>

              <div className="sc-field">
                <div className="sc-label-row">
                  <label className="sc-label" htmlFor="roleId">
                    <svg viewBox="0 0 24 24"><path d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0"/></svg>
                    Role
                  </label>
                  <span className="sc-hint">Select one</span>
                </div>
                <select className="sc-select" id="roleId"
                  value={data.roleId} onChange={(e) => setData('roleId', e.target.value)}>
                  <option value="">Select Role</option>
                  {roles.map((role) => (
                    <option key={role.id} value={role.id}>{role.name}</option>
                  ))}
                </select>
                {errors.roleId && <p className="sc-error">⚠ {errors.roleId}</p>}
              </div>
            </div>

            <button type="submit" className="sc-btn" disabled={processing}>
              {processing ? 'Creating Account...' : 'Create Account'}
              {!processing && (
                <svg style={{ width: 16, height: 16, stroke: 'white', fill: 'none', strokeWidth: 2.5 }} viewBox="0 0 24 24">
                  <path d="M5 12h14M12 5l7 7-7 7"/>
                </svg>
              )}
            </button>
          </form>

          <div className="sc-footer">✦ Swachh Campus • Campus Registry • 2026</div>
        </div>
      </div>
    </>
  )
}
