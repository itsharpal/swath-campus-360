// import type { HttpContext } from '@adonisjs/core/http'
// import FloorService from '#services/floor_service'
// import { inject } from '@adonisjs/core'
// import Building from '#models/building'

// @inject()
// export default class FloorsController {
//   constructor(private floorService: FloorService) {}

//   async index({ params, inertia }: HttpContext) {
//     const building = await Building.findOrFail(params.buildingId)
//     const floors = await this.floorService.listFloors(params.buildingId)

//     return inertia.render('buildings/floors', {
//       // serialize the model so client receives plain JSON with `id` and attributes
//       building: building.toJSON(),
//       // ensure floors are plain objects (with id) for the client
//       floors: floors.map((f: any) => (typeof f.toJSON === 'function' ? f.toJSON() : f)),
//     })
//   }

//   async create({ params, inertia }: HttpContext) {
//     const buildingId = Number(params.buildingId)

//     return inertia.render('floors/create', {
//       buildingId: buildingId,
//     })
//   }

//   async edit({ params, inertia }: HttpContext) {
//     const floor = await this.floorService.getFloor(Number(params.id))

//     return inertia.render('floors/edit', {
//       floor: floor.toJSON(),
//     })
//   }

//   async store({ params, request, response }: HttpContext) {
//     const payload = request.only(['floorNumber', 'name'])

//     await this.floorService.createFloor(params.buildingId, payload)

//     return response.redirect(`/buildings/${params.buildingId}/floors`)
//   }

//   async update({ params, request, response }: HttpContext) {
//     const payload = request.only(['floorNumber', 'name'])

//     const floor = await this.floorService.updateFloor(Number(params.id), payload)

//     return response.redirect(`/buildings/${floor.buildingId}/floors`)
//   }

//   async destroy({ params, response }: HttpContext) {
//     const floor = await this.floorService.getFloor(Number(params.id))

//     await this.floorService.deleteFloor(Number(params.id))

//     return response.redirect(`/buildings/${floor.buildingId}/floors`)
//   }
// }

import type { HttpContext } from '@adonisjs/core/http'
import FloorService from '#services/floor_service'
import { inject } from '@adonisjs/core'
import Building from '#models/building'
import { createFloorValidator, updateFloorValidator } from '#validators/floor'
// import { createFloorValidator, updateFloorValidator } from '#validators/floor_validator'

@inject()
export default class FloorsController {
  constructor(private floorService: FloorService) {}

  async index({ params, inertia }: HttpContext) {
    const buildingId = Number(params.buildingId)

    const building = await Building.findOrFail(buildingId)
    const floors = await this.floorService.listFloors(buildingId)

    return inertia.render('buildings/floors', {
      building: building.serialize(),

      floors: floors.map((f) => f.serialize()),
    })
  }

  async create({ params, inertia }: HttpContext) {
    const buildingId = Number(params.buildingId)

    return inertia.render('floors/create', {
      buildingId,
    })
  }

  async edit({ params, inertia }: HttpContext) {
    const floorId = Number(params.id)

    const floor = await this.floorService.getFloor(floorId)

    return inertia.render('floors/edit', {
      floor: floor.serialize(),
    })
  }

  async store({ params, request, response }: HttpContext) {
    const buildingId = Number(params.buildingId)

    const payload = await request.validateUsing(createFloorValidator)

    await this.floorService.createFloor(buildingId, payload)

    return response.redirect(`/buildings/${buildingId}/floors`)
  }

  async update({ params, request, response }: HttpContext) {
    const floorId = Number(params.id)

    const payload = await request.validateUsing(updateFloorValidator)

    const floor = await this.floorService.updateFloor(floorId, payload)

    return response.redirect(`/buildings/${floor.buildingId}/floors`)
  }

  async destroy({ params, response }: HttpContext) {
    const floorId = Number(params.id)

    const floor = await this.floorService.getFloor(floorId)

    await this.floorService.deleteFloor(floorId)

    return response.redirect(`/buildings/${floor.buildingId}/floors`)
  }
}
