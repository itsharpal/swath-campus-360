import type { HttpContext } from '@adonisjs/core/http'
import FloorService from '#services/floor_service'
import { inject } from '@adonisjs/core'

@inject()
export default class FloorsController {
  constructor(private floorService: FloorService) {}

  async index({ params }: HttpContext) {
    return this.floorService.listFloors(params.buildingId)
  }

  async store({ params, request }: HttpContext) {
    const payload = request.only(['floorNumber', 'name'])

    return this.floorService.createFloor(params.buildingId, payload)
  }

  async update({ params, request }: HttpContext) {
    const payload = request.only(['floorNumber', 'name'])

    return this.floorService.updateFloor(params.id, payload)
  }

  async destroy({ params }: HttpContext) {
    return this.floorService.deleteFloor(params.id)
  }
}
