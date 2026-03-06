import { router, usePage } from "@inertiajs/react"
import React from "react"
import { MapPin, Clock, Star, Pencil, QrCode, ArrowLeft, Activity, Layers, Shield } from "lucide-react"

// @ts-ignore
import Swal from "sweetalert2"

export default function ShowZone() {
  const page: any = usePage()
  const zone = page.props.zone

  if (!zone) {
    return (
      <div style={{
        minHeight: "100vh", display: "flex", alignItems: "center",
        justifyContent: "center", background: "#f0fdf4",
        fontFamily: "DM Sans, sans-serif", color: "#16a34a"
      }}>
        Loading zone...
      </div>
    )
  }

  function handleGenerateQR() {
    Swal.fire({
      title: "Generate QR Code?",
      html: `<span style="color:#555;font-family:'DM Sans',sans-serif;">
        This will generate a QR code for <strong>${zone.name}</strong>.
      </span>`,
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#1a7a4a",
      cancelButtonColor: "#e5e7eb",
      confirmButtonText: "Generate →",
      cancelButtonText: "Cancel",
      customClass: {
        popup: "swal-campus-popup",
        title: "swal-campus-title",
        cancelButton: "swal-cancel-btn",
      },
    }).then(async (result: any) => {
      if (!result.isConfirmed) return

      try {
        const res = await fetch(`/zones/${zone.id}/qr`)
        const json = await res.json()
  const qr = json.qr
  const targetUrl = `${window.location.origin}/zones/by-qr/${encodeURIComponent(qr)}`
  // Primary QR image provider (reliable public API) with a Google Charts fallback
  const googleUrl = `https://chart.googleapis.com/chart?cht=qr&chs=360x360&chl=${encodeURIComponent(targetUrl)}&chld=L|1`
  const qrImg = `https://api.qrserver.com/v1/create-qr-code/?size=360x360&data=${encodeURIComponent(targetUrl)}`

        Swal.fire({
          title: 'QR Code generated',
          html: `<div style="text-align:center">
            <img src="${qrImg}" alt="QR code" style="width:300px;height:300px;border-radius:12px;border:1px solid #e6f4ea" onerror="this.onerror=null;this.src='${googleUrl}'"/>
            <p style="margin-top:8px;color:#6b7280;font-size:0.92rem;">Scan this QR to open the complaint form (building & floor will be prefilled).</p>
            <a href="${targetUrl}" target="_blank" rel="noreferrer" style="display:inline-block;margin-top:6px;color:#16a34a;font-weight:700;text-decoration:none">Open link</a>
          </div>`,
          showConfirmButton: true,
          confirmButtonText: 'Close',
          customClass: { popup: 'swal-campus-popup' },
        })
      } catch (err) {
        Swal.fire({ title: 'Error', text: 'Failed to generate QR. Try again.', icon: 'error', customClass: { popup: 'swal-campus-popup' } })
      }
    })
  }

  const scoreColor = zone.cleanlinessScore >= 80
    ? "#16a34a"
    : zone.cleanlinessScore >= 50
    ? "#f59e0b"
    : "#ef4444"

  const scoreLabel = zone.cleanlinessScore >= 80 ? "Excellent" : zone.cleanlinessScore >= 50 ? "Fair" : "Needs Attention"

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=DM+Sans:wght@300;400;500;600&display=swap');

        .sz-root {
          min-height: 100vh;
          background: linear-gradient(135deg, #e8f5ee 0%, #f0faf4 40%, #e3f4eb 100%);
          font-family: 'DM Sans', sans-serif;
          position: relative; overflow-x: hidden;
          padding: 48px 48px 80px;
        }
        .dot-grid {
          position: fixed; inset: 0; pointer-events: none; z-index: 0;
          background-image: radial-gradient(circle, #22c55e22 1px, transparent 1px);
          background-size: 28px 28px;
        }
        .corner-bracket {
          position: fixed; width: 48px; height: 48px;
          border-color: #22c55e44; border-style: solid; pointer-events: none; z-index: 1;
        }
        .corner-bracket.tl { top: 16px; left: 16px; border-width: 2px 0 0 2px; }
        .corner-bracket.br { bottom: 16px; right: 16px; border-width: 0 2px 2px 0; }
        .floating-dot {
          position: fixed; border-radius: 50%; background: #16a34a; pointer-events: none; z-index: 1;
        }

        .sz-inner { position: relative; z-index: 2; max-width: 900px; margin: 0 auto; }

        .back-btn {
          display: inline-flex; align-items: center; gap: 6px;
          background: none; border: none; color: #6b7280;
          font-size: 13px; cursor: pointer; font-family: 'DM Sans', sans-serif;
          padding: 0; margin-bottom: 32px; transition: color 0.15s;
        }
        .back-btn:hover { color: #111827; }

        .sz-header { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 36px; }
        .sz-eyebrow {
          display: flex; align-items: center; gap: 10px;
          font-size: 11px; font-weight: 500; letter-spacing: 0.12em;
          color: #22863a; text-transform: uppercase; margin-bottom: 8px;
        }
        .sz-eyebrow span { width: 28px; height: 1px; background: #22863a; }
        .sz-zone-badge {
          background: #f0fdf4; border: 1px solid #bbf7d0;
          color: #16a34a; padding: 4px 12px; border-radius: 20px;
          font-size: 11px; font-weight: 600; letter-spacing: 0.06em;
          display: inline-flex; align-items: center; gap: 6px; margin-bottom: 10px;
        }
        .sz-title {
          font-family: 'DM Serif Display', serif;
          font-size: 44px; line-height: 1.05;
          color: #14532d; margin: 0 0 6px;
        }
        .sz-title em { color: #16a34a; font-style: italic; }
        .sz-sub { font-size: 14px; color: #9ca3af; }

        .sz-actions { display: flex; gap: 10px; align-items: flex-start; margin-top: 8px; }
        .btn-edit-main {
          display: flex; align-items: center; gap: 8px;
          background: #1a7a4a; color: #fff;
          border: none; border-radius: 12px;
          padding: 12px 20px; font-size: 13px; font-weight: 500;
          cursor: pointer; transition: all 0.2s;
          font-family: 'DM Sans', sans-serif;
          box-shadow: 0 4px 14px rgba(26,122,74,0.25);
        }
        .btn-edit-main:hover { background: #166038; transform: translateY(-1px); }
        .btn-qr-main {
          display: flex; align-items: center; gap: 8px;
          background: #fff; color: #16a34a;
          border: 1.5px solid #bbf7d0; border-radius: 12px;
          padding: 12px 20px; font-size: 13px; font-weight: 500;
          cursor: pointer; transition: all 0.2s;
          font-family: 'DM Sans', sans-serif;
        }
        .btn-qr-main:hover { background: #f0fdf4; }

        .stats-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; margin-bottom: 24px; }
        .stat-card {
          background: #fff; border-radius: 16px; padding: 22px 24px;
          display: flex; align-items: center; gap: 16px;
          box-shadow: 0 1px 4px rgba(0,0,0,0.05);
        }
        .stat-icon {
          width: 44px; height: 44px; background: #f0fdf4;
          border-radius: 12px; display: flex; align-items: center;
          justify-content: center; color: #16a34a; flex-shrink: 0;
        }
        .stat-val { font-size: 22px; font-weight: 600; color: #14532d; }
        .stat-label { font-size: 12px; color: #9ca3af; margin-top: 2px; }

        .score-card {
          background: #fff; border-radius: 20px; padding: 28px 32px;
          box-shadow: 0 1px 4px rgba(0,0,0,0.05); margin-bottom: 24px;
          display: flex; align-items: center; justify-content: space-between;
        }
        .score-left { flex: 1; }
        .score-title {
          font-size: 13px; font-weight: 500; color: #9ca3af;
          text-transform: uppercase; letter-spacing: 0.08em; margin-bottom: 8px;
          display: flex; align-items: center; gap: 8px;
        }
        .score-num {
          font-family: 'DM Serif Display', serif;
          font-size: 56px; line-height: 1;
          font-weight: 400; margin-bottom: 8px;
        }
        .score-label {
          font-size: 13px; font-weight: 500;
          padding: 4px 12px; border-radius: 20px; display: inline-block;
        }
        .score-bar-wrap {
          flex: 1; margin-left: 48px;
        }
        .score-bar-track {
          height: 12px; background: #f3f4f6; border-radius: 100px; overflow: hidden;
        }
        .score-bar-fill {
          height: 100%; border-radius: 100px;
          transition: width 0.8s ease;
        }
        .score-bar-labels {
          display: flex; justify-content: space-between;
          font-size: 11px; color: #d1d5db; margin-top: 6px;
        }

        .detail-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }
        .detail-card {
          background: #fff; border-radius: 16px; padding: 22px 24px;
          box-shadow: 0 1px 4px rgba(0,0,0,0.05);
        }
        .detail-card-label {
          display: flex; align-items: center; gap: 8px;
          font-size: 11px; font-weight: 500; letter-spacing: 0.08em;
          color: #9ca3af; text-transform: uppercase; margin-bottom: 10px;
        }
        .detail-card-value { font-size: 18px; font-weight: 600; color: #14532d; }
        .detail-card-sub { font-size: 13px; color: #9ca3af; margin-top: 3px; }

        .swal-campus-popup { border-radius: 20px !important; font-family: 'DM Sans', sans-serif !important; }
        .swal-campus-title { font-family: 'DM Serif Display', serif !important; color: #14532d !important; }
        .swal-cancel-btn { color: #374151 !important; }
      `}</style>

      <div className="sz-root">
        <div className="dot-grid" />
        <div className="corner-bracket tl" />
        <div className="corner-bracket br" />
        <div className="floating-dot" style={{ width: 8, height: 8, bottom: 180, left: 60 }} />
        <div className="floating-dot" style={{ width: 5, height: 5, top: 200, right: 80 }} />

        <div className="sz-inner">
          {/* Back */}
          <button className="back-btn" onClick={() => router.back()}>
            <ArrowLeft size={14} /> Back to Zones
          </button>

          {/* Header */}
          <div className="sz-header">
            <div>
              <div className="sz-eyebrow">
                <span />★ Swachh Campus<span />
              </div>
              <div className="sz-zone-badge">
                <MapPin size={11} />
                {zone.zoneType?.name || "Zone"}
              </div>
              <h1 className="sz-title">{zone.name}</h1>
              <p className="sz-sub">Zone details and cleanliness overview</p>
            </div>
            <div className="sz-actions">
              <button className="btn-qr-main" onClick={handleGenerateQR}>
                <QrCode size={14} /> Generate QR
              </button>
              <button className="btn-edit-main" onClick={() => router.visit(`/zones/${zone.id}/edit`)}>
                <Pencil size={14} /> Edit Zone
              </button>
            </div>
          </div>

          {/* Stats */}
          <div className="stats-grid">
            <div className="stat-card">
              <div className="stat-icon"><Layers size={20} /></div>
              <div>
                <div className="stat-val">{zone.zoneType?.name || "—"}</div>
                <div className="stat-label">Zone Type</div>
              </div>
            </div>
            <div className="stat-card">
              <div className="stat-icon"><Clock size={20} /></div>
              <div>
                <div className="stat-val">Every {zone.cleaningFrequencyHours}h</div>
                <div className="stat-label">Cleaning Frequency</div>
              </div>
            </div>
            <div className="stat-card">
              <div className="stat-icon"><Shield size={20} /></div>
              <div>
                <div className="stat-val" style={{ color: "#16a34a" }}>Active</div>
                <div className="stat-label">Zone Status</div>
              </div>
            </div>
          </div>

          {/* Cleanliness Score */}
          {zone.cleanlinessScore !== undefined && (
            <div className="score-card">
              <div className="score-left">
                <div className="score-title">
                  <Activity size={14} />
                  Cleanliness Score
                </div>
                <div className="score-num" style={{ color: scoreColor }}>
                  {zone.cleanlinessScore}
                </div>
                <span
                  className="score-label"
                  style={{
                    background: scoreColor + "18",
                    color: scoreColor,
                    border: `1px solid ${scoreColor}44`,
                  }}
                >
                  {scoreLabel}
                </span>
              </div>
              <div className="score-bar-wrap">
                <div className="score-bar-track">
                  <div
                    className="score-bar-fill"
                    style={{
                      width: `${Math.min(zone.cleanlinessScore, 100)}%`,
                      background: `linear-gradient(90deg, ${scoreColor}cc, ${scoreColor})`,
                    }}
                  />
                </div>
                <div className="score-bar-labels">
                  <span>0</span>
                  <span>50</span>
                  <span>100</span>
                </div>
              </div>
            </div>
          )}

          {/* Details */}
          <div className="detail-grid">
            <div className="detail-card">
              <div className="detail-card-label">
                <MapPin size={12} color="#16a34a" />
                Zone Name
              </div>
              <div className="detail-card-value">{zone.name}</div>
              <div className="detail-card-sub">Official registered name</div>
            </div>
            <div className="detail-card">
              <div className="detail-card-label">
                <Layers size={12} color="#16a34a" />
                Zone Type
              </div>
              <div className="detail-card-value">{zone.zoneType?.name || "—"}</div>
              <div className="detail-card-sub">Classification category</div>
            </div>
            <div className="detail-card">
              <div className="detail-card-label">
                <Clock size={12} color="#16a34a" />
                Cleaning Schedule
              </div>
              <div className="detail-card-value">{zone.cleaningFrequencyHours} hours</div>
              <div className="detail-card-sub">Frequency between cleanings</div>
            </div>
            <div className="detail-card">
              <div className="detail-card-label">
                <Star size={12} color="#16a34a" />
                Zone ID
              </div>
              <div className="detail-card-value">#{zone.id}</div>
              <div className="detail-card-sub">Unique zone identifier</div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
