import Complaint from '#models/complaint'
import JobCard from '#models/job_card'
import Building from '#models/building'
import db from '@adonisjs/lucid/services/db'

interface HeatmapMapPoint {
  zoneId: number
  zoneName: string
  buildingName: string
  floorName: string
  floorNumber: number
  complaintCount: number
  intensity: number
  lat: number
  lng: number
}

interface HeatmapZoneSummary {
  zoneId: number
  zoneName: string
  complaintCount: number
  intensity: number
  lat: number
  lng: number
}

interface HeatmapFloorSummary {
  floorId: number
  floorName: string
  floorNumber: number
  totalComplaints: number
  intensity: number
  zones: HeatmapZoneSummary[]
}

interface HeatmapBuildingSummary {
  buildingId: number
  buildingName: string
  totalComplaints: number
  intensity: number
  floors: HeatmapFloorSummary[]
}

interface ComplaintHeatmapPayload {
  totalHistoricalComplaints: number
  maxZoneComplaints: number
  buildings: HeatmapBuildingSummary[]
  mapCenter: {
    lat: number
    lng: number
  }
  mapZoom: number
  mapPoints: HeatmapMapPoint[]
}

export default class DashboardService {
  private static readonly SCET_CENTER = {
    lat: 21.1820896979923,
    lng: 72.80859569161564,
  }

  private static readonly DEFAULT_ZOOM = 19

  private hashString(value: string): number {
    let hash = 0

    for (let index = 0; index < value.length; index++) {
      hash = (hash << 5) - hash + value.charCodeAt(index)
      hash |= 0
    }

    return Math.abs(hash)
  }

  private deterministicOffset(key: string, maxOffset: number): number {
    const hash = this.hashString(key)
    const normalized = (hash % 10000) / 10000

    return normalized * (maxOffset * 2) - maxOffset
  }

  private getBuildingAnchor(buildingName: string): { lat: number; lng: number } {
    return {
      lat:
        DashboardService.SCET_CENTER.lat +
        this.deterministicOffset(`building-lat-${buildingName}`, 0.00075),
      lng:
        DashboardService.SCET_CENTER.lng +
        this.deterministicOffset(`building-lng-${buildingName}`, 0.00075),
    }
  }

  private getZoneCoordinates(
    buildingName: string,
    floorNumber: number,
    zoneName: string
  ): { lat: number; lng: number } {
    const anchor = this.getBuildingAnchor(buildingName)

    return {
      lat: anchor.lat + this.deterministicOffset(`zone-lat-${zoneName}-${floorNumber}`, 0.00018),
      lng: anchor.lng + this.deterministicOffset(`zone-lng-${zoneName}-${floorNumber}`, 0.00018),
    }
  }

  private roundIntensity(value: number): number {
    return Math.round(value * 1000) / 1000
  }

