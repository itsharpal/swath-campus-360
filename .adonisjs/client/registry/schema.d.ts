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
  'auth.verify_email': {
    methods: ["GET","HEAD"]
    pattern: '/email/verify/:id'
    types: {
      body: {}
      paramsTuple: [ParamValue]
      params: { id: ParamValue }
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/auth_controller').default['verifyEmail']>>>
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
  'admin.users.index': {
    methods: ["GET","HEAD"]
    pattern: '/admin/users'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/admin_users_controller').default['index']>>>
    }
  }
  'admin.users.create': {
    methods: ["GET","HEAD"]
    pattern: '/admin/users/create'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/admin_users_controller').default['create']>>>
    }
  }
  'admin.users.store': {
    methods: ["POST"]
    pattern: '/admin/users'
    types: {
      body: ExtractBody<InferInput<(typeof import('#validators/admin_user').createUserValidator)>>
      paramsTuple: []
      params: {}
      query: ExtractQuery<InferInput<(typeof import('#validators/admin_user').createUserValidator)>>
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/admin_users_controller').default['store']>>>
    }
  }
  'admin.users.show': {
    methods: ["GET","HEAD"]
    pattern: '/admin/users/:id'
    types: {
      body: {}
      paramsTuple: [ParamValue]
      params: { id: ParamValue }
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/admin_users_controller').default['show']>>>
    }
  }
  'admin.users.edit': {
    methods: ["GET","HEAD"]
    pattern: '/admin/users/:id/edit'
    types: {
      body: {}
      paramsTuple: [ParamValue]
      params: { id: ParamValue }
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/admin_users_controller').default['edit']>>>
    }
  }
  'admin.users.update': {
    methods: ["PUT"]
    pattern: '/admin/users/:id'
    types: {
      body: ExtractBody<InferInput<(typeof import('#validators/admin_user').updateUserValidator)>>
      paramsTuple: [ParamValue]
      params: { id: ParamValue }
      query: ExtractQuery<InferInput<(typeof import('#validators/admin_user').updateUserValidator)>>
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/admin_users_controller').default['update']>>>
    }
  }
  'admin.users.destroy': {
    methods: ["DELETE"]
    pattern: '/admin/users/:id'
    types: {
      body: {}
      paramsTuple: [ParamValue]
      params: { id: ParamValue }
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/admin_users_controller').default['destroy']>>>
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
  'complaints.create': {
    methods: ["GET","HEAD"]
    pattern: '/complaints/create'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/complaints_controller').default['create']>>>
    }
  }
  'complaints.my': {
    methods: ["GET","HEAD"]
    pattern: '/complaints/my'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/complaints_controller').default['my']>>>
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
  'complaints.show_resolve': {
    methods: ["GET","HEAD"]
    pattern: '/complaints/:id/resolve'
    types: {
      body: {}
      paramsTuple: [ParamValue]
      params: { id: ParamValue }
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/complaints_controller').default['showResolve']>>>
    }
  }
  'complaints.store': {
    methods: ["POST"]
    pattern: '/complaints'
    types: {
      body: ExtractBody<InferInput<(typeof import('#validators/complaint').createComplaintValidator)>>
      paramsTuple: []
      params: {}
      query: ExtractQuery<InferInput<(typeof import('#validators/complaint').createComplaintValidator)>>
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/complaints_controller').default['store']>>>
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
      body: ExtractBody<InferInput<(typeof import('#validators/complaint').updateStatusValidator)>>
      paramsTuple: [ParamValue]
      params: { id: ParamValue }
      query: ExtractQuery<InferInput<(typeof import('#validators/complaint').updateStatusValidator)>>
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/complaints_controller').default['markInProgress']>>>
    }
  }
  'complaints.resolve': {
    methods: ["PUT"]
    pattern: '/complaints/:id/resolve'
    types: {
      body: ExtractBody<InferInput<(typeof import('#validators/complaint').resolveComplaintValidator)>>
      paramsTuple: [ParamValue]
      params: { id: ParamValue }
      query: ExtractQuery<InferInput<(typeof import('#validators/complaint').resolveComplaintValidator)>>
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/complaints_controller').default['resolve']>>>
    }
  }
}
