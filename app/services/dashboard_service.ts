import Complaint from '#models/complaint'
import JobCard from '#models/job_card'
import Building from '#models/building'

export default class DashboardService {
  /**
   * Admin dashboard
   */
  async adminDashboard() {
    const totalComplaints = await Complaint.query().count('* as total')
    const openComplaints = await Complaint.query().where('status', 'open').count('* as total')

    const resolvedComplaints = await Complaint.query()
      .where('status', 'resolved')
      .count('* as total')

    const activeJobs = await JobCard.query().where('status', 'in_progress').count('* as total')

    const buildings = await Building.query().count('* as total')

    const recentComplaints = await Complaint.query()
      .preload('zone')
      .preload('category')
      .orderBy('created_at', 'desc')
      .limit(10)

    return {
      stats: {
        totalComplaints: Number(totalComplaints[0].$extras.total),
        openComplaints: Number(openComplaints[0].$extras.total),
        resolvedComplaints: Number(resolvedComplaints[0].$extras.total),
        activeJobs: Number(activeJobs[0].$extras.total),
        buildings: Number(buildings[0].$extras.total),
      },
      recentComplaints: recentComplaints.map((c) => c.serialize()),
    }
  }

  /**
   * Supervisor dashboard
   */
  async supervisorDashboard(supervisorId: number) {
    const jobs = await JobCard.query()
      .where('supervisor_id', supervisorId)
      .preload('zone')
      .preload('complaint')

    const pendingJobs = jobs.filter((j) => j.status === 'pending').length
    const activeJobs = jobs.filter((j) => j.status === 'in_progress').length
    const completedJobs = jobs.filter((j) => j.status === 'completed').length

    const recentJobs = jobs
      .sort((a, b) => b.createdAt.toMillis() - a.createdAt.toMillis())
      .slice(0, 10)

    return {
      stats: {
        totalJobs: jobs.length,
        pendingJobs,
        activeJobs,
        completedJobs,
      },
      recentJobs: recentJobs.map((j) => j.serialize()),
    }
  }
}
