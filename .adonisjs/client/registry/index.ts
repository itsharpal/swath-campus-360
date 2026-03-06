/* eslint-disable prettier/prettier */
import type { AdonisEndpoint } from '@tuyau/core/types'
import type { Registry } from './schema.d.ts'
import type { ApiDefinition } from './tree.d.ts'

const placeholder: any = {}

const routes = {
  'home': {
    methods: ["GET","HEAD"],
    pattern: '/',
    tokens: [{"old":"/","type":0,"val":"/","end":""}],
    types: placeholder as Registry['home']['types'],
  },
  'auth.show_login': {
    methods: ["GET","HEAD"],
    pattern: '/login',
    tokens: [{"old":"/login","type":0,"val":"login","end":""}],
    types: placeholder as Registry['auth.show_login']['types'],
  },
  'auth.login': {
    methods: ["POST"],
    pattern: '/login',
    tokens: [{"old":"/login","type":0,"val":"login","end":""}],
    types: placeholder as Registry['auth.login']['types'],
  },
  'auth.show_register': {
    methods: ["GET","HEAD"],
    pattern: '/register',
    tokens: [{"old":"/register","type":0,"val":"register","end":""}],
    types: placeholder as Registry['auth.show_register']['types'],
  },
  'auth.register': {
    methods: ["POST"],
    pattern: '/register',
    tokens: [{"old":"/register","type":0,"val":"register","end":""}],
    types: placeholder as Registry['auth.register']['types'],
  },
  'auth.verify_email': {
    methods: ["GET","HEAD"],
    pattern: '/email/verify/:id',
    tokens: [{"old":"/email/verify/:id","type":0,"val":"email","end":""},{"old":"/email/verify/:id","type":0,"val":"verify","end":""},{"old":"/email/verify/:id","type":1,"val":"id","end":""}],
    types: placeholder as Registry['auth.verify_email']['types'],
  },
  'auth.logout': {
    methods: ["POST"],
    pattern: '/logout',
    tokens: [{"old":"/logout","type":0,"val":"logout","end":""}],
    types: placeholder as Registry['auth.logout']['types'],
  },
  'admin.users.index': {
    methods: ["GET","HEAD"],
    pattern: '/admin/users',
    tokens: [{"old":"/admin/users","type":0,"val":"admin","end":""},{"old":"/admin/users","type":0,"val":"users","end":""}],
    types: placeholder as Registry['admin.users.index']['types'],
  },
  'admin.users.create': {
    methods: ["GET","HEAD"],
    pattern: '/admin/users/create',
    tokens: [{"old":"/admin/users/create","type":0,"val":"admin","end":""},{"old":"/admin/users/create","type":0,"val":"users","end":""},{"old":"/admin/users/create","type":0,"val":"create","end":""}],
    types: placeholder as Registry['admin.users.create']['types'],
  },
  'admin.users.store': {
    methods: ["POST"],
    pattern: '/admin/users',
    tokens: [{"old":"/admin/users","type":0,"val":"admin","end":""},{"old":"/admin/users","type":0,"val":"users","end":""}],
    types: placeholder as Registry['admin.users.store']['types'],
  },
  'admin.users.show': {
    methods: ["GET","HEAD"],
    pattern: '/admin/users/:id',
    tokens: [{"old":"/admin/users/:id","type":0,"val":"admin","end":""},{"old":"/admin/users/:id","type":0,"val":"users","end":""},{"old":"/admin/users/:id","type":1,"val":"id","end":""}],
    types: placeholder as Registry['admin.users.show']['types'],
  },
  'admin.users.edit': {
    methods: ["GET","HEAD"],
    pattern: '/admin/users/:id/edit',
    tokens: [{"old":"/admin/users/:id/edit","type":0,"val":"admin","end":""},{"old":"/admin/users/:id/edit","type":0,"val":"users","end":""},{"old":"/admin/users/:id/edit","type":1,"val":"id","end":""},{"old":"/admin/users/:id/edit","type":0,"val":"edit","end":""}],
    types: placeholder as Registry['admin.users.edit']['types'],
  },
  'admin.users.update': {
    methods: ["PUT"],
    pattern: '/admin/users/:id',
    tokens: [{"old":"/admin/users/:id","type":0,"val":"admin","end":""},{"old":"/admin/users/:id","type":0,"val":"users","end":""},{"old":"/admin/users/:id","type":1,"val":"id","end":""}],
    types: placeholder as Registry['admin.users.update']['types'],
  },
  'admin.users.destroy': {
    methods: ["DELETE"],
    pattern: '/admin/users/:id',
    tokens: [{"old":"/admin/users/:id","type":0,"val":"admin","end":""},{"old":"/admin/users/:id","type":0,"val":"users","end":""},{"old":"/admin/users/:id","type":1,"val":"id","end":""}],
    types: placeholder as Registry['admin.users.destroy']['types'],
  },
  'complaints.index': {
    methods: ["GET","HEAD"],
    pattern: '/complaints',
    tokens: [{"old":"/complaints","type":0,"val":"complaints","end":""}],
    types: placeholder as Registry['complaints.index']['types'],
  },
  'complaints.create': {
    methods: ["GET","HEAD"],
    pattern: '/complaints/create',
    tokens: [{"old":"/complaints/create","type":0,"val":"complaints","end":""},{"old":"/complaints/create","type":0,"val":"create","end":""}],
    types: placeholder as Registry['complaints.create']['types'],
  },
  'complaints.my': {
    methods: ["GET","HEAD"],
    pattern: '/complaints/my',
    tokens: [{"old":"/complaints/my","type":0,"val":"complaints","end":""},{"old":"/complaints/my","type":0,"val":"my","end":""}],
    types: placeholder as Registry['complaints.my']['types'],
  },
  'complaints.track': {
    methods: ["GET","HEAD"],
    pattern: '/complaints/track/:code',
    tokens: [{"old":"/complaints/track/:code","type":0,"val":"complaints","end":""},{"old":"/complaints/track/:code","type":0,"val":"track","end":""},{"old":"/complaints/track/:code","type":1,"val":"code","end":""}],
    types: placeholder as Registry['complaints.track']['types'],
  },
  'complaints.show_resolve': {
    methods: ["GET","HEAD"],
    pattern: '/complaints/:id/resolve',
    tokens: [{"old":"/complaints/:id/resolve","type":0,"val":"complaints","end":""},{"old":"/complaints/:id/resolve","type":1,"val":"id","end":""},{"old":"/complaints/:id/resolve","type":0,"val":"resolve","end":""}],
    types: placeholder as Registry['complaints.show_resolve']['types'],
  },
  'complaints.store': {
    methods: ["POST"],
    pattern: '/complaints',
    tokens: [{"old":"/complaints","type":0,"val":"complaints","end":""}],
    types: placeholder as Registry['complaints.store']['types'],
  },
  'complaints.show': {
    methods: ["GET","HEAD"],
    pattern: '/complaints/:id',
    tokens: [{"old":"/complaints/:id","type":0,"val":"complaints","end":""},{"old":"/complaints/:id","type":1,"val":"id","end":""}],
    types: placeholder as Registry['complaints.show']['types'],
  },
  'complaints.mark_in_progress': {
    methods: ["PUT"],
    pattern: '/complaints/:id/status',
    tokens: [{"old":"/complaints/:id/status","type":0,"val":"complaints","end":""},{"old":"/complaints/:id/status","type":1,"val":"id","end":""},{"old":"/complaints/:id/status","type":0,"val":"status","end":""}],
    types: placeholder as Registry['complaints.mark_in_progress']['types'],
  },
  'complaints.resolve': {
    methods: ["PUT"],
    pattern: '/complaints/:id/resolve',
    tokens: [{"old":"/complaints/:id/resolve","type":0,"val":"complaints","end":""},{"old":"/complaints/:id/resolve","type":1,"val":"id","end":""},{"old":"/complaints/:id/resolve","type":0,"val":"resolve","end":""}],
    types: placeholder as Registry['complaints.resolve']['types'],
  },
} as const satisfies Record<string, AdonisEndpoint>

export { routes }

export const registry = {
  routes,
  $tree: {} as ApiDefinition,
}

declare module '@tuyau/core/types' {
  export interface UserRegistry {
    routes: typeof routes
    $tree: ApiDefinition
  }
}
