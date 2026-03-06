/* eslint-disable prettier/prettier */
import type { routes } from './index.ts'

export interface ApiDefinition {
  home: typeof routes['home']
  auth: {
    showLogin: typeof routes['auth.show_login']
    login: typeof routes['auth.login']
    showRegister: typeof routes['auth.show_register']
    register: typeof routes['auth.register']
    verifyEmail: typeof routes['auth.verify_email']
    logout: typeof routes['auth.logout']
  }
  profile: {
    show: typeof routes['profile.show']
  }
  dashboard: {
    admin: typeof routes['dashboard.admin']
    supervisor: typeof routes['dashboard.supervisor']
  }
  admin: {
    users: {
      index: typeof routes['admin.users.index']
      create: typeof routes['admin.users.create']
      store: typeof routes['admin.users.store']
      show: typeof routes['admin.users.show']
      edit: typeof routes['admin.users.edit']
      update: typeof routes['admin.users.update']
      destroy: typeof routes['admin.users.destroy']
    }
  }
  complaints: {
    index: typeof routes['complaints.index']
    create: typeof routes['complaints.create']
    my: typeof routes['complaints.my']
    track: typeof routes['complaints.track']
    showResolve: typeof routes['complaints.show_resolve']
    store: typeof routes['complaints.store']
    upvote: typeof routes['complaints.upvote']
    show: typeof routes['complaints.show']
    markInProgress: typeof routes['complaints.mark_in_progress']
    resolve: typeof routes['complaints.resolve']
  }
  jobCards: {
    index: typeof routes['job_cards.index']
    zoneHistory: typeof routes['job_cards.zone_history']
    show: typeof routes['job_cards.show']
    start: typeof routes['job_cards.start']
    complete: typeof routes['job_cards.complete']
  }
  analytics: {
    buildings: typeof routes['analytics.buildings']
    supervisors: typeof routes['analytics.supervisors']
    categories: typeof routes['analytics.categories']
    heatmap: typeof routes['analytics.heatmap']
    trends: typeof routes['analytics.trends']
    peakHours: typeof routes['analytics.peak_hours']
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
    show: typeof routes['zones.show']
    edit: typeof routes['zones.edit']
    update: typeof routes['zones.update']
    destroy: typeof routes['zones.destroy']
    generateQr: typeof routes['zones.generate_qr']
    resolveByQr: typeof routes['zones.resolve_by_qr']
  }
}
