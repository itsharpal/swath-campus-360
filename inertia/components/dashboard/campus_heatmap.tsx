import { Fragment, useEffect, useMemo, useState } from 'react'
import { CircleMarker, MapContainer, TileLayer, Tooltip, useMap } from 'react-leaflet'
import type { LatLngBoundsExpression } from 'leaflet'
import 'leaflet/dist/leaflet.css'

export interface HeatmapMapPoint {
  zoneId: number
  zoneName: string
  buildingName: string
  floorName: string
  floorNumber: number
  complaintCount: number
  intensity: number
  lat: number
  lng: number
}

export interface HeatmapZoneSummary {
  zoneId: number
  zoneName: string
  complaintCount: number
  intensity: number
  lat: number
  lng: number
}

export interface HeatmapFloorSummary {
  floorId: number
  floorName: string
  floorNumber: number
  totalComplaints: number
  intensity: number
  zones: HeatmapZoneSummary[]
}

export interface HeatmapBuildingSummary {
  buildingId: number
  buildingName: string
  totalComplaints: number
  intensity: number
  floors: HeatmapFloorSummary[]
}

export interface ComplaintHeatmap {
  totalHistoricalComplaints: number
  maxZoneComplaints: number
  buildings: HeatmapBuildingSummary[]
  mapCenter: { lat: number; lng: number }
  mapZoom: number
  mapPoints: HeatmapMapPoint[]
}

interface Props {
  complaintHeatmap?: ComplaintHeatmap
}

const EMPTY_HEATMAP: ComplaintHeatmap = {
  totalHistoricalComplaints: 0,
  maxZoneComplaints: 0,
  buildings: [],
  mapCenter: { lat: 21.1820896979923, lng: 72.80859569161564 },
  mapZoom: 19,
  mapPoints: [],
}

function FitMapBounds({ points }: { points: HeatmapMapPoint[] }) {
  const map = useMap()

  useEffect(() => {
    if (points.length === 0) {
      return
    }

    const bounds: LatLngBoundsExpression = points.map((point) => [point.lat, point.lng])
    map.fitBounds(bounds, { padding: [24, 24], maxZoom: 20 })
  }, [map, points])

  return null
}

const HEAT_COLOR_STOPS = [
  { stop: 0, rgb: [49, 130, 189] as const },
  { stop: 0.25, rgb: [65, 182, 196] as const },
  { stop: 0.5, rgb: [161, 218, 180] as const },
  { stop: 0.7, rgb: [255, 255, 191] as const },
  { stop: 0.85, rgb: [253, 174, 97] as const },
  { stop: 1, rgb: [215, 25, 28] as const },
]

function clamp01(value: number): number {
  if (value < 0) return 0
  if (value > 1) return 1
  return value
}

function interpolateChannel(start: number, end: number, t: number): number {
  return Math.round(start + (end - start) * t)
}

function getPointColor(intensity: number): string {
  const normalized = clamp01(intensity)

  for (let index = 0; index < HEAT_COLOR_STOPS.length - 1; index++) {
    const left = HEAT_COLOR_STOPS[index]
    const right = HEAT_COLOR_STOPS[index + 1]

    if (normalized >= left.stop && normalized <= right.stop) {
      const segmentRange = right.stop - left.stop || 1
      const segmentT = (normalized - left.stop) / segmentRange
      const red = interpolateChannel(left.rgb[0], right.rgb[0], segmentT)
      const green = interpolateChannel(left.rgb[1], right.rgb[1], segmentT)
      const blue = interpolateChannel(left.rgb[2], right.rgb[2], segmentT)

      return `rgb(${red}, ${green}, ${blue})`
    }
  }

  const fallback = HEAT_COLOR_STOPS[HEAT_COLOR_STOPS.length - 1].rgb
  return `rgb(${fallback[0]}, ${fallback[1]}, ${fallback[2]})`
}

