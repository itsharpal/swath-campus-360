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
}
