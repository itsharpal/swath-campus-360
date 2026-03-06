import { Link } from '@adonisjs/inertia/react'
import { router } from '@inertiajs/react'
import Swal from 'sweetalert2'

type User = {
  id: number
  name: string
  email: string
  phone: string | null
  isActive: boolean
  role: { id: number; name: string }
}

export type Props = {
  users: { data: User[]; meta: any }
}

const ROLE_COLORS: Record<string, { bg: string; color: string }> = {
  admin:      { bg: 'rgba(139,92,246,0.1)', color: '#7c3aed' },
  supervisor: { bg: 'rgba(59,130,246,0.1)', color: '#1d4ed8' },
  staff:      { bg: 'rgba(22,163,74,0.1)',  color: '#15803d' },
}
function getRoleStyle(name: string) {
  return ROLE_COLORS[name?.toLowerCase()] ?? { bg: 'rgba(100,116,139,0.1)', color: '#475569' }
}

export default function UsersIndex({ users }: { users: { data: User[]; meta: any } }) {
  async function deactivateUser(id: number, name: string) {
    const result = await Swal.fire({
      title: `Deactivate ${name}?`,
      text: 'This user will lose access to the system immediately.',
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
      router.delete(`/admin/users/${id}`, {
        onSuccess: () => Swal.fire({ title: 'Deactivated!', text: `${name} has been deactivated.`, icon: 'success', confirmButtonColor: '#16a34a', timer: 2000, timerProgressBar: true, showConfirmButton: false, background: '#ffffff', customClass: { popup: 'swal-campus-popup' } }),
        onError: () => Swal.fire({ title: 'Error', text: 'Could not deactivate. Try again.', icon: 'error', confirmButtonColor: '#16a34a', background: '#ffffff', customClass: { popup: 'swal-campus-popup' } }),
      })
    }
  }

  const activeCount = users.data.filter((u) => u.isActive).length
  const inactiveCount = users.data.filter((u) => !u.isActive).length

  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #f0fdf4 0%, #dcfce7 50%, #f0fdf4 100%)', fontFamily: "'DM Sans', 'Segoe UI', sans-serif", padding: '2.5rem 2rem', position: 'relative', overflow: 'hidden' }}>
      <div style={{ position: 'fixed', top: '-80px', left: '-80px', width: '300px', height: '300px', borderRadius: '50%', border: '2px solid rgba(22,163,74,0.08)', pointerEvents: 'none' }} />
      <div style={{ position: 'fixed', bottom: '-60px', right: '-60px', width: '250px', height: '250px', borderRadius: '50%', border: '2px solid rgba(22,163,74,0.06)', pointerEvents: 'none' }} />

      <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
        {/* Header */}
        <div style={{ marginBottom: '2rem', display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '6px' }}>
              <div style={{ width: '28px', height: '2px', background: '#16a34a' }} />
              <span style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '0.15em', color: '#16a34a', textTransform: 'uppercase' }}>Swachh Campus</span>
              <div style={{ width: '28px', height: '2px', background: '#16a34a' }} />
            </div>
            <h1 style={{ fontSize: '2.4rem', fontWeight: 800, lineHeight: 1.1, color: '#0f172a', margin: 0 }}>Campus <span style={{ color: '#16a34a' }}>Users</span></h1>
            <p style={{ color: '#64748b', fontSize: '0.95rem', marginTop: '6px' }}>Manage all registered users in the campus registry.</p>
          </div>
          <Link href="/admin/users/create" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '0.75rem 1.5rem', background: 'linear-gradient(135deg, #16a34a, #15803d)', color: '#fff', borderRadius: '12px', fontWeight: 700, fontSize: '0.88rem', textDecoration: 'none', boxShadow: '0 4px 14px rgba(22,163,74,0.35)' }}>
            <svg width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
            Add User
          </Link>
        </div>

        {/* Stats */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem', marginBottom: '1.5rem' }}>
          {[
            { label: 'Total Users', value: users.data.length, bg: 'rgba(22,163,74,0.08)', color: '#16a34a' },
            { label: 'Active', value: activeCount, bg: 'rgba(16,185,129,0.08)', color: '#10b981' },
            { label: 'Inactive', value: inactiveCount, bg: 'rgba(239,68,68,0.08)', color: '#ef4444' },
          ].map((s) => (
            <div key={s.label} style={{ background: '#fff', borderRadius: '14px', padding: '1.1rem 1.4rem', boxShadow: '0 1px 8px rgba(0,0,0,0.06)', border: '1px solid rgba(22,163,74,0.1)', display: 'flex', alignItems: 'center', gap: '14px' }}>
              <div style={{ width: '40px', height: '40px', borderRadius: '10px', background: s.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', color: s.color, flexShrink: 0 }}>
                <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.7" viewBox="0 0 24 24"><path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
              </div>
              <div>
                <p style={{ margin: 0, fontSize: '0.75rem', color: '#94a3b8', fontWeight: 500 }}>{s.label}</p>
                <p style={{ margin: '2px 0 0', fontSize: '1.5rem', fontWeight: 800, color: '#0f172a' }}>{s.value}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Table */}
        <div style={{ background: '#fff', borderRadius: '16px', boxShadow: '0 1px 8px rgba(0,0,0,0.06)', border: '1px solid rgba(22,163,74,0.1)', overflow: 'hidden' }}>
          <div style={{ padding: '1.25rem 1.5rem', borderBottom: '1px solid #f1f5f9', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div>
              <h2 style={{ fontSize: '1.05rem', fontWeight: 700, color: '#0f172a', margin: 0 }}>All Users</h2>
              <p style={{ fontSize: '0.8rem', color: '#94a3b8', margin: '2px 0 0' }}>{users.data.length} users registered</p>
            </div>
            <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#16a34a', boxShadow: '0 0 0 3px rgba(22,163,74,0.2)' }} />
          </div>
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ background: '#f8fafc' }}>
                  {['User', 'Email', 'Role', 'Status', 'Actions'].map((h) => (
                    <th key={h} style={{ padding: '0.85rem 1.5rem', textAlign: 'left', fontSize: '0.75rem', fontWeight: 700, color: '#94a3b8', letterSpacing: '0.06em', textTransform: 'uppercase' }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {users.data.map((user, i) => {
                  const roleStyle = getRoleStyle(user.role?.name)
                  return (
                    <tr key={user.id}
                      style={{ borderTop: '1px solid #f1f5f9', background: i % 2 === 0 ? '#fff' : '#fafcff', transition: 'background 0.15s' }}
                      onMouseEnter={e => (e.currentTarget as HTMLElement).style.background = '#f0fdf4'}
                      onMouseLeave={e => (e.currentTarget as HTMLElement).style.background = i % 2 === 0 ? '#fff' : '#fafcff'}
                    >
                      <td style={{ padding: '1rem 1.5rem' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                          <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: 'linear-gradient(135deg, #16a34a, #4ade80)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontWeight: 700, fontSize: '0.88rem', flexShrink: 0 }}>
                            {user.name.charAt(0).toUpperCase()}
                          </div>
                          <div>
                            <p style={{ margin: 0, fontWeight: 600, color: '#0f172a', fontSize: '0.88rem' }}>{user.name}</p>
                            {user.phone && <p style={{ margin: 0, fontSize: '0.72rem', color: '#94a3b8' }}>{user.phone}</p>}
                          </div>
                        </div>
                      </td>
                      <td style={{ padding: '1rem 1.5rem', fontSize: '0.85rem', color: '#374151' }}>{user.email}</td>
                      <td style={{ padding: '1rem 1.5rem' }}>
                        <span style={{ fontSize: '0.72rem', fontWeight: 700, padding: '4px 10px', borderRadius: '20px', textTransform: 'capitalize', background: roleStyle.bg, color: roleStyle.color }}>{user.role?.name ?? '—'}</span>
                      </td>
                      <td style={{ padding: '1rem 1.5rem' }}>
                        <span style={{ display: 'inline-flex', alignItems: 'center', gap: '5px', fontSize: '0.72rem', fontWeight: 700, padding: '4px 10px', borderRadius: '20px', background: user.isActive ? '#d1fae5' : '#f1f5f9', color: user.isActive ? '#047857' : '#64748b', border: `1px solid ${user.isActive ? '#a7f3d0' : '#e2e8f0'}` }}>
                          <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: user.isActive ? '#10b981' : '#94a3b8' }} />
                          {user.isActive ? 'Active' : 'Inactive'}
                        </span>
                      </td>
                      <td style={{ padding: '1rem 1.5rem' }}>
                        <div style={{ display: 'flex', gap: '6px', alignItems: 'center' }}>
                          <Link href={`/admin/users/${user.id}`} style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', fontSize: '0.78rem', fontWeight: 600, color: '#16a34a', textDecoration: 'none', padding: '5px 10px', borderRadius: '7px', border: '1px solid #bbf7d0', background: '#f0fdf4' }}>
                            <svg width="11" height="11" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
                            View
                          </Link>
                          <Link href={`/admin/users/${user.id}/edit`} style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', fontSize: '0.78rem', fontWeight: 600, color: '#1d4ed8', textDecoration: 'none', padding: '5px 10px', borderRadius: '7px', border: '1px solid #bfdbfe', background: '#eff6ff' }}>
                            <svg width="11" height="11" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
                            Edit
                          </Link>
                          {user.isActive && (
                            <button onClick={() => deactivateUser(user.id, user.name)} style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', fontSize: '0.78rem', fontWeight: 600, color: '#b91c1c', padding: '5px 10px', borderRadius: '7px', border: '1px solid #fca5a5', background: '#fef2f2', cursor: 'pointer', fontFamily: "'DM Sans', sans-serif" }}>
                              <svg width="11" height="11" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><line x1="4.93" y1="4.93" x2="19.07" y2="19.07"/></svg>
                              Deactivate
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
            {users.data.length === 0 && <div style={{ textAlign: 'center', padding: '3.5rem', color: '#94a3b8', fontSize: '0.9rem' }}>No users found.</div>}
          </div>
        </div>
      </div>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700;800&display=swap');
        .swal-campus-popup { border-radius: 16px !important; font-family: 'DM Sans', sans-serif !important; }
        .swal-campus-title { font-weight: 700 !important; color: #0f172a !important; }
      `}</style>
    </div>
  )
}
