import { Link } from '@adonisjs/inertia/react'
import UserForm from './components/user_form'

type Role = {
  id: number
  name: string
}

export type Props = {
  roles: Role[]
}

export default function CreateUser({ roles }: { roles: Role[] }) {
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
      {/* Background rings */}
      <div style={{ position: 'fixed', top: '-80px', left: '-80px', width: '300px', height: '300px', borderRadius: '50%', border: '2px solid rgba(22,163,74,0.08)', pointerEvents: 'none' }} />
      <div style={{ position: 'fixed', bottom: '-60px', right: '-60px', width: '250px', height: '250px', borderRadius: '50%', border: '2px solid rgba(22,163,74,0.06)', pointerEvents: 'none' }} />

      <div style={{ maxWidth: '680px', margin: '0 auto' }}>
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
        <div style={{ marginBottom: '2rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '6px' }}>
            <div style={{ width: '28px', height: '2px', background: '#16a34a' }} />
            <span style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '0.15em', color: '#16a34a', textTransform: 'uppercase' }}>
              Swachh Campus — Campus Registry
            </span>
            <div style={{ width: '28px', height: '2px', background: '#16a34a' }} />
          </div>
          <h1 style={{ fontSize: '2.4rem', fontWeight: 800, lineHeight: 1.1, color: '#0f172a', margin: 0 }}>
            New <span style={{ color: '#16a34a' }}>User</span>
          </h1>
          <p style={{ color: '#64748b', fontSize: '0.95rem', marginTop: '6px' }}>
            Register a user to the Swachh Campus management system.
          </p>
        </div>

        {/* Progress bar */}
        <div style={{
          background: '#fff', borderRadius: '16px',
          boxShadow: '0 1px 8px rgba(0,0,0,0.06)',
          border: '1px solid rgba(22,163,74,0.1)',
          overflow: 'hidden',
        }}>
          {/* Form completion bar */}
          <div style={{ padding: '0.9rem 1.5rem', background: '#f8fafc', borderBottom: '1px solid #f1f5f9', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <div style={{
                width: '24px', height: '24px', borderRadius: '6px',
                background: 'rgba(22,163,74,0.1)', display: 'flex',
                alignItems: 'center', justifyContent: 'center',
              }}>
                <svg width="12" height="12" fill="none" stroke="#16a34a" strokeWidth="2.5" viewBox="0 0 24 24">
                  <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/><circle cx="12" cy="7" r="4"/>
                </svg>
              </div>
              <span style={{ fontSize: '0.78rem', fontWeight: 700, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                User Registration
              </span>
            </div>
            <span style={{ fontSize: '0.75rem', fontWeight: 600, color: '#94a3b8' }}>New Record</span>
          </div>

          <div style={{ padding: '1.75rem 1.5rem' }}>
            <UserForm roles={roles} submitUrl="/admin/users" />
          </div>

          {/* Footer */}
          <div style={{
            padding: '0.9rem 1.5rem', background: '#f8fafc',
            borderTop: '1px solid #f1f5f9', textAlign: 'center',
          }}>
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
