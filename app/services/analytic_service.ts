import Building from '#models/building'
import User from '#models/user'
import db from '@adonisjs/lucid/services/db'

export default class AnalyticsService {
  /**
   * Building performance
   */
  async buildingPerformance() {
    const results = await db
      .from('complaints')
      .select('building_id')
      .count('* as total')
      .groupBy('building_id')

    const buildings = await Building.all()
    const totalsByBuildingId = new Map(
      results.map((row) => [Number(row.building_id), Number(row.total)])
    )

    return buildings.map((b) => {
      return {
        id: b.id,
        name: b.name,
        totalComplaints: totalsByBuildingId.get(b.id) ?? 0,
      }
    })
  }

  /**
   * Supervisor ranking
   */
  async supervisorRanking() {
    const results = await db
      .from('job_cards')
      .select('supervisor_id')
      .count('* as completed')
      .where('status', 'completed')
      .groupBy('supervisor_id')

    const supervisors = await User.query().whereHas('role', (roleQuery) => {
      roleQuery.where('name', 'supervisor')
    })

    return supervisors.map((s) => {
      const stats = results.find((r) => r.supervisor_id === s.id)

      return {
        id: s.id,
        name: s.name,
        completedJobs: Number(stats?.completed ?? 0),
      }
    })
  }

  /**
   * Complaint category analytics
   */
  async categoryAnalytics() {
    const results = await db
      .from('complaints')
      .select('category_id')
      .count('* as total')
      .groupBy('category_id')

    return results.map((r) => ({
      categoryId: r.category_id,
      total: Number(r.total),
    }))
  }

  /**
   * Zone heatmap
   */
  async heatmap() {
    const results = await db
      .from('zones')
      .select('zones.id', 'zones.name')
      .select(db.raw('COUNT(complaints.id) as complaints'))
      .leftJoin('complaints', 'zones.id', 'complaints.zone_id')
      .groupBy('zones.id', 'zones.name')

    return results.map((z) => ({
      id: z.id,
      name: z.name,
      complaints: Number(z.complaints),
    }))
  }

  /**
   * Complaint trends (daily)
   */
  async complaintTrends() {
    const results = await db
      .from('complaints')
      .select(db.raw('DATE(created_at) as date'))
      .count('* as total')
      .groupByRaw('DATE(created_at)')
      .orderBy('date')

    return results.map((r) => ({
      date: r.date,
      total: Number(r.total),
    }))
  }

  /**
   * Peak complaint hours
   */
  async peakHours() {
    const results = await db
      .from('complaints')
      .select(db.raw('HOUR(created_at) as hour'))
      .count('* as total')
      .groupByRaw('HOUR(created_at)')
      .orderBy('hour')

    return results.map((r) => ({
      hour: Number(r.hour),
      total: Number(r.total),
    }))
  }
}
