import JobCard from '#models/job_card'

export default class JobCardService {
  /**
   * Supervisor job queue
   */
  async listSupervisorJobs(supervisorId: number) {
    const jobs = await JobCard.query()
      .where('supervisor_id', supervisorId)
      .preload('zone')
      .preload('complaint')
      .orderBy('created_at', 'desc')

    return jobs.map((job) => job.serialize())
  }

  /**
   * Job details
   */
  async findById(id: number) {
    const job = await JobCard.query()
      .where('id', id)
      .preload('zone')
      .preload('complaint')
      .preload('supervisor')
      .firstOrFail()

    return job.serialize()
  }

  /**
   * Start job
   */
  async startJob(id: number, supervisorId: number) {
    const job = await JobCard.findOrFail(id)

    if (job.supervisorId !== supervisorId) {
      throw new Error('Unauthorized job access')
    }

    if (job.status !== 'pending') {
      throw new Error('Job already started or completed')
    }

    job.status = 'in_progress'

    await job.save()

    return job.serialize()
  }

  /**
   * Complete job
   */
  async completeJob(id: number, supervisorId: number, data: any) {
    const job = await JobCard.findOrFail(id)

    if (job.supervisorId !== supervisorId) {
      throw new Error('Unauthorized job access')
    }

    if (job.status !== 'in_progress') {
      throw new Error('Job must be in progress before completion')
    }

    job.status = 'completed'
    job.proofPhotoUrl = data.proofPhotoUrl
    job.remark = data.remark

    await job.save()

    return job.serialize()
  }

  /**
   * Job history by zone
   */
  async zoneHistory(zoneId: number) {
    const jobs = await JobCard.query()
      .where('zone_id', zoneId)
      .preload('supervisor')
      .preload('complaint')
      .orderBy('created_at', 'desc')

    return jobs.map((job) => job.serialize())
  }
}
