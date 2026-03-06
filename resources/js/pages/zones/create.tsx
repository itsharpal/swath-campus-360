import { useForm, usePage } from "@inertiajs/react"
import { router } from "@inertiajs/react"
import React, { useState } from "react"
import { MapPin, Hash, Clock, ChevronRight, ArrowLeft, Layers } from "lucide-react"

// @ts-ignore
import Swal from "sweetalert2"

export default function CreateZone() {
  const page: any = usePage()
  const floor = page.props.floor
  const zoneTypes: any[] = page.props.zoneTypes || []

  const { data, setData, post, processing, errors } = useForm({
    name: "",
    zoneTypeId: 0,
    cleaningFrequencyHours: 4,
  })

  const totalFields = 3
  const filled = [data.name, data.zoneTypeId, data.cleaningFrequencyHours].filter(
    (v) => v !== "" && v !== 0
  ).length
  const completion = Math.round((filled / totalFields) * 100)

  function submit(e: React.FormEvent) {
    e.preventDefault()
    post(`/floors/${floor.id}/zones`, {
      onSuccess: () => {
        Swal.fire({
          title: "Zone Created!",
          html: `<span style="color:#555;font-family:'DM Sans',sans-serif;">
            <strong>${data.name}</strong> has been successfully registered.
          </span>`,
          icon: "success",
          confirmButtonColor: "#1a7a4a",
          confirmButtonText: "View Zones →",
          customClass: {
            popup: "swal-campus-popup",
            title: "swal-campus-title",
          },
          timer: 3000,
          timerProgressBar: true,
        })
      },
      onError: () => {
        Swal.fire({
          title: "Oops!",
          text: "Please check the form and try again.",
          icon: "error",
          confirmButtonColor: "#1a7a4a",
          customClass: { popup: "swal-campus-popup" },
        })
      },
    })
  }

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=DM+Sans:wght@300;400;500;600&display=swap');

        .cz-root {
          min-height: 100vh;
          background: linear-gradient(135deg, #e8f5ee 0%, #f0faf4 40%, #e3f4eb 100%);
          font-family: 'DM Sans', sans-serif;
          display: flex; align-items: center; justify-content: center;
          padding: 40px 20px;
          position: relative; overflow: hidden;
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
          position: fixed; border-radius: 50%; background: #16a34a;
          pointer-events: none; z-index: 1;
        }

        .cz-card {
          background: #fff; border-radius: 24px;
          width: 100%; max-width: 500px;
          box-shadow: 0 8px 40px rgba(0,0,0,0.08);
          overflow: hidden; position: relative; z-index: 2;
        }

        .progress-bar-wrap {
          height: 4px; background: #f3f4f6;
          display: flex; align-items: center;
        }
        .progress-bar-fill {
          height: 100%;
          background: linear-gradient(90deg, #16a34a, #34d399);
          transition: width 0.4s ease;
          border-radius: 0 4px 4px 0;
        }
        .progress-header {
          display: flex; justify-content: space-between; align-items: center;
          padding: 14px 28px 0;
          font-size: 10px; letter-spacing: 0.1em; text-transform: uppercase;
          color: #9ca3af; font-weight: 500;
        }

        .cz-body { padding: 28px 28px 0; }

        .breadcrumb {
          display: flex; align-items: center; gap: 8px;
          font-size: 11px; font-weight: 600; letter-spacing: 0.08em;
          text-transform: uppercase; margin-bottom: 16px;
        }
        .breadcrumb-pill {
          background: #f0fdf4; border: 1px solid #bbf7d0;
          color: #16a34a; padding: 4px 12px; border-radius: 20px;
          display: flex; align-items: center; gap: 6px;
        }
        .breadcrumb-dot { width: 6px; height: 6px; background: #16a34a; border-radius: 50%; }
        .breadcrumb-line { flex: 1; height: 1px; background: #e5e7eb; }
        .breadcrumb-text { color: #6b7280; }

        .cz-title {
          font-family: 'DM Serif Display', serif;
          font-size: 34px; line-height: 1.1;
          color: #14532d; margin: 0 0 6px;
        }
        .cz-title em { color: #16a34a; font-style: italic; }
        .cz-sub { font-size: 13px; color: #9ca3af; margin: 0 0 28px; }

        .field-group { margin-bottom: 20px; }
        .field-label {
          display: flex; justify-content: space-between;
          align-items: center; margin-bottom: 8px;
        }
        .field-label-left {
          display: flex; align-items: center; gap: 8px;
          font-size: 13px; font-weight: 500; color: #374151;
        }
        .field-label-right { font-size: 11px; color: #9ca3af; letter-spacing: 0.06em; }
        .field-icon { color: #16a34a; }

        .field-input {
          width: 100%; padding: 13px 16px;
          border: 1.5px solid #e5e7eb; border-radius: 12px;
          font-size: 14px; color: #111827;
          font-family: 'DM Sans', sans-serif;
          outline: none; transition: border-color 0.2s;
          box-sizing: border-box; background: #fafafa;
        }
        .field-input:focus { border-color: #16a34a; background: #fff; }
        .field-input::placeholder { color: #d1d5db; }
        .field-input.has-error { border-color: #fca5a5; }

        .field-select {
          width: 100%; padding: 13px 16px;
          border: 1.5px solid #e5e7eb; border-radius: 12px;
          font-size: 14px; color: #111827;
          font-family: 'DM Sans', sans-serif;
          outline: none; transition: border-color 0.2s;
          box-sizing: border-box; background: #fafafa;
          appearance: none; cursor: pointer;
        }
        .field-select:focus { border-color: #16a34a; background: #fff; }

        .field-select-wrap { position: relative; }
        .field-select-arrow {
          position: absolute; right: 14px; top: 50%;
          transform: translateY(-50%); pointer-events: none;
          color: #9ca3af;
        }

        .field-error { font-size: 12px; color: #ef4444; margin-top: 5px; }

        .freq-options { display: flex; gap: 8px; }
        .freq-btn {
          flex: 1; padding: 11px 8px; border-radius: 10px;
          border: 1.5px solid #e5e7eb; background: #fafafa;
          font-size: 13px; color: #6b7280; cursor: pointer;
          transition: all 0.15s; font-family: 'DM Sans', sans-serif;
          text-align: center;
        }
        .freq-btn.active {
          border-color: #16a34a; background: #f0fdf4; color: #16a34a; font-weight: 500;
        }
        .freq-btn:hover:not(.active) { border-color: #d1fae5; }
        .freq-custom { margin-top: 8px; }

        .cz-footer {
          display: flex; justify-content: space-between; align-items: center;
          padding: 20px 28px 28px;
        }
        .btn-cancel {
          display: flex; align-items: center; gap: 6px;
          background: none; border: none; color: #6b7280;
          font-size: 13px; cursor: pointer; font-family: 'DM Sans', sans-serif;
          padding: 10px 0; transition: color 0.15s;
        }
        .btn-cancel:hover { color: #111827; }
        .btn-save {
          display: flex; align-items: center; gap: 8px;
          background: #1a7a4a; color: #fff;
          border: none; border-radius: 12px;
          padding: 13px 24px; font-size: 14px; font-weight: 500;
          cursor: pointer; transition: all 0.2s;
          font-family: 'DM Sans', sans-serif;
          box-shadow: 0 4px 16px rgba(26,122,74,0.25);
        }
        .btn-save:hover:not(:disabled) { background: #166038; transform: translateY(-1px); }
        .btn-save:disabled { opacity: 0.6; cursor: not-allowed; }

        .cz-copyright {
          text-align: center; padding: 0 28px 20px;
          font-size: 10px; letter-spacing: 0.1em; text-transform: uppercase;
          color: #d1d5db;
        }

        .swal-campus-popup { border-radius: 20px !important; font-family: 'DM Sans', sans-serif !important; }
        .swal-campus-title { font-family: 'DM Serif Display', serif !important; color: #14532d !important; }
      `}</style>

      <div className="cz-root">
        <div className="dot-grid" />
        <div className="corner-bracket tl" />
        <div className="corner-bracket br" />
        <div className="floating-dot" style={{ width: 8, height: 8, bottom: 120, left: 80 }} />
        <div className="floating-dot" style={{ width: 5, height: 5, top: 160, right: 100 }} />
        <div className="floating-dot" style={{ width: 10, height: 10, bottom: 220, right: 180 }} />

        <div className="cz-card">
          {/* Progress */}
          <div className="progress-header">
            <span>Form Completion</span>
            <span>{completion}%</span>
          </div>
          <div className="progress-bar-wrap">
            <div className="progress-bar-fill" style={{ width: `${completion}%` }} />
          </div>

          <div className="cz-body">
            {/* Breadcrumb */}
            <div className="breadcrumb">
              <div className="breadcrumb-pill">
                <div className="breadcrumb-dot" />
                Swachh Campus
              </div>
              <div className="breadcrumb-line" />
              <span className="breadcrumb-text">Campus Registry</span>
              <div className="breadcrumb-line" />
              <span className="breadcrumb-text">New Zone</span>
            </div>

            <h1 className="cz-title">New <em>Zone</em></h1>
            <p className="cz-sub">Register a zone under {floor?.name || "this floor"}.</p>

            <form onSubmit={submit}>
              {/* Zone Name */}
              <div className="field-group">
                <div className="field-label">
                  <div className="field-label-left">
                    <MapPin size={14} className="field-icon" />
                    Zone Name
                  </div>
                  <span className="field-label-right">Official Name</span>
                </div>
                <input
                  className={`field-input ${errors.name ? "has-error" : ""}`}
                  placeholder="e.g. Washroom Block A"
                  value={data.name}
                  onChange={(e) => setData("name", (e.target as any).value)}
                />
                {errors.name && <div className="field-error">{errors.name}</div>}
              </div>

              {/* Zone Type */}
              <div className="field-group">
                <div className="field-label">
                  <div className="field-label-left">
                    <Layers size={14} className="field-icon" />
                    Zone Type
                  </div>
                  <span className="field-label-right">Category</span>
                </div>
                <div className="field-select-wrap">
                  <select
                    className="field-select"
                    value={data.zoneTypeId}
                    onChange={(e) => setData("zoneTypeId", Number((e.target as any).value))}
                  >
                    <option value={0} disabled>Select a Zone Type</option>
                    {zoneTypes.map((type: any) => (
                      <option key={type.id} value={type.id}>{type.name}</option>
                    ))}
                  </select>
                  <div className="field-select-arrow">
                    <ChevronRight size={14} style={{ transform: "rotate(90deg)" }} />
                  </div>
                </div>
              </div>

              {/* Cleaning Frequency */}
              <div className="field-group">
                <div className="field-label">
                  <div className="field-label-left">
                    <Clock size={14} className="field-icon" />
                    Cleaning Frequency
                  </div>
                  <span className="field-label-right">Hours</span>
                </div>
                <div className="freq-options">
                  {[2, 4, 6, 8].map((h) => (
                    <button
                      key={h}
                      type="button"
                      className={`freq-btn ${data.cleaningFrequencyHours === h ? "active" : ""}`}
                      onClick={() => setData("cleaningFrequencyHours", h)}
                    >
                      {h}h
                    </button>
                  ))}
                </div>
                <div className="freq-custom">
                  <input
                    type="number"
                    className="field-input"
                    placeholder="Or enter custom hours..."
                    value={data.cleaningFrequencyHours}
                    onChange={(e) => setData("cleaningFrequencyHours", Number((e.target as any).value))}
                    style={{ marginTop: 0 }}
                  />
                </div>
              </div>
            </form>
          </div>

          {/* Footer */}
          <div className="cz-footer">
            <button className="btn-cancel" onClick={() => router.visit(`/floors/${floor?.id}/zones`)}>
              <ArrowLeft size={14} />
              Cancel
            </button>
            <button className="btn-save" onClick={submit} disabled={processing}>
              Save Zone
              <ChevronRight size={16} />
            </button>
          </div>

          <div className="cz-copyright">
            ★ Swachh Campus • Zone Registry • 2026
          </div>
        </div>
      </div>
    </>
  )
}