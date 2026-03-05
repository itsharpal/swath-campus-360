import type { HttpContext } from '@adonisjs/core/http'
import ReportService from '#services/report_service'
import { inject } from '@adonisjs/core'

@inject()
export default class ReportsController {
  constructor(private reportService: ReportService) {}

  async weekly({ response }: HttpContext) {
    const data = await this.reportService.generateWeeklyReport()

    return response.ok({
      report: data,
    })
  }

  async buildingReport({ params }: HttpContext) {
    return this.reportService.buildingReport(params.id)
  }

  async contractorReport({ params }: HttpContext) {
    return this.reportService.contractorReport(params.id)
  }
}
