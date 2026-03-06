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
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=DM+Sans:wght@300;400;500;600&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body { font-family: 'DM Sans', sans-serif; background: #edfbf3; }

        .sc-page {
          min-height: 100vh;
          background:
            radial-gradient(ellipse at 10% 20%, rgba(134,239,172,0.3) 0%, transparent 55%),
            radial-gradient(ellipse at 90% 80%, rgba(74,222,128,0.15) 0%, transparent 55%),
            #edfbf3;
          padding: 48px 24px;
          position: relative;
        }
        .sc-page::before {
          content: ''; position: fixed; top: 16px; left: 16px;
          width: 60px; height: 60px;
          border-top: 1.5px solid rgba(22,163,74,0.35);
          border-left: 1.5px solid rgba(22,163,74,0.35);
        }
        .sc-page::after {
          content: ''; position: fixed; bottom: 16px; right: 16px;
          width: 60px; height: 60px;
          border-bottom: 1.5px solid rgba(22,163,74,0.35);
          border-right: 1.5px solid rgba(22,163,74,0.35);
        }

        .sc-container { max-width: 680px; margin: 0 auto; }

        .sc-breadcrumb {
          display: flex; align-items: center; gap: 8px;
          font-size: 10px; letter-spacing: 0.12em; text-transform: uppercase;
          color: #6b7280; margin-bottom: 16px;
        }
        .sc-breadcrumb .chip { background: #16a34a; color: white; padding: 3px 10px; border-radius: 20px; font-weight: 600; }
        .sc-breadcrumb .line { height: 1px; background: rgba(22,163,74,0.25); width: 40px; }

        .sc-header { margin-bottom: 32px; animation: fadeUp 0.45s ease both; }
        .sc-title { font-family: 'DM Serif Display', serif; font-size: 38px; color: #0f2d1a; line-height: 1.1; }
        .sc-title span { color: #16a34a; font-style: italic; }
        .sc-subtitle { font-size: 14px; color: #6b7280; margin-top: 6px; }

        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(16px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        /* Avatar block */
        .sc-avatar-card {
          background: white; border-radius: 20px;
          padding: 32px; margin-bottom: 20px;
          box-shadow: 0 4px 24px rgba(22,163,74,0.09);
          display: flex; align-items: center; gap: 24px;
          position: relative; overflow: hidden;
          animation: fadeUp 0.5s 0.05s ease both;
        }
        .sc-avatar-card::before {
          content: ''; position: absolute; top: 0; left: 0; right: 0;
          height: 3px; background: linear-gradient(90deg, #16a34a, #4ade80);
        }

        .sc-avatar {
          width: 80px; height: 80px; border-radius: 50%;
          background: linear-gradient(135deg, #16a34a, #4ade80);
          display: flex; align-items: center; justify-content: center;
          font-family: 'DM Serif Display', serif;
          font-size: 32px; color: white; flex-shrink: 0;
          box-shadow: 0 4px 16px rgba(22,163,74,0.35);
        }

        .sc-avatar-info h2 {
          font-family: 'DM Serif Display', serif;
          font-size: 24px; color: #0f2d1a; margin-bottom: 4px;
        }
        .sc-avatar-info p { font-size: 14px; color: #6b7280; }

        .sc-role-badge {
          margin-left: auto;
          background: #f0fdf4; border: 1.5px solid #bbf7d0;
          color: #15803d; font-size: 12px; font-weight: 600;
          padding: 6px 14px; border-radius: 20px;
          text-transform: capitalize; letter-spacing: 0.04em;
          white-space: nowrap;
        }

        /* Fields grid */
        .sc-fields-card {
          background: white; border-radius: 20px;
          padding: 32px; margin-bottom: 20px;
          box-shadow: 0 4px 24px rgba(22,163,74,0.09);
          animation: fadeUp 0.5s 0.1s ease both;
        }

        .sc-section-title {
          font-size: 11px; font-weight: 700; letter-spacing: 0.1em;
          text-transform: uppercase; color: #16a34a;
          margin-bottom: 20px; padding-bottom: 10px;
          border-bottom: 1px solid #f0fdf4;
        }

        .sc-fields-grid {
          display: grid; grid-template-columns: 1fr 1fr; gap: 20px;
        }

        .sc-field-item {}
        .sc-field-label {
          font-size: 11px; font-weight: 600; letter-spacing: 0.08em;
          text-transform: uppercase; color: #9ca3af; margin-bottom: 6px;
          display: flex; align-items: center; gap: 5px;
        }
        .sc-field-label svg { width: 12px; height: 12px; stroke: #16a34a; fill: none; stroke-width: 2; }
        .sc-field-value { font-size: 15px; color: #111827; font-weight: 500; }
        .sc-field-value.muted { color: #9ca3af; font-style: italic; }

        .sc-verified {
          display: inline-flex; align-items: center; gap: 5px;
          font-size: 13px; font-weight: 600;
        }
        .sc-verified.yes { color: #16a34a; }
        .sc-verified.no { color: #f59e0b; }

        .sc-footer-bar {
          text-align: center; font-size: 11px; color: #9ca3af;
          letter-spacing: 0.08em; text-transform: uppercase;
          animation: fadeUp 0.5s 0.2s ease both;
        }
      `}</style>

      <div className="sc-page">
        <div className="sc-container">
          <div className="sc-breadcrumb">
            <span className="chip">Swachh Campus</span>
            <span className="line" />
            <span>My Profile</span>
          </div>

          <div className="sc-header">
            <h1 className="sc-title">My <span>Profile</span></h1>
            <p className="sc-subtitle">Your campus account details and information</p>
          </div>

          {/* Avatar Card */}
          <div className="sc-avatar-card">
            <div className="sc-avatar">
              {profile.name.charAt(0).toUpperCase()}
            </div>
            <div className="sc-avatar-info">
              <h2>{profile.name}</h2>
              <p>{profile.email}</p>
            </div>
            <span className="sc-role-badge">{profile.role}</span>
          </div>

          {/* Info Card */}
          <div className="sc-fields-card">
            <div className="sc-section-title">Account Information</div>
            <div className="sc-fields-grid">
              <div className="sc-field-item">
                <div className="sc-field-label">
                  <svg viewBox="0 0 24 24"><path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
                  Full Name
                </div>
                <div className="sc-field-value">{profile.name}</div>
              </div>

              <div className="sc-field-item">
                <div className="sc-field-label">
                  <svg viewBox="0 0 24 24"><path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg>
                  Email Address
                </div>
                <div className="sc-field-value">{profile.email}</div>
              </div>

              <div className="sc-field-item">
                <div className="sc-field-label">
                  <svg viewBox="0 0 24 24"><path d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498A1 1 0 0121 16.72V19a2 2 0 01-2 2H5a2 2 0 01-2-2V5z"/></svg>
                  Phone
                </div>
                <div className={`sc-field-value ${!profile.phone ? 'muted' : ''}`}>
                  {profile.phone ?? 'Not provided'}
                </div>
              </div>

              <div className="sc-field-item">
                <div className="sc-field-label">
                  <svg viewBox="0 0 24 24"><path d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0"/></svg>
                  Role
                </div>
                <div className="sc-field-value" style={{ textTransform: 'capitalize' }}>{profile.role}</div>
              </div>

              <div className="sc-field-item">
                <div className="sc-field-label">
                  <svg viewBox="0 0 24 24"><path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
                  Email Verified
                </div>
                <div className={`sc-verified ${profile.emailVerifiedAt ? 'yes' : 'no'}`}>
                  {profile.emailVerifiedAt ? '✓ Verified' : '⚠ Not Verified'}
                </div>
              </div>

              <div className="sc-field-item">
                <div className="sc-field-label">
                  <svg viewBox="0 0 24 24"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
                  Member Since
                </div>
                <div className="sc-field-value">
                  {new Date(profile.createdAt).toLocaleDateString('en-IN', {
                    day: 'numeric', month: 'long', year: 'numeric'
                  })}
                </div>
              </div>
            </div>
          </div>

          <div className="sc-footer-bar">✦ Swachh Campus • Profile • 2026</div>
        </div>
      </div>
    </>
  )
}
