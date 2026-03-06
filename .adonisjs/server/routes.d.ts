import '@adonisjs/core/types/http'

type ParamValue = string | number | bigint | boolean

export type ScannedRoutes = {
  ALL: {
    'home': { paramsTuple?: []; params?: {} }
    'auth.show_login': { paramsTuple?: []; params?: {} }
    'auth.login': { paramsTuple?: []; params?: {} }
    'auth.show_register': { paramsTuple?: []; params?: {} }
    'auth.register': { paramsTuple?: []; params?: {} }
    'auth.logout': { paramsTuple?: []; params?: {} }
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
    'zones.edit': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'zones.show': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'zones.update': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'zones.destroy': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'zones.generate_qr': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'zones.resolve_by_qr': { paramsTuple: [ParamValue]; params: {'qr': ParamValue} }
    'complaints.index': { paramsTuple?: []; params?: {} }
    'complaints.store': { paramsTuple?: []; params?: {} }
    'complaints.track': { paramsTuple: [ParamValue]; params: {'code': ParamValue} }
    'complaints.my_complaints': { paramsTuple?: []; params?: {} }
    'complaints.show': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'complaints.mark_in_progress': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'complaints.resolve': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'job_cards.index': { paramsTuple?: []; params?: {} }
    'job_cards.show': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'job_cards.start': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'job_cards.complete': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'job_cards.zone_history': { paramsTuple: [ParamValue]; params: {'zoneId': ParamValue} }
    'admin_dashboard.index': { paramsTuple?: []; params?: {} }
    'supervisor_dashboard.index': { paramsTuple?: []; params?: {} }
    'contractor_dashboard.index': { paramsTuple?: []; params?: {} }
    'analytics.buildings': { paramsTuple?: []; params?: {} }
    'analytics.supervisors': { paramsTuple?: []; params?: {} }
    'analytics.categories': { paramsTuple?: []; params?: {} }
    'analytics.heatmap': { paramsTuple?: []; params?: {} }
    'analytics.trends': { paramsTuple?: []; params?: {} }
    'analytics.peak_hours': { paramsTuple?: []; params?: {} }
    'analytics.contractor_metrics': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'reports.weekly': { paramsTuple?: []; params?: {} }
    'reports.building_report': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'reports.contractor_report': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
  }
  GET: {
    'home': { paramsTuple?: []; params?: {} }
    'auth.show_login': { paramsTuple?: []; params?: {} }
    'auth.show_register': { paramsTuple?: []; params?: {} }
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
    'zones.edit': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'zones.show': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'zones.generate_qr': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'zones.resolve_by_qr': { paramsTuple: [ParamValue]; params: {'qr': ParamValue} }
    'complaints.index': { paramsTuple?: []; params?: {} }
    'complaints.track': { paramsTuple: [ParamValue]; params: {'code': ParamValue} }
    'complaints.my_complaints': { paramsTuple?: []; params?: {} }
    'complaints.show': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'job_cards.index': { paramsTuple?: []; params?: {} }
    'job_cards.show': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'job_cards.zone_history': { paramsTuple: [ParamValue]; params: {'zoneId': ParamValue} }
    'admin_dashboard.index': { paramsTuple?: []; params?: {} }
    'supervisor_dashboard.index': { paramsTuple?: []; params?: {} }
    'contractor_dashboard.index': { paramsTuple?: []; params?: {} }
    'analytics.buildings': { paramsTuple?: []; params?: {} }
    'analytics.supervisors': { paramsTuple?: []; params?: {} }
    'analytics.categories': { paramsTuple?: []; params?: {} }
    'analytics.heatmap': { paramsTuple?: []; params?: {} }
    'analytics.trends': { paramsTuple?: []; params?: {} }
    'analytics.peak_hours': { paramsTuple?: []; params?: {} }
    'analytics.contractor_metrics': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'reports.weekly': { paramsTuple?: []; params?: {} }
    'reports.building_report': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'reports.contractor_report': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
  }
  HEAD: {
    'home': { paramsTuple?: []; params?: {} }
    'auth.show_login': { paramsTuple?: []; params?: {} }
    'auth.show_register': { paramsTuple?: []; params?: {} }
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
    'zones.edit': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'zones.show': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'zones.generate_qr': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'zones.resolve_by_qr': { paramsTuple: [ParamValue]; params: {'qr': ParamValue} }
    'complaints.index': { paramsTuple?: []; params?: {} }
    'complaints.track': { paramsTuple: [ParamValue]; params: {'code': ParamValue} }
    'complaints.my_complaints': { paramsTuple?: []; params?: {} }
    'complaints.show': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'job_cards.index': { paramsTuple?: []; params?: {} }
    'job_cards.show': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'job_cards.zone_history': { paramsTuple: [ParamValue]; params: {'zoneId': ParamValue} }
    'admin_dashboard.index': { paramsTuple?: []; params?: {} }
    'supervisor_dashboard.index': { paramsTuple?: []; params?: {} }
    'contractor_dashboard.index': { paramsTuple?: []; params?: {} }
    'analytics.buildings': { paramsTuple?: []; params?: {} }
    'analytics.supervisors': { paramsTuple?: []; params?: {} }
    'analytics.categories': { paramsTuple?: []; params?: {} }
    'analytics.heatmap': { paramsTuple?: []; params?: {} }
    'analytics.trends': { paramsTuple?: []; params?: {} }
    'analytics.peak_hours': { paramsTuple?: []; params?: {} }
    'analytics.contractor_metrics': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'reports.weekly': { paramsTuple?: []; params?: {} }
    'reports.building_report': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'reports.contractor_report': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
  }
  POST: {
    'auth.login': { paramsTuple?: []; params?: {} }
    'auth.register': { paramsTuple?: []; params?: {} }
    'auth.logout': { paramsTuple?: []; params?: {} }
    'buildings.store': { paramsTuple?: []; params?: {} }
    'floors.store': { paramsTuple: [ParamValue]; params: {'buildingId': ParamValue} }
    'zones.store': { paramsTuple: [ParamValue]; params: {'floorId': ParamValue} }
    'complaints.store': { paramsTuple?: []; params?: {} }
  }
  PUT: {
    'buildings.update': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'floors.update': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'zones.update': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'complaints.mark_in_progress': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'complaints.resolve': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'job_cards.start': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'job_cards.complete': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
  }
  DELETE: {
    'buildings.destroy': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'floors.destroy': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'zones.destroy': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
  }
}
declare module '@adonisjs/core/types/http' {
  export interface RoutesList extends ScannedRoutes {}
}