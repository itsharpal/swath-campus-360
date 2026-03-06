import React, { useState, useRef, useEffect } from 'react'
import { useForm } from '@inertiajs/react'
import { Link } from '@adonisjs/inertia/react'
import Swal from 'sweetalert2'

interface Props {
  complaint: {
    id: number
    complaintCode: string
    status: string
  }
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

function focus(e: React.FocusEvent<any>) { e.target.style.borderColor = '#16a34a'; e.target.style.boxShadow = '0 0 0 3px rgba(22,163,74,0.1)' }
function blur(e: React.FocusEvent<any>)  { e.target.style.borderColor = '#e2e8f0'; e.target.style.boxShadow = 'none' }

export default function ResolveComplaint({ complaint }: Props) {
  const { data, setData, errors } = useForm({
    resolutionRemark: '',
  })
  const [photoPreview, setPhotoPreview] = useState<string | null>(null)
  const [fileBlob, setFileBlob] = useState<Blob | null>(null)
  const [submitting, setSubmitting] = useState(false)

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = () => {
      const result = String(reader.result || '')
      // Compress/rescale the image to reduce payload size
      const img = new Image()
      img.onload = () => {
        const MAX_W = 1200
        const MAX_H = 1200
        let w = img.width
        let h = img.height
        if (w > MAX_W || h > MAX_H) {
          const ratio = Math.min(MAX_W / w, MAX_H / h)
          w = Math.round(w * ratio)
          h = Math.round(h * ratio)
        }
        const c = document.createElement('canvas')
        c.width = w
        c.height = h
        const ctx = c.getContext('2d')!
        ctx.drawImage(img, 0, 0, w, h)
        const compressed = c.toDataURL('image/jpeg', 0.75)
        // convert dataURL to blob and set preview
        fetch(compressed)
          .then((res) => res.blob())
          .then((blob) => {
            setFileBlob(blob)
            setPhotoPreview(URL.createObjectURL(blob))
          })
      }
      img.src = result
    }
    reader.readAsDataURL(file)
  }
  const videoRef = useRef<HTMLVideoElement | null>(null)
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const streamRef = useRef<MediaStream | null>(null)
  const [isCameraOpen, setIsCameraOpen] = useState(false)

