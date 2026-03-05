import type { HttpContext } from '@adonisjs/core/http'
import DashboardService from '#services/dashboard_service'
import { inject } from '@adonisjs/core'

@inject()
export default class SupervisorDashboardController {
  constructor(private dashboardService: DashboardService) {}

  async index({ auth }: HttpContext) {
    return this.dashboardService.getSupervisorDashboard(auth.user!.id)
  }
}
