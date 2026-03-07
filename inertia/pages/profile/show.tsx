import { useForm } from '@inertiajs/react'
import { useState } from 'react'
import type { FormEvent } from 'react'

interface Profile {
  id: number
  name: string
  email: string
  phone?: string | null
  role: string
  emailVerifiedAt?: string | null
  createdAt: string
}

interface Props {
  profile: Profile
}

export default function ProfileShow({ profile }: Props) {
  const [isEditing, setIsEditing] = useState(false)

  const { data, setData, put, processing, errors } = useForm({
    name: profile.name,
    phone: profile.phone ?? '',
  })

  function resetEditState() {
    setData({
      name: profile.name,
      phone: profile.phone ?? '',
    })
    setIsEditing(false)
  }

  function submitProfileUpdate(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    put('/profile', {
      preserveScroll: true,
      onSuccess: () => setIsEditing(false),
    })
  }

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=DM+Sans:wght@300;400;500;600;700;800&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body { font-family: 'DM Sans', sans-serif; background: #edfbf3; }

        .pf-page {
          min-height: 100vh;
          background:
            radial-gradient(ellipse at 10% 20%, rgba(134,239,172,0.3) 0%, transparent 55%),
            radial-gradient(ellipse at 90% 80%, rgba(74,222,128,0.15) 0%, transparent 55%),
            #edfbf3;
          padding: 48px 24px;
          position: relative;
        }
        .pf-page::before {
          content: ''; position: fixed; top: 16px; left: 16px;
          width: 60px; height: 60px;
          border-top: 1.5px solid rgba(22,163,74,0.35);
          border-left: 1.5px solid rgba(22,163,74,0.35);
          pointer-events: none;
        }
        .pf-page::after {
          content: ''; position: fixed; bottom: 16px; right: 16px;
          width: 60px; height: 60px;
          border-bottom: 1.5px solid rgba(22,163,74,0.35);
          border-right: 1.5px solid rgba(22,163,74,0.35);
          pointer-events: none;
        }

        .pf-container { max-width: 860px; margin: 0 auto; }

        .pf-breadcrumb {
          display: flex; align-items: center; gap: 8px;
          font-size: 10px; letter-spacing: 0.12em; text-transform: uppercase;
          color: #6b7280; margin-bottom: 16px;
        }
        .pf-breadcrumb .chip {
          background: #16a34a; color: white; padding: 3px 10px;
          border-radius: 20px; font-weight: 700;
        }
        .pf-breadcrumb .line { height: 1px; background: rgba(22,163,74,0.25); width: 40px; }

        .pf-heading-wrap { margin-bottom: 24px; animation: fadeUp 0.45s ease both; }
        .pf-eyebrow {
          display: flex; align-items: center; gap: 10px; margin-bottom: 6px;
        }
        .pf-eyebrow-line { width: 28px; height: 2px; background: #16a34a; }
        .pf-eyebrow-text {
          font-size: 11px; font-weight: 700; letter-spacing: 0.15em;
          color: #16a34a; text-transform: uppercase;
        }
        .pf-title {
          font-size: 2.4rem; font-weight: 800; line-height: 1.1;
          color: #0f172a;
        }
        .pf-title span {
          color: #16a34a;
          font-family: 'DM Serif Display', serif;
          font-style: italic;
        }
        .pf-subtitle { font-size: 0.95rem; color: #64748b; margin-top: 6px; }

        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(16px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .pf-card {
          background: #fff; border-radius: 20px;
          padding: 32px; margin-bottom: 20px;
          box-shadow: 0 4px 24px rgba(22,163,74,0.09);
          border: 1px solid rgba(22,163,74,0.08);
          position: relative;
          overflow: hidden;
        }
        .pf-card::before {
          content: ''; position: absolute; top: 0; left: 0; right: 0;
          height: 3px; background: linear-gradient(90deg, #16a34a, #4ade80);
        }

        .pf-avatar-card {
          display: flex; align-items: center; gap: 24px;
          animation: fadeUp 0.5s 0.05s ease both;
        }

        .pf-avatar {
          width: 80px; height: 80px; border-radius: 50%;
          background: linear-gradient(135deg, #16a34a, #4ade80);
          display: flex; align-items: center; justify-content: center;
          font-family: 'DM Serif Display', serif;
          font-size: 32px; color: white; flex-shrink: 0;
          box-shadow: 0 4px 16px rgba(22,163,74,0.35);
        }

        .pf-avatar-info h2 {
          font-family: 'DM Serif Display', serif;
          font-size: 24px; color: #0f2d1a; margin-bottom: 4px;
        }
        .pf-avatar-info p { font-size: 14px; color: #6b7280; }

        .pf-role-badge {
          margin-left: auto;
          background: #f0fdf4; border: 1.5px solid #bbf7d0;
          color: #15803d; font-size: 12px; font-weight: 700;
          padding: 6px 14px; border-radius: 20px;
          text-transform: capitalize; letter-spacing: 0.04em;
          white-space: nowrap;
        }

        .pf-actions {
          margin-left: auto;
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .pf-btn {
          border: none;
          border-radius: 10px;
          padding: 0.62rem 1rem;
          font-size: 0.82rem;
          font-weight: 700;
          cursor: pointer;
          transition: transform 0.12s ease, box-shadow 0.2s ease;
          font-family: 'DM Sans', sans-serif;
        }
        .pf-btn:disabled { opacity: 0.7; cursor: not-allowed; }
        .pf-btn:hover:not(:disabled) { transform: translateY(-1px); }

        .pf-btn-primary {
          color: #fff;
          background: linear-gradient(135deg, #16a34a, #15803d);
          box-shadow: 0 4px 12px rgba(22,163,74,0.28);
        }

        .pf-btn-muted {
          color: #475569;
          background: #f8fafc;
          border: 1px solid #e2e8f0;
        }

        .pf-fields-card {
          animation: fadeUp 0.5s 0.1s ease both;
        }

        .pf-section-title {
          font-size: 11px; font-weight: 700; letter-spacing: 0.1em;
          text-transform: uppercase; color: #16a34a;
          margin-bottom: 20px; padding-bottom: 10px;
          border-bottom: 1px solid #f0fdf4;
        }

        .pf-fields-grid {
          display: grid; grid-template-columns: 1fr 1fr; gap: 20px;
        }

        .pf-field-label {
          font-size: 11px; font-weight: 600; letter-spacing: 0.08em;
          text-transform: uppercase; color: #9ca3af; margin-bottom: 6px;
          display: flex; align-items: center; gap: 5px;
        }
        .pf-field-label svg {
          width: 12px; height: 12px; stroke: #16a34a; fill: none; stroke-width: 2;
        }

        .pf-field-value { font-size: 15px; color: #111827; font-weight: 500; }
        .pf-field-value.muted { color: #9ca3af; font-style: italic; }

        .pf-input {
          width: 100%;
          border: 1.5px solid #e2e8f0;
          border-radius: 10px;
          padding: 0.72rem 0.82rem;
          font-size: 0.92rem;
          color: #111827;
          background: #fff;
          font-family: 'DM Sans', sans-serif;
          outline: none;
          transition: border-color 0.2s ease, box-shadow 0.2s ease;
        }
        .pf-input:focus {
          border-color: #16a34a;
          box-shadow: 0 0 0 3px rgba(22,163,74,0.1);
        }
        .pf-input.error {
          border-color: #ef4444;
          box-shadow: none;
        }

        .pf-error {
          color: #dc2626;
          font-size: 0.76rem;
          margin-top: 4px;
        }

        .pf-help {
          margin-top: 4px;
          color: #9ca3af;
          font-size: 0.74rem;
        }

        .pf-verified {
          display: inline-flex; align-items: center; gap: 5px;
          font-size: 13px; font-weight: 700;
        }
        .pf-verified.yes { color: #16a34a; }
        .pf-verified.no { color: #f59e0b; }

        .pf-footer-bar {
          text-align: center; font-size: 11px; color: #9ca3af;
          letter-spacing: 0.08em; text-transform: uppercase;
          animation: fadeUp 0.5s 0.2s ease both;
        }

        @media (max-width: 900px) {
          .pf-avatar-card {
            flex-wrap: wrap;
          }
          .pf-role-badge,
          .pf-actions {
            margin-left: 0;
          }
          .pf-fields-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>

      <div className="pf-page">
        <div className="pf-container">
          <div className="pf-breadcrumb">
            <span className="chip">Swachh Campus</span>
            <span className="line" />
            <span>My Profile</span>
          </div>

          <div className="pf-heading-wrap">
            <div className="pf-eyebrow">
              <div className="pf-eyebrow-line" />
              <span className="pf-eyebrow-text">Swachh Campus - Campus Registry</span>
              <div className="pf-eyebrow-line" />
            </div>
            <h1 className="pf-title">
              My <span>Profile</span>
            </h1>
            <p className="pf-subtitle">Your campus account details and information</p>
          </div>

          <div className="pf-card pf-avatar-card">
            <div className="pf-avatar">{profile.name.charAt(0).toUpperCase()}</div>
            <div className="pf-avatar-info">
              <h2>{profile.name}</h2>
              <p>{profile.email}</p>
            </div>
            <span className="pf-role-badge">{profile.role}</span>

            {!isEditing && (
              <div className="pf-actions">
                <button type="button" className="pf-btn pf-btn-primary" onClick={() => setIsEditing(true)}>
                  Edit Profile
                </button>
              </div>
            )}
          </div>

          <div className="pf-card pf-fields-card">
            <div className="pf-section-title">Account Information</div>

            {!isEditing && (
              <div className="pf-fields-grid">
                <div>
                  <div className="pf-field-label">
                    <svg viewBox="0 0 24 24"><path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" /><circle cx="12" cy="7" r="4" /></svg>
                    Full Name
                  </div>
                  <div className="pf-field-value">{profile.name}</div>
                </div>

                <div>
                  <div className="pf-field-label">
                    <svg viewBox="0 0 24 24"><path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                    Email Address
                  </div>
                  <div className="pf-field-value">{profile.email}</div>
                </div>

                <div>
                  <div className="pf-field-label">
                    <svg viewBox="0 0 24 24"><path d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498A1 1 0 0121 16.72V19a2 2 0 01-2 2H5a2 2 0 01-2-2V5z" /></svg>
                    Phone
                  </div>
                  <div className={`pf-field-value ${!profile.phone ? 'muted' : ''}`}>
                    {profile.phone ?? 'Not provided'}
                  </div>
                </div>

                <div>
                  <div className="pf-field-label">
                    <svg viewBox="0 0 24 24"><path d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0" /></svg>
                    Role
                  </div>
                  <div className="pf-field-value" style={{ textTransform: 'capitalize' }}>{profile.role}</div>
                </div>

                <div>
                  <div className="pf-field-label">
                    <svg viewBox="0 0 24 24"><path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                    Email Verified
                  </div>
                  <div className={`pf-verified ${profile.emailVerifiedAt ? 'yes' : 'no'}`}>
                    {profile.emailVerifiedAt ? 'Verified' : 'Not Verified'}
                  </div>
                </div>

                <div>
                  <div className="pf-field-label">
                    <svg viewBox="0 0 24 24"><rect x="3" y="4" width="18" height="18" rx="2" ry="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" /></svg>
                    Member Since
                  </div>
                  <div className="pf-field-value">
                    {new Date(profile.createdAt).toLocaleDateString('en-IN', {
                      day: 'numeric',
                      month: 'long',
                      year: 'numeric',
                    })}
                  </div>
                </div>
              </div>
            )}

            {isEditing && (
              <form onSubmit={submitProfileUpdate}>
                <div className="pf-fields-grid">
                  <div>
                    <div className="pf-field-label">
                      <svg viewBox="0 0 24 24"><path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" /><circle cx="12" cy="7" r="4" /></svg>
                      Full Name
                    </div>
                    <input
                      className={`pf-input ${errors.name ? 'error' : ''}`}
                      type="text"
                      value={data.name}
                      onChange={(e) => setData('name', e.target.value)}
                      placeholder="Enter your full name"
                      maxLength={255}
                    />
                    {errors.name && <div className="pf-error">{errors.name}</div>}
                  </div>

                  <div>
                    <div className="pf-field-label">
                      <svg viewBox="0 0 24 24"><path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                      Email Address
                    </div>
                    <input className="pf-input" type="email" value={profile.email} disabled />
                    <div className="pf-help">Email changes are currently disabled for profile edit.</div>
                  </div>

                  <div>
                    <div className="pf-field-label">
                      <svg viewBox="0 0 24 24"><path d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498A1 1 0 0121 16.72V19a2 2 0 01-2 2H5a2 2 0 01-2-2V5z" /></svg>
                      Phone
                    </div>
                    <input
                      className={`pf-input ${errors.phone ? 'error' : ''}`}
                      type="text"
                      value={data.phone}
                      onChange={(e) => setData('phone', e.target.value)}
                      placeholder="Optional phone number"
                      maxLength={20}
                    />
                    {errors.phone && <div className="pf-error">{errors.phone}</div>}
                  </div>

                  <div>
                    <div className="pf-field-label">
                      <svg viewBox="0 0 24 24"><path d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0" /></svg>
                      Role
                    </div>
                    <input className="pf-input" type="text" value={profile.role} disabled style={{ textTransform: 'capitalize' }} />
                    <div className="pf-help">Role updates are managed by administrators.</div>
                  </div>
                </div>

                <div style={{ marginTop: '18px', display: 'flex', gap: '10px', justifyContent: 'flex-end' }}>
                  <button type="button" className="pf-btn pf-btn-muted" onClick={resetEditState} disabled={processing}>
                    Cancel
                  </button>
                  <button type="submit" className="pf-btn pf-btn-primary" disabled={processing}>
                    {processing ? 'Saving...' : 'Save Changes'}
                  </button>
                </div>
              </form>
            )}
          </div>

          <div className="pf-footer-bar">Swachh Campus | Profile | 2026</div>
        </div>
      </div>
    </>
  )
}
