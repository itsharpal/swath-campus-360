export interface Zone {
  id: number
  name: string
  floorId: number
  buildingId: number
  zoneTypeId: number
  qrCode: string
  cleaningFrequencyHours: number
  cleanlinessScore: number
}

export interface ZonePageProps {
  zones: Zone[]
  floor: any
}