function getPointWeight(
  point: Pick<HeatmapMapPoint, 'complaintCount' | 'intensity'>,
  maxZoneComplaints: number
) {
  if (point.complaintCount <= 0) {
    return 0
  }

  if (maxZoneComplaints > 0) {
    return clamp01(point.complaintCount / maxZoneComplaints)
  }

  return clamp01(point.intensity)
}

function getCoreRadius(pointWeight: number) {
  return 3 + pointWeight * 4
}

function getHeatPixelRadius(pointWeight: number) {
  if (pointWeight <= 0) {
    return 0
  }

  return 8 + Math.sqrt(pointWeight) * 16
}

export default function CampusHeatmap({ complaintHeatmap }: Props) {
  const normalizedHeatmap = complaintHeatmap ?? EMPTY_HEATMAP
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  const mapPoints = normalizedHeatmap.mapPoints
  const center: [number, number] = [normalizedHeatmap.mapCenter.lat, normalizedHeatmap.mapCenter.lng]

  const totalFloors = useMemo(() => {
    return normalizedHeatmap.buildings.reduce((sum, building) => sum + building.floors.length, 0)
  }, [normalizedHeatmap.buildings])

  const totalZones = useMemo(() => {
    return normalizedHeatmap.buildings.reduce((sum, building) => {
      return sum + building.floors.reduce((floorSum, floor) => floorSum + floor.zones.length, 0)
    }, 0)
  }, [normalizedHeatmap.buildings])

  const sortedMapPoints = useMemo(() => {
    return [...mapPoints].sort((a, b) => {
      const weightA = getPointWeight(a, normalizedHeatmap.maxZoneComplaints)
      const weightB = getPointWeight(b, normalizedHeatmap.maxZoneComplaints)
      return weightA - weightB
    })
  }, [mapPoints, normalizedHeatmap.maxZoneComplaints])

  return (
    <section
      style={{
        background: '#ffffff',
        borderRadius: '16px',
        boxShadow: '0 1px 8px rgba(0,0,0,0.06)',
        border: '1px solid rgba(22,163,74,0.1)',
        overflow: 'hidden',
        marginBottom: '2rem',
      }}
    >
      <div
        style={{
          padding: '1.2rem 1.5rem',
          borderBottom: '1px solid #f1f5f9',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '1rem',
        }}
      >
        <div>
          <h2 style={{ margin: 0, color: '#0f172a', fontSize: '1.06rem', fontWeight: 700 }}>
            Campus Complaint Heatmap
          </h2>
          <p style={{ margin: '4px 0 0', color: '#94a3b8', fontSize: '0.8rem' }}>
            OpenStreetMap view of historical complaint concentration by zone.
          </p>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
          {mapPoints.length === 0 && (
            <span
              style={{
                fontSize: '0.74rem',
                fontWeight: 700,
                color: '#64748b',
                background: '#f8fafc',
                border: '1px solid #e2e8f0',
                borderRadius: '999px',
                padding: '4px 10px',
              }}
            >
              No hotspots yet
            </span>
          )}
          <span
            style={{
              fontSize: '0.74rem',
              fontWeight: 700,
              color: '#16a34a',
              background: '#f0fdf4',
              border: '1px solid #bbf7d0',
              borderRadius: '999px',
              padding: '4px 10px',
            }}
          >
            Complaints: {normalizedHeatmap.totalHistoricalComplaints}
          </span>
          <span
            style={{
              fontSize: '0.74rem',
              fontWeight: 700,
              color: '#0f172a',
              background: '#f8fafc',
              border: '1px solid #e2e8f0',
              borderRadius: '999px',
              padding: '4px 10px',
            }}
          >
            Peak Zone: {normalizedHeatmap.maxZoneComplaints}
          </span>
        </div>
      </div>

      <div style={{ height: '380px', width: '100%', position: 'relative' }}>
        {isClient ? (
          <MapContainer
            center={center}
            zoom={normalizedHeatmap.mapZoom}
            scrollWheelZoom
            style={{ height: '100%', width: '100%' }}
          >
            <TileLayer
              attribution="&copy; OpenStreetMap contributors"
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />

            {mapPoints.length > 0 && <FitMapBounds points={mapPoints} />}

            {sortedMapPoints.map((point) => {
              const pointWeight = getPointWeight(point, normalizedHeatmap.maxZoneComplaints)
              const pointColor = pointWeight > 0 ? getPointColor(pointWeight) : '#94a3b8'
              const heatRadius = getHeatPixelRadius(pointWeight)
              const middleRadius = heatRadius * 1.55
              const outerRadius = heatRadius * 2.05

              return (
                <Fragment key={point.zoneId}>
                  {pointWeight > 0 && (
                    <>
                      <CircleMarker
                        center={[point.lat, point.lng]}
                        radius={outerRadius}
                        pathOptions={{
                          color: pointColor,
                          fillColor: pointColor,
                          fillOpacity: 0.05,
                          weight: 0,
                        }}
                      />
                      <CircleMarker
                        center={[point.lat, point.lng]}
                        radius={middleRadius}
                        pathOptions={{
                          color: pointColor,
                          fillColor: pointColor,
                          fillOpacity: 0.1,
                          weight: 0,
                        }}
                      />
                      <CircleMarker
                        center={[point.lat, point.lng]}
                        radius={heatRadius}
                        pathOptions={{
                          color: pointColor,
                          fillColor: pointColor,
                          fillOpacity: 0.18,
                          weight: 0,
                        }}
                      />
                    </>
                  )}
                  <CircleMarker
                    center={[point.lat, point.lng]}
                    radius={pointWeight > 0 ? getCoreRadius(pointWeight) : 4}
                    pathOptions={{
                      color: '#ffffff',
                      weight: 1,
                      fillColor: pointColor,
                      fillOpacity: pointWeight > 0 ? 0.96 : 0.72,
                    }}
                  >
                    <Tooltip direction="top" offset={[0, -6]}>
                      <div style={{ fontSize: '0.76rem', lineHeight: 1.4 }}>
                        <strong>{point.zoneName}</strong>
                        <br />
                        {point.buildingName} | {point.floorName} (Floor {point.floorNumber})
                        <br />
                        Complaints: {point.complaintCount}
                      </div>
                    </Tooltip>
                  </CircleMarker>
                </Fragment>
              )
            })}
          </MapContainer>
        ) : (
          <div
            style={{
              height: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#94a3b8',
              fontSize: '0.9rem',
              background: '#f8fafc',
            }}
          >
            Loading campus map...
          </div>
        )}

        <div
          style={{
            position: 'absolute',
            right: '12px',
            bottom: '12px',
            background: 'rgba(255,255,255,0.92)',
            border: '1px solid #e2e8f0',
            borderRadius: '10px',
            boxShadow: '0 6px 20px rgba(15,23,42,0.12)',
            padding: '8px 10px',
            pointerEvents: 'none',
          }}
        >
          <p style={{ margin: '0 0 6px', fontSize: '0.68rem', letterSpacing: '0.05em', color: '#475569' }}>
            HEAT INTENSITY
          </p>
          <div
            style={{
              width: '150px',
              height: '8px',
              borderRadius: '999px',
              background:
                'linear-gradient(90deg, rgb(49,130,189) 0%, rgb(65,182,196) 20%, rgb(161,218,180) 40%, rgb(255,255,191) 60%, rgb(253,174,97) 80%, rgb(215,25,28) 100%)',
            }}
          />
          <div
            style={{
              marginTop: '4px',
              display: 'flex',
              justifyContent: 'space-between',
              fontSize: '0.65rem',
              color: '#64748b',
            }}
          >
            <span>Low</span>
            <span>High</span>
          </div>
        </div>
      </div>

      <div style={{ padding: '1.25rem 1.5rem 1.5rem' }}>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, minmax(0, 1fr))',
            gap: '0.9rem',
            marginBottom: '1rem',
          }}
        >
          <div
            style={{
              border: '1px solid #dcfce7',
              background: '#f0fdf4',
              borderRadius: '10px',
              padding: '0.8rem 0.9rem',
            }}
          >
            <p style={{ margin: 0, color: '#15803d', fontSize: '0.74rem', fontWeight: 600 }}>Buildings</p>
            <p style={{ margin: '2px 0 0', color: '#14532d', fontSize: '1.25rem', fontWeight: 800 }}>
              {normalizedHeatmap.buildings.length}
            </p>
          </div>
          <div
            style={{
              border: '1px solid #dbeafe',
              background: '#eff6ff',
              borderRadius: '10px',
              padding: '0.8rem 0.9rem',
            }}
          >
            <p style={{ margin: 0, color: '#1d4ed8', fontSize: '0.74rem', fontWeight: 600 }}>Floors</p>
            <p style={{ margin: '2px 0 0', color: '#1e3a8a', fontSize: '1.25rem', fontWeight: 800 }}>
              {totalFloors}
            </p>
          </div>
          <div
            style={{
              border: '1px solid #fde68a',
              background: '#fffbeb',
              borderRadius: '10px',
              padding: '0.8rem 0.9rem',
            }}
          >
            <p style={{ margin: 0, color: '#b45309', fontSize: '0.74rem', fontWeight: 600 }}>Zones</p>
            <p style={{ margin: '2px 0 0', color: '#78350f', fontSize: '1.25rem', fontWeight: 800 }}>
              {totalZones}
            </p>
          </div>
        </div>

        <div style={{ overflowX: 'auto', border: '1px solid #f1f5f9', borderRadius: '10px' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ background: '#f8fafc' }}>
                <th style={{ padding: '0.7rem 0.85rem', textAlign: 'left', fontSize: '0.72rem', color: '#94a3b8', letterSpacing: '0.05em' }}>
                  Building
                </th>
                <th style={{ padding: '0.7rem 0.85rem', textAlign: 'left', fontSize: '0.72rem', color: '#94a3b8', letterSpacing: '0.05em' }}>
                  Floor
                </th>
                <th style={{ padding: '0.7rem 0.85rem', textAlign: 'left', fontSize: '0.72rem', color: '#94a3b8', letterSpacing: '0.05em' }}>
                  Zone
                </th>
                <th style={{ padding: '0.7rem 0.85rem', textAlign: 'right', fontSize: '0.72rem', color: '#94a3b8', letterSpacing: '0.05em' }}>
                  Complaints
                </th>
              </tr>
            </thead>
            <tbody>
              {normalizedHeatmap.buildings.flatMap((building) =>
                building.floors.flatMap((floor) =>
                  floor.zones.map((zone) => (
                    <tr key={zone.zoneId} style={{ borderTop: '1px solid #f1f5f9', background: zone.complaintCount > 0 ? '#ffffff' : '#fcfcfd' }}>
                      <td style={{ padding: '0.72rem 0.85rem', fontSize: '0.82rem', color: '#0f172a' }}>{building.buildingName}</td>
                      <td style={{ padding: '0.72rem 0.85rem', fontSize: '0.82rem', color: '#334155' }}>
                        {floor.floorName} (#{floor.floorNumber})
                      </td>
                      <td style={{ padding: '0.72rem 0.85rem', fontSize: '0.82rem', color: '#334155' }}>{zone.zoneName}</td>
                      <td style={{ padding: '0.72rem 0.85rem', fontSize: '0.82rem', color: '#0f172a', textAlign: 'right', fontWeight: 700 }}>
                        {zone.complaintCount}
                      </td>
                    </tr>
                  ))
                )
              )}
            </tbody>
          </table>

          {normalizedHeatmap.buildings.length === 0 && (
            <div style={{ textAlign: 'center', padding: '1.6rem', fontSize: '0.86rem', color: '#94a3b8' }}>
              No zone summary data available.
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
