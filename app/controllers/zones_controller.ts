import type { HttpContext } from '@adonisjs/core/http'
import { inject } from '@adonisjs/core'
import ZoneService from '#services/zone_service'
import Floor from '#models/floor'
import { createZoneValidator, updateZoneValidator } from '#validators/zone'
import ZoneType from '#models/zone_type'

// import { createZoneValidator, updateZoneValidator } from '#validators/zone_validator'

@inject()
export default class ZonesController {
  constructor(private zoneService: ZoneService) {}

  async index({ params, inertia }: HttpContext) {
    const floorId = Number(params.floorId)

    const floor = await Floor.findOrFail(floorId)

    const zones = await this.zoneService.listZones(floorId)

    return inertia.render('zones/index', {
      floor: floor.serialize(),
      zones: zones.map((z) => z.serialize()),
    })
  }

  async show({ params, inertia }: HttpContext) {
    const zoneId = Number(params.id)

    const zone = await this.zoneService.getZone(zoneId)

    return inertia.render('zones/show', {
      zone: zone.serialize(),
    })
  }

  // async create({ params, inertia }: HttpContext) {
  //   const floorId = Number(params.floorId)

  //   return inertia.render('zones/create', {
  //     floor: { id: floorId },
  //   })
  // }

  async create({ params, inertia }: HttpContext) {
    const floorId = Number(params.floorId)

    const zoneTypes = await ZoneType.all()

    return inertia.render('zones/create', {
      floor: { id: floorId },
      zoneTypes: zoneTypes.map((z: { serialize: () => any }) => z.serialize()),
    })
  }

  async store({ params, request, response }: HttpContext) {
    const floorId = Number(params.floorId)

    const payload = await request.validateUsing(createZoneValidator)

    await this.zoneService.createZone(floorId, payload)

    return response.redirect(`/floors/${floorId}/zones`)
  }

  async edit({ params, inertia }: HttpContext) {
    const zoneId = Number(params.id)

    const zone = await this.zoneService.getZone(zoneId)

    return inertia.render('zones/edit', {
      zone: zone.serialize(),
    })
  }

  async update({ params, request, response }: HttpContext) {
    const zoneId = Number(params.id)

    const payload = await request.validateUsing(updateZoneValidator)

    const zone = await this.zoneService.updateZone(zoneId, payload)

    return response.redirect(`/floors/${zone.floorId}/zones`)
  }

  async destroy({ params, response }: HttpContext) {
    const zoneId = Number(params.id)

    const zone = await this.zoneService.getZone(zoneId)

    await this.zoneService.deleteZone(zoneId)

    return response.redirect(`/floors/${zone.floorId}/zones`)
  }

  async generateQr({ params }: HttpContext) {
    const zoneId = Number(params.id)

    const qr = await this.zoneService.generateQr(zoneId)

    return { qr }
  }

  async resolveByQr({ params }: HttpContext) {
    const zone = await this.zoneService.resolveZoneByQr(params.qr)

    return zone.serialize()
  }
}
