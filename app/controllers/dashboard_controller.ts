import type { HttpContext } from '@adonisjs/core/http'
import { inject } from '@adonisjs/core'

import DashboardService from '#services/dashboard_service'

@inject()
export default class DashboardController {
  constructor(private dashboardService: DashboardService) {}

  /**
   * GET /dashboard/admin
   */
  async admin({ inertia }: HttpContext) {
    const dashboard = await this.dashboardService.adminDashboard()

    return inertia.render('dashboard/admin' as any, {
      stats: dashboard.stats,
      recentComplaints: dashboard.recentComplaints,
    })
  }

  /**
   * GET /dashboard/supervisor
   */
  async supervisor({ inertia, auth }: HttpContext) {
    const supervisorId = Number(auth.user!.id)

    const dashboard = await this.dashboardService.supervisorDashboard(supervisorId)

    return inertia.render('dashboard/supervisor' as any, {
      stats: dashboard.stats,
      recentJobs: dashboard.recentJobs,
    })
  }
}
