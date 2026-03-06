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
  'auth.logout': {
    methods: ["POST"],
    pattern: '/logout',
    tokens: [{"old":"/logout","type":0,"val":"logout","end":""}],
    types: placeholder as Registry['auth.logout']['types'],
  },
  'buildings.index': {
    methods: ["GET","HEAD"],
    pattern: '/buildings',
    tokens: [{"old":"/buildings","type":0,"val":"buildings","end":""}],
    types: placeholder as Registry['buildings.index']['types'],
  },
  'buildings.create': {
    methods: ["GET","HEAD"],
    pattern: '/buildings/create',
    tokens: [{"old":"/buildings/create","type":0,"val":"buildings","end":""},{"old":"/buildings/create","type":0,"val":"create","end":""}],
    types: placeholder as Registry['buildings.create']['types'],
  },
  'buildings.store': {
    methods: ["POST"],
    pattern: '/buildings',
    tokens: [{"old":"/buildings","type":0,"val":"buildings","end":""}],
    types: placeholder as Registry['buildings.store']['types'],
  },
  'buildings.show': {
    methods: ["GET","HEAD"],
    pattern: '/buildings/:id',
    tokens: [{"old":"/buildings/:id","type":0,"val":"buildings","end":""},{"old":"/buildings/:id","type":1,"val":"id","end":""}],
    types: placeholder as Registry['buildings.show']['types'],
  },
  'buildings.edit': {
    methods: ["GET","HEAD"],
    pattern: '/buildings/:id/edit',
    tokens: [{"old":"/buildings/:id/edit","type":0,"val":"buildings","end":""},{"old":"/buildings/:id/edit","type":1,"val":"id","end":""},{"old":"/buildings/:id/edit","type":0,"val":"edit","end":""}],
    types: placeholder as Registry['buildings.edit']['types'],
  },
  'buildings.update': {
    methods: ["PUT"],
    pattern: '/buildings/:id',
    tokens: [{"old":"/buildings/:id","type":0,"val":"buildings","end":""},{"old":"/buildings/:id","type":1,"val":"id","end":""}],
    types: placeholder as Registry['buildings.update']['types'],
  },
  'buildings.destroy': {
    methods: ["DELETE"],
    pattern: '/buildings/:id',
    tokens: [{"old":"/buildings/:id","type":0,"val":"buildings","end":""},{"old":"/buildings/:id","type":1,"val":"id","end":""}],
    types: placeholder as Registry['buildings.destroy']['types'],
  },
  'buildings.stats': {
    methods: ["GET","HEAD"],
    pattern: '/buildings/:id/stats',
    tokens: [{"old":"/buildings/:id/stats","type":0,"val":"buildings","end":""},{"old":"/buildings/:id/stats","type":1,"val":"id","end":""},{"old":"/buildings/:id/stats","type":0,"val":"stats","end":""}],
    types: placeholder as Registry['buildings.stats']['types'],
  },
  'buildings.dashboard': {
    methods: ["GET","HEAD"],
    pattern: '/buildings/:id/dashboard',
    tokens: [{"old":"/buildings/:id/dashboard","type":0,"val":"buildings","end":""},{"old":"/buildings/:id/dashboard","type":1,"val":"id","end":""},{"old":"/buildings/:id/dashboard","type":0,"val":"dashboard","end":""}],
    types: placeholder as Registry['buildings.dashboard']['types'],
  },
  'floors.index': {
    methods: ["GET","HEAD"],
    pattern: '/buildings/:buildingId/floors',
    tokens: [{"old":"/buildings/:buildingId/floors","type":0,"val":"buildings","end":""},{"old":"/buildings/:buildingId/floors","type":1,"val":"buildingId","end":""},{"old":"/buildings/:buildingId/floors","type":0,"val":"floors","end":""}],
    types: placeholder as Registry['floors.index']['types'],
  },
  'floors.create': {
    methods: ["GET","HEAD"],
    pattern: '/buildings/:buildingId/floors/create',
    tokens: [{"old":"/buildings/:buildingId/floors/create","type":0,"val":"buildings","end":""},{"old":"/buildings/:buildingId/floors/create","type":1,"val":"buildingId","end":""},{"old":"/buildings/:buildingId/floors/create","type":0,"val":"floors","end":""},{"old":"/buildings/:buildingId/floors/create","type":0,"val":"create","end":""}],
    types: placeholder as Registry['floors.create']['types'],
  },
  'floors.store': {
    methods: ["POST"],
    pattern: '/buildings/:buildingId/floors',
    tokens: [{"old":"/buildings/:buildingId/floors","type":0,"val":"buildings","end":""},{"old":"/buildings/:buildingId/floors","type":1,"val":"buildingId","end":""},{"old":"/buildings/:buildingId/floors","type":0,"val":"floors","end":""}],
    types: placeholder as Registry['floors.store']['types'],
  },
  'floors.edit': {
    methods: ["GET","HEAD"],
    pattern: '/floors/:id/edit',
    tokens: [{"old":"/floors/:id/edit","type":0,"val":"floors","end":""},{"old":"/floors/:id/edit","type":1,"val":"id","end":""},{"old":"/floors/:id/edit","type":0,"val":"edit","end":""}],
    types: placeholder as Registry['floors.edit']['types'],
  },
  'floors.update': {
    methods: ["PUT"],
    pattern: '/floors/:id',
    tokens: [{"old":"/floors/:id","type":0,"val":"floors","end":""},{"old":"/floors/:id","type":1,"val":"id","end":""}],
    types: placeholder as Registry['floors.update']['types'],
  },
  'floors.destroy': {
    methods: ["DELETE"],
    pattern: '/floors/:id',
    tokens: [{"old":"/floors/:id","type":0,"val":"floors","end":""},{"old":"/floors/:id","type":1,"val":"id","end":""}],
    types: placeholder as Registry['floors.destroy']['types'],
  },
  'zones.index': {
    methods: ["GET","HEAD"],
    pattern: '/floors/:floorId/zones',
    tokens: [{"old":"/floors/:floorId/zones","type":0,"val":"floors","end":""},{"old":"/floors/:floorId/zones","type":1,"val":"floorId","end":""},{"old":"/floors/:floorId/zones","type":0,"val":"zones","end":""}],
    types: placeholder as Registry['zones.index']['types'],
  },
  'zones.create': {
    methods: ["GET","HEAD"],
    pattern: '/floors/:floorId/zones/create',
    tokens: [{"old":"/floors/:floorId/zones/create","type":0,"val":"floors","end":""},{"old":"/floors/:floorId/zones/create","type":1,"val":"floorId","end":""},{"old":"/floors/:floorId/zones/create","type":0,"val":"zones","end":""},{"old":"/floors/:floorId/zones/create","type":0,"val":"create","end":""}],
    types: placeholder as Registry['zones.create']['types'],
  },
  'zones.store': {
    methods: ["POST"],
    pattern: '/floors/:floorId/zones',
    tokens: [{"old":"/floors/:floorId/zones","type":0,"val":"floors","end":""},{"old":"/floors/:floorId/zones","type":1,"val":"floorId","end":""},{"old":"/floors/:floorId/zones","type":0,"val":"zones","end":""}],
    types: placeholder as Registry['zones.store']['types'],
  },
  'zones.edit': {
    methods: ["GET","HEAD"],
    pattern: '/zones/:id/edit',
    tokens: [{"old":"/zones/:id/edit","type":0,"val":"zones","end":""},{"old":"/zones/:id/edit","type":1,"val":"id","end":""},{"old":"/zones/:id/edit","type":0,"val":"edit","end":""}],
    types: placeholder as Registry['zones.edit']['types'],
  },
  'zones.show': {
    methods: ["GET","HEAD"],
    pattern: '/zones/:id',
    tokens: [{"old":"/zones/:id","type":0,"val":"zones","end":""},{"old":"/zones/:id","type":1,"val":"id","end":""}],
    types: placeholder as Registry['zones.show']['types'],
  },
  'zones.update': {
    methods: ["PUT"],
    pattern: '/zones/:id',
    tokens: [{"old":"/zones/:id","type":0,"val":"zones","end":""},{"old":"/zones/:id","type":1,"val":"id","end":""}],
    types: placeholder as Registry['zones.update']['types'],
  },
  'zones.destroy': {
    methods: ["DELETE"],
    pattern: '/zones/:id',
    tokens: [{"old":"/zones/:id","type":0,"val":"zones","end":""},{"old":"/zones/:id","type":1,"val":"id","end":""}],
    types: placeholder as Registry['zones.destroy']['types'],
  },
  'zones.generate_qr': {
    methods: ["GET","HEAD"],
    pattern: '/zones/:id/qr',
    tokens: [{"old":"/zones/:id/qr","type":0,"val":"zones","end":""},{"old":"/zones/:id/qr","type":1,"val":"id","end":""},{"old":"/zones/:id/qr","type":0,"val":"qr","end":""}],
    types: placeholder as Registry['zones.generate_qr']['types'],
  },
  'zones.resolve_by_qr': {
    methods: ["GET","HEAD"],
    pattern: '/zones/by-qr/:qr',
    tokens: [{"old":"/zones/by-qr/:qr","type":0,"val":"zones","end":""},{"old":"/zones/by-qr/:qr","type":0,"val":"by-qr","end":""},{"old":"/zones/by-qr/:qr","type":1,"val":"qr","end":""}],
    types: placeholder as Registry['zones.resolve_by_qr']['types'],
  },
  'complaints.index': {
    methods: ["GET","HEAD"],
    pattern: '/complaints',
    tokens: [{"old":"/complaints","type":0,"val":"complaints","end":""}],
    types: placeholder as Registry['complaints.index']['types'],
  },
  'complaints.store': {
    methods: ["POST"],
    pattern: '/complaints',
    tokens: [{"old":"/complaints","type":0,"val":"complaints","end":""}],
    types: placeholder as Registry['complaints.store']['types'],
  },
  'complaints.track': {
    methods: ["GET","HEAD"],
    pattern: '/complaints/track/:code',
    tokens: [{"old":"/complaints/track/:code","type":0,"val":"complaints","end":""},{"old":"/complaints/track/:code","type":0,"val":"track","end":""},{"old":"/complaints/track/:code","type":1,"val":"code","end":""}],
    types: placeholder as Registry['complaints.track']['types'],
  },
  'complaints.my_complaints': {
    methods: ["GET","HEAD"],
    pattern: '/complaints/my',
    tokens: [{"old":"/complaints/my","type":0,"val":"complaints","end":""},{"old":"/complaints/my","type":0,"val":"my","end":""}],
    types: placeholder as Registry['complaints.my_complaints']['types'],
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
  'job_cards.index': {
    methods: ["GET","HEAD"],
    pattern: '/job-cards',
    tokens: [{"old":"/job-cards","type":0,"val":"job-cards","end":""}],
    types: placeholder as Registry['job_cards.index']['types'],
  },
  'job_cards.show': {
    methods: ["GET","HEAD"],
    pattern: '/job-cards/:id',
    tokens: [{"old":"/job-cards/:id","type":0,"val":"job-cards","end":""},{"old":"/job-cards/:id","type":1,"val":"id","end":""}],
    types: placeholder as Registry['job_cards.show']['types'],
  },
  'job_cards.start': {
    methods: ["PUT"],
    pattern: '/job-cards/:id/start',
    tokens: [{"old":"/job-cards/:id/start","type":0,"val":"job-cards","end":""},{"old":"/job-cards/:id/start","type":1,"val":"id","end":""},{"old":"/job-cards/:id/start","type":0,"val":"start","end":""}],
    types: placeholder as Registry['job_cards.start']['types'],
  },
  'job_cards.complete': {
    methods: ["PUT"],
    pattern: '/job-cards/:id/complete',
    tokens: [{"old":"/job-cards/:id/complete","type":0,"val":"job-cards","end":""},{"old":"/job-cards/:id/complete","type":1,"val":"id","end":""},{"old":"/job-cards/:id/complete","type":0,"val":"complete","end":""}],
    types: placeholder as Registry['job_cards.complete']['types'],
  },
  'job_cards.zone_history': {
    methods: ["GET","HEAD"],
    pattern: '/job-cards/zone/:zoneId',
    tokens: [{"old":"/job-cards/zone/:zoneId","type":0,"val":"job-cards","end":""},{"old":"/job-cards/zone/:zoneId","type":0,"val":"zone","end":""},{"old":"/job-cards/zone/:zoneId","type":1,"val":"zoneId","end":""}],
    types: placeholder as Registry['job_cards.zone_history']['types'],
  },
  'admin_dashboard.index': {
    methods: ["GET","HEAD"],
    pattern: '/dashboard/admin',
    tokens: [{"old":"/dashboard/admin","type":0,"val":"dashboard","end":""},{"old":"/dashboard/admin","type":0,"val":"admin","end":""}],
    types: placeholder as Registry['admin_dashboard.index']['types'],
  },
  'supervisor_dashboard.index': {
    methods: ["GET","HEAD"],
    pattern: '/dashboard/supervisor',
    tokens: [{"old":"/dashboard/supervisor","type":0,"val":"dashboard","end":""},{"old":"/dashboard/supervisor","type":0,"val":"supervisor","end":""}],
    types: placeholder as Registry['supervisor_dashboard.index']['types'],
  },
  'contractor_dashboard.index': {
    methods: ["GET","HEAD"],
    pattern: '/dashboard/contractor',
    tokens: [{"old":"/dashboard/contractor","type":0,"val":"dashboard","end":""},{"old":"/dashboard/contractor","type":0,"val":"contractor","end":""}],
    types: placeholder as Registry['contractor_dashboard.index']['types'],
  },
  'analytics.buildings': {
    methods: ["GET","HEAD"],
    pattern: '/analytics/buildings',
    tokens: [{"old":"/analytics/buildings","type":0,"val":"analytics","end":""},{"old":"/analytics/buildings","type":0,"val":"buildings","end":""}],
    types: placeholder as Registry['analytics.buildings']['types'],
  },
  'analytics.supervisors': {
    methods: ["GET","HEAD"],
    pattern: '/analytics/supervisors',
    tokens: [{"old":"/analytics/supervisors","type":0,"val":"analytics","end":""},{"old":"/analytics/supervisors","type":0,"val":"supervisors","end":""}],
    types: placeholder as Registry['analytics.supervisors']['types'],
  },
  'analytics.categories': {
    methods: ["GET","HEAD"],
    pattern: '/analytics/categories',
    tokens: [{"old":"/analytics/categories","type":0,"val":"analytics","end":""},{"old":"/analytics/categories","type":0,"val":"categories","end":""}],
    types: placeholder as Registry['analytics.categories']['types'],
  },
  'analytics.heatmap': {
    methods: ["GET","HEAD"],
    pattern: '/analytics/heatmap',
    tokens: [{"old":"/analytics/heatmap","type":0,"val":"analytics","end":""},{"old":"/analytics/heatmap","type":0,"val":"heatmap","end":""}],
    types: placeholder as Registry['analytics.heatmap']['types'],
  },
  'analytics.trends': {
    methods: ["GET","HEAD"],
    pattern: '/analytics/trends',
    tokens: [{"old":"/analytics/trends","type":0,"val":"analytics","end":""},{"old":"/analytics/trends","type":0,"val":"trends","end":""}],
    types: placeholder as Registry['analytics.trends']['types'],
  },
  'analytics.peak_hours': {
    methods: ["GET","HEAD"],
    pattern: '/analytics/peak-hours',
    tokens: [{"old":"/analytics/peak-hours","type":0,"val":"analytics","end":""},{"old":"/analytics/peak-hours","type":0,"val":"peak-hours","end":""}],
    types: placeholder as Registry['analytics.peak_hours']['types'],
  },
  'analytics.contractor_metrics': {
    methods: ["GET","HEAD"],
    pattern: '/analytics/contractor/:id',
    tokens: [{"old":"/analytics/contractor/:id","type":0,"val":"analytics","end":""},{"old":"/analytics/contractor/:id","type":0,"val":"contractor","end":""},{"old":"/analytics/contractor/:id","type":1,"val":"id","end":""}],
    types: placeholder as Registry['analytics.contractor_metrics']['types'],
  },
  'reports.weekly': {
    methods: ["GET","HEAD"],
    pattern: '/reports/weekly',
    tokens: [{"old":"/reports/weekly","type":0,"val":"reports","end":""},{"old":"/reports/weekly","type":0,"val":"weekly","end":""}],
    types: placeholder as Registry['reports.weekly']['types'],
  },
  'reports.building_report': {
    methods: ["GET","HEAD"],
    pattern: '/reports/building/:id',
    tokens: [{"old":"/reports/building/:id","type":0,"val":"reports","end":""},{"old":"/reports/building/:id","type":0,"val":"building","end":""},{"old":"/reports/building/:id","type":1,"val":"id","end":""}],
    types: placeholder as Registry['reports.building_report']['types'],
  },
  'reports.contractor_report': {
    methods: ["GET","HEAD"],
    pattern: '/reports/contractor/:id',
    tokens: [{"old":"/reports/contractor/:id","type":0,"val":"reports","end":""},{"old":"/reports/contractor/:id","type":0,"val":"contractor","end":""},{"old":"/reports/contractor/:id","type":1,"val":"id","end":""}],
    types: placeholder as Registry['reports.contractor_report']['types'],
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
