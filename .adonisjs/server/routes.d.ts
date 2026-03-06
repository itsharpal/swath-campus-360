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
  }
  GET: {
    'home': { paramsTuple?: []; params?: {} }
    'auth.show_login': { paramsTuple?: []; params?: {} }
    'auth.show_register': { paramsTuple?: []; params?: {} }
    'auth.verify_email': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
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
  }
  HEAD: {
    'home': { paramsTuple?: []; params?: {} }
    'auth.show_login': { paramsTuple?: []; params?: {} }
    'auth.show_register': { paramsTuple?: []; params?: {} }
    'auth.verify_email': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
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
  }
  POST: {
    'auth.login': { paramsTuple?: []; params?: {} }
    'auth.register': { paramsTuple?: []; params?: {} }
    'auth.logout': { paramsTuple?: []; params?: {} }
    'admin.users.store': { paramsTuple?: []; params?: {} }
    'complaints.store': { paramsTuple?: []; params?: {} }
  }
  PUT: {
    'admin.users.update': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'complaints.mark_in_progress': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'complaints.resolve': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'job_cards.start': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'job_cards.complete': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
  }
  DELETE: {
    'admin.users.destroy': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
  }
}
declare module '@adonisjs/core/types/http' {
  export interface RoutesList extends ScannedRoutes {}
}