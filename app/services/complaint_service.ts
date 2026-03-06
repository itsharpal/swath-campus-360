import Complaint from '#models/complaint'
import JobCard from '#models/job_card'
import Zone from '#models/zone'
import { DateTime } from 'luxon'

export default class ComplaintService {
  /**
   * List complaints
   */
  async list(filters: any = {}) {
    const query = Complaint.query()
      .preload('zone')
      .preload('floor')
      .preload('building')
      .preload('category')
      .preload('reporter')

    if (filters.userId) {
      query.where('reported_by', filters.userId)
    }

    return query.orderBy('created_at', 'desc')
  }

  /**
   * Find complaint
   */
  async findById(id: number) {
    return Complaint.query()
      .where('id', id)
      .preload('zone')
      .preload('floor')
      .preload('building')
      .preload('category')
      .preload('jobCards')
      .firstOrFail()
  }

  /**
   * Track complaint
   */
  async trackByCode(code: string) {
    return Complaint.query()
      .where('complaint_code', code)
      .preload('zone')
      .preload('category')
      .firstOrFail()
  }

  /**
   * Create complaint
   */
  async create(data: any, userId: number | null) {
    const zone = await Zone.findOrFail(data.zoneId)

    const complaint = await Complaint.create({
      zoneId: zone.id,
      floorId: zone.floorId,
      buildingId: zone.buildingId,
      categoryId: data.categoryId,
      description: data.description,
      photoUrl: data.photoUrl,
      isAnonymous: data.isAnonymous,
      reportedBy: data.isAnonymous ? null : userId,
      priority: 'medium',
      status: 'open',
    })

    return complaint
  }

  /**
   * Mark in progress
   */
  async markInProgress(id: number, supervisorId: number) {
    const complaint = await Complaint.findOrFail(id)

    complaint.status = 'in_progress'
    complaint.assignedSupervisorId = supervisorId
    complaint.assignedAt = complaint.assignedAt ?? DateTime.now()
    complaint.inProgressAt = DateTime.now()

    await complaint.save()

    const existingActiveJob = await JobCard.query()
      .where('complaint_id', complaint.id)
      .whereNot('status', 'completed')
      .first()

    if (!existingActiveJob) {
      await JobCard.create({
        complaintId: complaint.id,
        zoneId: complaint.zoneId,
        supervisorId,
        type: 'complaint_driven',
        status: 'in_progress',
      })
    }

    return complaint
  }

  /**
   * Resolve complaint
   */
  async resolve(id: number, data: any) {
    const complaint = await Complaint.findOrFail(id)

    complaint.status = 'resolved'
    complaint.resolvedAt = DateTime.now()
    complaint.resolutionRemark = data.resolutionRemark
    complaint.resolutionPhotoUrl = data.resolutionPhotoUrl

    await complaint.save()

    return complaint
  }
}
