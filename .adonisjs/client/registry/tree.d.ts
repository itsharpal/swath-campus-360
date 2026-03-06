/* eslint-disable prettier/prettier */
import type { routes } from './index.ts'

export interface ApiDefinition {
  home: typeof routes['home']
  auth: {
    showLogin: typeof routes['auth.show_login']
    login: typeof routes['auth.login']
    showRegister: typeof routes['auth.show_register']
    register: typeof routes['auth.register']
    logout: typeof routes['auth.logout']
  }
  buildings: {
    index: typeof routes['buildings.index']
    create: typeof routes['buildings.create']
    store: typeof routes['buildings.store']
    show: typeof routes['buildings.show']
    edit: typeof routes['buildings.edit']
    update: typeof routes['buildings.update']
    destroy: typeof routes['buildings.destroy']
    stats: typeof routes['buildings.stats']
    dashboard: typeof routes['buildings.dashboard']
  }
  floors: {
    index: typeof routes['floors.index']
    create: typeof routes['floors.create']
    store: typeof routes['floors.store']
    edit: typeof routes['floors.edit']
    update: typeof routes['floors.update']
    destroy: typeof routes['floors.destroy']
  }
  zones: {
    index: typeof routes['zones.index']
    create: typeof routes['zones.create']
    store: typeof routes['zones.store']
    edit: typeof routes['zones.edit']
    show: typeof routes['zones.show']
    update: typeof routes['zones.update']
    destroy: typeof routes['zones.destroy']
    generateQr: typeof routes['zones.generate_qr']
    resolveByQr: typeof routes['zones.resolve_by_qr']
  }
  complaints: {
    index: typeof routes['complaints.index']
    store: typeof routes['complaints.store']
    track: typeof routes['complaints.track']
    myComplaints: typeof routes['complaints.my_complaints']
    show: typeof routes['complaints.show']
    markInProgress: typeof routes['complaints.mark_in_progress']
    resolve: typeof routes['complaints.resolve']
  }
  jobCards: {
    index: typeof routes['job_cards.index']
    show: typeof routes['job_cards.show']
    start: typeof routes['job_cards.start']
    complete: typeof routes['job_cards.complete']
    zoneHistory: typeof routes['job_cards.zone_history']
  }
  adminDashboard: {
    index: typeof routes['admin_dashboard.index']
  }
  supervisorDashboard: {
    index: typeof routes['supervisor_dashboard.index']
  }
  contractorDashboard: {
    index: typeof routes['contractor_dashboard.index']
  }
  analytics: {
    buildings: typeof routes['analytics.buildings']
    supervisors: typeof routes['analytics.supervisors']
    categories: typeof routes['analytics.categories']
    heatmap: typeof routes['analytics.heatmap']
    trends: typeof routes['analytics.trends']
    peakHours: typeof routes['analytics.peak_hours']
    contractorMetrics: typeof routes['analytics.contractor_metrics']
  }
  reports: {
    weekly: typeof routes['reports.weekly']
    buildingReport: typeof routes['reports.building_report']
    contractorReport: typeof routes['reports.contractor_report']
  }
}
