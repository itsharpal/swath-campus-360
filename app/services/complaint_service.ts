import Complaint from '#models/complaint'
// import JobCard from '#models/job_card'
import { DateTime } from 'luxon'

export default class ComplaintService {
  async listComplaints(page: number) {
    return Complaint.query()
      .preload('zone')
      .preload('building')
      .preload('category')
      .paginate(page, 10)
  }

  async createComplaint(data: any, user: any) {
    const complaint = await Complaint.create({
      ...data,
      reportedBy: user?.id,
    })

    return complaint
  }

  async getComplaint(id: number) {
    return Complaint.query()
      .where('id', id)
      .preload('zone')
      .preload('building')
      .preload('category')
      .firstOrFail()
  }

  async trackComplaint(code: string) {
    return Complaint.query()
      .where('complaint_code', code)
      .preload('zone')
      .preload('building')
      .firstOrFail()
  }

  async getReporterComplaints(userId: number) {
    return Complaint.query().where('reported_by', userId).orderBy('created_at', 'desc')
  }

  async markInProgress(id: number) {
    const complaint = await Complaint.findOrFail(id)

    complaint.status = 'in_progress'
    complaint.inProgressAt = DateTime.now()

    await complaint.save()

    return complaint
  }

  async resolveComplaint(id: number, remark: string) {
    const complaint = await Complaint.findOrFail(id)

    complaint.status = 'resolved'
    complaint.resolutionRemark = remark
    complaint.resolvedAt = DateTime.now()

    await complaint.save()

    return complaint
  }
}
