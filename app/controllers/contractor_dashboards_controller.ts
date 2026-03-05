import type { HttpContext } from '@adonisjs/core/http'
import DashboardService from '#services/dashboard_service'
import { inject } from '@adonisjs/core'

@inject()
export default class ContractorDashboardController {
  constructor(private dashboardService: DashboardService) {}

  async index({ auth }: HttpContext) {
    return this.dashboardService.getContractorDashboard(auth.user!.id)
  }
}
