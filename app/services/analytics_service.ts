// import Complaint from '#models/complaint'
import Zone from '#models/zone'
// import User from '#models/user'
import JobCard from '#models/job_card'
import db from '@adonisjs/lucid/services/db'

export default class AnalyticsService {
  async buildingPerformance() {
    return db
      .from('buildings')
      .join('complaints', 'buildings.id', 'complaints.building_id')
      .groupBy('buildings.name')
      .select('buildings.name')
      .count('complaints.id as complaints')
  }

  async supervisorRanking() {
    return db
      .from('job_cards')
      .join('users', 'job_cards.supervisor_id', 'users.id')
      .groupBy('users.name')
      .select('users.name')
      .count('* as jobs_completed')
  }

  async complaintCategories() {
    return db
      .from('complaint_categories')
      .join('complaints', 'complaint_categories.id', 'complaints.category_id')
      .groupBy('complaint_categories.name')
      .select('complaint_categories.name')
      .count('* as total')
  }

  async zoneHeatmap() {
    return Zone.query().select('name', 'cleanlinessScore')
  }

  async complaintTrends() {
    return db
      .from('complaints')
      .select(db.raw('DATE(reported_at) as date'))
      .count('* as total')
      .groupByRaw('DATE(reported_at)')
  }

  async peakHours() {
    return db
      .from('complaints')
      .select(db.raw('HOUR(reported_at) as hour'))
      .count('* as total')
      .groupByRaw('HOUR(reported_at)')
  }

  async contractorMetrics(contractorId: number) {
    return JobCard.query()
      .where('supervisor_id', contractorId)
      .where('status', 'completed')
      .count('* as completed_jobs')
  }
}
