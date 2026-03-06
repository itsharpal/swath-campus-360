/* eslint-disable prettier/prettier */
/// <reference path="../manifest.d.ts" />

import type { ExtractBody, ExtractQuery, ExtractQueryForGet, ExtractResponse } from '@tuyau/core/types'
import type { InferInput } from '@vinejs/vine/types'

export type ParamValue = string | number | bigint | boolean

export interface Registry {
  'home': {
    methods: ["GET","HEAD"]
    pattern: '/'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: unknown
    }
  }
  'auth.show_login': {
    methods: ["GET","HEAD"]
    pattern: '/login'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/auth_controller').default['showLogin']>>>
    }
  }
  'auth.login': {
    methods: ["POST"]
    pattern: '/login'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/auth_controller').default['login']>>>
    }
  }
  'auth.show_register': {
    methods: ["GET","HEAD"]
    pattern: '/register'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/auth_controller').default['showRegister']>>>
    }
  }
  'auth.register': {
    methods: ["POST"]
    pattern: '/register'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/auth_controller').default['register']>>>
    }
  }
  'auth.logout': {
    methods: ["POST"]
    pattern: '/logout'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/auth_controller').default['logout']>>>
    }
  }
  'buildings.index': {
    methods: ["GET","HEAD"]
    pattern: '/buildings'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/buildings_controller').default['index']>>>
    }
  }
  'buildings.create': {
    methods: ["GET","HEAD"]
    pattern: '/buildings/create'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/buildings_controller').default['create']>>>
    }
  }
  'buildings.store': {
    methods: ["POST"]
    pattern: '/buildings'
    types: {
      body: ExtractBody<InferInput<(typeof import('#validators/building').createBuildingValidator)>>
      paramsTuple: []
      params: {}
      query: ExtractQuery<InferInput<(typeof import('#validators/building').createBuildingValidator)>>
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/buildings_controller').default['store']>>>
    }
  }
  'buildings.show': {
    methods: ["GET","HEAD"]
    pattern: '/buildings/:id'
    types: {
      body: {}
      paramsTuple: [ParamValue]
      params: { id: ParamValue }
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/buildings_controller').default['show']>>>
    }
  }
  'buildings.edit': {
    methods: ["GET","HEAD"]
    pattern: '/buildings/:id/edit'
    types: {
      body: {}
      paramsTuple: [ParamValue]
      params: { id: ParamValue }
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/buildings_controller').default['edit']>>>
    }
  }
  'buildings.update': {
    methods: ["PUT"]
    pattern: '/buildings/:id'
    types: {
      body: ExtractBody<InferInput<(typeof import('#validators/building').updateBuildingValidator)>>
      paramsTuple: [ParamValue]
      params: { id: ParamValue }
      query: ExtractQuery<InferInput<(typeof import('#validators/building').updateBuildingValidator)>>
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/buildings_controller').default['update']>>>
    }
  }
  'buildings.destroy': {
    methods: ["DELETE"]
    pattern: '/buildings/:id'
    types: {
      body: {}
      paramsTuple: [ParamValue]
      params: { id: ParamValue }
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/buildings_controller').default['destroy']>>>
    }
  }
  'buildings.stats': {
    methods: ["GET","HEAD"]
    pattern: '/buildings/:id/stats'
    types: {
      body: {}
      paramsTuple: [ParamValue]
      params: { id: ParamValue }
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/buildings_controller').default['stats']>>>
    }
  }
  'buildings.dashboard': {
    methods: ["GET","HEAD"]
    pattern: '/buildings/:id/dashboard'
    types: {
      body: {}
      paramsTuple: [ParamValue]
      params: { id: ParamValue }
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/buildings_controller').default['dashboard']>>>
    }
  }
  'floors.index': {
    methods: ["GET","HEAD"]
    pattern: '/buildings/:buildingId/floors'
    types: {
      body: {}
      paramsTuple: [ParamValue]
      params: { buildingId: ParamValue }
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/floors_controller').default['index']>>>
    }
  }
  'floors.create': {
    methods: ["GET","HEAD"]
    pattern: '/buildings/:buildingId/floors/create'
    types: {
      body: {}
      paramsTuple: [ParamValue]
      params: { buildingId: ParamValue }
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/floors_controller').default['create']>>>
    }
  }
  'floors.store': {
    methods: ["POST"]
    pattern: '/buildings/:buildingId/floors'
    types: {
      body: ExtractBody<InferInput<(typeof import('#validators/floor').createFloorValidator)>>
      paramsTuple: [ParamValue]
      params: { buildingId: ParamValue }
      query: ExtractQuery<InferInput<(typeof import('#validators/floor').createFloorValidator)>>
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/floors_controller').default['store']>>>
    }
  }
  'floors.edit': {
    methods: ["GET","HEAD"]
    pattern: '/floors/:id/edit'
    types: {
      body: {}
      paramsTuple: [ParamValue]
      params: { id: ParamValue }
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/floors_controller').default['edit']>>>
    }
  }
  'floors.update': {
    methods: ["PUT"]
    pattern: '/floors/:id'
    types: {
      body: ExtractBody<InferInput<(typeof import('#validators/floor').updateFloorValidator)>>
      paramsTuple: [ParamValue]
      params: { id: ParamValue }
      query: ExtractQuery<InferInput<(typeof import('#validators/floor').updateFloorValidator)>>
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/floors_controller').default['update']>>>
    }
  }
  'floors.destroy': {
    methods: ["DELETE"]
    pattern: '/floors/:id'
    types: {
      body: {}
      paramsTuple: [ParamValue]
      params: { id: ParamValue }
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/floors_controller').default['destroy']>>>
    }
  }
  'zones.index': {
    methods: ["GET","HEAD"]
    pattern: '/floors/:floorId/zones'
    types: {
      body: {}
      paramsTuple: [ParamValue]
      params: { floorId: ParamValue }
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/zones_controller').default['index']>>>
    }
  }
  'zones.create': {
    methods: ["GET","HEAD"]
    pattern: '/floors/:floorId/zones/create'
    types: {
      body: {}
      paramsTuple: [ParamValue]
      params: { floorId: ParamValue }
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/zones_controller').default['create']>>>
    }
  }
  'zones.store': {
    methods: ["POST"]
    pattern: '/floors/:floorId/zones'
    types: {
      body: ExtractBody<InferInput<(typeof import('#validators/zone').createZoneValidator)>>
      paramsTuple: [ParamValue]
      params: { floorId: ParamValue }
      query: ExtractQuery<InferInput<(typeof import('#validators/zone').createZoneValidator)>>
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/zones_controller').default['store']>>>
    }
  }
  'zones.edit': {
    methods: ["GET","HEAD"]
    pattern: '/zones/:id/edit'
    types: {
      body: {}
      paramsTuple: [ParamValue]
      params: { id: ParamValue }
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/zones_controller').default['edit']>>>
    }
  }
  'zones.show': {
    methods: ["GET","HEAD"]
    pattern: '/zones/:id'
    types: {
      body: {}
      paramsTuple: [ParamValue]
      params: { id: ParamValue }
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/zones_controller').default['show']>>>
    }
  }
  'zones.update': {
    methods: ["PUT"]
    pattern: '/zones/:id'
    types: {
      body: ExtractBody<InferInput<(typeof import('#validators/zone').updateZoneValidator)>>
      paramsTuple: [ParamValue]
      params: { id: ParamValue }
      query: ExtractQuery<InferInput<(typeof import('#validators/zone').updateZoneValidator)>>
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/zones_controller').default['update']>>>
    }
  }
  'zones.destroy': {
    methods: ["DELETE"]
    pattern: '/zones/:id'
    types: {
      body: {}
      paramsTuple: [ParamValue]
      params: { id: ParamValue }
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/zones_controller').default['destroy']>>>
    }
  }
  'zones.generate_qr': {
    methods: ["GET","HEAD"]
    pattern: '/zones/:id/qr'
    types: {
      body: {}
      paramsTuple: [ParamValue]
      params: { id: ParamValue }
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/zones_controller').default['generateQr']>>>
    }
  }
  'zones.resolve_by_qr': {
    methods: ["GET","HEAD"]
    pattern: '/zones/by-qr/:qr'
    types: {
      body: {}
      paramsTuple: [ParamValue]
      params: { qr: ParamValue }
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/zones_controller').default['resolveByQr']>>>
    }
  }
  'complaints.index': {
    methods: ["GET","HEAD"]
    pattern: '/complaints'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/complaints_controller').default['index']>>>
    }
  }
  'complaints.store': {
    methods: ["POST"]
    pattern: '/complaints'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/complaints_controller').default['store']>>>
    }
  }
  'complaints.track': {
    methods: ["GET","HEAD"]
    pattern: '/complaints/track/:code'
    types: {
      body: {}
      paramsTuple: [ParamValue]
      params: { code: ParamValue }
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/complaints_controller').default['track']>>>
    }
  }
  'complaints.my_complaints': {
    methods: ["GET","HEAD"]
    pattern: '/complaints/my'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/complaints_controller').default['myComplaints']>>>
    }
  }
  'complaints.show': {
    methods: ["GET","HEAD"]
    pattern: '/complaints/:id'
    types: {
      body: {}
      paramsTuple: [ParamValue]
      params: { id: ParamValue }
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/complaints_controller').default['show']>>>
    }
  }
  'complaints.mark_in_progress': {
    methods: ["PUT"]
    pattern: '/complaints/:id/status'
    types: {
      body: {}
      paramsTuple: [ParamValue]
      params: { id: ParamValue }
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/complaints_controller').default['markInProgress']>>>
    }
  }
  'complaints.resolve': {
    methods: ["PUT"]
    pattern: '/complaints/:id/resolve'
    types: {
      body: {}
      paramsTuple: [ParamValue]
      params: { id: ParamValue }
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/complaints_controller').default['resolve']>>>
    }
  }
  'job_cards.index': {
    methods: ["GET","HEAD"]
    pattern: '/job-cards'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/job_cards_controller').default['index']>>>
    }
  }
  'job_cards.show': {
    methods: ["GET","HEAD"]
    pattern: '/job-cards/:id'
    types: {
      body: {}
      paramsTuple: [ParamValue]
      params: { id: ParamValue }
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/job_cards_controller').default['show']>>>
    }
  }
  'job_cards.start': {
    methods: ["PUT"]
    pattern: '/job-cards/:id/start'
    types: {
      body: {}
      paramsTuple: [ParamValue]
      params: { id: ParamValue }
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/job_cards_controller').default['start']>>>
    }
  }
  'job_cards.complete': {
    methods: ["PUT"]
    pattern: '/job-cards/:id/complete'
    types: {
      body: {}
      paramsTuple: [ParamValue]
      params: { id: ParamValue }
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/job_cards_controller').default['complete']>>>
    }
  }
  'job_cards.zone_history': {
    methods: ["GET","HEAD"]
    pattern: '/job-cards/zone/:zoneId'
    types: {
      body: {}
      paramsTuple: [ParamValue]
      params: { zoneId: ParamValue }
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/job_cards_controller').default['zoneHistory']>>>
    }
  }
  'admin_dashboard.index': {
    methods: ["GET","HEAD"]
    pattern: '/dashboard/admin'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/admin_dashboards_controller').default['index']>>>
    }
  }
  'supervisor_dashboard.index': {
    methods: ["GET","HEAD"]
    pattern: '/dashboard/supervisor'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/supervisor_dashboards_controller').default['index']>>>
    }
  }
  'contractor_dashboard.index': {
    methods: ["GET","HEAD"]
    pattern: '/dashboard/contractor'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/contractor_dashboards_controller').default['index']>>>
    }
  }
  'analytics.buildings': {
    methods: ["GET","HEAD"]
    pattern: '/analytics/buildings'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/analytics_controller').default['buildings']>>>
    }
  }
  'analytics.supervisors': {
    methods: ["GET","HEAD"]
    pattern: '/analytics/supervisors'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/analytics_controller').default['supervisors']>>>
    }
  }
  'analytics.categories': {
    methods: ["GET","HEAD"]
    pattern: '/analytics/categories'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/analytics_controller').default['categories']>>>
    }
  }
  'analytics.heatmap': {
    methods: ["GET","HEAD"]
    pattern: '/analytics/heatmap'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/analytics_controller').default['heatmap']>>>
    }
  }
  'analytics.trends': {
    methods: ["GET","HEAD"]
    pattern: '/analytics/trends'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/analytics_controller').default['trends']>>>
    }
  }
  'analytics.peak_hours': {
    methods: ["GET","HEAD"]
    pattern: '/analytics/peak-hours'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/analytics_controller').default['peakHours']>>>
    }
  }
  'analytics.contractor_metrics': {
    methods: ["GET","HEAD"]
    pattern: '/analytics/contractor/:id'
    types: {
      body: {}
      paramsTuple: [ParamValue]
      params: { id: ParamValue }
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/analytics_controller').default['contractorMetrics']>>>
    }
  }
  'reports.weekly': {
    methods: ["GET","HEAD"]
    pattern: '/reports/weekly'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/reports_controller').default['weekly']>>>
    }
  }
  'reports.building_report': {
    methods: ["GET","HEAD"]
    pattern: '/reports/building/:id'
    types: {
      body: {}
      paramsTuple: [ParamValue]
      params: { id: ParamValue }
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/reports_controller').default['buildingReport']>>>
    }
  }
  'reports.contractor_report': {
    methods: ["GET","HEAD"]
    pattern: '/reports/contractor/:id'
    types: {
      body: {}
      paramsTuple: [ParamValue]
      params: { id: ParamValue }
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/reports_controller').default['contractorReport']>>>
    }
  }
}
