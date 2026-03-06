import { useForm } from '@inertiajs/react'
import { Link } from '@adonisjs/inertia/react'
import Swal from 'sweetalert2'

interface Props {
  zones:      { id: number; name: string }[]
  categories: { id: number; name: string }[]
}

const selectStyle = {
  width: '100%',
  padding: '0.75rem 2.5rem 0.75rem 1rem',
  border: '1.5px solid #e2e8f0',
  borderRadius: '10px',
  fontSize: '0.88rem',
  color: '#374151',
  outline: 'none',
  boxSizing: 'border-box' as const,
  fontFamily: "'DM Sans', sans-serif",
  background: '#fff',
  appearance: 'none' as const,
  backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' fill='none' stroke='%2394a3b8' stroke-width='2' viewBox='0 0 24 24'%3E%3Cpolyline points='6 9 12 15 18 9'/%3E%3C/svg%3E")`,
  backgroundRepeat: 'no-repeat',
  backgroundPosition: 'right 12px center',
  transition: 'border-color 0.2s, box-shadow 0.2s',
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

function focus(e: React.FocusEvent<any>) {
  e.target.style.borderColor = '#16a34a'
  e.target.style.boxShadow   = '0 0 0 3px rgba(22,163,74,0.1)'
}
function blur(e: React.FocusEvent<any>) {
  e.target.style.borderColor = '#e2e8f0'
  e.target.style.boxShadow   = 'none'
}

export default function CreateComplaint({ zones, categories }: Props) {
  const { data, setData, post, processing, errors } = useForm({
    zoneId: 0,
    categoryId: 0,
    description: '',
    photoUrl: '',
    isAnonymous: false,
  })

  async function submit(e: React.SyntheticEvent<HTMLFormElement>) {
    e.preventDefault()

    const result = await Swal.fire({
      title: 'Submit this complaint?',
      text: 'Your complaint will be registered and assigned for review.',
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#16a34a',
      cancelButtonColor: '#94a3b8',
      confirmButtonText: 'Yes, submit!',
      cancelButtonText: 'Cancel',
      background: '#ffffff',
      customClass: { popup: 'swal-campus-popup', title: 'swal-campus-title' },
    })

    if (!result.isConfirmed) return

    post('/complaints', {
      onSuccess: () => Swal.fire({
        title: 'Complaint Submitted!',
        text: 'Your complaint has been registered successfully.',
        icon: 'success',
        confirmButtonColor: '#16a34a',
        timer: 2500,
        timerProgressBar: true,
        showConfirmButton: false,
        background: '#ffffff',
        customClass: { popup: 'swal-campus-popup' },
      }),
      onError: () => Swal.fire({
        title: 'Submission Failed',
        text: 'Please check the form and try again.',
        icon: 'error',
        confirmButtonColor: '#16a34a',
        background: '#ffffff',
        customClass: { popup: 'swal-campus-popup' },
      }),
    })
  }

  const charCount = data.description.length

  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #f0fdf4 0%, #dcfce7 50%, #f0fdf4 100%)', fontFamily: "'DM Sans','Segoe UI',sans-serif", padding: '2.5rem 2rem', position: 'relative', overflow: 'hidden' }}>
      <div style={{ position: 'fixed', top: '-80px', left: '-80px', width: '300px', height: '300px', borderRadius: '50%', border: '2px solid rgba(22,163,74,0.08)', pointerEvents: 'none' }} />
      <div style={{ position: 'fixed', bottom: '-60px', right: '-60px', width: '250px', height: '250px', borderRadius: '50%', border: '2px solid rgba(22,163,74,0.06)', pointerEvents: 'none' }} />

      <div style={{ maxWidth: '680px', margin: '0 auto' }}>
        {/* Back */}
        <Link href="/complaints" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', fontSize: '0.82rem', fontWeight: 600, color: '#16a34a', textDecoration: 'none', marginBottom: '1.5rem', padding: '6px 14px', borderRadius: '8px', border: '1px solid #bbf7d0', background: '#f0fdf4' }}>
          <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path d="M19 12H5M12 19l-7-7 7-7" strokeLinecap="round" strokeLinejoin="round"/></svg>
          Back to Complaints
        </Link>

        {/* Header */}
        <div style={{ marginBottom: '1.75rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '6px' }}>
            <div style={{ width: '28px', height: '2px', background: '#16a34a' }} />
            <span style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '0.15em', color: '#16a34a', textTransform: 'uppercase' }}>Swachh Campus — Campus Registry</span>
            <div style={{ width: '28px', height: '2px', background: '#16a34a' }} />
          </div>
          <h1 style={{ fontSize: '2.4rem', fontWeight: 800, lineHeight: 1.1, color: '#0f172a', margin: 0 }}>
            New <span style={{ color: '#16a34a' }}>Complaint</span>
          </h1>
          <p style={{ color: '#64748b', fontSize: '0.95rem', marginTop: '6px' }}>Report an issue to the Swachh Campus management system.</p>
        </div>

        {/* Form card */}
        <div style={{ background: '#fff', borderRadius: '16px', boxShadow: '0 1px 8px rgba(0,0,0,0.06)', border: '1px solid rgba(22,163,74,0.1)', overflow: 'hidden' }}>
          <div style={{ padding: '0.9rem 1.5rem', background: '#f8fafc', borderBottom: '1px solid #f1f5f9', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <span style={{ fontSize: '0.78rem', fontWeight: 700, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Complaint Details</span>
            <span style={{ fontSize: '0.72rem', color: '#94a3b8' }}>All fields required unless marked optional</span>
          </div>

          <form onSubmit={submit} style={{ padding: '1.75rem 1.5rem', display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>

            {/* Zone + Category row */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <div>
                <label style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.85rem', fontWeight: 600, color: '#374151', marginBottom: '6px' }}>
                  <svg width="14" height="14" fill="none" stroke="#16a34a" strokeWidth="2" viewBox="0 0 24 24"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg>
                  Zone
                </label>
                <select value={data.zoneId} onChange={(e) => setData('zoneId', Number(e.target.value))} onFocus={focus} onBlur={blur}
                  style={{ ...selectStyle, borderColor: errors.zoneId ? '#fca5a5' : '#e2e8f0' }}>
                  <option value={0}>Select Zone…</option>
                  {zones.map((z) => <option key={z.id} value={z.id}>{z.name}</option>)}
                </select>
                {errors.zoneId && <p style={{ fontSize: '0.73rem', color: '#ef4444', marginTop: '4px' }}>{errors.zoneId}</p>}
              </div>

              <div>
                <label style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.85rem', fontWeight: 600, color: '#374151', marginBottom: '6px' }}>
                  <svg width="14" height="14" fill="none" stroke="#16a34a" strokeWidth="2" viewBox="0 0 24 24"><path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  Category
                </label>
                <select value={data.categoryId} onChange={(e) => setData('categoryId', Number(e.target.value))} onFocus={focus} onBlur={blur}
                  style={{ ...selectStyle, borderColor: errors.categoryId ? '#fca5a5' : '#e2e8f0' }}>
                  <option value={0}>Select Category…</option>
                  {categories.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
                </select>
                {errors.categoryId && <p style={{ fontSize: '0.73rem', color: '#ef4444', marginTop: '4px' }}>{errors.categoryId}</p>}
              </div>
            </div>

            {/* Description */}
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                <label style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.85rem', fontWeight: 600, color: '#374151' }}>
                  <svg width="14" height="14" fill="none" stroke="#16a34a" strokeWidth="2" viewBox="0 0 24 24"><path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/></svg>
                  Description
                </label>
                <span style={{ fontSize: '0.72rem', color: '#94a3b8' }}>{charCount}/500</span>
              </div>
              <textarea
                placeholder="Describe the issue in detail…"
                value={data.description}
                maxLength={500}
                rows={4}
                onChange={(e) => setData('description', e.target.value)}
                onFocus={focus} onBlur={blur}
                style={{ ...inputStyle, resize: 'vertical', borderColor: errors.description ? '#fca5a5' : '#e2e8f0' }}
              />
              {errors.description && <p style={{ fontSize: '0.73rem', color: '#ef4444', marginTop: '4px' }}>{errors.description}</p>}
            </div>

            {/* Photo URL */}
            <div>
              <label style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.85rem', fontWeight: 600, color: '#374151', marginBottom: '6px' }}>
                <svg width="14" height="14" fill="none" stroke="#16a34a" strokeWidth="2" viewBox="0 0 24 24"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg>
                Photo URL
                <span style={{ marginLeft: 'auto', fontSize: '0.72rem', color: '#94a3b8', fontWeight: 400 }}>Optional</span>
              </label>
              <input
                type="text"
                placeholder="https://example.com/photo.jpg"
                value={data.photoUrl}
                onChange={(e) => setData('photoUrl', e.target.value)}
                onFocus={focus} onBlur={blur}
                style={inputStyle}
              />
            </div>

            {/* Anonymous toggle */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '1rem 1.2rem', borderRadius: '10px', background: '#f8fafc', border: '1.5px solid #e2e8f0' }}>
              <div>
                <p style={{ margin: 0, fontSize: '0.85rem', fontWeight: 600, color: '#374151' }}>Report Anonymously</p>
                <p style={{ margin: '2px 0 0', fontSize: '0.75rem', color: '#94a3b8' }}>Your identity will not be revealed to the review team.</p>
              </div>
              <div onClick={() => setData('isAnonymous', !data.isAnonymous)}
                style={{ width: '44px', height: '24px', borderRadius: '12px', cursor: 'pointer', background: data.isAnonymous ? '#16a34a' : '#cbd5e1', transition: 'background 0.2s', position: 'relative', flexShrink: 0 }}>
                <div style={{ position: 'absolute', top: '3px', left: data.isAnonymous ? '23px' : '3px', width: '18px', height: '18px', borderRadius: '50%', background: '#fff', transition: 'left 0.2s', boxShadow: '0 1px 4px rgba(0,0,0,0.2)' }} />
              </div>
            </div>

            {/* Divider */}
            <div style={{ height: '1px', background: 'linear-gradient(90deg, transparent, #dcfce7, transparent)' }} />

            {/* Actions */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <Link href="/complaints" style={{ fontSize: '0.85rem', fontWeight: 600, color: '#64748b', textDecoration: 'none' }}>← Cancel</Link>
              <button type="submit" disabled={processing}
                style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '0.8rem 1.75rem', background: processing ? '#86efac' : 'linear-gradient(135deg, #16a34a, #15803d)', color: '#fff', border: 'none', borderRadius: '12px', fontWeight: 700, fontSize: '0.9rem', cursor: processing ? 'not-allowed' : 'pointer', boxShadow: '0 4px 14px rgba(22,163,74,0.35)', fontFamily: "'DM Sans',sans-serif" }}>
                {processing ? 'Submitting…' : (<>Submit Complaint <svg width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round"/></svg></>)}
              </button>
            </div>
          </form>

          <div style={{ padding: '0.9rem 1.5rem', background: '#f8fafc', borderTop: '1px solid #f1f5f9', textAlign: 'center' }}>
            <span style={{ fontSize: '0.72rem', color: '#94a3b8', letterSpacing: '0.08em' }}>✕ SWACHH CAMPUS • COMPLAINT REGISTRY • 2026</span>
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
