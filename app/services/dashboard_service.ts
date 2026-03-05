import Complaint from '#models/complaint'
import JobCard from '#models/job_card'
import Building from '#models/building'

export default class DashboardService {
  async getAdminDashboard() {
    const buildings = await Building.query().count('* as total')

    const complaints = await Complaint.query().count('* as total')

    const openComplaints = await Complaint.query().where('status', 'open').count('* as total')

    const jobs = await JobCard.query().where('status', 'pending').count('* as total')

    return {
      buildings: buildings[0].$extras.total,
      complaints: complaints[0].$extras.total,
      openComplaints: openComplaints[0].$extras.total,
      pendingJobs: jobs[0].$extras.total,
    }
  }

  async getSupervisorDashboard(userId: number) {
    const complaints = await Complaint.query().where('assigned_supervisor_id', userId)

    const jobs = await JobCard.query().where('supervisor_id', userId)

    return {
      complaints,
      jobs,
    }
  }

  async getContractorDashboard(userId: number) {
    const jobs = await JobCard.query()
      .where('supervisor_id', userId)
      .whereIn('status', ['pending', 'in_progress'])

    return {
      jobs,
    }
  }
}
