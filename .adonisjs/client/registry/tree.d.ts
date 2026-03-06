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
}
