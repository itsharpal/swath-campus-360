import { Link } from '@adonisjs/inertia/react'
import UserForm from './components/user_form'

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
  roleId: number
  role: Role
}

export type Props = {
  user: User
  roles: Role[]
}

export default function EditUser({ user, roles }: { user: User; roles: Role[] }) {
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

      <div style={{ maxWidth: '680px', margin: '0 auto' }}>
        {/* Breadcrumb */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '1.5rem' }}>
          <Link href="/admin/users" style={{
            display: 'inline-flex', alignItems: 'center', gap: '6px',
            fontSize: '0.82rem', fontWeight: 600, color: '#16a34a',
            textDecoration: 'none', padding: '6px 14px', borderRadius: '8px',
            border: '1px solid #bbf7d0', background: '#f0fdf4',
          }}>
            <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
              <path d="M19 12H5M12 19l-7-7 7-7" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            Users
          </Link>
          <span style={{ color: '#94a3b8', fontSize: '0.78rem' }}>›</span>
          <Link href={`/admin/users/${user.id}`} style={{ fontSize: '0.82rem', color: '#64748b', textDecoration: 'none', fontWeight: 500 }}>
            {user.name}
          </Link>
          <span style={{ color: '#94a3b8', fontSize: '0.78rem' }}>›</span>
          <span style={{ fontSize: '0.82rem', color: '#16a34a', fontWeight: 600 }}>Edit</span>
        </div>

        {/* Header */}
        <div style={{ marginBottom: '2rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '6px' }}>
            <div style={{ width: '28px', height: '2px', background: '#16a34a' }} />
            <span style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '0.15em', color: '#16a34a', textTransform: 'uppercase' }}>
              Swachh Campus — Campus Registry
            </span>
            <div style={{ width: '28px', height: '2px', background: '#16a34a' }} />
          </div>
          <h1 style={{ fontSize: '2.4rem', fontWeight: 800, lineHeight: 1.1, color: '#0f172a', margin: 0 }}>
            Edit <span style={{ color: '#16a34a' }}>User</span>
          </h1>
          <p style={{ color: '#64748b', fontSize: '0.95rem', marginTop: '6px' }}>
            Update account details for <strong style={{ color: '#374151' }}>{user.name}</strong>.
          </p>
        </div>

        {/* User badge */}
        <div style={{
          display: 'flex', alignItems: 'center', gap: '12px',
          padding: '1rem 1.25rem', background: '#fff', borderRadius: '12px',
          border: '1px solid rgba(22,163,74,0.12)',
          boxShadow: '0 1px 6px rgba(0,0,0,0.05)', marginBottom: '1.25rem',
        }}>
          <div style={{
            width: '44px', height: '44px', borderRadius: '50%',
            background: 'linear-gradient(135deg, #16a34a, #4ade80)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            color: '#fff', fontWeight: 800, fontSize: '1.1rem', flexShrink: 0,
          }}>
            {user.name.charAt(0).toUpperCase()}
          </div>
          <div>
            <p style={{ margin: 0, fontWeight: 700, color: '#0f172a', fontSize: '0.92rem' }}>{user.name}</p>
            <p style={{ margin: '2px 0 0', fontSize: '0.78rem', color: '#94a3b8' }}>{user.email}</p>
          </div>
          <div style={{ marginLeft: 'auto' }}>
            <span style={{
              fontSize: '0.72rem', fontWeight: 700, padding: '4px 10px',
              borderRadius: '20px',
              background: user.isActive ? '#d1fae5' : '#f1f5f9',
              color: user.isActive ? '#047857' : '#64748b',
              border: `1px solid ${user.isActive ? '#a7f3d0' : '#e2e8f0'}`,
            }}>
              {user.isActive ? 'Active' : 'Inactive'}
            </span>
          </div>
        </div>

        {/* Form card */}
        <div style={{
          background: '#fff', borderRadius: '16px',
          boxShadow: '0 1px 8px rgba(0,0,0,0.06)',
          border: '1px solid rgba(22,163,74,0.1)', overflow: 'hidden',
        }}>
          <div style={{ padding: '0.9rem 1.5rem', background: '#f8fafc', borderBottom: '1px solid #f1f5f9', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <span style={{ fontSize: '0.78rem', fontWeight: 700, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              Edit Details
            </span>
            <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#f59e0b', boxShadow: '0 0 0 3px rgba(245,158,11,0.2)' }} />
          </div>

          <div style={{ padding: '1.75rem 1.5rem' }}>
            <UserForm
              user={user}
              roles={roles}
              submitUrl={`/admin/users/${user.id}`}
              method="put"
            />
          </div>

          <div style={{ padding: '0.9rem 1.5rem', background: '#f8fafc', borderTop: '1px solid #f1f5f9', textAlign: 'center' }}>
            <span style={{ fontSize: '0.72rem', color: '#94a3b8', letterSpacing: '0.08em' }}>
              ✕ SWACHH CAMPUS • USER REGISTRY • 2026
            </span>
          </div>
        </div>
      </div>

      <style>{`@import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700;800&display=swap');`}</style>
    </div>
  )
}
