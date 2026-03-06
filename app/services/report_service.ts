import Complaint from '#models/complaint'
import JobCard from '#models/job_card'
// import PDFDocument from 'pdfkit'

export default class ReportService {
  async generateWeeklyReport() {
    const complaints = await Complaint.query().whereRaw('reported_at >= NOW() - INTERVAL 7 DAY')

    return complaints
  }

  async buildingReport(buildingId: number) {
    const complaints = await Complaint.query().where('building_id', buildingId).preload('zone')

    return complaints
  }

  async contractorReport(contractorId: number) {
    const jobs = await JobCard.query().where('supervisor_id', contractorId).preload('zone')

    return jobs
  }
}
