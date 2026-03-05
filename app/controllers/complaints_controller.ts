import type { HttpContext } from '@adonisjs/core/http'
import ComplaintService from '#services/complaint_service'
import { inject } from '@adonisjs/core'

@inject()
export default class ComplaintsController {
  constructor(private complaintService: ComplaintService) {}

  async index({ request }: HttpContext) {
    const page = request.input('page', 1)

    return this.complaintService.listComplaints(page)
  }

  async store({ request, auth }: HttpContext) {
    const payload = request.only([
      'zoneId',
      'floorId',
      'buildingId',
      'categoryId',
      'description',
      'priority',
    ])

    return this.complaintService.createComplaint(payload, auth.user)
  }

  async show({ params }: HttpContext) {
    return this.complaintService.getComplaint(params.id)
  }

  async track({ params }: HttpContext) {
    return this.complaintService.trackComplaint(params.code)
  }

  async myComplaints({ auth }: HttpContext) {
    return this.complaintService.getReporterComplaints(auth.user!.id)
  }

  async markInProgress({ params }: HttpContext) {
    return this.complaintService.markInProgress(params.id)
  }

  async resolve({ params, request }: HttpContext) {
    const remark = request.input('remark')

    return this.complaintService.resolveComplaint(params.id, remark)
  }
}
