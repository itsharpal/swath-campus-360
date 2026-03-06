// import Floor from '#models/floor'

// export default class FloorService {
//   async listFloors(buildingId: number) {
//     return Floor.query()
//       .where('building_id', buildingId)
//       .preload('zones')
//       .orderBy('floor_number', 'asc')
//   }

//   async createFloor(buildingId: number, data: any) {
//     return Floor.create({
//       buildingId,
//       floorNumber: data.floorNumber,
//       name: data.name,
//     })
//   }

//   async updateFloor(id: number, data: any) {
//     const floor = await Floor.findOrFail(id)

//     floor.merge({
//       floorNumber: data.floorNumber,
//       name: data.name,
//     })

//     await floor.save()

//     return floor
//   }

//   async deleteFloor(id: number) {
//     const floor = await Floor.findOrFail(id)

//     await floor.delete()

//     return { message: 'Floor deleted successfully' }
//   }

//   async getFloor(id: number) {
//     return Floor.findOrFail(id)
//   }
// }

import Floor from '#models/floor'

interface FloorPayload {
  floorNumber: number
  name: string
}

export default class FloorService {
  async listFloors(buildingId: number) {
    return Floor.query()
      .where('building_id', buildingId)
      .preload('zones')
      .orderBy('floor_number', 'asc')
  }

  async createFloor(buildingId: number, data: FloorPayload) {
    return Floor.create({
      buildingId,
      floorNumber: data.floorNumber,
      name: data.name,
    })
  }

  async updateFloor(id: number, data: FloorPayload) {
    const floor = await Floor.findOrFail(id)

    floor.merge({
      floorNumber: data.floorNumber,
      name: data.name,
    })

    await floor.save()

    return floor
  }

  async deleteFloor(id: number) {
    const floor = await Floor.findOrFail(id)

    await floor.delete()

    return true
  }

  async getFloor(id: number) {
    return Floor.findOrFail(id)
  }
}
