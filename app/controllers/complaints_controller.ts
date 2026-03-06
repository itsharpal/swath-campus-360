import type { HttpContext } from '@adonisjs/core/http'
import { inject } from '@adonisjs/core'
import ComplaintService from '#services/complaint_service'
import Zone from '#models/zone'
import ComplaintCategory from '#models/complaint_category'

import {
  createComplaintValidator,
  updateStatusValidator,
  resolveComplaintValidator,
} from '#validators/complaint'

@inject()
export default class ComplaintsController {
  constructor(private complaintService: ComplaintService) {}

  /**
   * GET /complaints/create
   */
  async create({ inertia }: HttpContext) {
    const zoneRecords = await Zone.query().orderBy('name', 'asc')
    const categoryRecords = await ComplaintCategory.query().orderBy('name', 'asc')

    const zones = zoneRecords.map((zone) => zone.serialize())
    const categories = categoryRecords.map((category) => category.serialize())

    return inertia.render(
      'complaints/create' as any,
      {
        zones,
        categories,
      } as any
    )
  }

  /**
   * GET /complaints
   */
  async index({ inertia }: HttpContext) {
    const complaintRecords = await this.complaintService.list()

    const complaints = complaintRecords.map((complaint) => complaint.serialize())

    return inertia.render(
      'complaints/index' as any,
      {
        complaints,
      } as any
    )
  }

  /**
   * GET /complaints/:id
   */
  async show({ params, inertia }: HttpContext) {
    const complaintRecord = await this.complaintService.findById(Number(params.id))
    const complaint = complaintRecord.serialize()

    return inertia.render(
      'complaints/show' as any,
      {
        complaint,
      } as any
    )
  }

  /**
   * GET /complaints/:id/resolve
   */
  async showResolve({ params, inertia }: HttpContext) {
    const complaintRecord = await this.complaintService.findById(Number(params.id))
    const complaint = complaintRecord.serialize()

    return inertia.render(
      'complaints/resolve' as any,
      {
        complaint,
      } as any
    )
  }

  /**
   * POST /complaints
   */
  async store({ request, auth, response, session }: HttpContext) {
    const payload = await request.validateUsing(createComplaintValidator)

    await this.complaintService.create(payload, auth.user?.id ?? null)

    session.flash('success', 'Complaint submitted successfully')

    return response.redirect().back()
  }

  /**
   * GET /complaints/track/:code
   */
  async track({ params, inertia }: HttpContext) {
    const complaintRecord = await this.complaintService.trackByCode(params.code)
    const complaint = complaintRecord.serialize()

    return inertia.render(
      'complaints/track' as any,
      {
        complaint,
      } as any
    )
  }

  /**
   * GET /complaints/my
   */
  async my({ auth, inertia }: HttpContext) {
    const complaintRecords = await this.complaintService.list({
      userId: auth.user!.id,
    })

    const complaints = complaintRecords.map((complaint) => complaint.serialize())

    return inertia.render(
      'complaints/my' as any,
      {
        complaints,
      } as any
    )
  }

  /**
   * PUT /complaints/:id/status
   */
  async markInProgress({ params, request, auth, response }: HttpContext) {
    await request.validateUsing(updateStatusValidator)

    await this.complaintService.markInProgress(Number(params.id), auth.user!.id)

    return response.redirect().back()
  }

  /**
   * PUT /complaints/:id/resolve
   */
  async resolve({ params, request, response }: HttpContext) {
    const payload = await request.validateUsing(resolveComplaintValidator)

    await this.complaintService.resolve(Number(params.id), payload)

    return response.redirect().back()
  }
}
