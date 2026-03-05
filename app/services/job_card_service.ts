import JobCard from '#models/job_card'
import Complaint from '#models/complaint'
import { DateTime } from 'luxon'

export default class JobCardService {
  async getSupervisorJobs(supervisorId: number) {
    return JobCard.query()
      .where('supervisor_id', supervisorId)
      .preload('zone')
      .preload('complaint')
      .orderBy('created_at', 'desc')
  }

  async getJobDetails(id: number) {
    return JobCard.query().where('id', id).preload('zone').preload('complaint').firstOrFail()
  }

  async startJob(id: number) {
    const job = await JobCard.findOrFail(id)

    job.status = 'in_progress'

    await job.save()

    if (job.complaintId) {
      const complaint = await Complaint.find(job.complaintId)

      if (complaint) {
        complaint.status = 'in_progress'
        complaint.inProgressAt = DateTime.now()
        await complaint.save()
      }
    }

    return job
  }

  async completeJob(id: number, data: any) {
    const job = await JobCard.findOrFail(id)

    job.status = 'completed'
    job.completedAt = DateTime.now()

    job.remark = data.remark
    job.proofPhotoUrl = data.proofPhotoUrl

    await job.save()

    if (job.complaintId) {
      const complaint = await Complaint.find(job.complaintId)

      if (complaint) {
        complaint.status = 'resolved'
        complaint.resolvedAt = DateTime.now()
        await complaint.save()
      }
    }

    return job
  }

  async getZoneHistory(zoneId: number) {
    return JobCard.query()
      .where('zone_id', zoneId)
      .preload('complaint')
      .orderBy('created_at', 'desc')
  }
}
