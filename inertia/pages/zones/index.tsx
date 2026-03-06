import { router, usePage } from "@inertiajs/react"
import React, { useState } from "react"
import { Plus, Eye, Pencil, Trash2, QrCode, MapPin, Clock, Search, Shield, LayoutGrid } from "lucide-react"

// @ts-ignore
import Swal from "sweetalert2"

export default function ZonesIndex() {
  const page: any = usePage()
  const floor = page.props.floor
  const zones = page.props.zones || []
  const [search, setSearch] = useState("")

  const filtered = zones.filter((z: any) =>
    z.name?.toLowerCase().includes(search.toLowerCase()) ||
    z.zoneType?.name?.toLowerCase().includes(search.toLowerCase())
  )

  function deleteZone(id: number, name: string) {
    Swal.fire({
      title: "Remove Zone?",
      html: `<span style="color:#555;">Are you sure you want to delete <strong>${name}</strong>? This action cannot be undone.</span>`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#1a7a4a",
      cancelButtonColor: "#e5e7eb",
      confirmButtonText: "Yes, Delete",
      cancelButtonText: "Cancel",
      customClass: {
        popup: "swal-campus-popup",
        title: "swal-campus-title",
        cancelButton: "swal-cancel-btn",
      },
      background: "#fff",
    }).then((result: any) => {
      if (result.isConfirmed) {
        router.delete(`/zones/${id}`, {
          onSuccess: () => {
            Swal.fire({
              title: "Deleted!",
              text: `${name} has been removed.`,
              icon: "success",
              confirmButtonColor: "#1a7a4a",
              timer: 2000,
              timerProgressBar: true,
              customClass: { popup: "swal-campus-popup" },
            })
          },
        })
      }
    })
  }

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=DM+Sans:wght@300;400;500;600&display=swap');

        .zones-root {
          min-height: 100vh;
          background: linear-gradient(135deg, #e8f5ee 0%, #f0faf4 40%, #e3f4eb 100%);
          font-family: 'DM Sans', sans-serif;
          position: relative;
          overflow-x: hidden;
        }
        .zones-root::before {
          content: '';
          position: fixed;
          top: -120px; left: -120px;
          width: 400px; height: 400px;
          background: radial-gradient(circle, rgba(34,139,74,0.08) 0%, transparent 70%);
          pointer-events: none;
          z-index: 0;
        }
        .zones-root::after {
          content: '';
          position: fixed;
          bottom: -80px; right: -80px;
          width: 300px; height: 300px;
          background: radial-gradient(circle, rgba(34,139,74,0.06) 0%, transparent 70%);
          pointer-events: none;
          z-index: 0;
        }
        .dot-grid {
          position: fixed; inset: 0; pointer-events: none; z-index: 0;
          background-image: radial-gradient(circle, #22c55e22 1px, transparent 1px);
          background-size: 28px 28px;
        }
        .corner-bracket {
          position: fixed;
          width: 48px; height: 48px;
          border-color: #22c55e44;
          border-style: solid;
          pointer-events: none;
          z-index: 1;
        }
        .corner-bracket.tl { top: 16px; left: 16px; border-width: 2px 0 0 2px; }
        .corner-bracket.br { bottom: 16px; right: 16px; border-width: 0 2px 2px 0; }

        .zones-inner { position: relative; z-index: 2; padding: 48px 48px 64px; }

        .zones-header { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 40px; }
        .zones-eyebrow {
          display: flex; align-items: center; gap: 10px;
          font-size: 11px; font-weight: 500; letter-spacing: 0.12em;
          color: #22863a; text-transform: uppercase; margin-bottom: 6px;
        }
        .zones-eyebrow span { width: 28px; height: 1px; background: #22863a; display: block; }
        .zones-title {
          font-family: 'DM Serif Display', serif;
          font-size: 42px; line-height: 1.1;
          color: #14532d; margin: 0 0 6px;
        }
        .zones-title em { color: #16a34a; font-style: italic; }
        .zones-sub { font-size: 14px; color: #6b7280; margin: 0; }

        .btn-add {
          display: flex; align-items: center; gap: 8px;
          background: #1a7a4a; color: #fff;
          border: none; border-radius: 12px;
          padding: 13px 22px; font-size: 14px; font-weight: 500;
          cursor: pointer; transition: all 0.2s;
          font-family: 'DM Sans', sans-serif;
          box-shadow: 0 4px 16px rgba(26,122,74,0.25);
        }
        .btn-add:hover { background: #166038; transform: translateY(-1px); box-shadow: 0 6px 20px rgba(26,122,74,0.35); }

        .stats-row { display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; margin-bottom: 32px; }
        .stat-card {
          background: #fff; border-radius: 16px; padding: 20px 24px;
          display: flex; align-items: center; gap: 16px;
          box-shadow: 0 1px 4px rgba(0,0,0,0.05);
        }
        .stat-icon-wrap {
          width: 44px; height: 44px; border-radius: 12px;
          background: #f0fdf4; display: flex; align-items: center; justify-content: center;
          color: #16a34a; flex-shrink: 0;
        }
        .stat-num { font-size: 26px; font-weight: 600; color: #14532d; line-height: 1; }
        .stat-label { font-size: 12px; color: #9ca3af; margin-top: 2px; }

        .search-wrap {
          background: #fff; border-radius: 14px;
          display: flex; align-items: center; gap: 12px;
          padding: 0 18px; margin-bottom: 28px;
          box-shadow: 0 1px 4px rgba(0,0,0,0.06);
        }
        .search-wrap input {
          border: none; outline: none; width: 100%; padding: 16px 0;
          font-size: 14px; color: #374151; background: transparent;
          font-family: 'DM Sans', sans-serif;
        }
        .search-wrap input::placeholder { color: #d1d5db; }

        .zones-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; }

        .zone-card {
          background: #fff; border-radius: 18px;
          padding: 0; overflow: hidden;
          box-shadow: 0 2px 8px rgba(0,0,0,0.06);
          transition: all 0.25s; position: relative;
          border-top: 3px solid #16a34a;
        }
        .zone-card:hover { transform: translateY(-3px); box-shadow: 0 8px 28px rgba(0,0,0,0.1); }

        .zone-card-top { padding: 22px 22px 16px; }
        .zone-badge {
          position: absolute; top: 18px; right: 18px;
          background: #f0fdf4; color: #16a34a;
          font-size: 10px; font-weight: 600; letter-spacing: 0.08em;
          padding: 4px 10px; border-radius: 20px; border: 1px solid #bbf7d0;
        }
        .zone-icon-wrap {
          width: 40px; height: 40px; background: #f0fdf4;
          border-radius: 10px; display: flex; align-items: center;
          justify-content: center; color: #16a34a; margin-bottom: 12px;
        }
        .zone-name { font-size: 17px; font-weight: 600; color: #111827; margin: 0 0 4px; }
        .zone-type { font-size: 13px; color: #9ca3af; margin: 0; }
        .zone-meta {
          display: flex; align-items: center; gap: 6px;
          font-size: 12px; color: #6b7280; margin-top: 10px;
        }

        .zone-divider { height: 1px; background: #f3f4f6; margin: 0 22px; }

        .zone-actions { display: flex; gap: 8px; padding: 14px 22px; }
        .btn-action {
          display: flex; align-items: center; gap: 5px;
          padding: 7px 13px; border-radius: 8px; border: 1px solid;
          font-size: 12px; font-weight: 500; cursor: pointer;
          transition: all 0.15s; font-family: 'DM Sans', sans-serif;
          background: transparent;
        }
        .btn-view { border-color: #d1d5db; color: #374151; }
        .btn-view:hover { background: #f9fafb; }
        .btn-edit { border-color: #bbf7d0; color: #16a34a; }
        .btn-edit:hover { background: #f0fdf4; }
        .btn-qr { border-color: #a7f3d0; color: #059669; }
        .btn-qr:hover { background: #ecfdf5; }
        .btn-delete { border-color: #fecaca; color: #ef4444; }
        .btn-delete:hover { background: #fef2f2; }

        .empty-state {
          text-align: center; padding: 80px 32px;
          color: #9ca3af; grid-column: 1/-1;
        }
        .empty-icon {
          width: 64px; height: 64px; background: #f0fdf4;
          border-radius: 50%; display: flex; align-items: center;
          justify-content: center; color: #86efac; margin: 0 auto 16px;
        }
        .empty-title { font-size: 16px; color: #374151; font-weight: 500; margin-bottom: 4px; }

        .swal-campus-popup { border-radius: 20px !important; font-family: 'DM Sans', sans-serif !important; }
        .swal-campus-title { font-family: 'DM Serif Display', serif !important; color: #14532d !important; }
        .swal-cancel-btn { color: #374151 !important; }
      `}</style>

      <div className="zones-root">
        <div className="dot-grid" />
        <div className="corner-bracket tl" />
        <div className="corner-bracket br" />

        <div className="zones-inner">
          {/* Header */}
          <div className="zones-header">
            <div>
              <div className="zones-eyebrow">
                <span />★ Swachh Campus<span />
              </div>
              <h1 className="zones-title">
                {floor?.name} <em>Zones</em>
              </h1>
              <p className="zones-sub">Manage all zones registered under this floor.</p>
            </div>
            <button className="btn-add" onClick={() => router.visit(`/floors/${floor.id}/zones/create`)}>
              <Plus size={16} />
              Add Zone
            </button>
          </div>

          {/* Stats */}
          <div className="stats-row">
            <div className="stat-card">
              <div className="stat-icon-wrap"><LayoutGrid size={20} /></div>
              <div>
                <div className="stat-num">{zones.length}</div>
                <div className="stat-label">Total Zones</div>
              </div>
            </div>
            <div className="stat-card">
              <div className="stat-icon-wrap"><Shield size={20} /></div>
              <div>
                <div className="stat-num">{zones.length}</div>
                <div className="stat-label">Active Zones</div>
              </div>
            </div>
            <div className="stat-card">
              <div className="stat-icon-wrap"><Search size={20} /></div>
              <div>
                <div className="stat-num">{filtered.length}</div>
                <div className="stat-label">Showing Results</div>
              </div>
            </div>
          </div>

          {/* Search */}
          <div className="search-wrap">
            <Search size={16} color="#d1d5db" />
            <input
              placeholder="Search by zone name or type..."
              value={search}
              onChange={(e) => setSearch((e.target as any).value)}
            />
          </div>

          {/* Grid */}
          <div className="zones-grid">
            {filtered.length === 0 ? (
              <div className="empty-state">
                <div className="empty-icon"><MapPin size={28} /></div>
                <div className="empty-title">No zones found</div>
                <p style={{ fontSize: 13 }}>Try a different search or add a new zone.</p>
              </div>
            ) : (
              filtered.map((zone: any) => (
                <div className="zone-card" key={zone.id}>
                  <div className="zone-card-top">
                    <div className="zone-badge">{zone.zoneType?.name || "Zone"}</div>
                    <div className="zone-icon-wrap"><MapPin size={18} /></div>
                    <div className="zone-name">{zone.name}</div>
                    <div className="zone-type">{zone.zoneType?.name || "—"}</div>
                    <div className="zone-meta">
                      <Clock size={12} />
                      Every {zone.cleaningFrequencyHours}h cleaning
                    </div>
                  </div>
                  <div className="zone-divider" />
                  <div className="zone-actions">
                    <button className="btn-action btn-view" onClick={() => router.visit(`/zones/${zone.id}`)}>
                      <Eye size={12} /> View
                    </button>
                    <button className="btn-action btn-edit" onClick={() => router.visit(`/zones/${zone.id}/edit`)}>
                      <Pencil size={12} /> Edit
                    </button>
                    <button className="btn-action btn-qr" onClick={() => router.visit(`/zones/${zone.id}/qr`)}>
                      <QrCode size={12} /> QR
                    </button>
                    <button className="btn-action btn-delete" onClick={() => deleteZone(zone.id, zone.name)}>
                      <Trash2 size={12} /> Delete
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </>
  )
}