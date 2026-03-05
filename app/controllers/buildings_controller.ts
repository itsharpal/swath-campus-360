import type { HttpContext } from '@adonisjs/core/http'
import BuildingService from '#services/building_service'
import { inject } from '@adonisjs/core'

@inject()
export default class BuildingsController {
  constructor(private buildingService: BuildingService) {}

  async index({ request }: HttpContext) {
    const page = request.input('page', 1)

    return this.buildingService.listBuildings(page)
  }

  async store({ request }: HttpContext) {
    const payload = request.only(['name', 'code', 'description', 'supervisorId'])

    return this.buildingService.createBuilding(payload)
  }

  async show({ params }: HttpContext) {
    return this.buildingService.getBuilding(params.id)
  }

  async update({ params, request }: HttpContext) {
    const payload = request.only(['name', 'description', 'supervisorId'])

    return this.buildingService.updateBuilding(params.id, payload)
  }

  async destroy({ params }: HttpContext) {
    return this.buildingService.deactivateBuilding(params.id)
  }

  async stats({ params }: HttpContext) {
    return this.buildingService.getBuildingStats(params.id)
  }
}
