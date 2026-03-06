import { useForm } from '@inertiajs/react'
import Swal from 'sweetalert2'

type Role = {
  id: number
  name: string
}

type Props = {
  roles: Role[]
  user?: any
  submitUrl: string
  method?: 'post' | 'put'
}

const inputStyle = {
  width: '100%',
  padding: '0.75rem 1rem',
  border: '1.5px solid #e2e8f0',
  borderRadius: '10px',
  fontSize: '0.88rem',
  color: '#374151',
  outline: 'none',
  boxSizing: 'border-box' as const,
  fontFamily: "'DM Sans', sans-serif",
  background: '#fff',
  transition: 'border-color 0.2s, box-shadow 0.2s',
}

const labelStyle = {
  display: 'flex',
  alignItems: 'center',
  gap: '6px',
  fontSize: '0.85rem',
  fontWeight: 600,
  color: '#374151',
  marginBottom: '6px',
}

const errorStyle = {
  fontSize: '0.75rem',
  color: '#ef4444',
  marginTop: '4px',
}

export default function UserForm({ roles, user, submitUrl, method = 'post' }: Props) {
  const { data, setData, post, put, processing, errors } = useForm({
    name: user?.name || '',
    email: user?.email || '',
    password: '',
    roleId: user?.roleId || '',
    phone: user?.phone || '',
    isActive: user?.isActive ?? true,
  })

  async function submit(e: React.SyntheticEvent) {
    e.preventDefault()

    const isEdit = method === 'put'

    const result = await Swal.fire({
      title: isEdit ? 'Save changes?' : 'Create this user?',
      text: isEdit
        ? 'The user record will be updated with the new details.'
        : 'A new user account will be created.',
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#16a34a',
      cancelButtonColor: '#94a3b8',
      confirmButtonText: isEdit ? 'Yes, save changes!' : 'Yes, create user!',
      cancelButtonText: 'Cancel',
      background: '#ffffff',
      customClass: { popup: 'swal-campus-popup', title: 'swal-campus-title' },
    })

    if (!result.isConfirmed) return

    const opts = {
      onSuccess: () => {
        Swal.fire({
          title: isEdit ? 'User Updated!' : 'User Created!',
          text: isEdit ? 'The user has been updated successfully.' : 'New user account created.',
          icon: 'success',
          confirmButtonColor: '#16a34a',
          timer: 2200,
          timerProgressBar: true,
          showConfirmButton: false,
          background: '#ffffff',
          customClass: { popup: 'swal-campus-popup' },
        })
      },
      onError: () => {
        Swal.fire({
          title: 'Something went wrong',
          text: 'Please check the form and try again.',
          icon: 'error',
          confirmButtonColor: '#16a34a',
          background: '#ffffff',
          customClass: { popup: 'swal-campus-popup' },
        })
      },
    }

    if (method === 'put') {
      put(submitUrl, opts)
    } else {
      post(submitUrl, opts)
    }
  }

  function focusInput(e: React.FocusEvent<HTMLInputElement | HTMLSelectElement>) {
    e.target.style.borderColor = '#16a34a'
    e.target.style.boxShadow = '0 0 0 3px rgba(22,163,74,0.1)'
  }
  function blurInput(e: React.FocusEvent<HTMLInputElement | HTMLSelectElement>) {
    e.target.style.borderColor = '#e2e8f0'
    e.target.style.boxShadow = 'none'
  }

  return (
    <>
      <form onSubmit={submit} style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>

        {/* Name */}
        <div>
          <label style={labelStyle}>
            <svg width="14" height="14" fill="none" stroke="#16a34a" strokeWidth="2" viewBox="0 0 24 24">
              <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/><circle cx="12" cy="7" r="4"/>
            </svg>
            Full Name
            <span style={{ marginLeft: 'auto', fontSize: '0.72rem', color: '#94a3b8', fontWeight: 400 }}>Official name</span>
          </label>
          <input
            value={data.name}
            placeholder="e.g. Arjun Sharma"
            onChange={(e) => setData('name', e.target.value)}
            onFocus={focusInput} onBlur={blurInput}
            style={{ ...inputStyle, borderColor: errors.name ? '#fca5a5' : '#e2e8f0' }}
          />
          {errors.name && <p style={errorStyle}>{errors.name}</p>}
        </div>

        {/* Email */}
        <div>
          <label style={labelStyle}>
            <svg width="14" height="14" fill="none" stroke="#16a34a" strokeWidth="2" viewBox="0 0 24 24">
              <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/>
            </svg>
            Email Address
            <span style={{ marginLeft: 'auto', fontSize: '0.72rem', color: '#94a3b8', fontWeight: 400 }}>Must be unique</span>
          </label>
          <input
            type="email"
            value={data.email}
            placeholder="e.g. arjun@campus.in"
            onChange={(e) => setData('email', e.target.value)}
            onFocus={focusInput} onBlur={blurInput}
            style={{ ...inputStyle, borderColor: errors.email ? '#fca5a5' : '#e2e8f0' }}
          />
          {errors.email && <p style={errorStyle}>{errors.email}</p>}
        </div>

        {/* Password */}
        <div>
          <label style={labelStyle}>
            <svg width="14" height="14" fill="none" stroke="#16a34a" strokeWidth="2" viewBox="0 0 24 24">
              <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0110 0v4"/>
            </svg>
            Password
            {method === 'put' && (
              <span style={{ marginLeft: 'auto', fontSize: '0.72rem', color: '#94a3b8', fontWeight: 400 }}>Leave blank to keep current</span>
            )}
          </label>
          <input
            type="password"
            value={data.password}
            placeholder={method === 'put' ? '••••••••' : 'Min. 8 characters'}
            onChange={(e) => setData('password', e.target.value)}
            onFocus={focusInput} onBlur={blurInput}
            style={{ ...inputStyle, borderColor: errors.password ? '#fca5a5' : '#e2e8f0' }}
          />
          {errors.password && <p style={errorStyle}>{errors.password}</p>}
        </div>

        {/* Two column: Role + Phone */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
          {/* Role */}
          <div>
            <label style={labelStyle}>
              <svg width="14" height="14" fill="none" stroke="#16a34a" strokeWidth="2" viewBox="0 0 24 24">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
              </svg>
              Role
            </label>
            <select
              value={data.roleId}
              onChange={(e) => setData('roleId', Number(e.target.value))}
              onFocus={focusInput} onBlur={blurInput}
              style={{ ...inputStyle, borderColor: errors.roleId ? '#fca5a5' : '#e2e8f0', appearance: 'none', backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' fill='none' stroke='%2394a3b8' stroke-width='2' viewBox='0 0 24 24'%3E%3Cpolyline points='6 9 12 15 18 9'/%3E%3C/svg%3E")`, backgroundRepeat: 'no-repeat', backgroundPosition: 'right 12px center' }}
            >
              <option value="">Select a role…</option>
              {roles.map((r) => (
                <option key={r.id} value={r.id}>{r.name}</option>
              ))}
            </select>
            {errors.roleId && <p style={errorStyle}>{errors.roleId as string}</p>}
          </div>

          {/* Phone */}
          <div>
            <label style={labelStyle}>
              <svg width="14" height="14" fill="none" stroke="#16a34a" strokeWidth="2" viewBox="0 0 24 24">
                <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 014.99 12 19.79 19.79 0 011.94 3.37 2 2 0 013.92 1h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 8.91a16 16 0 006 6l1.08-1.08a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/>
              </svg>
              Phone
              <span style={{ marginLeft: 'auto', fontSize: '0.72rem', color: '#94a3b8', fontWeight: 400 }}>Optional</span>
            </label>
            <input
              value={data.phone}
              placeholder="e.g. +91 98765 43210"
              onChange={(e) => setData('phone', e.target.value)}
              onFocus={focusInput} onBlur={blurInput}
              style={{ ...inputStyle, borderColor: errors.phone ? '#fca5a5' : '#e2e8f0' }}
            />
            {errors.phone && <p style={errorStyle}>{errors.phone as string}</p>}
          </div>
        </div>

        {/* Active toggle */}
        <div style={{
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          padding: '1rem 1.2rem', borderRadius: '10px',
          background: '#f8fafc', border: '1.5px solid #e2e8f0',
        }}>
          <div>
            <p style={{ margin: 0, fontSize: '0.85rem', fontWeight: 600, color: '#374151' }}>Account Status</p>
            <p style={{ margin: '2px 0 0', fontSize: '0.75rem', color: '#94a3b8' }}>
              {data.isActive ? 'User can log in and access the system.' : 'User is deactivated and cannot log in.'}
            </p>
          </div>
          <label style={{ position: 'relative', display: 'inline-flex', alignItems: 'center', cursor: 'pointer', gap: '10px' }}>
            <div
              onClick={() => setData('isActive', !data.isActive)}
              style={{
                width: '44px', height: '24px', borderRadius: '12px', cursor: 'pointer',
                background: data.isActive ? '#16a34a' : '#cbd5e1',
                transition: 'background 0.2s', position: 'relative', flexShrink: 0,
              }}
            >
              <div style={{
                position: 'absolute', top: '3px',
                left: data.isActive ? '23px' : '3px',
                width: '18px', height: '18px', borderRadius: '50%',
                background: '#fff', transition: 'left 0.2s',
                boxShadow: '0 1px 4px rgba(0,0,0,0.2)',
              }} />
            </div>
            <span style={{ fontSize: '0.82rem', fontWeight: 600, color: data.isActive ? '#16a34a' : '#94a3b8' }}>
              {data.isActive ? 'Active' : 'Inactive'}
            </span>
          </label>
        </div>

        {/* Divider */}
        <div style={{ height: '1px', background: 'linear-gradient(90deg, transparent, #dcfce7, transparent)' }} />

        {/* Submit */}
        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
          <button
            type="submit"
            disabled={processing}
            style={{
              display: 'inline-flex', alignItems: 'center', gap: '8px',
              padding: '0.8rem 2rem',
              background: processing ? '#86efac' : 'linear-gradient(135deg, #16a34a, #15803d)',
              color: '#fff', border: 'none', borderRadius: '12px',
              fontWeight: 700, fontSize: '0.9rem',
              cursor: processing ? 'not-allowed' : 'pointer',
              boxShadow: '0 4px 14px rgba(22,163,74,0.35)',
              transition: 'all 0.2s', fontFamily: "'DM Sans', sans-serif",
            }}
          >
            {processing ? (
              <>
                <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24" style={{ animation: 'spin 1s linear infinite' }}>
                  <path d="M21 12a9 9 0 11-6.219-8.56" strokeLinecap="round"/>
                </svg>
                Saving…
              </>
            ) : (
              <>
                Save User
                <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                  <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </>
            )}
          </button>
        </div>
      </form>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700;800&display=swap');
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        .swal-campus-popup { border-radius: 16px !important; font-family: 'DM Sans', sans-serif !important; }
        .swal-campus-title { font-weight: 700 !important; color: #0f172a !important; }
      `}</style>
    </>
  )
}
