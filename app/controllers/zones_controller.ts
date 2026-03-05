import type { HttpContext } from '@adonisjs/core/http'
import ZoneService from '#services/zone_service'
import { inject } from '@adonisjs/core'

@inject()
export default class ZonesController {
  constructor(private zoneService: ZoneService) {}

  async index({ params }: HttpContext) {
    return this.zoneService.getZonesByFloor(params.floorId)
  }

  async store({ params, request }: HttpContext) {
    const payload = request.only(['name', 'zoneTypeId', 'cleaningFrequencyHours'])

    return this.zoneService.createZone(params.floorId, payload)
  }

  async show({ params }: HttpContext) {
    return this.zoneService.getZone(params.id)
  }

  async update({ params, request }: HttpContext) {
    const payload = request.only(['name', 'zoneTypeId', 'cleaningFrequencyHours'])

    return this.zoneService.updateZone(params.id, payload)
  }

  async destroy({ params }: HttpContext) {
    return this.zoneService.deleteZone(params.id)
  }

  async generateQr({ params }: HttpContext) {
    return this.zoneService.generateQr(params.id)
  }

  async resolveByQr({ params }: HttpContext) {
    return this.zoneService.resolveZoneByQr(params.qr)
  }
}
