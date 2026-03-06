import { Link } from '@adonisjs/inertia/react'
import { router } from '@inertiajs/react'
import Swal from 'sweetalert2'

type Role = {
  id: number
  name: string
}

type User = {
  id: number
  name: string
  email: string
  phone: string | null
  isActive: boolean
  role: Role
}

export type Props = {
  user: User
}

const ROLE_COLORS: Record<string, { bg: string; color: string }> = {
  admin:      { bg: 'rgba(139,92,246,0.1)', color: '#7c3aed' },
  supervisor: { bg: 'rgba(59,130,246,0.1)', color: '#1d4ed8' },
  staff:      { bg: 'rgba(22,163,74,0.1)',  color: '#15803d' },
}

export default function ShowUser({ user }: { user: User }) {
  const roleStyle = ROLE_COLORS[user.role?.name?.toLowerCase()] ?? { bg: 'rgba(100,116,139,0.1)', color: '#475569' }

  async function handleDeactivate() {
    const result = await Swal.fire({
      title: `Deactivate ${user.name}?`,
      text: 'This user will immediately lose access to the system.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#ef4444',
      cancelButtonColor: '#94a3b8',
      confirmButtonText: 'Yes, deactivate',
      cancelButtonText: 'Cancel',
      background: '#ffffff',
      customClass: { popup: 'swal-campus-popup', title: 'swal-campus-title' },
    })

    if (result.isConfirmed) {
      router.delete(`/admin/users/${user.id}`, {
        onSuccess: () => {
          Swal.fire({
            title: 'Deactivated!',
            text: `${user.name} no longer has access.`,
            icon: 'success',
            confirmButtonColor: '#16a34a',
            timer: 2000,
            timerProgressBar: true,
            showConfirmButton: false,
            background: '#ffffff',
            customClass: { popup: 'swal-campus-popup' },
          })
        },
      })
    }
  }

  const details = [
    {
      label: 'Full Name',
      value: user.name,
      icon: (
        <svg width="15" height="15" fill="none" stroke="#16a34a" strokeWidth="2" viewBox="0 0 24 24">
          <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/><circle cx="12" cy="7" r="4"/>
        </svg>
      ),
    },
    {
      label: 'Email Address',
      value: user.email,
      icon: (
        <svg width="15" height="15" fill="none" stroke="#16a34a" strokeWidth="2" viewBox="0 0 24 24">
          <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/>
        </svg>
      ),
    },
    {
      label: 'Role',
      value: (
        <span style={{ fontSize: '0.75rem', fontWeight: 700, padding: '4px 12px', borderRadius: '20px', textTransform: 'capitalize', background: roleStyle.bg, color: roleStyle.color }}>
          {user.role?.name ?? '—'}
        </span>
      ),
      icon: (
        <svg width="15" height="15" fill="none" stroke="#16a34a" strokeWidth="2" viewBox="0 0 24 24">
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
        </svg>
      ),
    },
    {
      label: 'Phone',
      value: user.phone ?? '—',
      icon: (
        <svg width="15" height="15" fill="none" stroke="#16a34a" strokeWidth="2" viewBox="0 0 24 24">
          <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 014.99 12 19.79 19.79 0 011.94 3.37 2 2 0 013.92 1h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 8.91a16 16 0 006 6l1.08-1.08a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/>
        </svg>
      ),
    },
    {
      label: 'Account Status',
      value: (
        <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', fontSize: '0.75rem', fontWeight: 700, padding: '4px 12px', borderRadius: '20px', background: user.isActive ? '#d1fae5' : '#f1f5f9', color: user.isActive ? '#047857' : '#64748b', border: `1px solid ${user.isActive ? '#a7f3d0' : '#e2e8f0'}` }}>
          <div style={{ width: '7px', height: '7px', borderRadius: '50%', background: user.isActive ? '#10b981' : '#94a3b8' }} />
          {user.isActive ? 'Active' : 'Inactive'}
        </span>
      ),
      icon: (
        <svg width="15" height="15" fill="none" stroke="#16a34a" strokeWidth="2" viewBox="0 0 24 24">
          <circle cx="12" cy="12" r="10"/>
          <path d="M9 12l2 2 4-4" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      ),
    },
  ]

  return (
    <div
      style={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #f0fdf4 0%, #dcfce7 50%, #f0fdf4 100%)',
        fontFamily: "'DM Sans', 'Segoe UI', sans-serif",
        padding: '2.5rem 2rem',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <div style={{ position: 'fixed', top: '-80px', left: '-80px', width: '300px', height: '300px', borderRadius: '50%', border: '2px solid rgba(22,163,74,0.08)', pointerEvents: 'none' }} />
      <div style={{ position: 'fixed', bottom: '-60px', right: '-60px', width: '250px', height: '250px', borderRadius: '50%', border: '2px solid rgba(22,163,74,0.06)', pointerEvents: 'none' }} />

      <div style={{ maxWidth: '640px', margin: '0 auto' }}>
        {/* Back */}
        <Link href="/admin/users" style={{
          display: 'inline-flex', alignItems: 'center', gap: '6px',
          fontSize: '0.82rem', fontWeight: 600, color: '#16a34a',
          textDecoration: 'none', marginBottom: '1.5rem',
          padding: '6px 14px', borderRadius: '8px',
          border: '1px solid #bbf7d0', background: '#f0fdf4',
        }}>
          <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
            <path d="M19 12H5M12 19l-7-7 7-7" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          Back to Users
        </Link>

        {/* Header */}
        <div style={{ marginBottom: '1.75rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '6px' }}>
            <div style={{ width: '28px', height: '2px', background: '#16a34a' }} />
            <span style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '0.15em', color: '#16a34a', textTransform: 'uppercase' }}>Swachh Campus — Campus Registry</span>
            <div style={{ width: '28px', height: '2px', background: '#16a34a' }} />
          </div>
          <h1 style={{ fontSize: '2.4rem', fontWeight: 800, lineHeight: 1.1, color: '#0f172a', margin: 0 }}>
            User <span style={{ color: '#16a34a' }}>Details</span>
          </h1>
        </div>

        {/* Profile hero */}
        <div style={{
          background: '#fff', borderRadius: '16px',
          boxShadow: '0 1px 8px rgba(0,0,0,0.06)',
          border: '1px solid rgba(22,163,74,0.1)',
          padding: '2rem', marginBottom: '1.25rem',
          display: 'flex', alignItems: 'center', gap: '1.5rem',
          flexWrap: 'wrap',
        }}>
          <div style={{
            width: '72px', height: '72px', borderRadius: '50%',
            background: 'linear-gradient(135deg, #16a34a, #4ade80)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            color: '#fff', fontWeight: 900, fontSize: '1.75rem', flexShrink: 0,
            boxShadow: '0 4px 14px rgba(22,163,74,0.3)',
          }}>
            {user.name.charAt(0).toUpperCase()}
          </div>
          <div style={{ flex: 1, minWidth: '180px' }}>
            <h2 style={{ margin: 0, fontSize: '1.4rem', fontWeight: 800, color: '#0f172a' }}>{user.name}</h2>
            <p style={{ margin: '3px 0 8px', fontSize: '0.85rem', color: '#64748b' }}>{user.email}</p>
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
              <span style={{ fontSize: '0.72rem', fontWeight: 700, padding: '3px 10px', borderRadius: '20px', textTransform: 'capitalize', background: roleStyle.bg, color: roleStyle.color }}>
                {user.role?.name ?? '—'}
              </span>
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', fontSize: '0.72rem', fontWeight: 700, padding: '3px 10px', borderRadius: '20px', background: user.isActive ? '#d1fae5' : '#f1f5f9', color: user.isActive ? '#047857' : '#64748b' }}>
                <div style={{ width: '5px', height: '5px', borderRadius: '50%', background: user.isActive ? '#10b981' : '#94a3b8' }} />
                {user.isActive ? 'Active' : 'Inactive'}
              </span>
            </div>
          </div>
        </div>

        {/* Details card */}
        <div style={{ background: '#fff', borderRadius: '16px', boxShadow: '0 1px 8px rgba(0,0,0,0.06)', border: '1px solid rgba(22,163,74,0.1)', overflow: 'hidden', marginBottom: '1.25rem' }}>
          <div style={{ padding: '1rem 1.5rem', background: '#f8fafc', borderBottom: '1px solid #f1f5f9' }}>
            <h3 style={{ margin: 0, fontSize: '0.78rem', fontWeight: 700, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.06em' }}>Account Information</h3>
          </div>
          {details.map((d, i) => (
            <div key={d.label} style={{
              display: 'flex', alignItems: 'center', justifyContent: 'space-between',
              padding: '0.95rem 1.5rem',
              borderBottom: i < details.length - 1 ? '1px solid #f8fafc' : 'none',
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#64748b', fontSize: '0.85rem', fontWeight: 500 }}>
                {d.icon}
                {d.label}
              </div>
              <div style={{ fontWeight: 600, color: '#374151', fontSize: '0.88rem', textAlign: 'right' }}>
                {d.value}
              </div>
            </div>
          ))}
        </div>

        {/* Action buttons */}
        <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
          <Link href={`/admin/users/${user.id}/edit`} style={{
            display: 'inline-flex', alignItems: 'center', gap: '8px', flex: 1,
            padding: '0.8rem 1.5rem', justifyContent: 'center',
            background: 'linear-gradient(135deg, #16a34a, #15803d)',
            color: '#fff', borderRadius: '12px', fontWeight: 700,
            fontSize: '0.88rem', textDecoration: 'none',
            boxShadow: '0 4px 14px rgba(22,163,74,0.35)',
          }}>
            <svg width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
              <path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z"/>
            </svg>
            Edit User
          </Link>

          {user.isActive && (
            <button
              onClick={handleDeactivate}
              style={{
                display: 'inline-flex', alignItems: 'center', gap: '8px',
                padding: '0.8rem 1.5rem',
                background: '#fef2f2', color: '#b91c1c',
                border: '1.5px solid #fca5a5', borderRadius: '12px',
                fontWeight: 700, fontSize: '0.88rem',
                cursor: 'pointer', fontFamily: "'DM Sans', sans-serif",
              }}
            >
              <svg width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                <circle cx="12" cy="12" r="10"/><line x1="4.93" y1="4.93" x2="19.07" y2="19.07"/>
              </svg>
              Deactivate
            </button>
          )}
        </div>

        <div style={{ textAlign: 'center', marginTop: '2rem', fontSize: '0.72rem', color: '#94a3b8', letterSpacing: '0.08em' }}>
          ✕ SWACHH CAMPUS • USER REGISTRY • 2026
        </div>
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700;800;900&display=swap');
        .swal-campus-popup { border-radius: 16px !important; font-family: 'DM Sans', sans-serif !important; }
        .swal-campus-title { font-weight: 700 !important; color: #0f172a !important; }
      `}</style>
    </div>
  )
}
