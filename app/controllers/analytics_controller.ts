import type { HttpContext } from '@adonisjs/core/http'
import AnalyticsService from '#services/analytics_service'
import { inject } from '@adonisjs/core'

@inject()
export default class AnalyticsController {
  constructor(private analyticsService: AnalyticsService) {}

  async buildings() {
    return this.analyticsService.buildingPerformance()
  }

  async supervisors() {
    return this.analyticsService.supervisorRanking()
  }

  async categories() {
    return this.analyticsService.complaintCategories()
  }

  async heatmap() {
    return this.analyticsService.zoneHeatmap()
  }

  async trends() {
    return this.analyticsService.complaintTrends()
  }

  async peakHours() {
    return this.analyticsService.peakHours()
  }

  async contractorMetrics({ params }: HttpContext) {
    return this.analyticsService.contractorMetrics(params.id)
  }
}
