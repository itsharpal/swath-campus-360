import { router } from '@inertiajs/react'

type Zone = {
  id: number
  name?: string | null
  buildingId?: number | null
  floorId?: number | null
}

type Props = {
  zone: Zone
  qr: string
  resolveUrl: string
}

export default function ZoneQrPage({ zone, qr, resolveUrl }: Props) {
  const qrImageUrl = `https://api.qrserver.com/v1/create-qr-code/?size=360x360&data=${encodeURIComponent(resolveUrl)}`

  return (
    <div style={{ minHeight: '100vh', background: '#f0fdf4', padding: '32px 16px' }}>
      <div
        style={{
          maxWidth: 780,
          margin: '0 auto',
          background: '#fff',
          border: '1px solid rgba(22,163,74,0.18)',
          borderRadius: 18,
          boxShadow: '0 12px 40px rgba(22,163,74,0.12)',
          overflow: 'hidden',
        }}
      >
        <div
          style={{
            padding: '16px 20px',
            borderBottom: '1px solid rgba(22,163,74,0.12)',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: 12,
            flexWrap: 'wrap',
          }}
        >
          <div>
            <div style={{ fontSize: 12, color: '#15803d', fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase' }}>
              Zone QR
            </div>
            <h1 style={{ margin: '6px 0 0', fontSize: 26, color: '#14532d' }}>
              {zone.name || `Zone #${zone.id}`}
            </h1>
          </div>

          <button
            onClick={() => router.visit(`/zones/${zone.id}`)}
            style={{
              border: '1px solid rgba(22,163,74,0.3)',
              background: '#dcfce7',
              color: '#166534',
              borderRadius: 10,
              padding: '10px 14px',
              fontWeight: 600,
              cursor: 'pointer',
            }}
          >
            View Zone
          </button>
        </div>

        <div style={{ padding: 24, display: 'grid', gridTemplateColumns: '1fr', gap: 20 }}>
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <img
              src={qrImageUrl}
              alt={`QR code for ${zone.name || `Zone ${zone.id}`}`}
              width={360}
              height={360}
              style={{
                width: 'min(360px, 100%)',
                height: 'auto',
                borderRadius: 12,
                border: '1px solid rgba(22,163,74,0.22)',
                background: '#fff',
              }}
            />
          </div>

          <div
            style={{
              background: '#f8fffb',
              border: '1px solid rgba(22,163,74,0.16)',
              borderRadius: 12,
              padding: 14,
              color: '#14532d',
              fontSize: 14,
              lineHeight: 1.5,
            }}
          >
            <div style={{ fontWeight: 700, marginBottom: 6 }}>QR Payload</div>
            <div style={{ wordBreak: 'break-all', color: '#166534' }}>{resolveUrl}</div>
            <div style={{ marginTop: 10, fontSize: 12, color: '#3f6b4c' }}>Token: {qr}</div>
          </div>

          <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
            <button
              onClick={() => router.visit(`/buildings/${zone.buildingId}`)}
              style={{
                border: '1px solid rgba(13,148,136,0.3)',
                background: '#f0fdfa',
                color: '#0f766e',
                borderRadius: 10,
                padding: '10px 14px',
                fontWeight: 600,
                cursor: 'pointer',
              }}
            >
              Back to Building
            </button>
            <button
              onClick={() => window.print()}
              style={{
                border: '1px solid rgba(22,163,74,0.3)',
                background: '#16a34a',
                color: '#fff',
                borderRadius: 10,
                padding: '10px 14px',
                fontWeight: 600,
                cursor: 'pointer',
              }}
            >
              Print QR
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
