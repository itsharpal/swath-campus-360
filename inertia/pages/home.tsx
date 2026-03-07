interface HomeProps {
  stats: {
    totalBuildings: number
    totalUsers: number
    uptime: number
  }
}

export default function Home({ stats }: HomeProps) {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=DM+Sans:wght@300;400;500;600&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body { font-family: 'DM Sans', sans-serif; background: #edfbf3; }

        .sc-page {
          min-height: 100vh;
          background:
            radial-gradient(ellipse at 10% 20%, rgba(134,239,172,0.35) 0%, transparent 55%),
            radial-gradient(ellipse at 90% 80%, rgba(74,222,128,0.2) 0%, transparent 55%),
            #edfbf3;
          padding: 60px 24px 48px;
          position: relative; overflow: hidden;
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

        .dot { position: absolute; border-radius: 50%; background: #16a34a; opacity: 0.45; }
        .dot-1 { width: 6px; height: 6px; bottom: 25%; left: 8%; }
        .dot-2 { width: 4px; height: 4px; top: 35%; right: 12%; }
        .dot-3 { width: 5px; height: 5px; bottom: 40%; right: 6%; }
        .dot-4 { width: 3px; height: 3px; top: 55%; left: 5%; }

        .sc-container { max-width: 900px; margin: 0 auto; }

        /* Breadcrumb */
        .sc-breadcrumb {
          display: flex; align-items: center; gap: 8px;
          font-size: 10px; letter-spacing: 0.12em; text-transform: uppercase;
          color: #6b7280; margin-bottom: 48px;
          animation: fadeUp 0.4s ease both;
        }
        .sc-breadcrumb .chip { background: #16a34a; color: white; padding: 3px 10px; border-radius: 20px; font-weight: 600; }
        .sc-breadcrumb .line { height: 1px; background: rgba(22,163,74,0.25); width: 40px; }

        /* Hero */
        .sc-hero {
          text-align: center; margin-bottom: 64px;
          animation: fadeUp 0.5s 0.05s ease both;
        }
        .sc-hero-badge {
          display: inline-flex; align-items: center; gap: 6px;
          background: #f0fdf4; border: 1.5px solid #bbf7d0;
          color: #15803d; font-size: 12px; font-weight: 600;
          padding: 6px 16px; border-radius: 30px; margin-bottom: 24px;
          letter-spacing: 0.04em;
        }
        .sc-hero-badge span { width: 6px; height: 6px; border-radius: 50%; background: #16a34a; display: inline-block; }

        .sc-hero h1 {
          font-family: 'DM Serif Display', serif;
          font-size: clamp(36px, 6vw, 58px);
          color: #0f2d1a; line-height: 1.1; margin-bottom: 20px;
        }
        .sc-hero h1 span { color: #16a34a; font-style: italic; }

        .sc-hero p {
          font-size: 17px; color: #4b5563; line-height: 1.7;
          max-width: 560px; margin: 0 auto 36px;
        }

        .sc-hero-actions { display: flex; gap: 12px; justify-content: center; flex-wrap: wrap; }

        .sc-btn-primary {
          background: #16a34a; color: white; border: none;
          border-radius: 10px; padding: 13px 28px;
          font-size: 14.5px; font-weight: 600; font-family: 'DM Sans', sans-serif;
          cursor: pointer; display: inline-flex; align-items: center; gap: 8px;
          text-decoration: none; letter-spacing: 0.02em;
          transition: background 0.2s, transform 0.15s, box-shadow 0.2s;
        }
        .sc-btn-primary:hover { background: #15803d; transform: translateY(-2px); box-shadow: 0 8px 24px rgba(22,163,74,0.35); }

        .sc-btn-ghost {
          background: white; color: #15803d;
          border: 1.5px solid #bbf7d0;
          border-radius: 10px; padding: 13px 28px;
          font-size: 14.5px; font-weight: 600; font-family: 'DM Sans', sans-serif;
          cursor: pointer; display: inline-flex; align-items: center; gap: 8px;
          text-decoration: none; letter-spacing: 0.02em;
          transition: border-color 0.2s, transform 0.15s, box-shadow 0.2s;
        }
        .sc-btn-ghost:hover { border-color: #16a34a; transform: translateY(-2px); box-shadow: 0 4px 16px rgba(22,163,74,0.15); }

        /* Stats */
        .sc-stats {
          display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px;
          margin-bottom: 32px; animation: fadeUp 0.5s 0.1s ease both;
        }

        .sc-stat-card {
          background: white; border-radius: 16px; padding: 24px 20px;
          box-shadow: 0 4px 20px rgba(22,163,74,0.08);
          display: flex; align-items: center; gap: 16px;
          position: relative; overflow: hidden;
        }
        .sc-stat-card::before {
          content: ''; position: absolute; top: 0; left: 0; right: 0;
          height: 2px; background: linear-gradient(90deg, #16a34a, #4ade80);
        }

        .sc-stat-icon {
          width: 44px; height: 44px; border-radius: 12px;
          background: #f0fdf4; display: flex; align-items: center; justify-content: center;
          flex-shrink: 0;
        }
        .sc-stat-icon svg { width: 22px; height: 22px; stroke: #16a34a; fill: none; stroke-width: 1.5; }

        .sc-stat-text {}
        .sc-stat-num { font-family: 'DM Serif Display', serif; font-size: 26px; color: #0f2d1a; line-height: 1; }
        .sc-stat-label { font-size: 12px; color: #6b7280; margin-top: 3px; }

        /* Cards */
        .sc-cards {
          display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px;
          animation: fadeUp 0.5s 0.15s ease both;
        }

        .sc-card {
          background: white; border-radius: 16px; padding: 28px 24px;
          box-shadow: 0 4px 20px rgba(22,163,74,0.08);
          display: block;
          position: relative; overflow: hidden;
        }
        .sc-card::before {
          content: ''; position: absolute; top: 0; left: 0; right: 0;
          height: 2px; background: linear-gradient(90deg, #16a34a, #4ade80);
        }

        .sc-card-icon {
          width: 42px; height: 42px; border-radius: 12px;
          background: #f0fdf4; display: flex; align-items: center; justify-content: center;
          margin-bottom: 16px;
        }
        .sc-card-icon svg { width: 20px; height: 20px; stroke: #16a34a; fill: none; stroke-width: 1.75; }

        .sc-card h3 { font-size: 16px; font-weight: 700; color: #111827; margin-bottom: 8px; }
        .sc-card p { font-size: 13.5px; color: #6b7280; line-height: 1.55; }

        .sc-card-arrow {
          display: inline-flex; align-items: center; gap: 4px;
          font-size: 12px; color: #16a34a; font-weight: 600;
          margin-top: 14px;
        }

        .sc-footer { text-align: center; font-size: 11px; color: #9ca3af; margin-top: 48px; letter-spacing: 0.08em; text-transform: uppercase; }

        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(20px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        @media (max-width: 640px) {
          .sc-stats, .sc-cards { grid-template-columns: 1fr; }
        }
      `}</style>

      <div className="sc-page">
        <div className="dot dot-1" /><div className="dot dot-2" />
        <div className="dot dot-3" /><div className="dot dot-4" />

        <div className="sc-container">
          <div className="sc-breadcrumb">
            <span className="chip">Swachh Campus</span>
            <span className="line" />
            <span>Dashboard</span>
          </div>

          {/* Hero Section */}
          <div className="sc-hero">
            <div className="sc-hero-badge">
              <span /> Campus Management System
            </div>
            <h1>
              It works — welcome to<br /><span>Swachh Campus</span>
            </h1>
            <p>
              Powered by Inertia and React, this setup blends server-driven routing with rich
              client-side interactivity — seamless, fast, and cohesive.
            </p>
            <div className="sc-hero-actions">
              <a href="/buildings" className="sc-btn-primary">
                View Campus
                <svg style={{ width: 16, height: 16, stroke: 'white', fill: 'none', strokeWidth: 2.5 }} viewBox="0 0 24 24">
                  <path d="M5 12h14M12 5l7 7-7 7"/>
                </svg>
              </a>
              <a href="/complaints" className="sc-btn-ghost">
                Public Complaints
              </a>
            </div>
          </div>

          {/* Stats */}
          <div className="sc-stats">
            <div className="sc-stat-card">
              <div className="sc-stat-icon">
                <svg viewBox="0 0 24 24"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
              </div>
              <div className="sc-stat-text">
                <div className="sc-stat-num">{stats.totalBuildings}</div>
                <div className="sc-stat-label">Total Buildings</div>
              </div>
            </div>
            <div className="sc-stat-card">
              <div className="sc-stat-icon">
                <svg viewBox="0 0 24 24"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75"/></svg>
              </div>
              <div className="sc-stat-text">
                <div className="sc-stat-num">{stats.totalUsers}</div>
                <div className="sc-stat-label">Campus Users</div>
              </div>
            </div>
            <div className="sc-stat-card">
              <div className="sc-stat-icon">
                <svg viewBox="0 0 24 24"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>
              </div>
              <div className="sc-stat-text">
                <div className="sc-stat-num">{stats.uptime}%</div>
                <div className="sc-stat-label">Uptime Today</div>
              </div>
            </div>
          </div>

          {/* Link Cards */}
          <div className="sc-cards">
            <div className="sc-card">
              <div className="sc-card-icon">
                <svg viewBox="0 0 24 24"><path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>
              </div>
              <h3>Report Issues</h3>
              <p>Submit and track campus complaints and maintenance requests</p>
              <div className="sc-card-arrow">
                View complaints
                <svg style={{ width: 12, height: 12, stroke: 'currentColor', fill: 'none', strokeWidth: 2.5 }} viewBox="0 0 24 24">
                  <path d="M5 12h14M12 5l7 7-7 7"/>
                </svg>
              </div>
            </div>

            <div className="sc-card">
              <div className="sc-card-icon">
                <svg viewBox="0 0 24 24"><path d="M9 11l3 3L22 4"/><path d="M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11"/></svg>
              </div>
              <h3>Job Cards</h3>
              <p>Manage and monitor maintenance job cards and their progress</p>
              <div className="sc-card-arrow">
                View job cards
                <svg style={{ width: 12, height: 12, stroke: 'currentColor', fill: 'none', strokeWidth: 2.5 }} viewBox="0 0 24 24">
                  <path d="M5 12h14M12 5l7 7-7 7"/>
                </svg>
              </div>
            </div>

            <div className="sc-card">
              <div className="sc-card-icon">
                <svg viewBox="0 0 24 24"><line x1="12" y1="20" x2="12" y2="10"/><line x1="18" y1="20" x2="18" y2="4"/><line x1="6" y1="20" x2="6" y2="16"/></svg>
              </div>
              <h3>Analytics</h3>
              <p>View detailed reports and insights on campus operations</p>
              <div className="sc-card-arrow">
                View analytics
                <svg style={{ width: 12, height: 12, stroke: 'currentColor', fill: 'none', strokeWidth: 2.5 }} viewBox="0 0 24 24">
                  <path d="M5 12h14M12 5l7 7-7 7"/>
                </svg>
              </div>
            </div>
          </div>

          <div className="sc-footer">✦ Swachh Campus • Dashboard • 2026</div>
        </div>
      </div>
    </>
  )
}
