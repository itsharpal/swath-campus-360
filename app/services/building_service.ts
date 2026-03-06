// import Building from '#models/building'
// import Complaint from '#models/complaint'
// import Zone from '#models/zone'

// export default class BuildingService {
//   async listBuildings(page: number) {
//     return Building.query().preload('supervisor').orderBy('created_at', 'desc').paginate(page, 10)
//   }

//   async createBuilding(data: any) {
//     return Building.create(data)
//   }

//   async getBuilding(id: number) {
//     return Building.query().where('id', id).preload('floors').preload('zones').firstOrFail()
//   }

//   async updateBuilding(id: number, data: any) {
//     const building = await Building.query().where('id', id).first()

//     if (!building) {
//       throw new Error(`Building with id ${id} not found`)
//     }

//     building.merge(data)
//     await building.save()

//     return building
//   }

//   async deactivateBuilding(id: number) {
//     const building = await Building.findOrFail(id)

//     building.isActive = false
//     await building.save()

//     return building
//   }

//   async getBuildingStats(id: number) {
//     const zones = await Zone.query().where('building_id', id).count('* as total')

//     const complaints = await Complaint.query().where('building_id', id)

//     const openComplaints = await Complaint.query()
//       .where('building_id', id)
//       .whereNot('status', 'resolved')
//       .count('* as total')

//     return {
//       zones: zones[0].$extras.total,
//       complaints: complaints.length,
//       openComplaints: openComplaints[0].$extras.total,
//     }
//   }
// }

import Building from '#models/building'
import Complaint from '#models/complaint'
import Zone from '#models/zone'

interface BuildingPayload {
  name: string
  code: string
  description?: string
  supervisorId?: number | null
}

export default class BuildingService {
  async listBuildings(page: number) {
    return Building.query()
      .where('is_active', true)
      .preload('supervisor')
      .orderBy('created_at', 'desc')
      .paginate(page, 10)
  }

  async createBuilding(data: BuildingPayload) {
    return Building.create({
      ...data,
      isActive: true,
    })
  }

  async getBuilding(id: number) {
    return Building.query().where('id', id).preload('floors').preload('zones').firstOrFail()
  }

  async updateBuilding(id: number, data: BuildingPayload) {
    const building = await Building.findOrFail(id)

    building.merge(data)

    await building.save()

    return building
  }

  async deactivateBuilding(id: number) {
    const building = await Building.findOrFail(id)

    building.isActive = false

    await building.save()

    return building
  }

  async getBuildingStats(id: number) {
    const zones = await Zone.query().where('building_id', id).count('* as total')

    const complaints = await Complaint.query().where('building_id', id).count('* as total')

    const openComplaints = await Complaint.query()
      .where('building_id', id)
      .whereNot('status', 'resolved')
      .count('* as total')

    return {
      zones: Number(zones[0].$extras.total),
      complaints: Number(complaints[0].$extras.total),
      openComplaints: Number(openComplaints[0].$extras.total),
    }
  }
}
