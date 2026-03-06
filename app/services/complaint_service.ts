import Complaint from '#models/complaint'
import ComplaintVote from '#models/complaint_vote'
import JobCard from '#models/job_card'
import User from '#models/user'
import Zone from '#models/zone'
import db from '@adonisjs/lucid/services/db'
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
      .preload('reporter', (reporterQuery) => {
        reporterQuery.preload('role')
      })

    if (filters.userId) {
      query.where('reported_by', filters.userId)
    }

    const complaints = await query.orderBy('created_at', 'desc')

    if (complaints.length === 0) {
      return complaints
    }

    const complaintIds = complaints.map((complaint) => complaint.id)

    const voteRows = await db
      .from('complaint_votes')
      .select('complaint_id')
      .count('* as total')
      .whereIn('complaint_id', complaintIds)
      .groupBy('complaint_id')

    const votesByComplaintId = new Map<number, number>(
      voteRows.map((row) => [Number(row.complaint_id), Number(row.total)])
    )

    let votedComplaintIds = new Set<number>()
    if (filters.viewerUserId) {
      const votedRows = await db
        .from('complaint_votes')
        .select('complaint_id')
        .where('user_id', Number(filters.viewerUserId))
        .whereIn('complaint_id', complaintIds)

      votedComplaintIds = new Set(votedRows.map((row) => Number(row.complaint_id)))
    }

    for (const complaint of complaints) {
      const upvoteCount = votesByComplaintId.get(complaint.id) ?? 0
      const reporterRoleName = complaint.reporter?.role?.name?.toLowerCase()
      const isTeacherPriority = reporterRoleName === 'teacher'

      complaint.$extras.upvoteCount = upvoteCount
      complaint.$extras.isTeacherPriority = isTeacherPriority
      complaint.$extras.hasUpvoted = votedComplaintIds.has(complaint.id)
    }

    if (filters.rankPublic) {
      complaints.sort((a, b) => {
        const teacherA = Boolean(a.$extras.isTeacherPriority)
        const teacherB = Boolean(b.$extras.isTeacherPriority)
        if (teacherA !== teacherB) {
          return teacherB ? 1 : -1
        }

        const votesA = Number(a.$extras.upvoteCount ?? 0)
        const votesB = Number(b.$extras.upvoteCount ?? 0)
        if (votesA !== votesB) {
          return votesB - votesA
        }

        return b.createdAt.toMillis() - a.createdAt.toMillis()
      })
    }

    return complaints
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

  async upvote(complaintId: number, userId: number) {
    await Complaint.findOrFail(complaintId)

    const existingVote = await ComplaintVote.query()
      .where('complaint_id', complaintId)
      .where('user_id', userId)
      .first()

    if (!existingVote) {
      await ComplaintVote.create({
        complaintId,
        userId,
      })
    }

    const voteCountRow = await db
      .from('complaint_votes')
      .where('complaint_id', complaintId)
      .count('* as total')
      .first()

    return {
      upvoteCount: Number(voteCountRow?.total ?? 0),
      hasUpvoted: true,
    }
  }

  /**
   * Create complaint
   */
  async create(data: any, userId: number | null) {
    const zone = await Zone.findOrFail(data.zoneId)
    let complaintPriority = 'medium'

    if (userId && !data.isAnonymous) {
      const reporter = await User.query()
        .where('id', userId)
        .preload('role')
        .first()

      if (reporter?.role?.name?.toLowerCase() === 'teacher') {
        complaintPriority = 'high'
      }
    }

    const complaint = await Complaint.create({
      zoneId: zone.id,
      floorId: zone.floorId,
      buildingId: zone.buildingId,
      categoryId: data.categoryId,
      description: data.description,
      photoUrl: data.photoUrl,
      isAnonymous: data.isAnonymous,
      reportedBy: data.isAnonymous ? null : userId,
      priority: complaintPriority,
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