  useEffect(() => {
    return () => {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((t: MediaStreamTrack) => t.stop())
        streamRef.current = null
      }
    }
  }, [])

  async function submit(e: React.SyntheticEvent<HTMLFormElement>) {
    e.preventDefault()

    if (!data.resolutionRemark.trim()) {
      Swal.fire({ title: 'Remark required', text: 'Please provide a resolution remark before submitting.', icon: 'warning', confirmButtonColor: '#16a34a', background: '#ffffff', customClass: { popup: 'swal-campus-popup' } })
      return
    }

    if (!fileBlob) {
      Swal.fire({ title: 'Photo required', text: 'Please capture a proof photo using your camera before submitting.', icon: 'warning', confirmButtonColor: '#16a34a', background: '#ffffff', customClass: { popup: 'swal-campus-popup' } })
      return
    }

    const result = await Swal.fire({
      title: 'Mark as Resolved?',
      html: `<p style="color:#64748b;font-size:0.9rem;">This will resolve complaint <strong style="color:#16a34a;font-family:monospace">${complaint.complaintCode}</strong> and cannot be undone.</p>`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#16a34a',
      cancelButtonColor: '#94a3b8',
      confirmButtonText: 'Yes, resolve it!',
      cancelButtonText: 'Cancel',
      background: '#ffffff',
      customClass: { popup: 'swal-campus-popup', title: 'swal-campus-title' },
    })

    if (!result.isConfirmed) return

    setSubmitting(true)

    try {
      const formData = new FormData()
      formData.append('resolutionRemark', data.resolutionRemark)
      formData.append('resolutionPhoto', fileBlob as Blob, 'resolution.jpg')

      // Attach CSRF token header if available (Adonis expects X-XSRF-TOKEN)
      const getCsrfFromMeta = () => document.querySelector('meta[name="csrf-token"]')?.getAttribute('content')
      const getCsrfFromCookie = () => {
        const m = document.cookie.match(/(^|;)\s*XSRF-TOKEN=([^;]+)/)
        return m ? decodeURIComponent(m[2]) : null
      }
      const csrf = getCsrfFromMeta() || getCsrfFromCookie() || (window as any).__INERTIA_SSR__?.csrf || ''

      const headers: Record<string, string> = {}
      if (csrf) headers['X-XSRF-TOKEN'] = csrf
      // mark as XHR so server can return JSON instead of redirect
      headers['X-Requested-With'] = 'XMLHttpRequest'

      const resp = await fetch(`/complaints/${complaint.id}/resolve`, {
        method: 'PUT',
        body: formData,
        credentials: 'same-origin',
        headers,
      })

      if (resp.ok) {
        // Try to parse JSON (controller returns { success: true, redirectUrl }) for XHR
        let json: any = null
        try { json = await resp.json() } catch (e) { /* ignore json parse */ }
        await Swal.fire({
          title: 'Complaint Resolved!',
          text: 'The complaint has been successfully marked as resolved.',
          icon: 'success',
          confirmButtonColor: '#16a34a',
          timer: 2200,
          timerProgressBar: true,
          showConfirmButton: false,
          background: '#ffffff',
          customClass: { popup: 'swal-campus-popup' },
        })
        if (json && json.redirectUrl) {
          window.location.href = json.redirectUrl
        } else {
          window.location.reload()
        }
      } else {
        // try to extract a helpful message from the server response
        let body = ''
        try {
          const text = await resp.text()
          body = text
        } catch (e) {
          body = ''
        }
        const msg = body ? `Server response: ${body}` : 'Something went wrong. Please try again.'
        await Swal.fire({ title: 'Error', text: msg, icon: 'error', confirmButtonColor: '#16a34a', background: '#ffffff', customClass: { popup: 'swal-campus-popup' } })
      }
    } catch (err) {
      console.error(err)
      await Swal.fire({ title: 'Error', text: 'Something went wrong. Please try again.', icon: 'error', confirmButtonColor: '#16a34a', background: '#ffffff', customClass: { popup: 'swal-campus-popup' } })
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #f0fdf4 0%, #dcfce7 50%, #f0fdf4 100%)', fontFamily: "'DM Sans','Segoe UI',sans-serif", padding: '2.5rem 2rem', position: 'relative', overflow: 'hidden' }}>
      <div style={{ position: 'fixed', top: '-80px', left: '-80px', width: '300px', height: '300px', borderRadius: '50%', border: '2px solid rgba(22,163,74,0.08)', pointerEvents: 'none' }} />
      <div style={{ position: 'fixed', bottom: '-60px', right: '-60px', width: '250px', height: '250px', borderRadius: '50%', border: '2px solid rgba(22,163,74,0.06)', pointerEvents: 'none' }} />

      <div style={{ maxWidth: '640px', margin: '0 auto' }}>
        {/* Back */}
        <Link href={`/complaints/${complaint.id}`} style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', fontSize: '0.82rem', fontWeight: 600, color: '#16a34a', textDecoration: 'none', marginBottom: '1.5rem', padding: '6px 14px', borderRadius: '8px', border: '1px solid #bbf7d0', background: '#f0fdf4' }}>
          <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path d="M19 12H5M12 19l-7-7 7-7" strokeLinecap="round" strokeLinejoin="round"/></svg>
          Back to Complaint
        </Link>

        {/* Header */}
        <div style={{ marginBottom: '1.75rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '6px' }}>
            <div style={{ width: '28px', height: '2px', background: '#16a34a' }} />
            <span style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '0.15em', color: '#16a34a', textTransform: 'uppercase' }}>Swachh Campus — Complaint Registry</span>
            <div style={{ width: '28px', height: '2px', background: '#16a34a' }} />
          </div>
          <h1 style={{ fontSize: '2.4rem', fontWeight: 800, lineHeight: 1.1, color: '#0f172a', margin: 0 }}>
            Resolve <span style={{ color: '#16a34a' }}>Complaint</span>
          </h1>
          <p style={{ color: '#64748b', fontSize: '0.95rem', marginTop: '6px' }}>Provide resolution details for this complaint.</p>
        </div>

        {/* Complaint info banner */}
        <div style={{ background: '#fff', borderRadius: '12px', padding: '1rem 1.25rem', boxShadow: '0 1px 6px rgba(0,0,0,0.05)', border: '1.5px solid rgba(22,163,74,0.15)', marginBottom: '1.25rem', display: 'flex', alignItems: 'center', gap: '14px' }}>
          <div style={{ width: '40px', height: '40px', borderRadius: '10px', background: '#fef3c7', border: '1px solid #fde68a', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
            <svg width="18" height="18" fill="none" stroke="#b45309" strokeWidth="2" viewBox="0 0 24 24"><path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" strokeLinecap="round" strokeLinejoin="round"/></svg>
          </div>
          <div>
            <p style={{ margin: 0, fontSize: '0.72rem', color: '#94a3b8', fontWeight: 500 }}>Complaint Code</p>
            <span style={{ fontFamily: 'monospace', fontSize: '0.95rem', background: '#f0fdf4', color: '#16a34a', padding: '3px 10px', borderRadius: '6px', fontWeight: 700, border: '1px solid #bbf7d0', display: 'inline-block', marginTop: '3px' }}>{complaint.complaintCode}</span>
          </div>
          <div style={{ marginLeft: 'auto' }}>
            <span style={{ fontSize: '0.72rem', fontWeight: 700, padding: '4px 10px', borderRadius: '20px', background: '#fef3c7', color: '#b45309', border: '1px solid #fde68a', textTransform: 'capitalize' }}>{complaint.status.replace('_', ' ')}</span>
          </div>
        </div>

        {/* Form card */}
        <div style={{ background: '#fff', borderRadius: '16px', boxShadow: '0 1px 8px rgba(0,0,0,0.06)', border: '1px solid rgba(22,163,74,0.1)', overflow: 'hidden' }}>
          <div style={{ padding: '0.9rem 1.5rem', background: '#f8fafc', borderBottom: '1px solid #f1f5f9', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <span style={{ fontSize: '0.78rem', fontWeight: 700, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Resolution Form</span>
            <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#16a34a', boxShadow: '0 0 0 3px rgba(22,163,74,0.2)' }} />
          </div>

          <form onSubmit={submit} style={{ padding: '1.75rem 1.5rem', display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
            {/* Resolution remark */}
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                <label style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.85rem', fontWeight: 600, color: '#374151' }}>
                  <svg width="14" height="14" fill="none" stroke="#16a34a" strokeWidth="2" viewBox="0 0 24 24"><path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/></svg>
                  Resolution Remark
                </label>
                <span style={{ fontSize: '0.72rem', color: '#94a3b8' }}>{data.resolutionRemark.length}/400</span>
              </div>
              <textarea
                placeholder="Describe the action taken to resolve this complaint…"
                value={data.resolutionRemark}
                maxLength={400}
                rows={5}
                onChange={(e) => setData('resolutionRemark', e.target.value)}
                onFocus={focus} onBlur={blur}
                style={{ ...inputStyle, resize: 'vertical', borderColor: errors.resolutionRemark ? '#fca5a5' : '#e2e8f0' }}
              />
              {errors.resolutionRemark && <p style={{ fontSize: '0.73rem', color: '#ef4444', marginTop: '4px' }}>{errors.resolutionRemark}</p>}
            </div>

            {/* Proof Photo (camera capture) */}
            <div>
              <label style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.85rem', fontWeight: 600, color: '#374151', marginBottom: '6px' }}>
                <svg width="14" height="14" fill="none" stroke="#16a34a" strokeWidth="2" viewBox="0 0 24 24"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg>
                Proof Photo
                <span style={{ marginLeft: 'auto', fontSize: '0.72rem', color: '#94a3b8', fontWeight: 600 }}>Required (camera only)</span>
              </label>

              {!photoPreview && (
                <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
                  <button type="button" onClick={async () => {
                    // open camera
                    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
                      // fallback to file input if getUserMedia not supported
                      const el = document.getElementById('fallback-file-input') as HTMLInputElement | null
                      el?.click()
                      return
                    }
                    setIsCameraOpen(true)
                    try {
                      const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } })
                      streamRef.current = stream
                      if (videoRef.current) videoRef.current.srcObject = stream
                    } catch (err) {
                      console.error('Camera open failed', err)
                      const el = document.getElementById('fallback-file-input') as HTMLInputElement | null
                      el?.click()
                    }
                  }} style={{ padding: '10px 14px', borderRadius: 10, background: '#16a34a', color: '#fff', border: 'none', cursor: 'pointer' }}>Open Camera</button>

                  <input id="fallback-file-input" type="file" accept="image/*" capture="environment" onChange={handleFileChange} style={{ display: 'none' }} />
                  <div style={{ fontSize: '0.9rem', color: '#6b7280' }}>Tap to open camera and capture a photo.</div>
                </div>
              )}

              {photoPreview && (
                <div style={{ marginTop: 10, display: 'flex', gap: 10, alignItems: 'center' }}>
                  <img src={photoPreview} alt="preview" style={{ width: 160, height: 120, objectFit: 'cover', borderRadius: 8, border: '1px solid #e6f4ea' }} />
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                    <button type="button" onClick={() => { setFileBlob(null); setPhotoPreview(null) }} style={{ background: '#fff', border: '1px solid #e2e8f0', padding: '8px 10px', borderRadius: 8, cursor: 'pointer' }}>Remove</button>
                    <a href={photoPreview} target="_blank" rel="noreferrer" style={{ fontSize: '0.85rem', color: '#16a34a', fontWeight: 700, textDecoration: 'none' }}>Open full image</a>
                  </div>
                </div>
              )}


              {/* Camera overlay */}
              {isCameraOpen && (
                <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.6)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 2000 }}>
                  <div style={{ background: '#fff', padding: 12, borderRadius: 12, width: '92%', maxWidth: 420 }}>
                    <div style={{ position: 'relative' }}>
                      <video ref={videoRef} autoPlay playsInline style={{ width: '100%', borderRadius: 8, background: '#000' }} />
                      <canvas ref={canvasRef} style={{ display: 'none' }} />
                    </div>
                    <div style={{ display: 'flex', gap: 8, marginTop: 10, justifyContent: 'space-between' }}>
                      <button type="button" onClick={async () => {
                        // capture
                        if (!videoRef.current) return
                        const v = videoRef.current
                        const w = v.videoWidth || 640
                        const h = v.videoHeight || 480
                        const c = canvasRef.current!
                        c.width = w
                        c.height = h
                        const ctx = c.getContext('2d')!
                        ctx.drawImage(v, 0, 0, w, h)
                        // Use toBlob to get a binary Blob for upload and also create preview
                        c.toBlob((blob) => {
                          if (!blob) return
                          setFileBlob(blob)
                          const previewUrl = URL.createObjectURL(blob)
                          setPhotoPreview(previewUrl)
                        }, 'image/jpeg', 0.75)
                        // stop camera
                        if (streamRef.current) {
                          streamRef.current.getTracks().forEach((t: MediaStreamTrack) => t.stop())
                          streamRef.current = null
                        }
                        setIsCameraOpen(false)
                      }} style={{ flex: 1, padding: '10px 12px', borderRadius: 8, background: '#16a34a', color: '#fff', border: 'none', cursor: 'pointer' }}>Take Photo</button>
                      <button type="button" onClick={() => {
                        // cancel and stop camera
                        if (streamRef.current) {
                          streamRef.current.getTracks().forEach((t: MediaStreamTrack) => t.stop())
                          streamRef.current = null
                        }
                        setIsCameraOpen(false)
                      }} style={{ flex: 1, padding: '10px 12px', borderRadius: 8, background: '#fff', color: '#374151', border: '1px solid #e2e8f0', cursor: 'pointer' }}>Cancel</button>
                    </div>
                  </div>
                </div>
              )}

            </div>

            <div style={{ height: '1px', background: 'linear-gradient(90deg, transparent, #dcfce7, transparent)' }} />

            {/* Actions */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <Link href={`/complaints/${complaint.id}`} style={{ fontSize: '0.85rem', fontWeight: 600, color: '#64748b', textDecoration: 'none' }}>← Cancel</Link>
              <button type="submit" disabled={submitting}
                style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '0.8rem 1.75rem', background: submitting ? '#86efac' : 'linear-gradient(135deg, #16a34a, #15803d)', color: '#fff', border: 'none', borderRadius: '12px', fontWeight: 700, fontSize: '0.9rem', cursor: submitting ? 'not-allowed' : 'pointer', boxShadow: '0 4px 14px rgba(22,163,74,0.35)', fontFamily: "'DM Sans',sans-serif" }}>
                {submitting ? 'Resolving…' : (<>Resolve Complaint <svg width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" strokeLinecap="round" strokeLinejoin="round"/></svg></>)}
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
