import '@adonisjs/core/types/http'

type ParamValue = string | number | bigint | boolean

export type ScannedRoutes = {
  ALL: {
    'home': { paramsTuple?: []; params?: {} }
    'auth.show_login': { paramsTuple?: []; params?: {} }
    'auth.login': { paramsTuple?: []; params?: {} }
    'auth.show_register': { paramsTuple?: []; params?: {} }
    'auth.register': { paramsTuple?: []; params?: {} }
    'auth.verify_email': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'auth.logout': { paramsTuple?: []; params?: {} }
    'profile.show': { paramsTuple?: []; params?: {} }
    'dashboard.admin': { paramsTuple?: []; params?: {} }
    'dashboard.supervisor': { paramsTuple?: []; params?: {} }
    'admin.users.index': { paramsTuple?: []; params?: {} }
    'admin.users.create': { paramsTuple?: []; params?: {} }
    'admin.users.store': { paramsTuple?: []; params?: {} }
    'admin.users.show': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'admin.users.edit': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'admin.users.update': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'admin.users.destroy': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'complaints.index': { paramsTuple?: []; params?: {} }
    'complaints.create': { paramsTuple?: []; params?: {} }
    'complaints.my': { paramsTuple?: []; params?: {} }
    'complaints.track': { paramsTuple: [ParamValue]; params: {'code': ParamValue} }
    'complaints.show_resolve': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'complaints.store': { paramsTuple?: []; params?: {} }
    'complaints.show': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'complaints.mark_in_progress': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'complaints.resolve': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'job_cards.index': { paramsTuple?: []; params?: {} }
    'job_cards.zone_history': { paramsTuple: [ParamValue]; params: {'zoneId': ParamValue} }
    'job_cards.show': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'job_cards.start': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'job_cards.complete': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'analytics.buildings': { paramsTuple?: []; params?: {} }
    'analytics.supervisors': { paramsTuple?: []; params?: {} }
    'analytics.categories': { paramsTuple?: []; params?: {} }
    'analytics.heatmap': { paramsTuple?: []; params?: {} }
    'analytics.trends': { paramsTuple?: []; params?: {} }
    'analytics.peak_hours': { paramsTuple?: []; params?: {} }
    'buildings.index': { paramsTuple?: []; params?: {} }
    'buildings.create': { paramsTuple?: []; params?: {} }
    'buildings.store': { paramsTuple?: []; params?: {} }
    'buildings.show': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'buildings.edit': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'buildings.update': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'buildings.destroy': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'buildings.stats': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'buildings.dashboard': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'floors.index': { paramsTuple: [ParamValue]; params: {'buildingId': ParamValue} }
    'floors.create': { paramsTuple: [ParamValue]; params: {'buildingId': ParamValue} }
    'floors.store': { paramsTuple: [ParamValue]; params: {'buildingId': ParamValue} }
    'floors.edit': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'floors.update': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'floors.destroy': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'zones.index': { paramsTuple: [ParamValue]; params: {'floorId': ParamValue} }
    'zones.create': { paramsTuple: [ParamValue]; params: {'floorId': ParamValue} }
    'zones.store': { paramsTuple: [ParamValue]; params: {'floorId': ParamValue} }
    'zones.show': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'zones.edit': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'zones.update': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'zones.destroy': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'zones.generate_qr': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'zones.resolve_by_qr': { paramsTuple: [ParamValue]; params: {'qr': ParamValue} }
  }
  GET: {
    'home': { paramsTuple?: []; params?: {} }
    'auth.show_login': { paramsTuple?: []; params?: {} }
    'auth.show_register': { paramsTuple?: []; params?: {} }
    'auth.verify_email': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'profile.show': { paramsTuple?: []; params?: {} }
    'dashboard.admin': { paramsTuple?: []; params?: {} }
    'dashboard.supervisor': { paramsTuple?: []; params?: {} }
    'admin.users.index': { paramsTuple?: []; params?: {} }
    'admin.users.create': { paramsTuple?: []; params?: {} }
    'admin.users.show': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'admin.users.edit': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'complaints.index': { paramsTuple?: []; params?: {} }
    'complaints.create': { paramsTuple?: []; params?: {} }
    'complaints.my': { paramsTuple?: []; params?: {} }
    'complaints.track': { paramsTuple: [ParamValue]; params: {'code': ParamValue} }
    'complaints.show_resolve': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'complaints.show': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'job_cards.index': { paramsTuple?: []; params?: {} }
    'job_cards.zone_history': { paramsTuple: [ParamValue]; params: {'zoneId': ParamValue} }
    'job_cards.show': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'analytics.buildings': { paramsTuple?: []; params?: {} }
    'analytics.supervisors': { paramsTuple?: []; params?: {} }
    'analytics.categories': { paramsTuple?: []; params?: {} }
    'analytics.heatmap': { paramsTuple?: []; params?: {} }
    'analytics.trends': { paramsTuple?: []; params?: {} }
    'analytics.peak_hours': { paramsTuple?: []; params?: {} }
    'buildings.index': { paramsTuple?: []; params?: {} }
    'buildings.create': { paramsTuple?: []; params?: {} }
    'buildings.show': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'buildings.edit': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'buildings.stats': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'buildings.dashboard': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'floors.index': { paramsTuple: [ParamValue]; params: {'buildingId': ParamValue} }
    'floors.create': { paramsTuple: [ParamValue]; params: {'buildingId': ParamValue} }
    'floors.edit': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'zones.index': { paramsTuple: [ParamValue]; params: {'floorId': ParamValue} }
    'zones.create': { paramsTuple: [ParamValue]; params: {'floorId': ParamValue} }
    'zones.show': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'zones.edit': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'zones.generate_qr': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'zones.resolve_by_qr': { paramsTuple: [ParamValue]; params: {'qr': ParamValue} }
  }
  HEAD: {
    'home': { paramsTuple?: []; params?: {} }
    'auth.show_login': { paramsTuple?: []; params?: {} }
    'auth.show_register': { paramsTuple?: []; params?: {} }
    'auth.verify_email': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'profile.show': { paramsTuple?: []; params?: {} }
    'dashboard.admin': { paramsTuple?: []; params?: {} }
    'dashboard.supervisor': { paramsTuple?: []; params?: {} }
    'admin.users.index': { paramsTuple?: []; params?: {} }
    'admin.users.create': { paramsTuple?: []; params?: {} }
    'admin.users.show': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'admin.users.edit': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'complaints.index': { paramsTuple?: []; params?: {} }
    'complaints.create': { paramsTuple?: []; params?: {} }
    'complaints.my': { paramsTuple?: []; params?: {} }
    'complaints.track': { paramsTuple: [ParamValue]; params: {'code': ParamValue} }
    'complaints.show_resolve': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'complaints.show': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'job_cards.index': { paramsTuple?: []; params?: {} }
    'job_cards.zone_history': { paramsTuple: [ParamValue]; params: {'zoneId': ParamValue} }
    'job_cards.show': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'analytics.buildings': { paramsTuple?: []; params?: {} }
    'analytics.supervisors': { paramsTuple?: []; params?: {} }
    'analytics.categories': { paramsTuple?: []; params?: {} }
    'analytics.heatmap': { paramsTuple?: []; params?: {} }
    'analytics.trends': { paramsTuple?: []; params?: {} }
    'analytics.peak_hours': { paramsTuple?: []; params?: {} }
    'buildings.index': { paramsTuple?: []; params?: {} }
    'buildings.create': { paramsTuple?: []; params?: {} }
    'buildings.show': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'buildings.edit': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'buildings.stats': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'buildings.dashboard': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'floors.index': { paramsTuple: [ParamValue]; params: {'buildingId': ParamValue} }
    'floors.create': { paramsTuple: [ParamValue]; params: {'buildingId': ParamValue} }
    'floors.edit': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'zones.index': { paramsTuple: [ParamValue]; params: {'floorId': ParamValue} }
    'zones.create': { paramsTuple: [ParamValue]; params: {'floorId': ParamValue} }
    'zones.show': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'zones.edit': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'zones.generate_qr': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'zones.resolve_by_qr': { paramsTuple: [ParamValue]; params: {'qr': ParamValue} }
  }
  POST: {
    'auth.login': { paramsTuple?: []; params?: {} }
    'auth.register': { paramsTuple?: []; params?: {} }
    'auth.logout': { paramsTuple?: []; params?: {} }
    'admin.users.store': { paramsTuple?: []; params?: {} }
    'complaints.store': { paramsTuple?: []; params?: {} }
    'buildings.store': { paramsTuple?: []; params?: {} }
    'floors.store': { paramsTuple: [ParamValue]; params: {'buildingId': ParamValue} }
    'zones.store': { paramsTuple: [ParamValue]; params: {'floorId': ParamValue} }
  }
  PUT: {
    'admin.users.update': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'complaints.mark_in_progress': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'complaints.resolve': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'job_cards.start': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'job_cards.complete': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'buildings.update': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'floors.update': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'zones.update': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
  }
  DELETE: {
    'admin.users.destroy': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'buildings.destroy': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'floors.destroy': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'zones.destroy': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
  }
}
declare module '@adonisjs/core/types/http' {
  export interface RoutesList extends ScannedRoutes {}
}