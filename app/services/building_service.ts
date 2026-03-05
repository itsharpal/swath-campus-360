import Building from '#models/building'
import Complaint from '#models/complaint'
import Zone from '#models/zone'

export default class BuildingService {
  async listBuildings(page: number) {
    return Building.query().preload('supervisor').paginate(page, 10)
  }

  async createBuilding(data: any) {
    return Building.create(data)
  }

  async getBuilding(id: number) {
    return Building.query().where('id', id).preload('floors').preload('zones').firstOrFail()
  }

  async updateBuilding(id: number, data: any) {
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
    const zones = await Zone.query().where('building_id', id)

    const complaints = await Complaint.query().where('building_id', id)

    return {
      zones: zones.length,
      complaints: complaints.length,
      openComplaints: complaints.filter((c) => c.status !== 'resolved').length,
    }
  }
}
