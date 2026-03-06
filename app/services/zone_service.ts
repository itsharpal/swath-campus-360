import Zone from '#models/zone'
import Floor from '#models/floor'
import { randomUUID } from 'node:crypto'

interface ZonePayload {
  name: string
  zoneTypeId: number
  cleaningFrequencyHours?: number
}

export default class ZoneService {
  async listZones(floorId: number) {
    return Zone.query().where('floor_id', floorId).preload('zoneType').orderBy('created_at', 'desc')
  }

  async createZone(floorId: number, data: ZonePayload) {
    const floor = await Floor.findOrFail(floorId)

    return Zone.create({
      floorId: floor.id,
      buildingId: floor.buildingId,
      name: data.name,
      zoneTypeId: data.zoneTypeId,
      cleaningFrequencyHours: data.cleaningFrequencyHours ?? 4,
      qrCode: randomUUID(),
    })
  }

  async getZone(id: number) {
    return Zone.query()
      .where('id', id)
      .preload('floor')
      .preload('building')
      .preload('zoneType')
      .firstOrFail()
  }

  async updateZone(id: number, data: ZonePayload) {
    const zone = await Zone.findOrFail(id)

    zone.merge({
      name: data.name,
      zoneTypeId: data.zoneTypeId,
      cleaningFrequencyHours: data.cleaningFrequencyHours,
    })

    await zone.save()

    return zone
  }

  async deleteZone(id: number) {
    const zone = await Zone.findOrFail(id)

    await zone.delete()

    return true
  }

  async resolveZoneByQr(qr: string) {
    return Zone.query()
      .where('qr_code', qr)
      .preload('floor')
      .preload('building')
      .preload('zoneType')
      .firstOrFail()
  }

  async generateQr(id: number) {
    const zone = await Zone.findOrFail(id)

    if (!zone.qrCode) {
      zone.qrCode = randomUUID()
      await zone.save()
    }

    return zone.qrCode
  }
}
