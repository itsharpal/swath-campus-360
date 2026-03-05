// import type { HttpContext } from '@adonisjs/core/http'
import DashboardService from '#services/dashboard_service'
import { inject } from '@adonisjs/core'

@inject()
export default class AdminDashboardController {
  constructor(private dashboardService: DashboardService) {}

  async index() {
    return this.dashboardService.getAdminDashboard()
  }
}
