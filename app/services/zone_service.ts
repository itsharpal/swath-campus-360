import Zone from '#models/zone'
import Floor from '#models/floor'
//@ts-ignore: no type declarations for 'qrcode'
import QRCode from 'qrcode'

export default class ZoneService {
  async getZonesByFloor(floorId: number) {
    return Zone.query().where('floor_id', floorId).preload('zoneType')
  }

  async createZone(floorId: number, data: any) {
    const floor = await Floor.findOrFail(floorId)

    const zone = await Zone.create({
      ...data,
      floorId: floorId,
      buildingId: floor.buildingId,
    })

    return zone
  }

  async getZone(id: number) {
    return Zone.query()
      .where('id', id)
      .preload('floor')
      .preload('building')
      .preload('zoneType')
      .firstOrFail()
  }

  async updateZone(id: number, data: any) {
    const zone = await Zone.findOrFail(id)

    zone.merge(data)

    await zone.save()

    return zone
  }

  async deleteZone(id: number) {
    const zone = await Zone.findOrFail(id)

    await zone.delete()

    return { message: 'Zone deleted' }
  }

  async generateQr(zoneId: number) {
    const zone = await Zone.findOrFail(zoneId)

    const qrData = `ZONE-${zone.id}`

    const qr = await QRCode.toDataURL(qrData)

    zone.qrCode = qrData

    await zone.save()

    return {
      qr,
      zone,
    }
  }

  async resolveZoneByQr(qr: string) {
    return Zone.query().where('qr_code', qr).preload('building').preload('floor').firstOrFail()
  }
}
