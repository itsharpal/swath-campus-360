import type { HttpContext } from '@adonisjs/core/http'
import BuildingService from '#services/building_service'
import { inject } from '@adonisjs/core'

@inject()
export default class BuildingsController {
  constructor(private buildingService: BuildingService) {}

  async index({ request, inertia }: HttpContext) {
    const page = request.input('page', 1)

    const buildings = await this.buildingService.listBuildings(page)

    return inertia.render('buildings/index', {
      buildings,
    })
  }

  async create({ inertia }: HttpContext) {
    return inertia.render('buildings/create', {})
  }

  async store({ request, response }: HttpContext) {
    const payload = request.only(['name', 'code', 'description', 'supervisorId'])

    await this.buildingService.createBuilding(payload)

    return response.redirect('/buildings')
  }

  async show({ params, inertia }: HttpContext) {
    const building = await this.buildingService.getBuilding(Number(params.id))

    return inertia.render('buildings/show', {
      building,
    })
  }

  async edit({ params, inertia }: HttpContext) {
    const building = await this.buildingService.getBuilding(Number(params.id))

    return inertia.render('buildings/edit', {
      // Force serialization so the React component can access building.id
      building: building.toJSON(),
    })
  }

  async update({ params, request, response }: HttpContext) {
    const payload = request.only(['name', 'code', 'description', 'supervisorId'])

    await this.buildingService.updateBuilding(Number(params.id), payload)

    return response.redirect(`/buildings/${params.id}`)
  }

  async destroy({ params, response }: HttpContext) {
    await this.buildingService.deactivateBuilding(Number(params.id))

    return response.redirect('/buildings')
  }

  async stats({ params }: HttpContext) {
    return this.buildingService.getBuildingStats(Number(params.id))
  }

  async dashboard({ params, inertia }: HttpContext) {
    const stats = await this.buildingService.getBuildingStats(Number(params.id))
    const building = await this.buildingService.getBuilding(Number(params.id))

    return inertia.render('buildings/dashboard', {
      building,
      stats,
    })
  }
}
