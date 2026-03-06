import type { HttpContext } from '@adonisjs/core/http'
import { inject } from '@adonisjs/core'
import JobCardService from '#services/job_card_service'
import { startJobValidator, completeJobValidator } from '#validators/job_card'

@inject()
export default class JobCardsController {
  constructor(private jobCardService: JobCardService) {}

  /**
   * GET /job-cards
   * Supervisor job queue
   */
  async index({ auth, inertia }: HttpContext) {
    const supervisorId = Number(auth.user!.id)

    const jobs = await this.jobCardService.listSupervisorJobs(supervisorId)

    return inertia.render('job_cards/index' as any, {
      jobs,
    })
  }

  /**
   * GET /job-cards/:id
   * Job details
   */
  async show({ params, inertia }: HttpContext) {
    const id = Number(params.id)

    const job = await this.jobCardService.findById(id)

    return inertia.render('job_cards/show' as any, {
      job,
    })
  }

  /**
   * PUT /job-cards/:id/start
   */
  async start({ params, request, auth, response, session }: HttpContext) {
    const id = Number(params.id)

    await request.validateUsing(startJobValidator)

    try {
      await this.jobCardService.startJob(id, Number(auth.user!.id))

      session.flash('success', 'Job started successfully')
    } catch (error) {
      session.flash('error', error.message)
    }

    return response.redirect().back()
  }

  /**
   * PUT /job-cards/:id/complete
   */
  async complete({ params, request, auth, response, session }: HttpContext) {
    const id = Number(params.id)

    const payload = await request.validateUsing(completeJobValidator)

    try {
      await this.jobCardService.completeJob(id, Number(auth.user!.id), payload)

      session.flash('success', 'Job completed successfully')
    } catch (error) {
      session.flash('error', error.message)
    }

    return response.redirect().back()
  }

  /**
   * GET /job-cards/zone/:zoneId
   * Zone job history
   */
  async zoneHistory({ params, inertia }: HttpContext) {
    const zoneId = Number(params.zoneId)

    const jobs = await this.jobCardService.zoneHistory(zoneId)

    return inertia.render('job_cards/zone_history' as any, {
      jobs,
    })
  }
}