  private async buildComplaintHeatmap(supervisorId?: number): Promise<ComplaintHeatmapPayload> {
    const complaintCountRows = await db
      .from('complaints')
      .select('zone_id')
      .count('* as total')
      .if(Boolean(supervisorId), (query) => {
        const currentSupervisorId = Number(supervisorId)

        query.where((supervisorQuery) => {
          supervisorQuery
            .where('assigned_supervisor_id', currentSupervisorId)
            .orWhereIn(
              'id',
              db
                .from('job_cards')
                .select('complaint_id')
                .where('supervisor_id', currentSupervisorId)
                .whereNotNull('complaint_id')
            )
        })
      })
      .groupBy('zone_id')

    const complaintCountByZone = new Map<number, number>(
      complaintCountRows.map((row) => [Number(row.zone_id), Number(row.total)])
    )

    const zoneRows = await db
      .from('zones')
      .select('zones.id as zone_id', 'zones.name as zone_name')
      .select('floors.id as floor_id', 'floors.name as floor_name', 'floors.floor_number as floor_number')
      .select('buildings.id as building_id', 'buildings.name as building_name')
      .innerJoin('floors', 'floors.id', 'zones.floor_id')
      .innerJoin('buildings', 'buildings.id', 'zones.building_id')

    const maxZoneComplaints = zoneRows.reduce((maxCount, zoneRow) => {
      const count = complaintCountByZone.get(Number(zoneRow.zone_id)) ?? 0

      return Math.max(maxCount, count)
    }, 0)

    const buildingsMap = new Map<
      number,
      {
        buildingId: number
        buildingName: string
        floorsMap: Map<
          number,
          {
            floorId: number
            floorName: string
            floorNumber: number
            zones: HeatmapZoneSummary[]
          }
        >
      }
    >()

    const mapPoints: HeatmapMapPoint[] = []

    for (const zoneRow of zoneRows) {
      const buildingId = Number(zoneRow.building_id)
      const floorId = Number(zoneRow.floor_id)
      const zoneId = Number(zoneRow.zone_id)
      const buildingName = String(zoneRow.building_name)
      const floorName = String(zoneRow.floor_name)
      const floorNumber = Number(zoneRow.floor_number)
      const zoneName = String(zoneRow.zone_name)
      const complaintCount = complaintCountByZone.get(zoneId) ?? 0
      const intensity =
        maxZoneComplaints > 0 ? this.roundIntensity(complaintCount / maxZoneComplaints) : 0
      const coordinates = this.getZoneCoordinates(buildingName, floorNumber, zoneName)

      if (!buildingsMap.has(buildingId)) {
        buildingsMap.set(buildingId, {
          buildingId,
          buildingName,
          floorsMap: new Map(),
        })
      }

      const buildingEntry = buildingsMap.get(buildingId)!

      if (!buildingEntry.floorsMap.has(floorId)) {
        buildingEntry.floorsMap.set(floorId, {
          floorId,
          floorName,
          floorNumber,
          zones: [],
        })
      }

      const floorEntry = buildingEntry.floorsMap.get(floorId)!
      floorEntry.zones.push({
        zoneId,
        zoneName,
        complaintCount,
        intensity,
        lat: coordinates.lat,
        lng: coordinates.lng,
      })

      mapPoints.push({
        zoneId,
        zoneName,
        buildingName,
        floorName,
        floorNumber,
        complaintCount,
        intensity,
        lat: coordinates.lat,
        lng: coordinates.lng,
      })
    }

    const buildings: HeatmapBuildingSummary[] = Array.from(buildingsMap.values())
      .map((buildingEntry) => {
        const floors: HeatmapFloorSummary[] = Array.from(buildingEntry.floorsMap.values())
          .map((floorEntry) => {
            const totalComplaints = floorEntry.zones.reduce(
              (sum, zoneEntry) => sum + zoneEntry.complaintCount,
              0
            )

            return {
              floorId: floorEntry.floorId,
              floorName: floorEntry.floorName,
              floorNumber: floorEntry.floorNumber,
              totalComplaints,
              intensity:
                maxZoneComplaints > 0
                  ? this.roundIntensity(totalComplaints / maxZoneComplaints)
                  : 0,
              zones: floorEntry.zones.sort((a, b) => b.complaintCount - a.complaintCount),
            }
          })
          .sort((a, b) => a.floorNumber - b.floorNumber)

        const totalComplaints = floors.reduce((sum, floorEntry) => sum + floorEntry.totalComplaints, 0)

        return {
          buildingId: buildingEntry.buildingId,
          buildingName: buildingEntry.buildingName,
          totalComplaints,
          intensity:
            maxZoneComplaints > 0
              ? this.roundIntensity(totalComplaints / maxZoneComplaints)
              : 0,
          floors,
        }
      })
      .sort((a, b) => b.totalComplaints - a.totalComplaints)

    const totalHistoricalComplaints = mapPoints.reduce((sum, point) => sum + point.complaintCount, 0)

    return {
      totalHistoricalComplaints,
      maxZoneComplaints,
      buildings,
      mapCenter: {
        lat: DashboardService.SCET_CENTER.lat,
        lng: DashboardService.SCET_CENTER.lng,
      },
      mapZoom: DashboardService.DEFAULT_ZOOM,
      mapPoints: mapPoints.sort((a, b) => b.complaintCount - a.complaintCount),
    }
  }

  /**
   * Admin dashboard
   */
  async adminDashboard() {
    const totalComplaints = await Complaint.query().count('* as total')
    const openComplaints = await Complaint.query().where('status', 'open').count('* as total')

    const resolvedComplaints = await Complaint.query()
      .where('status', 'resolved')
      .count('* as total')

    const activeJobs = await JobCard.query().where('status', 'in_progress').count('* as total')

    const buildings = await Building.query().count('* as total')

    const recentComplaints = await Complaint.query()
      .preload('zone')
      .preload('category')
      .orderBy('created_at', 'desc')
      .limit(10)

    const complaintHeatmap = await this.buildComplaintHeatmap()

    return {
      stats: {
        totalComplaints: Number(totalComplaints[0].$extras.total),
        openComplaints: Number(openComplaints[0].$extras.total),
        resolvedComplaints: Number(resolvedComplaints[0].$extras.total),
        activeJobs: Number(activeJobs[0].$extras.total),
        buildings: Number(buildings[0].$extras.total),
      },
      recentComplaints: recentComplaints.map((c) => c.serialize()),
      complaintHeatmap,
    }
  }

  /**
   * Supervisor dashboard
   */
  async supervisorDashboard(supervisorId: number) {
    const jobs = await JobCard.query()
      .where('supervisor_id', supervisorId)
      .preload('zone')
      .preload('complaint')

    const pendingJobs = jobs.filter((j) => j.status === 'pending').length
    const activeJobs = jobs.filter((j) => j.status === 'in_progress').length
    const completedJobs = jobs.filter((j) => j.status === 'completed').length

    const recentJobs = jobs
      .sort((a, b) => b.createdAt.toMillis() - a.createdAt.toMillis())
      .slice(0, 10)

    const complaintHeatmap = await this.buildComplaintHeatmap(supervisorId)

    return {
      stats: {
        totalJobs: jobs.length,
        pendingJobs,
        activeJobs,
        completedJobs,
      },
      recentJobs: recentJobs.map((j) => j.serialize()),
      complaintHeatmap,
    }
  }
}
