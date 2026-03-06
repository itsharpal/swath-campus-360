import type { HttpContext } from '@adonisjs/core/http'
import { inject } from '@adonisjs/core'
import AnalyticsService from '#services/analytic_service'

@inject()
export default class AnalyticsController {
  constructor(private analyticsService: AnalyticsService) {}

  /**
   * GET /analytics/buildings
   */
  async buildings({ inertia }: HttpContext) {
    const buildings = await this.analyticsService.buildingPerformance()

    return inertia.render('analytics/buildings' as any, {
      buildings,
    })
  }

  /**
   * GET /analytics/supervisors
   */
  async supervisors({ inertia }: HttpContext) {
    const supervisors = await this.analyticsService.supervisorRanking()

    return inertia.render('analytics/supervisors' as any, {
      supervisors,
    })
  }

  /**
   * GET /analytics/categories
   */
  async categories({ inertia }: HttpContext) {
    const categories = await this.analyticsService.categoryAnalytics()

    return inertia.render('analytics/categories' as any, {
      categories,
    })
  }

  /**
   * GET /analytics/heatmap
   */
  async heatmap({ inertia }: HttpContext) {
    const zones = await this.analyticsService.heatmap()

    return inertia.render('analytics/heatmap' as any, {
      zones,
    })
  }

  /**
   * GET /analytics/trends
   */
  async trends({ inertia }: HttpContext) {
    const trends = await this.analyticsService.complaintTrends()

    return inertia.render('analytics/trends' as any, {
      trends,
    })
  }

  /**
   * GET /analytics/peak-hours
   */
  async peakHours({ inertia }: HttpContext) {
    const hours = await this.analyticsService.peakHours()

    return inertia.render('analytics/peak_hours' as any, {
      hours,
    })
  }
}
