import type { HttpContext } from '@adonisjs/core/http'
import JobCardService from '#services/job_card_service'
import { inject } from '@adonisjs/core'

@inject()
export default class JobCardsController {
  constructor(private jobService: JobCardService) {}

  async index({ auth }: HttpContext) {
    return this.jobService.getSupervisorJobs(auth.user!.id)
  }

  async show({ params }: HttpContext) {
    return this.jobService.getJobDetails(params.id)
  }

  async start({ params }: HttpContext) {
    return this.jobService.startJob(params.id)
  }

  async complete({ params, request }: HttpContext) {
    const payload = request.only(['remark', 'proofPhotoUrl'])

    return this.jobService.completeJob(params.id, payload)
  }

  async zoneHistory({ params }: HttpContext) {
    return this.jobService.getZoneHistory(params.zoneId)
  }
}
